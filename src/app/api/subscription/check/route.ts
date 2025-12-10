import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr"; // Fix incorrect import

export async function POST(request: NextRequest) {
  try {
    const { authToken } = await request.json();

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
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          hasProPlan: false,
          error: "Invalid auth token",
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

    if (subError || !subscriptions || subscriptions.length === 0) {
      return NextResponse.json({
        hasProPlan: false,
        userId: user.id,
        email: user.email,
      });
    }

    const subscription = subscriptions[0];
    const isPro =
      subscription.plan_type === "monthly" ||
      subscription.plan_type === "yearly";

    // Check expiration
    if (subscription.expires_at) {
      const expiresAt = new Date(subscription.expires_at);
      const now = new Date();
      if (now > expiresAt) {
        return NextResponse.json({
          hasProPlan: false,
          userId: user.id,
          email: user.email,
        });
      }
    }

    return NextResponse.json({
      hasProPlan: isPro,
      planType: subscription.plan_type,
      expiresAt: subscription.expires_at,
      userId: user.id,
      email: user.email,
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
