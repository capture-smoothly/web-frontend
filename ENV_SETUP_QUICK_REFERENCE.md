# Quick Reference: Environment Variables Setup

## What You Need to Do RIGHT NOW

### 1. Create `.env.local` file
Create this file in the root directory: `/Users/thebosspc/Coding/startup/web/launch-boiler/.env.local`

### 2. Add These Two Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Where to Find These Values

### Step-by-Step:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Login to your account

2. **Select Your Project**
   - Click on the project you created

3. **Go to Settings**
   - Click the ⚙️ Settings icon in the left sidebar

4. **Click on "API"**
   - You'll see two sections you need:

#### A. Project URL
- Section: **Project URL**
- Copy the URL that looks like: `https://xxxxxxxxxxxxx.supabase.co`
- Paste as `NEXT_PUBLIC_SUPABASE_URL` value

#### B. API Key (anon/public)
- Section: **Project API keys**
- Look for the key labeled: **anon** or **public**
- Click the copy icon
- Paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY` value

## Example .env.local File

```bash
# Copy this template and replace with your actual values

NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTIxMDQyMiwiZXhwIjoxOTMwNzg2NDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Additional Supabase Configuration

### Configure Redirect URLs (Important!)

1. In Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add these redirect URLs:
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**:
     - `http://localhost:3000/auth/callback`
     - (Add your production URL later)

## That's It!

After creating `.env.local`:
1. Restart your dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Start Free Trial" to test signup

---

**Need more details?** See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for complete documentation.
