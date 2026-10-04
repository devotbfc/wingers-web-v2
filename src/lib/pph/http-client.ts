// HTTP implementation of PphClient. Mirrors wing-app/src/api/http.ts.
// Browser-safe only — all requests use fetch with Bearer header; cookies are
// also sent via credentials: 'include' so PPH's rotating-refresh cookie flow
// works when enabled server-side.

import type { z } from "zod";
import { authStore } from "./auth-store";
import type { PphClient } from "./client";
import { PphApiError } from "./errors";
import {
  apiResponseSchema,
  loyaltyAccountSchema,
  loyaltyLedgerResponseSchema,
  logoutResponseSchema,
  locationsResponseSchema,
  menuSchema,
  orderHistoryResponseSchema,
  orderSchema,
  receiptScanResultSchema,
  redeemResponseSchema,
  refreshResponseSchema,
  rewardsResponseSchema,
  sessionSchema,
  tiersResponseSchema,
  userSchema,
  vouchersResponseSchema,
} from "./schemas";
import type {
  ApiResponse,
  LocationSummary,
  LogoutResponse,
  LoyaltyAccount,
  LoyaltyLedgerResponse,
  Menu,
  Order,
  OrderHistoryResponse,
  OrderSubmissionPayload,
  ReceiptScanResult,
  RedeemResponse,
  RefreshResponse,
  RewardsResponse,
  Session,
  SignupRequest,
  TiersResponse,
  User,
  VoucherStatus,
  VouchersResponse,
} from "./types";

type Method = "GET" | "POST" | "PATCH";

type RequestOpts = {
  method: Method;
  path: string;
  body?: unknown;
  authed?: boolean;
  allowRefresh?: boolean;
};

export class HttpPphClient implements PphClient {
  private readonly baseUrl: string;
  private readonly orgSlug: string;
  private refreshInFlight: Promise<boolean> | null = null;

  constructor(baseUrl: string, orgSlug: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.orgSlug = orgSlug;
  }

  async signup(payload: SignupRequest): Promise<ApiResponse<Session>> {
    const body = { ...payload, orgSlug: payload.orgSlug || this.orgSlug };
    return this.request(sessionSchema, { method: "POST", path: "/api/app/signup", body });
  }

  async login(email: string, password: string): Promise<ApiResponse<Session>> {
    return this.request(sessionSchema, {
      method: "POST",
      path: "/api/app/login",
      body: { email, password },
    });
  }

  async refresh(refreshToken: string): Promise<ApiResponse<RefreshResponse>> {
    return this.request(refreshResponseSchema, {
      method: "POST",
      path: "/api/app/refresh",
      body: { refreshToken },
      allowRefresh: false,
    });
  }

  async logout(refreshToken: string | null): Promise<ApiResponse<LogoutResponse>> {
    return this.request(logoutResponseSchema, {
      method: "POST",
      path: "/api/app/logout",
      body: { refreshToken: refreshToken ?? undefined },
      allowRefresh: false,
    });
  }

  async getMe(): Promise<ApiResponse<User>> {
    return this.request(userSchema, { method: "GET", path: "/api/app/me", authed: true });
  }

  async getLocations(): Promise<ApiResponse<LocationSummary[]>> {
    return this.request(locationsResponseSchema, {
      method: "GET",
      path: `/api/app/locations?orgSlug=${encodeURIComponent(this.orgSlug)}`,
    });
  }

  async getMenu(locationId: string): Promise<ApiResponse<Menu>> {
    return this.request(menuSchema, {
      method: "GET",
      path: `/api/app/menu?locationId=${encodeURIComponent(locationId)}`,
    });
  }

  async getLoyaltyAccount(): Promise<ApiResponse<LoyaltyAccount>> {
    return this.request(loyaltyAccountSchema, {
      method: "GET",
      path: "/api/app/loyalty",
      authed: true,
    });
  }

  async getRewards(): Promise<ApiResponse<RewardsResponse>> {
    return this.request(rewardsResponseSchema, {
      method: "GET",
      path: "/api/app/loyalty/rewards",
      authed: true,
    });
  }

  async getTiers(): Promise<ApiResponse<TiersResponse>> {
    return this.request(tiersResponseSchema, {
      method: "GET",
      path: `/api/app/loyalty/tiers?orgSlug=${encodeURIComponent(this.orgSlug)}`,
    });
  }

  async getLoyaltyLedger(cursor: string | null): Promise<ApiResponse<LoyaltyLedgerResponse>> {
    const qs = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
    return this.request(loyaltyLedgerResponseSchema, {
      method: "GET",
      path: `/api/app/loyalty/ledger${qs}`,
      authed: true,
    });
  }

  async submitReceiptScan(code: string): Promise<ApiResponse<ReceiptScanResult>> {
    return this.request(receiptScanResultSchema, {
      method: "POST",
      path: "/api/app/loyalty/scan",
      body: { code },
      authed: true,
    });
  }

