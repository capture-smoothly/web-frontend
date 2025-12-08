# Polar Sandbox Testing Guide

This guide will help you test the payment integration **without using real money** using Polar's sandbox environment.

## 🎯 What is Sandbox Mode?

Sandbox is a **completely separate testing environment** from production:
- **No real payments** are processed
- Use **test card numbers** instead of real cards
- All data is **isolated** from production
- Perfect for **development and testing**

---

## ✅ Setup Checklist

You've already completed most of the setup! Here's what's configured:

### Already Done ✓
- [x] Polar SDK installed
- [x] Code updated to support sandbox mode
- [x] Sandbox credentials added to `.env.local.example`
- [x] `POLAR_SANDBOX_MODE=true` is set

### Your Current Sandbox Credentials

Based on your `.env.local.example`, these are already configured:

```env
POLAR_SANDBOX_MODE=true
POLAR_ACCESS_TOKEN=polar_oat_RoIcW6FEM2wSCXUxroRxRur1Xaz02haD0zEgj0x4PIZ
POLAR_ORG_ID=797c01aa-2761-4db3-83fa-1ad86e8970f5
POLAR_PRODUCT_ID_MONTHLY=7ff2ad0a-0d56-44dd-9bc8-b3ae3eeca69d
POLAR_PRODUCT_ID_YEARLY=5541637e-2a76-416c-b231-a3cba1648a3d
POLAR_WEBHOOK_SECRET=polar_whs_wuWX0DGQrVTH4RGYfctqdLdYBAQw8rOadDDF80lJQrs
```

### What You Need to Do

1. **Verify .env.local has these credentials**
   ```bash
   cat .env.local
   ```
   Make sure it includes all the Polar sandbox credentials.

