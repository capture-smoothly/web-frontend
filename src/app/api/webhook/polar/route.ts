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
          const { error: updateError } = await supabase
            .from("subscriptions")
            .update({
              payment_id: subscription.id,
              status: "active",
              started_at: new Date().toISOString(),
              // Set expiration based on plan type
              expires_at: new Date(
                Date.now() + 365 * 24 * 60 * 60 * 1000
              ).toISOString(), // 1 year from now
            })
            .eq("payment_id", checkoutId);

          if (updateError) {
            console.error("❌ Error updating subscription:", updateError);
          } else {
            console.log("✅ Subscription linked to payment");
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

      // Handle checkout completion (for one-time payments or initial checkout)
      if (payload.type === "checkout.updated") {
        const checkout = payload.data;

        console.log("📦 Checkout updated:", {
          checkoutId: checkout.id,
          status: checkout.status,
        });

        // Only update if checkout is confirmed
        if (checkout.status === "confirmed") {
          const { error: updateError } = await supabase
            .from("subscriptions")
            .update({
              status: "active",
            })
            .eq("payment_id", checkout.id);

          if (updateError) {
            console.error("❌ Error updating checkout:", updateError);
          } else {
            console.log("✅ Checkout marked as active");
          }
        }
      }
    } catch (error) {
      console.error("❌ Error processing webhook:", error);
      // Don't throw error to avoid retries from Polar
    }
  },
});
