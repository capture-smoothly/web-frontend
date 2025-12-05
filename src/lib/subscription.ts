import { createClient } from "@/lib/supabase/client";

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_type: string;
  status: string;
  payment_id: string | null;
  amount: number | null;
  currency: string | null;
  started_at: string | null;
  expires_at: string | null;
  created_at: string;
}

/**
 * Check if the current user has an active Pro subscription
 * @returns true if user has active Pro plan, false otherwise
 */
export async function hasProSubscription(): Promise<boolean> {
  try {
    const supabase = createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return false;
    }

    // Get user's subscription
    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (subError || !subscription) {
      return false;
    }

    // Check if subscription is Pro and still active
    const isPro = subscription.plan_type === "monthly" || subscription.plan_type === "yearly";

    // Check if subscription has expired
    if (subscription.expires_at) {
      const expiresAt = new Date(subscription.expires_at);
      const now = new Date();

      if (now > expiresAt) {
        return false;
      }
    }

    return isPro;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
}

/**
 * Get the current user's subscription details
 * @returns UserSubscription object or null if not found
 */
export async function getUserSubscription(): Promise<UserSubscription | null> {
  try {
    const supabase = createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    // Get user's active subscription
    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (subError || !subscription) {
      return null;
    }

    return subscription as UserSubscription;
  } catch (error) {
    console.error("Error getting subscription:", error);
    return null;
  }
}

/**
 * Cancel a user's subscription
 * @param subscriptionId - The Polar subscription ID to cancel
 */
export async function cancelSubscription(subscriptionId: string): Promise<void> {
  try {
    const response = await fetch("/api/subscription/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subscriptionId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to cancel subscription");
    }
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    throw error;
  }
}
