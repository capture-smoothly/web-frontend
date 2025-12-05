import { NextRequest, NextResponse } from "next/server";
import { polarApi } from "@/lib/polar";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json();

    // Validate plan type
    if (!plan || (plan !== "monthly" && plan !== "yearly")) {
      return NextResponse.json(
        { error: "Invalid plan type. Must be 'monthly' or 'yearly'" },
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
    const productId = plan === "monthly"
      ? process.env.POLAR_PRODUCT_ID_MONTHLY
      : process.env.POLAR_PRODUCT_ID_YEARLY;

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

    // Store checkout info in Supabase
    const { error: insertError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: user.id,
        plan_type: plan,
        status: "pending",
        payment_id: checkout.id,
        amount: plan === "monthly" ? 2 : 12,
        currency: "USD",
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
