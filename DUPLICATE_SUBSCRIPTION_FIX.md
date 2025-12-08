# 🔧 Duplicate Subscription Fix

## The Problem

Users have **multiple active subscriptions** because:

1. When users sign up → Free subscription created automatically
2. When users upgrade to Pro → **New** subscription created (not updating the old one)
3. Result: 2 active subscriptions (Free + Pro)

This causes confusion and could break the Pro feature detection.

---

## ✅ The Fix (3 Steps)

### **Step 1: Clean Up Existing Duplicates**

**Go to Supabase** → **SQL Editor** → **New Query**

Run this to keep only the most recent active subscription per user:

```sql
-- Deactivate old subscriptions, keep only the most recent
WITH latest_subscriptions AS (
  SELECT DISTINCT ON (user_id)
    id,
    user_id
  FROM public.subscriptions
  WHERE status = 'active'
  ORDER BY user_id, created_at DESC
)
UPDATE public.subscriptions
SET status = 'cancelled'
WHERE status = 'active'
  AND id NOT IN (SELECT id FROM latest_subscriptions);

-- Verify each user has only ONE active subscription
SELECT
  user_id,
  plan_type,
  status,
  created_at
FROM public.subscriptions
WHERE status = 'active'
ORDER BY user_id, created_at DESC;
```

After running this, each user will have **only 1 active subscription** (the most recent one).

---

### **Step 2: Restart Your Dev Server**

The code has been updated to prevent future duplicates:

```bash
# Stop server (Ctrl+C)
npm run dev
```

---

### **Step 3: Test New Upgrade**

Test that future upgrades work correctly:

1. Create a new test user
2. Sign up (gets free subscription automatically)
3. Upgrade to Pro
4. Check Supabase:
   - **Free subscription**: status = "cancelled" ✅
   - **Pro subscription**: status = "active" ✅
   - Only **1 active** subscription total ✅

---

## 📋 What Was Changed

### Code Changes:

1. **`src/app/api/checkout/route.ts`**:
   - Now **deactivates** old subscriptions before creating new ones
   - Prevents multiple active subscriptions

2. **`src/lib/subscription.ts`**:
   - Updated `hasProSubscription()` to get **most recent** active subscription
   - Handles edge case if duplicates still exist

### SQL Script Created:

- **`cleanup_duplicate_subscriptions.sql`** - Detailed cleanup script

---

## 🎯 Expected Behavior After Fix

### On Signup:
- ✅ User gets 1 active **free** subscription

### On First Upgrade:
- ✅ Free subscription → status = "cancelled"
- ✅ Pro subscription → status = "active"
- ✅ Total active subscriptions: **1**

### On Plan Change (e.g., Monthly → Yearly):
- ✅ Old plan → status = "cancelled"
- ✅ New plan → status = "active"
- ✅ Total active subscriptions: **1**

---

## 🔍 How to Verify

After running the SQL cleanup:

```sql
-- Check how many active subscriptions each user has
SELECT
  user_id,
  COUNT(*) as active_count
FROM public.subscriptions
WHERE status = 'active'
GROUP BY user_id;
```

**Expected result**: Every user should have **exactly 1** active subscription.

---

## 📊 Current State vs Fixed State

### Before Fix:
```
User: admin@mysite.com
├── Subscription 1: plan=free, status=active ❌
└── Subscription 2: plan=monthly, status=active ❌
    (2 active subscriptions - WRONG!)
```

### After Fix:
```
User: admin@mysite.com
├── Subscription 1: plan=free, status=cancelled ✅
└── Subscription 2: plan=monthly, status=active ✅
    (1 active subscription - CORRECT!)
```

---

## ✅ Summary

**What you need to do:**
1. Run the SQL cleanup script (Step 1)
2. Restart dev server (Step 2)
3. Test with a new upgrade (Step 3)

**Result:**
- ✅ No more duplicate subscriptions
- ✅ Each user has exactly 1 active subscription
- ✅ Old subscriptions properly cancelled
- ✅ Future upgrades work correctly

This fix ensures your subscription system works correctly at scale! 🚀
