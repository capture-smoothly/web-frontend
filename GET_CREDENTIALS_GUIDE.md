# How to Get Your Supabase Credentials (Step-by-Step with Screenshots)

## Step 1: Log into Supabase

1. Go to: **https://supabase.com/dashboard**
2. Sign in with your account

## Step 2: Select Your Project

1. You'll see a list of your projects
2. Click on the project where you created the tables

## Step 3: Navigate to Settings

1. Look at the left sidebar
2. Click on the **⚙️ Settings** icon (usually at the bottom)

## Step 4: Go to API Settings

1. In the Settings menu, click on **API**
2. You'll see a page titled "API Settings"

## Step 5: Copy Your Credentials

You'll see several sections on this page. You need TWO values:

### A. Project URL

**Look for the section labeled: "Project URL" or "Config"**

You'll see something like:
```
Project URL
https://abcdefghijklmnop.supabase.co
```

- Click the **copy** icon next to the URL
- This is your `NEXT_PUBLIC_SUPABASE_URL`

### B. API Key (anon/public)

**Look for the section labeled: "Project API keys"**

You'll see multiple keys. Look for:
```
anon public
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... [long string]
```

**IMPORTANT:**
- ✅ Copy the **anon** or **public** key
- ❌ DO NOT copy the **service_role** key (that's only for server-side)

- Click the **copy** icon next to the anon key
- This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 6: Create Your .env.local File

1. Open your code editor
2. In the ROOT of your project (same level as `package.json`), create a new file
3. Name it exactly: `.env.local` (note the dot at the beginning)
4. Paste this template and replace with your values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTIxMDQyMiwiZXhwIjoxOTMwNzg2NDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Replace:**
- `https://abcdefghijklmnop.supabase.co` with YOUR Project URL
- `eyJhbGci...` with YOUR anon key

5. Save the file

## Step 7: Configure Redirect URLs (IMPORTANT!)

Still in Supabase Dashboard:

1. Click on **Authentication** in the left sidebar
2. Click on **URL Configuration**
3. You'll see fields for:

### Site URL
Set this to: `http://localhost:3000`

### Redirect URLs
Click "Add URL" and add: `http://localhost:3000/auth/callback`

**Note:** When you deploy to production, come back here and add your production URLs too.

4. Click **Save** at the bottom

## Step 8: Verify Everything

### File Location
Make sure `.env.local` is in the correct location:

```
launch-boiler/           <-- Root directory
├── .env.local          <-- Your file should be HERE
├── package.json
├── src/
├── public/
└── ...
```

### File Contents
Your `.env.local` should look like this (with YOUR values):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-very-long-anon-key-here
```

**Check:**
- ✅ No extra spaces
- ✅ No quotes around the values
- ✅ Correct variable names (with `NEXT_PUBLIC_` prefix)
- ✅ File saved

## Step 9: Restart Your Dev Server

1. Stop your dev server if it's running (Ctrl+C or Cmd+C)
2. Start it again:
   ```bash
   npm run dev
   ```
3. Visit: http://localhost:3000

## Step 10: Test Signup

1. Click "Start 14-Day Free Trial" button
2. Fill out the form:
   - Full Name
   - Email
   - Password
3. Click "Create Account"
4. You should see: "Success! Check your email to verify your account"
5. Check your email
6. Click the verification link
7. You'll be redirected back to the site
8. The navbar should now show your email and a "Sign Out" button

## Common Mistakes to Avoid

❌ **Wrong file location** - Make sure `.env.local` is in the root, not in `src/`
❌ **Wrong key** - Use the **anon** key, not service_role
❌ **Quotes around values** - Don't add quotes: `NEXT_PUBLIC_SUPABASE_URL="https://..."` ❌
❌ **Spaces** - No spaces around the `=` sign
❌ **Forgot to restart** - Always restart dev server after creating `.env.local`
❌ **Typo in variable names** - Must be exactly `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Visual Checklist

Go to Supabase Dashboard:

```
Dashboard Home
  ↓
Select Your Project
  ↓
Click ⚙️ Settings (bottom of sidebar)
  ↓
Click "API"
  ↓
Copy "Project URL" → NEXT_PUBLIC_SUPABASE_URL
  ↓
Copy "anon public" key → NEXT_PUBLIC_SUPABASE_ANON_KEY
  ↓
Create .env.local in project root
  ↓
Paste values (no quotes, no spaces)
  ↓
Go to Authentication → URL Configuration
  ↓
Set Site URL: http://localhost:3000
  ↓
Add Redirect URL: http://localhost:3000/auth/callback
  ↓
Save
  ↓
Restart dev server
  ↓
Test signup!
```

## Still Having Issues?

### Can't Find API Settings?
- Make sure you're logged into the correct Supabase account
- Make sure you've selected the correct project
- Try refreshing the Supabase dashboard

### Keys Not Working?
- Double-check you copied the entire key (they're very long)
- Make sure you're using the **anon** key, not service_role
- Verify there are no extra spaces or line breaks
- Try copying the key again

### Email Not Arriving?
- Check your spam folder
- Make sure email provider is enabled: Authentication → Providers → Email (should be toggled ON)
- Check Supabase logs: Authentication → Logs

### Build Errors?
- Make sure `.env.local` is saved
- Restart your terminal/dev server
- Run `npm run build` to verify

## Need More Help?

Check these files:
- **Quick Reference**: `ENV_SETUP_QUICK_REFERENCE.md`
- **Detailed Setup**: `SUPABASE_SETUP.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`

Or check Supabase documentation:
- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/guides/auth/server-side/nextjs

---

**You got this!** Follow these steps carefully and you'll have authentication working in no time.
