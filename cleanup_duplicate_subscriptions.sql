-- Clean Up Duplicate Subscriptions
-- This script will deactivate old subscriptions and keep only the most recent active one per user
-- Run this in Supabase SQL Editor

-- Step 1: Identify duplicate active subscriptions
SELECT
  user_id,
  COUNT(*) as subscription_count,
  STRING_AGG(plan_type, ', ') as plan_types
FROM public.subscriptions
WHERE status = 'active'
GROUP BY user_id
HAVING COUNT(*) > 1;

-- Step 2: Deactivate all old subscriptions, keeping only the most recent active one
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

-- Step 3: Verify - each user should have only ONE active subscription now
SELECT
  user_id,
  plan_type,
  status,
  created_at,
  expires_at
FROM public.subscriptions
WHERE status = 'active'
ORDER BY user_id, created_at DESC;

-- Step 4: Show all subscriptions for verification (including cancelled ones)
SELECT
  user_id,
  plan_type,
  status,
  payment_id,
  created_at
FROM public.subscriptions
ORDER BY user_id, created_at DESC;
