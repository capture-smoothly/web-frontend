-- Fix for Polar Webhook to Update Subscriptions
-- Run this in Supabase SQL Editor

-- 1. Add RLS policy to allow service role to UPDATE subscriptions
-- This is needed because webhooks run with service role privileges
CREATE POLICY "Service role can update subscriptions"
  ON public.subscriptions FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 2. Also add policy to allow service role to INSERT subscriptions
-- (In case webhook creates subscription before checkout API)
CREATE POLICY "Service role can insert subscriptions"
  ON public.subscriptions FOR INSERT
  WITH CHECK (true);

-- 3. Verify the policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'subscriptions';
