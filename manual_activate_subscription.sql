-- Manually Activate Your Test Subscription
-- Run this in Supabase SQL Editor to activate the pending subscription

-- Update the pending subscription to active
UPDATE public.subscriptions
SET
  status = 'active',
  expires_at = NOW() + INTERVAL '1 year'  -- Set expiration to 1 year from now
WHERE
  user_id = '3fe9b589-612b-4edc-8a33-d478572eb05d'
  AND status = 'pending'
  AND plan_type = 'yearly';

-- Verify it worked
SELECT
  id,
  user_id,
  plan_type,
  status,
  payment_id,
  started_at,
  expires_at
FROM public.subscriptions
WHERE user_id = '3fe9b589-612b-4edc-8a33-d478572eb05d'
ORDER BY created_at DESC;