  async redeemReward(rewardId: string): Promise<ApiResponse<RedeemResponse>> {
    return this.request(redeemResponseSchema, {
      method: "POST",
      path: `/api/app/loyalty/rewards/${encodeURIComponent(rewardId)}/redeem`,
      authed: true,
    });
  }

  async listVouchers(
    status?: VoucherStatus | VoucherStatus[],
  ): Promise<ApiResponse<VouchersResponse>> {
    const qs = (() => {
      if (!status) return "";
      const arr = Array.isArray(status) ? status : [status];
      if (arr.length === 0) return "";
      return `?${arr.map((s) => `status=${encodeURIComponent(s)}`).join("&")}`;
    })();
    return this.request(vouchersResponseSchema, {
      method: "GET",
      path: `/api/app/loyalty/vouchers${qs}`,
      authed: true,
    });
  }

  async getOrders(): Promise<ApiResponse<OrderHistoryResponse>> {
    return this.request(orderHistoryResponseSchema, {
      method: "GET",
      path: "/api/app/orders",
      authed: true,
    });
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return this.request(orderSchema, {
      method: "GET",
      path: `/api/app/orders/${encodeURIComponent(id)}`,
      authed: true,
    });
  }

  async submitOrder(payload: OrderSubmissionPayload): Promise<ApiResponse<Order>> {
    return this.request(orderSchema, {
      method: "POST",
      path: "/api/app/orders",
      body: payload,
      authed: true,
    });
  }

  async updateProfile(body: { dateOfBirth: string }): Promise<ApiResponse<User>> {
    return this.request(userSchema, {
      method: "PATCH",
      path: "/api/app/me",
      body,
      authed: true,
    });
  }

  private async request<T>(
    dataSchema: z.ZodType<T>,
    opts: RequestOpts,
  ): Promise<ApiResponse<T>> {
    const { method, path, body, authed = false, allowRefresh = true } = opts;
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = { accept: "application/json" };
    if (body !== undefined) headers["content-type"] = "application/json";

    if (authed) {
      const token = authStore.get().accessToken;
      if (token) headers.authorization = `Bearer ${token}`;
    }

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers,
        credentials: "include",
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
    } catch (err) {
      const base = err instanceof Error ? err.message : "Network error";
      throw new PphApiError(
        "NETWORK",
        `${base} — is PPH running on ${this.baseUrl}? If browser, check PPH CORS allows this origin.`,
        0,
      );
    }

    if (response.status === 401 && authed && allowRefresh) {
      const refreshed = await this.attemptRefresh();
      if (refreshed) return this.request(dataSchema, { ...opts, allowRefresh: false });
      authStore.markSessionExpired();
      throw new PphApiError("AUTH_UNAUTHORIZED", "Session expired", 401);
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch {
      throw new PphApiError(
        "SCHEMA",
        `[${method} ${path}] Response is not valid JSON`,
        response.status,
      );
    }

    if (!response.ok) {
      const err = extractError(json);
      throw new PphApiError(
        (err?.code as PphApiError["code"]) ?? "SCHEMA",
        `[${method} ${path}] ${err?.message ?? `HTTP ${response.status}`}`,
        response.status,
        err?.details ?? null,
      );
    }

    const parsed = apiResponseSchema(dataSchema).safeParse(json);
    if (!parsed.success) {
      throw new PphApiError(
        "SCHEMA",
        formatZodError(method, path, parsed.error),
        response.status,
      );
    }
    return parsed.data as ApiResponse<T>;
  }

  private attemptRefresh(): Promise<boolean> {
    if (this.refreshInFlight) return this.refreshInFlight;
    const refreshToken = authStore.get().refreshToken;
    if (!refreshToken) return Promise.resolve(false);

    this.refreshInFlight = (async () => {
      try {
        const res = await this.refresh(refreshToken);
        if (!res.success) return false;
        authStore.setTokens(res.data.accessToken, res.data.refreshToken, res.data.expiresAt);
        return true;
      } catch {
        return false;
      } finally {
        this.refreshInFlight = null;
      }
    })();

    return this.refreshInFlight;
  }
}

function formatZodError(method: Method, path: string, err: z.ZodError): string {
  const first = err.issues[0];
  const extra = err.issues.length > 1 ? ` (+${err.issues.length - 1} more)` : "";
  if (!first) return `[${method} ${path}] Schema mismatch${extra}`;
  const at = first.path.length > 0 ? first.path.join(".") : "<root>";
  return `[${method} ${path}] Schema mismatch at ${at}: ${first.message}${extra}`;
}

function extractError(
  json: unknown,
): { code?: string; message?: string; details?: Record<string, string[]> } | null {
  if (typeof json !== "object" || json === null) return null;
  const obj = json as Record<string, unknown>;
  const err = obj.error;
  if (typeof err !== "object" || err === null) return null;
  const e = err as Record<string, unknown>;
  return {
    code: typeof e.code === "string" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
    details:
      typeof e.details === "object" && e.details !== null
        ? (e.details as Record<string, string[]>)
        : undefined,
  };
}
