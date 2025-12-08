# 🔧 Webhook Fix Guide - Activate Your Subscription

## What Happened?

When you completed the test payment:
1. ✅ Payment was processed by Polar
2. ✅ Subscription created in your database with `status="pending"`
3. ❌ **Webhook never received** because you're testing locally without ngrok
4. ❌ Subscription never updated to `status="active"`

## Quick Fix - 3 Steps

### Step 1: Fix Database Permissions (REQUIRED)

The webhook needs permission to update subscriptions. Run this SQL in Supabase:

**Go to**: Supabase Dashboard → SQL Editor → New Query

```sql
-- Allow webhook to update subscriptions
CREATE POLICY "Service role can update subscriptions"
  ON public.subscriptions FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Verify it worked
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'subscriptions';
```

You should see the new policy listed.

---

### Step 2: Manually Activate Your Current Subscription

Since the webhook didn't run, manually activate your subscription:

**Go to**: Supabase Dashboard → SQL Editor → New Query

```sql
-- Activate the pending subscription
UPDATE public.subscriptions
SET
  status = 'active',
  expires_at = NOW() + INTERVAL '1 year'
WHERE
  user_id = '3fe9b589-612b-4edc-8a33-d478572eb05d'
  AND status = 'pending'
  AND plan_type = 'yearly';

-- Verify it worked
SELECT
  plan_type,
  status,
  expires_at,
  created_at
FROM public.subscriptions
WHERE user_id = '3fe9b589-612b-4edc-8a33-d478572eb05d'
ORDER BY created_at DESC;
```

You should see:
- `status`: "active" ✅
- `expires_at`: A date 1 year from now ✅

---

### Step 3: Test Ultra HD Download

Now test if Pro features work:

1. **Go to editor**: http://localhost:3000/editor
2. **Upload an image**
3. **Click download** → Select "Ultra HD Quality"
4. **Badge should show**: "Recommended" (not "Pro Only") ✅
5. **Download should work** in Ultra HD quality ✅

---

## For Future Payments - Set Up Webhooks Properly

To test future payments with webhooks working:

### Option A: Use ngrok (Recommended for Local Testing)

```bash
# Terminal 1: Start ngrok
ngrok http 3000

# You'll see output like:
# Forwarding  https://abc123.ngrok-free.app -> http://localhost:3000
# Copy the HTTPS URL
```

Then:
1. Go to [sandbox.polar.sh](https://sandbox.polar.sh)
2. **Settings** → **Webhooks**
3. Edit or create webhook
4. **URL**: `https://your-ngrok-url.ngrok-free.app/api/webhook/polar`
5. **Secret**: Should match your `.env.local` (already configured)
6. **Events**: Make sure these are selected:
   - `checkout.created`
   - `checkout.updated`
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`
7. **Save**

```bash
# Terminal 2: Start your app
npm run dev
```

Now test a new payment - webhook should work! 🎉

---

### Option B: Deploy to Production

Webhooks will work automatically once deployed:

1. Deploy your app (Vercel, etc.)
2. Update webhook URL in Polar to: `https://yourdomain.com/api/webhook/polar`
3. Webhooks will work without ngrok!

---

## How to Verify Webhooks Are Working

### During Testing (with ngrok):

1. **In your terminal** (where `npm run dev` is running):
   ```
   🔔 Polar webhook received: subscription.created
   ✅ Subscription created: { subscriptionId: '...', checkoutId: '...' }
   ✅ Subscription linked to payment
   ```

2. **In Polar Dashboard**:
   - Go to **Settings** → **Webhooks** → Click your webhook
   - **Recent Deliveries** should show:
     - Status: `200` ✅
     - Response: Success

3. **In Supabase**:
   - Check `subscriptions` table
   - Status should change from `pending` → `active` automatically

---

## Troubleshooting

### Webhook Still Not Received?

**Check ngrok is running:**
```bash
# Should show forwarding URL
ngrok http 3000
```

**Check webhook URL in Polar:**
- Must use HTTPS ngrok URL
- Must end with `/api/webhook/polar`
- Format: `https://abc123.ngrok-free.app/api/webhook/polar`

**Check webhook secret matches:**
```bash
# In .env.local
cat .env.local | grep POLAR_WEBHOOK_SECRET
```
Should match the secret in Polar dashboard.

---

### Subscription Still Pending After Manual Fix?

**Run this to check:**
```sql
SELECT * FROM public.subscriptions
WHERE user_id = '3fe9b589-612b-4edc-8a33-d478572eb05d'
ORDER BY created_at DESC;
```

If still pending, the UPDATE query didn't run or failed. Check:
- Did you run Step 1 (database permissions)?
- Did you refresh after running the UPDATE?

---

### Ultra HD Still Shows "Pro Only"?

**Refresh the editor page** - subscription status is checked on page load.

If still not working:
```sql
-- Double-check subscription is active
SELECT status, plan_type, expires_at
FROM public.subscriptions
WHERE user_id = '3fe9b589-612b-4edc-8a33-d478572eb05d'
AND status = 'active';
```

Should return a row with:
- status: "active"
- plan_type: "yearly" or "monthly"
- expires_at: A future date

---

## Summary

**Immediate Fix (Do Now):**
1. ✅ Run SQL to add database permissions
2. ✅ Run SQL to manually activate subscription
3. ✅ Test Ultra HD feature in editor

**For Future Testing:**
1. Set up ngrok
2. Update Polar webhook URL
3. Test new payment
4. Webhook should work automatically ✅

**For Production:**
1. Deploy app
2. Update webhook URL to production domain
3. Webhooks work automatically ✅

---

## Files Created for You

I've created these SQL files in your project:

1. **`supabase_webhook_fix.sql`** - Database permission fix
2. **`manual_activate_subscription.sql`** - Manually activate subscription

Run these in Supabase SQL Editor!

---

## ✅ Quick Check

After running the fixes:

- [ ] Database policy added (Step 1)
- [ ] Subscription status = "active" (Step 2)
- [ ] Ultra HD shows "Recommended" badge (Step 3)
- [ ] Ultra HD download works (Step 3)

All checked? **You're good to go!** 🎉

For future payments, set up ngrok so webhooks work automatically.
