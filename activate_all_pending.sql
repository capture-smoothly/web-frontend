-- Activate ALL Pending Subscriptions
-- Run this in Supabase SQL Editor after adding service role key

-- Update all pending subscriptions to active
UPDATE public.subscriptions
SET
  status = 'active',
  expires_at = CASE
    WHEN plan_type = 'monthly' THEN NOW() + INTERVAL '1 month'
    WHEN plan_type = 'yearly' THEN NOW() + INTERVAL '1 year'
    ELSE NOW() + INTERVAL '1 month'
  END
WHERE
  status = 'pending';

-- Show all subscriptions (verify they're active)
SELECT
  user_id,
  plan_type,
  status,
  started_at,
  expires_at,
  created_at
FROM public.subscriptions
ORDER BY created_at DESC;
