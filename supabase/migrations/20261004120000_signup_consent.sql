-- Add marketing-consent audit columns to loyalty_signups.
--
-- Context: the sign-up slide-in (and the homepage loyalty form, updated in the
-- same change) require an explicit, unticked-by-default marketing-consent
-- checkbox. We store the timestamp the box was ticked and the version slug of
-- the consent text that was displayed, so a future legal review can map any
-- row back to the exact wording the user saw.
--
-- Both columns are nullable: pre-existing rows have no recorded consent and
-- must remain readable. The server action rejects any new row where consent
-- was not ticked, so going forward every new row will have both columns set.

ALTER TABLE public.loyalty_signups
  ADD COLUMN IF NOT EXISTS marketing_consent_at timestamptz,
  ADD COLUMN IF NOT EXISTS consent_text_version text;

COMMENT ON COLUMN public.loyalty_signups.marketing_consent_at IS
  'Timestamp the user ticked the marketing-consent checkbox at sign-up.';

COMMENT ON COLUMN public.loyalty_signups.consent_text_version IS
  'Version slug of the consent text displayed at sign-up (e.g. "2026-10-v1").';
