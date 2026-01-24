import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const { authToken, refreshToken } = await request.json();

    if (!authToken) {
      return NextResponse.json(
        {
          hasProPlan: false,
          error: "No auth token provided",
        },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          hasProPlan: false,
          error: "Server configuration error",
        },
        { status: 500 }
      );
    }

    // Create Supabase client with the provided token
    let supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    });

    // Verify the token and get user
    let {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // Track if we refreshed the token so we can return new tokens to the extension
    let newAccessToken: string | null = null;
    let newRefreshToken: string | null = null;

    // If token is invalid/expired and we have a refresh token, try to refresh
    if ((userError || !user) && refreshToken) {
      console.log("[Subscription Check] Access token invalid, attempting refresh...");

      // Create a new client to refresh the session
      const refreshClient = createClient(supabaseUrl, supabaseAnonKey);

      const { data: refreshData, error: refreshError } = await refreshClient.auth.setSession({
        access_token: authToken,
        refresh_token: refreshToken,
      });

      if (refreshError || !refreshData.session) {
        console.log("[Subscription Check] Token refresh failed:", refreshError?.message);
        return NextResponse.json(
          {
            hasProPlan: false,
            error: "Session expired. Please log in again.",
            needsReauth: true,
          },
          { status: 401 }
        );
      }

      console.log("[Subscription Check] Token refreshed successfully");

      // Store the new tokens to return to the extension
      newAccessToken = refreshData.session.access_token;
      newRefreshToken = refreshData.session.refresh_token;
      user = refreshData.user;

      // Create a new supabase client with the refreshed token
      supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        },
        cookies: {
          getAll() {
            return [];
          },
          setAll() {},
        },
      });
    } else if (userError || !user) {
      // No refresh token provided and access token is invalid
      return NextResponse.json(
        {
          hasProPlan: false,
          error: "Invalid auth token",
          needsReauth: true,
        },
        { status: 401 }
      );
    }

    // Check subscription using the same logic as website's hasProSubscription
    const { data: subscriptions, error: subError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1);

    // Build base response with new tokens if refreshed
    const baseResponse: Record<string, unknown> = {
      userId: user.id,
      email: user.email,
    };

    // Include new tokens if they were refreshed (so extension can update storage)
    if (newAccessToken && newRefreshToken) {
      baseResponse.newAuthToken = newAccessToken;
      baseResponse.newRefreshToken = newRefreshToken;
      baseResponse.tokensRefreshed = true;
    }

    if (subError || !subscriptions || subscriptions.length === 0) {
      return NextResponse.json({
        ...baseResponse,
        hasProPlan: false,
      });
    }

    const subscription = subscriptions[0];
    const isPro =
      subscription.plan_type === "monthly" ||
      subscription.plan_type === "yearly" ||
      subscription.plan_type === "lifetime";

    // Check expiration (lifetime plans have no expiration)
    if (subscription.expires_at) {
      const expiresAt = new Date(subscription.expires_at);
      const now = new Date();
      if (now > expiresAt) {
        return NextResponse.json({
          ...baseResponse,
          hasProPlan: false,
        });
      }
    }

    return NextResponse.json({
      ...baseResponse,
      hasProPlan: isPro,
      planType: subscription.plan_type,
      expiresAt: subscription.expires_at,
    });
  } catch (error) {
    console.error("Subscription check error:", error);
    return NextResponse.json(
      {
        hasProPlan: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
