# Troubleshooting Checklist - Signup & Redirect Issues

## Issue: User Created But Not Redirecting to Dashboard

### Quick Fix Steps

#### Step 1: Disable Email Confirmation in Supabase ⚠️ CRITICAL

**This is the main issue!**

1. Go to https://supabase.com/dashboard
2. Select your project
3. **Authentication** → **Providers**
4. Click **Email**
5. Find **"Confirm email"** toggle
6. **Turn it OFF** ❌
7. Click **Save**

**Verification:**
- The toggle should be gray/disabled
- It should NOT be blue/green/enabled

#### Step 2: Delete Test Users

1. In Supabase Dashboard
2. Go to **Authentication** → **Users**
3. Find any test users you created
4. Click the **trash icon** to delete them
5. This ensures fresh signup

#### Step 3: Test Fresh Signup

1. **Close all browser tabs** for localhost:3000
2. Open a **new incognito/private window**
3. Go to `http://localhost:3000`
4. Click "Start Free Trial"
5. Use a **completely new email** (not one you tested before)
6. Fill out the form
7. Click "Create Account"

**Expected Result:**
- ✅ See: "Account created successfully! Redirecting to dashboard..."
- ✅ After 1.5 seconds: Redirect to `/dashboard`
- ✅ See dashboard with your info
- ✅ NO confirmation email sent

**If you get an error:**
- ❌ "Please disable email confirmation in Supabase Dashboard..."
- This means email confirmation is STILL enabled
- Go back to Step 1 and make sure you actually disabled it

## Common Issues & Solutions

### Issue 1: Confirmation Email Still Being Sent

**Cause:** Email confirmation is still enabled in Supabase

**Solution:**
1. Double-check Supabase Dashboard
2. Authentication → Providers → Email
3. Confirm email toggle must be **OFF**
4. Click Save
5. Wait 1-2 minutes
6. Try again with a new email

### Issue 2: Stays on /auth/login After Signup

**Cause:** Email confirmation is enabled, so no session is created

**Solution:**
1. Same as Issue 1 - disable email confirmation
2. Delete the test user
3. Try signup again

**New Feature:** The app now detects this and shows an error message telling you exactly what to do!

### Issue 3: Redirect Happens But Dashboard Shows Loading Forever

**Cause:** User was created but profile/subscription wasn't created

**Check:**
1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Check `profiles` table - should have 1 row with your user
4. Check `subscriptions` table - should have 1 row with 'free' plan

**If tables are empty:**
- Your trigger might not be working
- Check Supabase **Logs** for errors
- Re-run the SQL setup query

### Issue 4: "User already registered" Error

**Cause:** You already signed up with that email

**Solution:**
1. Either use a different email
2. Or delete the user from Supabase:
   - Authentication → Users
   - Find the user
   - Delete it
3. Try again

## Verification Checklist

Use this to verify everything is set up correctly:

### Supabase Dashboard Settings

- [ ] Email confirmation is **DISABLED** (Authentication → Providers → Email)
- [ ] Site URL is set to `http://localhost:3000`
- [ ] Redirect URLs include `http://localhost:3000/auth/callback`
- [ ] Email sign-ups are **ENABLED**

### Database Tables

- [ ] `profiles` table exists
- [ ] `subscriptions` table exists
- [ ] RLS is enabled on both tables
- [ ] Trigger `on_auth_user_created` exists
- [ ] Function `handle_new_user()` exists

### Local Environment

- [ ] `.env.local` file exists in project root
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] Dev server is running (`npm run dev`)

### Test Process

- [ ] Using incognito/private browser window
- [ ] Using a NEW email address (not used before)
- [ ] All old test users deleted from Supabase
- [ ] Browser cookies cleared for localhost:3000

## How to Verify Email Confirmation is Disabled

### Method 1: Try Signing Up

If you see this error after signup:
> "Please disable email confirmation in Supabase Dashboard..."

Then email confirmation is **still enabled**.

If you see this success message:
> "Account created successfully! Redirecting to dashboard..."

And you're redirected to `/dashboard`, then it's **disabled** ✅

### Method 2: Check Supabase Logs

1. Go to Supabase Dashboard
2. Click **Logs** in sidebar
3. Click **Auth Logs**
4. Sign up with a test account
5. Look for the signup event
6. If it says "email confirmation required" → Still enabled ❌
7. If user is immediately active → Disabled ✅

### Method 3: Check User Status

1. Sign up with a test account
2. Go to Authentication → Users
3. Look at the user you just created
4. If it says "Waiting for email verification" → Still enabled ❌
5. If user is immediately confirmed → Disabled ✅

## Still Not Working?

### Step-by-Step Debug Process

1. **Completely restart everything:**
   ```bash
   # Stop dev server (Ctrl+C)
   npm run dev
   ```

2. **Clear everything:**
   - Close all localhost:3000 tabs
   - Clear browser cookies
   - Open new incognito window

3. **Delete all test users:**
   - Supabase → Authentication → Users
   - Delete ALL users
   - Start fresh

4. **Verify Supabase settings again:**
   - Authentication → Providers → Email
   - Confirm email = **OFF**
   - Save again (even if already off)

5. **Test with brand new email:**
   - Go to http://localhost:3000
   - Click "Start Free Trial"
   - Use email you've NEVER used before
   - Submit form

6. **Check browser console:**
   - Open DevTools (F12)
   - Look for any errors in Console tab
   - Share the error if you see one

## Expected Flow (After Email Confirmation Disabled)

```
1. Visit http://localhost:3000
   ↓
2. Click "Start Free Trial"
   ↓
3. Redirected to /auth/login
   ↓
4. Fill form: Name, Email, Password
   ↓
5. Click "Create Account"
   ↓
6. See: "Account created successfully! Redirecting..."
   ↓
7. Wait 1.5 seconds
   ↓
8. Redirected to /dashboard
   ↓
9. See dashboard with:
   - Welcome message with your name
   - Profile card with your email
   - Subscription card showing "Free" plan
   ↓
10. DONE! ✅
```

## Summary

**The #1 issue is:** Email confirmation is still enabled in Supabase

**The solution:**
1. Supabase Dashboard
2. Authentication → Providers → Email
3. Turn OFF "Confirm email"
4. Save
5. Delete test users
6. Try fresh signup

**Your SQL is fine!** Don't modify it.

**Your code is fine!** I've already updated it.

**Just disable email confirmation in the Supabase Dashboard!**

---

**After you disable it, everything will work perfectly!** 🎉
