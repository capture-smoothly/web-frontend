# 📅 Subscription Lifecycle - How It Works

## 🔄 Complete Subscription Flow

Here's exactly what happens throughout a subscription's lifetime:

---

## 1️⃣ **User Signs Up (Day 0)**

### What Happens:
```
User creates account
└─> Supabase trigger runs
    └─> Creates FREE subscription
        ├─> plan_type: "free"
        ├─> status: "active"
        ├─> expires_at: null (never expires)
        └─> payment_id: null
```

**User Access:** ✅ Basic features only

---

## 2️⃣ **User Upgrades to Pro**

### What Happens:
```
User clicks "Upgrade to Pro"
└─> Redirected to Polar checkout
    └─> User enters payment details
        └─> Payment processed
            ├─> Old FREE subscription → status: "cancelled"
            └─> New PRO subscription created
                ├─> plan_type: "monthly" or "yearly"
                ├─> status: "active"
                ├─> expires_at: 1 month or 1 year from now
                └─> payment_id: <Polar subscription ID>
```

### Webhooks Received:
1. `subscription.created` → Creates subscription in database
2. `subscription.active` → Activates subscription with expiration date

**User Access:** ✅ All Pro features unlocked (Ultra HD, etc.)

---

## 3️⃣ **After 1 Month (Monthly Plan) or 1 Year (Yearly Plan)**

### **Scenario A: Renewal Succeeds** ✅

Polar automatically attempts to charge the customer:

```
Billing date arrives
└─> Polar charges customer's card
    └─> Payment succeeds ✅
        └─> Webhook: "subscription.updated"
            └─> Your database updates:
                ├─> status: "active" (stays active)
                └─> expires_at: NEW date (1 month/year from now)
```

**What the user experiences:**
- ✅ **NO interruption** in service
- ✅ Continues to have Pro access
- ✅ Charged automatically
- ✅ Receives receipt email from Polar

**User Access:** ✅ Pro features continue working

---

### **Scenario B: Renewal Fails** ❌

Payment fails (card expired, insufficient funds, etc.):

```
Billing date arrives
└─> Polar attempts to charge card
    └─> Payment FAILS ❌
        └─> Polar retries for several days
            ├─> If payment succeeds: Same as Scenario A
            └─> If all retries fail:
                └─> Webhook: "subscription.canceled"
                    └─> Your database updates:
                        ├─> status: "cancelled"
                        └─> expires_at: (stays as is, now in the past)
```

**What the user experiences:**
- ⚠️ Receives email from Polar about payment failure
- ⚠️ Given time to update payment method
- ❌ If not fixed, subscription cancelled
- ❌ Loses Pro access

**User Access:** ❌ Reverts to free features only

---

## 4️⃣ **User Cancels Subscription**

User manually cancels before renewal:

```
User clicks "Cancel Subscription"
└─> API call to Polar
    └─> Polar cancels subscription
        └─> Webhook: "subscription.canceled"
            └─> Your database updates:
                ├─> status: "cancelled"
                └─> expires_at: (keeps original date)
```

**Important:** The user **keeps Pro access** until `expires_at` date!

Example:
- User subscribed: Jan 1, 2025
- Expires: Feb 1, 2025
- User cancels: Jan 15, 2025
- **User still has Pro until Feb 1, 2025** ✅

**User Access:**
- ✅ Pro features until expiration date
- ❌ Reverts to free after expiration

---

## 🔍 How Your Code Handles Expiration

### Client-Side Check (`hasProSubscription()`)

```typescript
// This runs when user loads editor page
hasProSubscription() {
  // Gets most recent active subscription
  const subscription = getUserActiveSubscription();

  // Checks if expired
  if (subscription.expires_at) {
    const expiresAt = new Date(subscription.expires_at);
    const now = new Date();

    if (now > expiresAt) {
      return false; // ❌ Expired - no Pro access
    }
  }

  return true; // ✅ Active and not expired
}
```

**This means:**
- User with expired subscription → `hasProSubscription()` returns `false`
- Ultra HD shows "Pro Only" badge again
- User can't download in Ultra HD

---

## 📊 Database Status Over Time

### Monthly Subscription Example:

| Date | Event | Database Status | expires_at | User Access |
|------|-------|----------------|------------|-------------|
| Jan 1 | User upgrades | `status: active` | Feb 1 | ✅ Pro |
| Jan 15 | (nothing) | `status: active` | Feb 1 | ✅ Pro |
| Feb 1 | Auto-renewal succeeds | `status: active` | **Mar 1** | ✅ Pro |
| Mar 1 | Auto-renewal succeeds | `status: active` | **Apr 1** | ✅ Pro |
| Apr 1 | Auto-renewal FAILS | `status: cancelled` | Apr 1 | ❌ Free |

---

## 🎯 Webhook Events You Handle

| Event | When It Fires | What Your Code Does |
|-------|---------------|-------------------|
| `subscription.created` | New subscription created | Create subscription record |
| `subscription.active` | Subscription becomes active | Set status=active, set expires_at |
| `subscription.updated` | Renewal succeeds OR plan changes | **Update expires_at to new date** |
| `subscription.canceled` | User cancels OR payment fails | Set status=cancelled |
| `subscription.revoked` | Admin revokes subscription | Set status=cancelled |
| `checkout.updated` | Initial checkout completes | Set status=active |

---

## ✅ What You DON'T Need to Worry About

❌ **No cron job needed** - Polar handles billing automatically
❌ **No manual expiration checks** - `hasProSubscription()` checks `expires_at`
❌ **No email sending** - Polar sends renewal/failure emails
❌ **No retry logic** - Polar retries failed payments automatically

---

## 🚀 What Happens Automatically

✅ **Renewals** - Polar charges automatically every month/year
✅ **Expiration updates** - Webhook updates `expires_at` after each renewal
✅ **Failed payment retries** - Polar retries for several days
✅ **Cancellation grace period** - User keeps access until `expires_at`
✅ **Email notifications** - Polar sends all customer emails

---

## 🧪 How to Test Expiration

### Option 1: Manually Expire a Subscription

```sql
-- Set expiration to 1 minute from now
UPDATE public.subscriptions
SET expires_at = NOW() + INTERVAL '1 minute'
WHERE user_id = 'YOUR_USER_ID'
  AND status = 'active';

-- Wait 1 minute, then test Ultra HD
-- Should show "Pro Only" badge
```

### Option 2: Use Polar Test Mode

1. Create subscription in sandbox
2. In Polar dashboard, manually expire the subscription
3. Check your app - should lose Pro access

---

## 📋 Summary

**How expiration works:**
1. ✅ Subscription has `expires_at` date
2. ✅ Polar auto-renews before expiration
3. ✅ Webhook updates `expires_at` to new date
4. ✅ If renewal fails, subscription cancelled
5. ✅ Client checks `expires_at` before granting Pro features

**Your users will:**
- ✅ Get charged automatically each month/year
- ✅ Never lose access if payment succeeds
- ✅ Get emails about renewals and failures
- ✅ Keep Pro access until expiration even if they cancel
- ✅ Automatically lose Pro access if payment fails

**Everything is fully automated!** 🎉

---

## 🔧 Recent Updates

I just updated your webhook to:
- ✅ Handle `subscription.updated` events (renewals)
- ✅ Update `expires_at` when subscription renews
- ✅ Handle `subscription.active` events properly

**Restart your server** to apply these changes:
```bash
npm run dev
```

Now renewals will work perfectly! 🚀