2. **Set up webhook URL (if testing locally)**

   Since you're testing locally, you'll need ngrok:

   ```bash
   # Install ngrok (if not already installed)
   npm install -g ngrok

   # Start ngrok
   ngrok http 3000
   ```

   Then:
   - Copy the HTTPS URL (e.g., `https://abc123.ngrok-free.app`)
   - Go to [sandbox.polar.sh](https://sandbox.polar.sh)
   - Navigate to **Settings → Webhooks**
   - Add webhook URL: `https://abc123.ngrok-free.app/api/webhook/polar`
   - Make sure the webhook secret matches your `.env.local`

---

## 🧪 Testing Steps

### Step 1: Start Your Development Server

```bash
npm run dev
```

You should see in the console:
```
🔧 Polar SDK initialized in SANDBOX mode
```

This confirms you're using sandbox mode! ✅

### Step 2: Test the Checkout Flow

1. **Open your app**: `http://localhost:3000`

2. **Navigate to pricing section**: Click on "Pricing" or scroll to the pricing section

3. **Click "Upgrade to Pro"** on either:
   - Monthly plan ($2/month)
   - Yearly plan ($12/year)

4. **You should be redirected** to `sandbox.polar.sh` checkout page

### Step 3: Complete Test Payment

On the Polar sandbox checkout page:

1. **Fill in email**: Use any email (can be fake for testing)

2. **Enter test card details**:
   ```
   Card Number: 4242 4242 4242 4242
   Expiry: Any future date (e.g., 12/25)
   CVC: Any 3 digits (e.g., 123)
   ZIP: Any 5 digits (e.g., 12345)
   ```

3. **Complete the payment** ✅

### Step 4: Verify Success

After payment:

1. **You should be redirected** to `/payment/success` page
2. **Check your console** - you should see webhook logs
3. **Check your Supabase database**:
   - Go to Supabase Dashboard
   - Navigate to Table Editor → `subscriptions`
   - Find your subscription - status should be `active`

### Step 5: Test Ultra HD Download

1. **Go to the editor** (`/editor`)
2. **Upload or paste an image**
3. **Click the download button**
4. **Select "Ultra HD Quality"**:
   - Badge should say **"Recommended"** (not "Pro Only")
   - Clicking should start download in Ultra HD quality
   - File size should be larger (better quality)

---

## 🔍 Troubleshooting

### Issue: "Polar SDK initialized in PRODUCTION mode"

**Solution**:
```bash
# Check your .env.local file
cat .env.local | grep POLAR_SANDBOX_MODE

# Should show:
POLAR_SANDBOX_MODE=true

# If not, add it:
echo "POLAR_SANDBOX_MODE=true" >> .env.local

# Restart dev server
npm run dev
```

### Issue: Checkout fails or redirects to wrong URL

**Solution**:
1. Check that `NEXT_PUBLIC_SITE_URL` is set correctly in `.env.local`
2. Restart your dev server after changing `.env.local`

### Issue: Webhooks not being received

**Solution**:
1. **Check ngrok is running**: `ngrok http 3000`
2. **Verify webhook URL** in [sandbox.polar.sh](https://sandbox.polar.sh):
   - Settings → Webhooks
   - URL should be: `https://your-ngrok-url.ngrok-free.app/api/webhook/polar`
3. **Check webhook logs** in Polar dashboard:
   - Settings → Webhooks → Click on your webhook
   - View recent deliveries

### Issue: Subscription not showing as active

**Solution**:
1. **Check webhook was delivered**:
   - Go to Polar dashboard → Webhooks
   - Look for `subscription.created` event
   - Check if it was successful (200 status)

2. **Check server logs** for errors:
   ```bash
   # In your terminal where dev server is running
   # Look for webhook processing logs
   ```

3. **Manually check Supabase**:
   - Supabase Dashboard → Table Editor → `subscriptions`
   - Look for your user's subscription
   - Status should be `active`

### Issue: Ultra HD still shows "Pro Only"

**Solution**:
1. **Check subscription status in database**:
   - Should be `active` and `plan_type` should be `monthly` or `yearly`

2. **Refresh the editor page** to reload subscription status

3. **Check browser console** for errors:
   - Press F12 → Console tab
   - Look for subscription check errors

---

## 📊 What to Check During Testing

### In Your Browser Console
```
✅ "🔧 Polar SDK initialized in SANDBOX mode"
✅ No JavaScript errors
✅ Subscription status loaded successfully
```

### In Polar Dashboard (sandbox.polar.sh)
```
✅ Webhook delivery successful (200 status)
✅ Subscription shows as "Active"
✅ Customer created
```

### In Supabase Dashboard
```
✅ Subscription record exists for your user
✅ Status is "active"
✅ Plan type is "monthly" or "yearly"
✅ Payment ID is populated
```

### In Your App
```
✅ Redirect to payment/success works
✅ Ultra HD shows "Recommended" badge
✅ Ultra HD download works
✅ Download file is higher quality/larger size
```

---

## 🎯 Test Scenarios to Try

### Basic Flow
- [x] Monthly plan checkout
- [x] Yearly plan checkout
- [x] Payment success redirect
- [x] Webhook processing
- [x] Ultra HD access

### Edge Cases
- [ ] Cancel payment (click back button) → Should redirect to `/payment/cancel`
- [ ] Multiple subscriptions (try upgrading twice) → Should update existing
- [ ] Logged out user → Should be redirected to login first

### Different Cards (Sandbox Test Cards)

All these work in sandbox:

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Success ✅ |
| `4000 0000 0000 9995` | Declined - Insufficient funds ❌ |
| `4000 0000 0000 0002` | Declined - Generic decline ❌ |

Test with declined cards to ensure error handling works!

---

## 🚀 When Ready for Production

Once everything works in sandbox:

### Step 1: Get Production Credentials

1. Go to [polar.sh](https://polar.sh) (NOT sandbox)
2. Create the same products (Monthly $2, Yearly $12)
3. Get production credentials:
   - Access Token
   - Organization ID
   - Product IDs
   - Webhook Secret

### Step 2: Update .env.local

```env
# Switch to production mode
POLAR_SANDBOX_MODE=false

# Use production credentials
POLAR_ACCESS_TOKEN=polar_at_prod_xxxxx
POLAR_ORG_ID=prod_org_id
POLAR_PRODUCT_ID_MONTHLY=prod_monthly_id
POLAR_PRODUCT_ID_YEARLY=prod_yearly_id
POLAR_WEBHOOK_SECRET=whsec_prod_xxxxx

# Use production URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Step 3: Update Production Webhook

In production Polar dashboard:
- Settings → Webhooks
- URL: `https://yourdomain.com/api/webhook/polar`

### Step 4: Test Once More

Before going fully live, do ONE real test payment (minimum amount) to verify everything works with real money.

---

## 📝 Quick Start Summary

**Right now, you're ready to test!**

```bash
# 1. Start ngrok (if testing webhooks)
ngrok http 3000

# 2. Update Polar webhook with ngrok URL
# Go to sandbox.polar.sh → Settings → Webhooks

# 3. Start your app
npm run dev

# 4. Test payment flow
# Visit http://localhost:3000 → Click "Upgrade to Pro"
# Use card: 4242 4242 4242 4242

# 5. Verify everything works!
```

---

## ✨ You're All Set!

Your sandbox is configured and ready to test. No real money will be charged! 🎉

**Test card**: `4242 4242 4242 4242`
**Sandbox URL**: `sandbox.polar.sh`
**Your mode**: SANDBOX ✅

Have fun testing! 🚀
