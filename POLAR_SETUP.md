# Polar Payment Integration Setup Guide

This guide will help you set up Polar payments for your application.

## Prerequisites

1. A Polar account (sign up at [polar.sh](https://polar.sh))
2. Supabase project with the database schema already set up
3. Your application deployed or running locally

## Step 1: Create Polar Products

1. Log in to your [Polar Dashboard](https://polar.sh/dashboard)
2. Navigate to **Products** section
3. Create two products:

### Monthly Plan
- **Name**: Pro Monthly
- **Price**: $2/month
- **Billing**: Recurring (Monthly)
- **Description**: Pro plan billed monthly
- Copy the **Product ID** - you'll need this for `POLAR_PRODUCT_ID_MONTHLY`

### Yearly Plan
- **Name**: Pro Yearly
- **Price**: $12/year (or $1/month billed annually)
- **Billing**: Recurring (Yearly)
- **Description**: Pro plan billed annually
- Copy the **Product ID** - you'll need this for `POLAR_PRODUCT_ID_YEARLY`

## Step 2: Get Your Polar API Credentials

1. Go to **Settings** → **API** in your Polar Dashboard
2. Create a new **Access Token**
   - Give it a descriptive name (e.g., "Production API Token")
   - Copy the token - you'll need this for `POLAR_ACCESS_TOKEN`
3. Note your **Organization ID** - you'll need this for `POLAR_ORG_ID`

## Step 3: Set Up Webhook

1. Go to **Settings** → **Webhooks** in your Polar Dashboard
2. Click **Create Webhook**
3. Configure the webhook:
   - **URL**:
     - For local development: Use ngrok to expose your local server
       ```bash
       ngrok http 3000
       ```
       Then use: `https://your-ngrok-url.ngrok-free.app/api/webhook/polar`
     - For production: `https://yourdomain.com/api/webhook/polar`
   - **Events**: Select these events:
     - `checkout.created`
     - `checkout.updated`
     - `subscription.created`
     - `subscription.updated`
     - `subscription.canceled`
     - `subscription.revoked`
4. Copy the **Webhook Secret** - you'll need this for `POLAR_WEBHOOK_SECRET`

## Step 4: Configure Environment Variables

Add these variables to your `.env.local` file:

```env
# Polar Configuration
POLAR_ACCESS_TOKEN=polar_at_xxxxxxxxxxxxx
POLAR_ORG_ID=your_org_id_here
POLAR_PRODUCT_ID_MONTHLY=prod_monthly_xxxxx
POLAR_PRODUCT_ID_YEARLY=prod_yearly_xxxxx
POLAR_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Change to your production URL in production
```

## Step 5: Update Supabase (If Needed)

Your Supabase database should already have the `subscriptions` table. If not, run this SQL:

```sql
CREATE TABLE public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_type TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  payment_id TEXT,
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription"
  ON public.subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## Step 6: Test the Integration

### Local Testing with ngrok

1. Start ngrok:
   ```bash
   ngrok http 3000
   ```

2. Update your Polar webhook URL with the ngrok URL

3. Start your development server:
   ```bash
   npm run dev
   ```

4. Test the payment flow:
   - Navigate to your pricing page
   - Click "Upgrade to Pro" on either Monthly or Yearly plan
   - Complete the checkout (use Polar's test mode for testing)
   - Verify you're redirected to the success page
   - Check your Supabase database to confirm the subscription was created

### Testing the Ultra HD Download Feature

1. Log in to your application
2. Go to the editor page
3. Click the download button
4. Without a Pro subscription, the "Ultra HD Quality" option should show "Pro Only" badge
5. Clicking it should redirect to the pricing page
6. After subscribing, the badge should change to "Recommended" and download should work

## Step 7: Deploy to Production

1. Update environment variables in your production environment:
   - Change `NEXT_PUBLIC_SITE_URL` to your production URL
   - Ensure all Polar credentials are set
   - Switch Polar to production mode (update `NODE_ENV=production`)

2. Update Polar webhook URL to your production URL:
   - `https://yourdomain.com/api/webhook/polar`

3. Test the production payment flow thoroughly before going live

## Troubleshooting

### Webhooks Not Working

- Check webhook secret is correct
- Verify webhook URL is accessible (test with curl or Postman)
- Check server logs for webhook errors
- Make sure your webhook endpoint is not behind authentication

### Checkout Not Creating

- Verify product IDs are correct
- Check Polar access token has correct permissions
- Look at browser console for errors
- Check API route logs

### Subscription Not Activating

- Check webhook is being received (check Polar dashboard webhook logs)
- Verify Supabase connection and permissions
- Check that user is logged in when making payment
- Review server logs for database errors

## API Routes Created

- `POST /api/checkout` - Creates Polar checkout session
- `POST /api/webhook/polar` - Handles Polar webhooks
- `POST /api/subscription/cancel` - Cancels user subscription

## Files Modified/Created

- `src/lib/polar.ts` - Polar client configuration
- `src/lib/subscription.ts` - Subscription utility functions
- `src/app/api/checkout/route.ts` - Checkout API route
- `src/app/api/webhook/polar/route.ts` - Webhook handler
- `src/app/api/subscription/cancel/route.ts` - Cancellation handler
- `src/app/payment/success/page.tsx` - Success page
- `src/app/payment/cancel/page.tsx` - Cancel page
- `src/components/sections/PricingSection.tsx` - Updated with payment flow
- `src/components/editor/ScreenshotEditor.tsx` - Updated with Pro restriction

## Support

For Polar-specific issues, check:
- [Polar Documentation](https://docs.polar.sh)
- [Polar Discord](https://discord.gg/polar)

For application issues, contact your development team.
