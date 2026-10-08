// Change FRANCHISE_CONSENT_TEXT_VERSION whenever FRANCHISE_CONSENT_TEXT
// changes — the pair is written into franchise_enquiries.consent_text_version
// so a future legal review can map any row back to the exact wording the
// enquirer saw. Kept separate from the loyalty consent string so wording can
// evolve independently.
export const FRANCHISE_CONSENT_TEXT_VERSION = "franchise-2026-10-v2";

export const FRANCHISE_CONSENT_TEXT =
  "Keep me updated on franchise opportunities from Wingers. I can unsubscribe any time.";
