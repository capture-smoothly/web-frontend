import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Fallback API to activate pending subscriptions
 * Used when webhooks don't work (e.g., in localhost development)
 */
export async function POST() {
  try {
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find any pending subscriptions for this user
    const { data: pendingSubscriptions, error: fetchError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Error fetching pending subscriptions:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch subscriptions" },
        { status: 500 }
      );
    }

    if (!pendingSubscriptions || pendingSubscriptions.length === 0) {
      return NextResponse.json({
        message: "No pending subscriptions found",
        activated: false,
      });
    }

    // Activate the most recent pending subscription
    const subscription = pendingSubscriptions[0];

    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({
        status: "active",
        started_at: new Date().toISOString(),
      })
      .eq("id", subscription.id);

    if (updateError) {
      console.error("Error activating subscription:", updateError);
      return NextResponse.json(
        { error: "Failed to activate subscription" },
        { status: 500 }
      );
    }

    console.log(`✅ Activated pending ${subscription.plan_type} subscription for user ${user.id}`);

    return NextResponse.json({
      message: "Subscription activated successfully",
      activated: true,
      planType: subscription.plan_type,
    });
  } catch (error) {
    console.error("Error in activate-pending:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
