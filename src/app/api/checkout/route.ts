import { NextRequest, NextResponse } from "next/server";
import { polarApi } from "@/lib/polar";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json();

    // Validate plan type
    if (!plan || (plan !== "monthly" && plan !== "yearly" && plan !== "lifetime")) {
      return NextResponse.json(
        { error: "Invalid plan type. Must be 'monthly', 'yearly', or 'lifetime'" },
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

    // Get the appropriate product ID based on plan
    let productId: string | undefined;
    let amount: number;

    if (plan === "monthly") {
      productId = process.env.POLAR_PRODUCT_ID_MONTHLY;
      amount = 2;
    } else if (plan === "yearly") {
      productId = process.env.POLAR_PRODUCT_ID_YEARLY;
      amount = 12;
    } else {
      // lifetime
      productId = process.env.POLAR_PRODUCT_ID_LIFETIME;
      amount = 18;
    }

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID not configured" },
        { status: 500 }
      );
    }

    // Create checkout session with Polar
    const checkout = await polarApi.checkouts.create({
      products: [productId],
      customerEmail: user.email!,
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/payment/success`,
      returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/payment/cancel`,
    });

    // First, deactivate any existing active subscriptions for this user
    const { error: deactivateError } = await supabase
      .from("subscriptions")
      .update({ status: "cancelled" })
      .eq("user_id", user.id)
      .eq("status", "active");

    if (deactivateError) {
      console.error("Error deactivating old subscriptions:", deactivateError);
    }

    // Then create new subscription
    const { error: insertError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: user.id,
        plan_type: plan,
        status: "pending",
        payment_id: checkout.id,
        amount: amount,
        currency: "USD",
        // Lifetime plans have no expiration date
        expires_at: plan === "lifetime" ? null : undefined,
      });

    if (insertError) {
      console.error("Error storing checkout in database:", insertError);
      // Don't fail the checkout, just log the error
    }

    return NextResponse.json({
      checkoutUrl: checkout.url,
      checkoutId: checkout.id
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
