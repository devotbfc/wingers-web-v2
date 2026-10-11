import "server-only";

const BREVO_BASE = "https://api.brevo.com/v3";
const TIMEOUT_MS = 5_000;

type LoyaltyContactArgs = {
  email: string;
  firstName?: string | null;
  source: "homepage" | "loyalty_page" | "signup_slidein";
  locationPref?: "milton-keynes" | "northampton" | null;
  consentTextVersion: string;
};

export async function addLoyaltyContact(
  args: LoyaltyContactArgs,
): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_LIST_ID;
  if (!apiKey || !listIdRaw) return;
  const listId = Number(listIdRaw);
  if (!Number.isFinite(listId)) return;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BREVO_BASE}/contacts`, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email: args.email,
        attributes: {
          FIRSTNAME: args.firstName ?? "",
          SOURCE: args.source,
          LOCATION_PREF: args.locationPref ?? "",
          CONSENT_VERSION: args.consentTextVersion,
        },
        listIds: [listId],
        updateEnabled: true,
      }),
      signal: controller.signal,
    });
    if (res.status !== 201 && res.status !== 204) {
      console.warn("brevo_loyalty_sync_failed", { status: res.status });
    }
  } catch (err) {
    const name = err instanceof Error ? err.name : "unknown";
    console.warn("brevo_loyalty_sync_error", { name });
  } finally {
    clearTimeout(timer);
  }
}

type FranchiseAlertArgs = {
  fullName: string;
  email: string;
  phone: string;
  area: string;
  budgetBand: string;
  experience: string;
  timeframe: string;
  message?: string | null;
  heardFrom?: string | null;
};

export async function sendFranchiseAlert(
  args: FranchiseAlertArgs,
): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;
  const to = process.env.FRANCHISE_ALERT_TO;
  if (!apiKey || !sender || !to) return;

  const lines = [
    `Name: ${args.fullName}`,
    `Email: ${args.email}`,
    `Phone: ${args.phone}`,
    `Area: ${args.area}`,
    `Budget: ${args.budgetBand}`,
    `Experience: ${args.experience}`,
    `Timeframe: ${args.timeframe}`,
    `Heard from: ${args.heardFrom ?? "-"}`,
    "",
    "Message:",
    args.message ?? "-",
  ].join("\n");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BREVO_BASE}/smtp/email`, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: sender, name: "Wingers website" },
        to: [{ email: to }],
        replyTo: { email: args.email, name: args.fullName },
        subject: `New franchise enquiry: ${args.area}`,
        textContent: lines,
      }),
      signal: controller.signal,
    });
    if (res.status !== 201 && res.status !== 204) {
      console.warn("brevo_franchise_alert_failed", { status: res.status });
    }
  } catch (err) {
    const name = err instanceof Error ? err.name : "unknown";
    console.warn("brevo_franchise_alert_error", { name });
  } finally {
    clearTimeout(timer);
  }
}
