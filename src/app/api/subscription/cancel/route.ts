import { NextRequest, NextResponse } from "next/server";
import { polarApi } from "@/lib/polar";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 }
      );
    }

    // Get user from Supabase
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Verify the subscription belongs to the user
    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("payment_id", subscriptionId)
      .single();

    if (subError || !subscription) {
      return NextResponse.json(
        { error: "Subscription not found or does not belong to you" },
        { status: 404 }
      );
    }

    // Revoke (cancel immediately) subscription with Polar
    await polarApi.subscriptions.revoke({
      id: subscriptionId,
    });

    // Update subscription status in database
    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({ status: "cancelled" })
      .eq("payment_id", subscriptionId);

    if (updateError) {
      console.error("Error updating subscription status:", updateError);
      // Don't fail the request, as the cancellation was successful
    }

    return NextResponse.json({
      success: true,
      message: "Subscription cancelled successfully"
    });
  } catch (error: any) {
    console.error("Subscription cancellation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}
