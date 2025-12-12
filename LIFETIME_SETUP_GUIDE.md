# Lifetime Access Plan Setup Guide

This guide will walk you through setting up the Lifetime Access plan for ILoveSnapshots with Polar payment integration.

## Overview

The lifetime access plan offers:
- **Price**: $18 (discounted from $25)
- **Type**: One-time payment
- **Features**: All current Pro features (app + extension)
- **Limitation**: Does NOT include future features

## Steps to Complete Setup

### 1. Create Lifetime Product in Polar

#### For Sandbox Testing:

1. Go to [Polar Sandbox](https://sandbox.polar.sh)
2. Log in to your account
3. Navigate to Products section
4. Click "Create Product"
5. Fill in the details:
   - **Name**: "Lifetime Access"
   - **Description**: "One-time payment for lifetime access to all current Pro features"
   - **Type**: **One-time payment** (Important: NOT subscription)
   - **Price**: $18 USD
   - **Benefits**: List all current pro features
6. Save the product
7. Copy the **Product ID** (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

#### For Production:

1. Go to [Polar Production](https://polar.sh)
2. Follow the same steps as sandbox
3. Copy the **Production Product ID**

### 2. Update Environment Variables

Open your `.env.local` file and replace the placeholder:

```env
# For Sandbox Testing (currently active)
POLAR_PRODUCT_ID_LIFETIME=YOUR_ACTUAL_POLAR_LIFETIME_PRODUCT_ID

# For Production (when ready to go live)
# Uncomment and add your production product ID:
# POLAR_PRODUCT_ID_LIFETIME=YOUR_PRODUCTION_LIFETIME_PRODUCT_ID
```

**Important**: Replace `YOUR_POLAR_LIFETIME_PRODUCT_ID` with the actual Product ID you copied from Polar.

### 3. Verify the Implementation

The following files have been updated to support lifetime access:

#### Database Schema (`subscriptions` table)
- Already supports `plan_type: "lifetime"`
- `expires_at` will be `null` for lifetime plans

#### API Endpoints Updated
- ✅ `/api/checkout` - Creates checkout for lifetime plan
- ✅ `/api/webhook/polar` - Handles lifetime payment webhooks
- ✅ `/api/subscription/check` - Extension API recognizes lifetime users

#### Frontend Components Updated
- ✅ `PricingSection.tsx` - Displays lifetime plan card
- ✅ `DashboardPage.tsx` - Shows "Lifetime" badge for lifetime users
- ✅ `subscription.ts` - `hasProSubscription()` includes lifetime

### 4. Testing the Implementation

#### Test with Polar Sandbox:

1. Make sure `POLAR_SANDBOX_MODE=true` in your `.env.local`
2. Add the sandbox lifetime product ID
3. Restart your development server:
   ```bash
   npm run dev
   ```
4. Navigate to the pricing section
5. You should see 3 plans:
   - Free
   - Pro (Monthly/Yearly)
   - Lifetime Access ($18, crossed out from $25)
6. Click "Get Lifetime Access"
7. Complete the test payment in Polar Sandbox
8. Verify the webhook activates the subscription
9. Check the dashboard - it should show "Access: Lifetime"

#### Test Checklist:
- [ ] Lifetime plan card displays correctly
- [ ] Clicking "Get Lifetime Access" redirects to Polar checkout
- [ ] Test payment completes successfully
- [ ] Webhook processes the payment correctly
- [ ] User subscription status updates to "lifetime"
- [ ] Dashboard shows "Lifetime" access
- [ ] User can access all Pro features in the editor
- [ ] Extension API recognizes lifetime subscription

### 5. Database Verification

After a test payment, check your Supabase database:

```sql
SELECT * FROM subscriptions WHERE plan_type = 'lifetime';
```

Expected result:
- `plan_type`: "lifetime"
- `status`: "active"
- `amount`: 18
- `currency`: "USD"
- `expires_at`: `null`
- `payment_id`: Polar checkout/subscription ID

### 6. Feature Access Control

#### Current Features (Included in Lifetime):
- Annotations tools
- Premium themes (120+)
- Custom theme creation
- Blur & pixelate tools
- Highest quality export
- Priority support
- Web editor full access
- Chrome extension access

#### Future Features (NOT Included):
- Cloud storage (Coming Soon)
- Multi-format export PDF/JPG (Coming Soon)
- Early access to new tools (Coming Soon)

**Note**: To properly enforce feature versioning (current vs future features), you may want to implement a feature flag system in the future. For now, all Pro features are accessible to lifetime users.

### 7. Production Deployment

When ready to go live:

1. Create the lifetime product in Polar Production
2. Update `.env.local` (or `.env.production`):
   ```env
   POLAR_SANDBOX_MODE=false
   POLAR_PRODUCT_ID_LIFETIME=your_production_lifetime_product_id
   ```
3. Deploy your application
4. Test with a real payment (use a small amount first)
5. Verify webhook integration works in production

### 8. Monitoring

After launch, monitor:
- Polar dashboard for successful payments
- Supabase database for new lifetime subscriptions
- Webhook logs for any errors
- User feedback on access issues

## Troubleshooting

### Issue: Checkout fails with "Product ID not configured"
**Solution**: Verify `POLAR_PRODUCT_ID_LIFETIME` is set in `.env.local`

### Issue: Payment completes but subscription not activated
**Solution**: Check webhook logs in `/api/webhook/polar/route.ts`. Ensure webhook secret is correct.

### Issue: Lifetime plan not showing on pricing page
**Solution**: Restart your dev server after adding environment variables

### Issue: User can't access Pro features after payment
**Solution**: Check subscription status in database. Verify `plan_type = 'lifetime'` and `status = 'active'`

## Support

For issues with:
- **Polar Integration**: Check [Polar Documentation](https://docs.polar.sh)
- **Supabase**: Check [Supabase Documentation](https://supabase.com/docs)
- **Webhooks**: Enable console logging in `/api/webhook/polar/route.ts`

## Next Steps

After completing setup:

1. Test thoroughly in sandbox mode
2. Consider adding analytics to track lifetime plan conversions
3. Plan how to differentiate future features from current features
4. Update Terms of Service to clearly state lifetime limitations
5. Set up customer support flow for lifetime users

---

**Need Help?** Check the codebase for inline comments or reach out to the development team.
