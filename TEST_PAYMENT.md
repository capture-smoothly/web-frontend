# 🚀 Quick Test Guide - Payment Integration

## ✅ You're Already Set Up!

Your configuration is **ready to test**. Everything is configured for **SANDBOX mode** (no real money).

---

## 🎯 Quick Test (5 Minutes)

### Option A: Without Webhooks (Quickest)

If you just want to test the checkout flow:

```bash
# 1. Start your app
npm run dev

# 2. Visit http://localhost:3000

# 3. Click "Upgrade to Pro" on pricing section

# 4. Use test card:
Card: 4242 4242 4242 4242
Expiry: 12/25
CVC: 123
ZIP: 12345

# 5. Complete payment → See success page!
```

**Note**: Without ngrok, webhooks won't work, so subscription won't activate in database. That's okay for basic testing!

---

### Option B: With Webhooks (Full Test)

To test the complete flow including subscription activation:

```bash
# Terminal 1: Start ngrok
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok-free.app)
```

```bash
# Terminal 2: Start your app
npm run dev
```

Then:
1. Go to [sandbox.polar.sh](https://sandbox.polar.sh)
2. Settings → Webhooks → Edit your webhook
3. Update URL to: `https://your-ngrok-url.ngrok-free.app/api/webhook/polar`
4. Save

Now test the payment flow (same as Option A above).

After payment, check:
- Webhook delivered in Polar dashboard ✅
- Subscription active in Supabase ✅
- Ultra HD works in editor ✅

---

## 🧪 What to Test

### 1. Monthly Plan
- [ ] Click "Upgrade to Pro" (Monthly option)
- [ ] Complete payment with test card `4242 4242 4242 4242`
- [ ] Redirected to success page
- [ ] (If webhooks set up) Check Supabase for active subscription

### 2. Yearly Plan
- [ ] Click "Upgrade to Pro" (Yearly option)
- [ ] Complete payment with test card
- [ ] Redirected to success page
- [ ] (If webhooks set up) Check Supabase for active subscription

### 3. Ultra HD Download (Requires Webhook)
- [ ] Go to `/editor`
- [ ] Upload an image
- [ ] Click download → Select "Ultra HD Quality"
- [ ] Should show "Recommended" badge (not "Pro Only")
- [ ] Download should work in Ultra HD

### 4. Cancel Payment
- [ ] Start checkout flow
- [ ] Click browser back button
- [ ] Should redirect to cancel page

---

## 📊 How to Verify Everything Works

### Check 1: Dev Server Console
You should see:
```
🔧 Polar SDK initialized in SANDBOX mode
```

### Check 2: After Payment
- Success page loads with "Payment Successful!" ✅
- Shows "Start Creating" and "Go to Dashboard" buttons

### Check 3: Supabase (If webhooks working)
1. Go to Supabase Dashboard
2. Table Editor → `subscriptions`
3. Find your subscription
4. Should show:
   - `status`: "active"
   - `plan_type`: "monthly" or "yearly"
   - `payment_id`: (Polar subscription ID)

### Check 4: Ultra HD Access (If webhooks working)
1. Editor page → Download button
2. Ultra HD option shows **"Recommended"** badge
3. Can download in Ultra HD quality

---

## 🐛 Common Issues

### "Payment fails"
✅ Make sure you're using sandbox test card: `4242 4242 4242 4242`

### "Redirected to wrong URL"
✅ Check `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in `.env.local`

### "Ultra HD still shows 'Pro Only'"
✅ Webhooks need to be set up with ngrok
✅ Or manually update subscription in Supabase to `status='active'`

### "Webhook not received"
✅ Make sure ngrok is running: `ngrok http 3000`
✅ Update webhook URL in [sandbox.polar.sh](https://sandbox.polar.sh)
✅ URL format: `https://xxxxx.ngrok-free.app/api/webhook/polar`

---

## 🎉 You're Ready to Test!

**Current Configuration:**
- ✅ Sandbox mode enabled (`POLAR_SANDBOX_MODE=true`)
- ✅ Sandbox credentials configured
- ✅ Test card ready: `4242 4242 4242 4242`
- ✅ Success/cancel pages created

**Next Steps:**
```bash
npm run dev
# Visit http://localhost:3000
# Click "Upgrade to Pro"
# Test payment!
```

---

## 📝 Test Card Cheat Sheet

| Card Number | Expiry | CVC | Result |
|-------------|--------|-----|--------|
| `4242 4242 4242 4242` | 12/25 | 123 | ✅ Success |
| `4000 0000 0000 9995` | 12/25 | 123 | ❌ Insufficient funds |
| `4000 0000 0000 0002` | 12/25 | 123 | ❌ Generic decline |

---

## 🚀 When Everything Works

Once testing is successful:
1. Read `POLAR_SETUP.md` for production setup
2. Switch `POLAR_SANDBOX_MODE=false`
3. Add production credentials
4. Deploy!

---

**Need detailed help?** Check `SANDBOX_TESTING_GUIDE.md`
