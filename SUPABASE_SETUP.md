# Supabase Authentication Setup Guide

This guide will help you configure Supabase authentication for your landing page.

## Prerequisites

You already have:
- ✅ Supabase account created
- ✅ Database tables created (profiles, subscriptions)
- ✅ Row Level Security (RLS) policies configured
- ✅ Trigger for auto-creating profiles on signup

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase dashboard: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on the **Settings** icon (⚙️) in the left sidebar
4. Click on **API** in the settings menu

You'll need two values:

### Project URL
- Look for **Project URL** section
- Copy the URL (it looks like: `https://xxxxxxxxxxxxx.supabase.co`)

### API Keys
- Look for **Project API keys** section
- Copy the **anon public** key (this is safe to use in the browser)

## Step 2: Create Your Environment File

1. In the root of your project (`/Users/thebosspc/Coding/startup/web/launch-boiler/`), create a file named `.env.local`

2. Add the following content (replace with your actual values):

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Example:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTIxMDQyMiwiZXhwIjoxOTMwNzg2NDIyfQ.example-signature-here
```

3. Save the file

## Step 3: Configure Email Authentication in Supabase

### Enable Email Provider
1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email settings:
   - **Enable email confirmations**: Toggle ON (recommended for production)
   - **Confirm email**: Toggle ON
   - **Secure email change**: Toggle ON

### Configure Site URL (Important!)
1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your development URL: `http://localhost:3000`
3. Add **Redirect URLs**:
   - Development: `http://localhost:3000/auth/callback`
   - Production (add when deploying): `https://yourdomain.com/auth/callback`

### Email Templates (Optional but Recommended)
1. Go to **Authentication** → **Email Templates**
2. Customize the confirmation email template if desired
3. The default template works fine for testing

## Step 4: (Optional) Enable Google OAuth

If you want to enable Google sign-in:

1. Create a Google Cloud Project:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API

2. Create OAuth 2.0 Credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - Choose **Web application**
   - Add authorized redirect URIs:
     - `https://your-project-id.supabase.co/auth/v1/callback`
   - Save the **Client ID** and **Client Secret**

3. Configure in Supabase:
   - Go to **Authentication** → **Providers**
   - Enable **Google**
   - Enter your Client ID and Client Secret
   - Save

## Step 5: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit [http://localhost:3000](http://localhost:3000)

3. Click on "Start 14-Day Free Trial" or "Sign In" button

4. Test signup:
   - Enter your email and password
   - Fill in your full name
   - Click "Create Account"
   - Check your email for confirmation link
   - Click the confirmation link
   - You should be redirected back to the site and automatically signed in

5. Test sign in:
   - After confirming your email, sign out
   - Click "Sign In"
   - Enter your credentials
   - You should be signed in successfully

## What's Been Implemented

### Components Created:
- ✅ **SignupModal** (`src/components/auth/SignupModal.tsx`)
  - Email/password signup
  - Email/password sign in
  - Google OAuth integration
  - Form validation
  - Loading states
  - Success/error messages

- ✅ **AuthContext** (`src/contexts/AuthContext.tsx`)
  - User state management
  - Session management
  - Sign out functionality
  - Real-time auth state updates

### Integration Points:
- ✅ **HeroSection** - "Start Free Trial" button opens signup modal
- ✅ **Navbar** - Sign in/out buttons with user email display
- ✅ **Auth callback route** - Handles email verification redirects

### Supabase Configuration:
- ✅ Client-side Supabase client (`src/lib/supabase/client.ts`)
- ✅ Server-side Supabase client (`src/lib/supabase/server.ts`)
- ✅ Middleware for session management (`src/lib/supabase/middleware.ts`)
- ✅ Next.js middleware integration (`src/middleware.ts`)

### Database Features:
When a user signs up, the trigger automatically:
- ✅ Creates a profile record with email and full name
- ✅ Creates a subscription record with 'free' plan
- ✅ Both actions happen automatically in a single transaction

## Troubleshooting

### "Invalid API Key" Error
- Double-check that you copied the correct **anon public** key (not the service_role key)
- Make sure there are no extra spaces in your `.env.local` file
- Restart your development server after creating `.env.local`

### Email Not Arriving
- Check your spam folder
- Verify email provider is enabled in Supabase
- Check Supabase logs: **Authentication** → **Logs**

### "Email not confirmed" Error
- User needs to click the confirmation link in their email
- For development, you can disable email confirmation in Supabase settings
- Check the email link is using the correct redirect URL

### Session Not Persisting
- Make sure middleware is properly configured
- Check browser console for errors
- Verify cookies are not blocked

## Security Notes

- ✅ `.env.local` is already in `.gitignore` - never commit this file
- ✅ Only use `NEXT_PUBLIC_*` variables for client-side code
- ✅ Row Level Security (RLS) is enabled on your tables
- ✅ Users can only access their own data (enforced by RLS policies)

## Next Steps

After authentication is working, you might want to:

1. **Create a dashboard page** for logged-in users
2. **Add password reset functionality**
3. **Implement subscription upgrade flow** (integrate with Razorpay/Stripe)
4. **Add user profile editing**
5. **Create protected routes** that require authentication

## Support

If you encounter any issues:
- Check Supabase documentation: [https://supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth)
- View Supabase logs in your dashboard
- Check browser console for errors
- Review Next.js and Supabase SSR documentation

---

**Need help?** Check the implementation files:
- Signup Modal: [src/components/auth/SignupModal.tsx](src/components/auth/SignupModal.tsx)
- Auth Context: [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx)
- Supabase Client: [src/lib/supabase/client.ts](src/lib/supabase/client.ts)
