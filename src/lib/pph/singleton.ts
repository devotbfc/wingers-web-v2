// Resolve the PphClient singleton once at module load.
// NEXT_PUBLIC_PPH_URL set → HttpPphClient; unset → MockPphClient.

import type { MockOnlyPphClient, PphClient } from "./client";
import { HttpPphClient } from "./http-client";
import { MockPphClient } from "./mock-client";

const PPH_URL = (process.env.NEXT_PUBLIC_PPH_URL ?? "").trim();
const PPH_ORG = (process.env.NEXT_PUBLIC_PPH_ORG_SLUG ?? "wingers").trim();

export const PPH_IS_MOCK = PPH_URL === "";

export const pph: PphClient =
  PPH_URL === "" ? new MockPphClient() : new HttpPphClient(PPH_URL, PPH_ORG);

export const pphMockOnly: MockOnlyPphClient | null =
  PPH_IS_MOCK ? (pph as unknown as MockOnlyPphClient) : null;

export const pphOrgSlug = PPH_ORG;
