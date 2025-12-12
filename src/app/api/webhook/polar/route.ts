import { Webhooks } from "@polar-sh/nextjs";
import { createAdminClient } from "@/lib/supabase/admin";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    console.log("🔔 Polar webhook received:", payload.type);

    // Use admin client for webhooks (bypasses RLS)
    const supabase = createAdminClient();

    try {
      // Handle subscription creation
      if (payload.type === "subscription.created") {
        const subscription = payload.data;
        const checkoutId = subscription.checkoutId;

        console.log("✅ Subscription created:", {
          subscriptionId: subscription.id,
          checkoutId,
        });

        // Update the subscription record with the subscription ID
        if (checkoutId) {
          // First, get the subscription to check if it's a lifetime plan
          const { data: existingSub } = await supabase
            .from("subscriptions")
            .select("plan_type")
            .eq("payment_id", checkoutId)
            .single();

          const isLifetime = existingSub?.plan_type === "lifetime";

          const { error: updateError } = await supabase
            .from("subscriptions")
            .update({
              payment_id: subscription.id,
              status: "active",
              started_at: new Date().toISOString(),
              // Set expiration only for non-lifetime plans
              expires_at: isLifetime
                ? null
                : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            })
            .eq("payment_id", checkoutId);

          if (updateError) {
            console.error("❌ Error updating subscription:", updateError);
          } else {
            console.log(
              `✅ Subscription linked to payment${isLifetime ? " (lifetime)" : ""}`
            );
          }
        }
      }

      // Handle subscription updates (renewal, cancellation, etc.)
      if (payload.type === "subscription.updated") {
        const subscription = payload.data;

        console.log("📝 Subscription updated:", {
          subscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: subscription.currentPeriodEnd,
        });

        // Calculate new expiration based on billing period
        let newExpiration = null;
        if (subscription.currentPeriodEnd) {
          newExpiration = new Date(subscription.currentPeriodEnd).toISOString();
        }

        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({
            status: subscription.status === "active" ? "active" : "cancelled",
            expires_at: newExpiration, // Update expiration on renewal
          })
          .eq("payment_id", subscription.id);

        if (updateError) {
          console.error("❌ Error updating subscription:", updateError);
        } else {
          console.log("✅ Subscription renewed - new expiration:", newExpiration);
        }
      }

      // Handle subscription cancellation
      if (payload.type === "subscription.canceled" || payload.type === "subscription.revoked") {
        const subscription = payload.data;

        console.log("🛑 Subscription cancelled:", subscription.id);

        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({
            status: "cancelled",
          })
          .eq("payment_id", subscription.id);

        if (updateError) {
          console.error("❌ Error cancelling subscription:", updateError);
        } else {
          console.log("✅ Subscription cancelled in database");
        }
      }

      // Handle subscription.active event (when subscription becomes active after payment)
      if (payload.type === "subscription.active") {
        const subscription = payload.data;

        console.log("🎉 Subscription activated:", {
          subscriptionId: subscription.id,
          currentPeriodEnd: subscription.currentPeriodEnd,
        });

        // Update expiration date when subscription becomes active
        let expiresAt = null;
        if (subscription.currentPeriodEnd) {
          expiresAt = new Date(subscription.currentPeriodEnd).toISOString();
        }

        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({
            status: "active",
            expires_at: expiresAt,
          })
          .eq("payment_id", subscription.id);

        if (updateError) {
          console.error("❌ Error activating subscription:", updateError);
        } else {
          console.log("✅ Subscription activated with expiration:", expiresAt);
        }
      }

      // Handle checkout completion (for one-time payments like lifetime or initial checkout)
      if (payload.type === "checkout.updated") {
        const checkout = payload.data;

        console.log("📦 Checkout updated:", {
          checkoutId: checkout.id,
          status: checkout.status,
          amount: checkout.amount,
          currency: checkout.currency,
        });

        // Log all checkout statuses for debugging
        console.log("🔍 Checkout status details:", checkout.status);

        // Update for confirmed OR succeeded checkouts
        if (checkout.status === "confirmed" || checkout.status === "succeeded") {
          // Get the subscription to check if it's a lifetime plan
          const { data: existingSub, error: fetchError } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("payment_id", checkout.id)
            .single();

          console.log("🔍 Found subscription:", existingSub, "Error:", fetchError);

          if (!existingSub) {
            console.log("⚠️ No subscription found for checkout:", checkout.id);
            return;
          }

          const isLifetime = existingSub?.plan_type === "lifetime";

          const { error: updateError } = await supabase
            .from("subscriptions")
            .update({
              status: "active",
              started_at: new Date().toISOString(),
              // Lifetime plans don't have expiration
              expires_at: isLifetime ? null : undefined,
            })
            .eq("payment_id", checkout.id);

          if (updateError) {
            console.error("❌ Error updating checkout:", updateError);
          } else {
            console.log(
              `✅ Checkout marked as active${isLifetime ? " (lifetime)" : ""}`
            );
          }
        } else {
          console.log(`ℹ️ Checkout status is "${checkout.status}", not activating yet`);
        }
      }
    } catch (error) {
      console.error("❌ Error processing webhook:", error);
      // Don't throw error to avoid retries from Polar
    }
  },
});
