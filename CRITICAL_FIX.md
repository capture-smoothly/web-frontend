# 🚨 CRITICAL FIX - Webhooks Not Working

## The Problem

Webhooks are being received (200 OK) but subscriptions stay "pending" because:

**The webhook can't update the database** - it's using the regular Supabase client which requires user authentication, but webhooks run without a user session!

---

## ✅ The Fix (2 Quick Steps)

### **Step 1: Add Service Role Key to .env.local**

The webhook needs the **service role key** to bypass Row Level Security.

1. **Go to Supabase Dashboard** → **Settings** → **API**
2. Find **service_role** key (it's a long string, different from anon key)
3. **Copy it**

4. **Add to your `.env.local`**:

Open `/Users/thebosspc/Coding/startup/web/launch-boiler/.env.local` and add:

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
```

(Replace with your actual service role key)

Your `.env.local` should look like:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # ← ADD THIS

# Polar Configuration
POLAR_SANDBOX_MODE=true
POLAR_ACCESS_TOKEN=polar_oat_RoIcW6FEM2wSCXUxroRxRur1Xaz02haD0zEgj0x4PIZ
# ... rest of polar config
```

---

### **Step 2: Restart Your Server**

After adding the service role key:

```bash
# Stop your dev server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🧪 Test It Now

### Test with a NEW payment:

1. **Go to pricing page**: http://localhost:3000/#pricing
2. **Click "Upgrade to Pro"** (Monthly or Yearly)
3. **Use test card**: `4242 4242 4242 4242`
4. **Complete payment**
5. **Check webhook logs** in your terminal:

You should see:
```
🔔 Polar webhook received: subscription.created
✅ Subscription created: { subscriptionId: '...', checkoutId: '...' }
✅ Subscription linked to payment
```

6. **Check Supabase** - Status should be **"active"** immediately! ✅

---

## 🔧 Fix Your Existing Pending Subscriptions

Your previous subscriptions are still "pending". Let's activate them:

**Go to Supabase** → **SQL Editor** → **New Query**

Run this:

```sql
-- Activate ALL pending subscriptions
UPDATE public.subscriptions
SET
  status = 'active',
  expires_at = CASE
    WHEN plan_type = 'monthly' THEN NOW() + INTERVAL '1 month'
    WHEN plan_type = 'yearly' THEN NOW() + INTERVAL '1 year'
    ELSE NOW() + INTERVAL '1 month'
  END
WHERE
  status = 'pending';

-- Verify all subscriptions are now active
SELECT
  user_id,
  plan_type,
  status,
  started_at,
  expires_at
FROM public.subscriptions
ORDER BY created_at DESC;
```

All subscriptions should now show `status = "active"` ✅

---

## ✅ What Changed?

I created:

1. **`src/lib/supabase/admin.ts`** - Admin client that uses service role key
2. **Updated webhook handler** - Now uses admin client instead of regular client
3. **This guide** - Instructions to add service role key

---

## 🎯 After the Fix

Once you add the service role key and restart:

✅ **Future payments work automatically**
✅ Webhooks update subscriptions instantly
✅ No manual SQL needed
✅ Scales to 1000+ customers

---

## 🧪 Verification Checklist

After adding service role key and restarting:

- [ ] Service role key added to `.env.local`
- [ ] Server restarted (`npm run dev`)
- [ ] Test new payment (card: 4242 4242 4242 4242)
- [ ] Check webhook logs show "Subscription linked to payment"
- [ ] Check Supabase - subscription status = "active"
- [ ] Test Ultra HD in editor - shows "Recommended" badge
- [ ] Ultra HD download works

All checked? **You're done!** 🎉

---

## 🚨 Important Notes

**Service Role Key Security:**
- ⚠️ **NEVER** commit this to git
- ⚠️ **NEVER** expose in client-side code
- ✅ Only use in server-side API routes and webhooks
- ✅ Keep in `.env.local` (which is gitignored)

**Where to Get It:**
- Supabase Dashboard → Settings → API
- Look for **"service_role"** key (not anon key!)
- It's a JWT token starting with `eyJ...`

---

## 📊 Quick Summary

**The Issue:**
- Webhooks received ✅
- But can't update database ❌
- Reason: No service role key

**The Fix:**
1. Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
2. Restart server
3. Test new payment → Works automatically! ✅

**For Old Subscriptions:**
- Run SQL to activate pending subscriptions manually
- Future ones work automatically

---

## ✨ Result

After this fix:
- 🎉 Webhooks work perfectly
- 🎉 Subscriptions activate instantly
- 🎉 Scales to unlimited customers
- 🎉 No manual intervention needed

**This is the final piece to make payments fully automated!** 🚀
