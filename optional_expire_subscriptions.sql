-- OPTIONAL: Auto-expire subscriptions in database
-- This is NOT required - expiration already works client-side!
-- Only run this if you want the database status to reflect expiration

-- Create a function to mark expired subscriptions
CREATE OR REPLACE FUNCTION expire_old_subscriptions()
RETURNS void AS $$
BEGIN
  UPDATE public.subscriptions
  SET status = 'expired'
  WHERE status = 'active'
    AND expires_at IS NOT NULL
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Optional: Set up a cron job to run this daily
-- You can use Supabase Edge Functions or pg_cron for this
-- Example with pg_cron (if enabled):
-- SELECT cron.schedule('expire-subscriptions', '0 0 * * *', 'SELECT expire_old_subscriptions()');

-- Or just run manually when needed:
SELECT expire_old_subscriptions();
