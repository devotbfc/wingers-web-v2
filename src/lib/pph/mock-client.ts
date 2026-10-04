// In-memory PphClient for dev when NEXT_PUBLIC_PPH_URL is unset. The menu,
// sauces and dips are built from the site's real catalogue data
// (`src/lib/menu/menu-data.ts` + `src/lib/flavours/flavour-lab-data.ts`) via
// `./mock-catalogue`. Loyalty seed, voucher seed, payment-sheet lifecycle
// (I5.a Pay / Decline) and all server-authoritative rules — idempotency,
// VOUCHER_NOT_COMBINABLE, BLUE_LIGHT_NOT_COMBINABLE, promo math — mirror
// wing-app/src/api/mock.ts.

import type { MockOnlyPphClient, PphClient } from "./client";
import {
  MK_LOCATION_ID,
  MOCK_MENU_BY_LOCATION,
  NPTN_LOCATION_ID,
  findMockMenuItem,
  pickRewardItemId,
} from "./mock-catalogue";
import { mkPickupCode } from "./pickup-code";
import { applyPromo } from "./promo";
import type {
  ApiResponse,
  IsoTimestamp,
  LedgerEntry,
  LocationSummary,
  LogoutResponse,
  LoyaltyAccount,
  LoyaltyLedgerResponse,
  Menu,
  Order,
  OrderHistoryResponse,
  OrderItem,
  OrderSubmissionPayload,
  ReceiptScanResult,
  RedeemResponse,
  RefreshResponse,
  Reward,
  RewardsResponse,
  Session,
  SignupRequest,
  TierRule,
  TiersResponse,
  User,
  Voucher,
  VoucherStatus,
  VouchersResponse,
} from "./types";

const now = (): IsoTimestamp => new Date().toISOString();
const latency = () => 150 + Math.floor(Math.random() * 200);
const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), latency()));

function ok<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

function fail<T>(code: string, message: string, details?: Record<string, string[]>): ApiResponse<T> {
  return {
    success: false,
    data: undefined as unknown as T,
    error: { code, message, details },
  };
}

const loyalty: LoyaltyAccount = {
  userId: "ckuser_demo_01",
  points: 640,
  lifetimePoints: 1240,
  tier: "silver",
  tierName: "Silver Wing",
  nextTierAt: 1000,
  memberSince: "2025-03-14T10:22:00.000Z",
  blueLightVerifiedUntil: null,
};

const mockTiers: TierRule[] = [
  { tier: "silver", tierName: "Silver Wing", thresholdPoints: 0, multiplier: 1.0 },
  { tier: "gold", tierName: "Gold Wing", thresholdPoints: 1000, multiplier: 1.1 },
  { tier: "pink", tierName: "Pink Wing", thresholdPoints: 2500, multiplier: 1.2 },
  { tier: "black", tierName: "Black Wing", thresholdPoints: 6000, multiplier: 1.35 },
];

const mockLocations: LocationSummary[] = [
  {
    id: MK_LOCATION_ID,
    name: "Wingers Milton Keynes",
    address: "25 Darin Court, Crownhill, Milton Keynes MK8 0AD",
    phone: "01908 755800",
    hours: [
      { day: 0, closed: false, openTime: "12:00", closeTime: "22:00" },
      { day: 1, closed: false, openTime: "16:30", closeTime: "21:30" },
      { day: 2, closed: false, openTime: "16:30", closeTime: "21:30" },
      { day: 3, closed: false, openTime: "16:30", closeTime: "22:00" },
      { day: 4, closed: false, openTime: "16:30", closeTime: "22:00" },
      { day: 5, closed: false, openTime: "16:30", closeTime: "22:00" },
      { day: 6, closed: false, openTime: "12:00", closeTime: "22:00" },
    ],
    minPickupLeadMinutes: 20,
  },
  {
    id: NPTN_LOCATION_ID,
    name: "Wingers Northampton",
    address: "2 Drapery, Northampton NN1 2ET",
    phone: "01604 755800",
    hours: [
      { day: 0, closed: false, openTime: "11:30", closeTime: "22:00" },
      { day: 1, closed: false, openTime: "11:30", closeTime: "20:00" },
      { day: 2, closed: false, openTime: "11:30", closeTime: "20:00" },
      { day: 3, closed: false, openTime: "11:30", closeTime: "22:00" },
      { day: 4, closed: false, openTime: "11:30", closeTime: "22:00" },
      { day: 5, closed: false, openTime: "11:30", closeTime: "22:00" },
      { day: 6, closed: false, openTime: "11:30", closeTime: "22:00" },
    ],
    minPickupLeadMinutes: 20,
  },
];

const REWARD_FREE_6_WINGS = "ckrwd_free_6_wings";
const REWARD_FREE_FRIES = "ckrwd_free_fries";
const REWARD_FREE_LAB_BURGER = "ckrwd_free_lab_burger";

const rewards: Reward[] = [
  { id: REWARD_FREE_6_WINGS, name: "Free 6 Wings", description: "Redeem against any 6-wing box.", costPoints: 300, imageUrl: null, available: true },
  { id: REWARD_FREE_FRIES, name: "Free Fries", description: "A side of Wingers fries, on us.", costPoints: 150, imageUrl: null, available: true },
  { id: REWARD_FREE_LAB_BURGER, name: "Free Lab Burger", description: "The signature crispy stack.", costPoints: 500, imageUrl: null, available: true },
];

// Map rewards to a real menu item id so voucher-covered zero-total paths
// find a line to discount. Resolved against the mock catalogue once at
// module load.
const REWARD_MENU_ITEM: Record<string, string | null> = {
  [REWARD_FREE_6_WINGS]: pickRewardItemId(/wings/i),
  [REWARD_FREE_FRIES]: pickRewardItemId(/fries/i),
  [REWARD_FREE_LAB_BURGER]: pickRewardItemId(/burger/i),
};

const orders: Order[] = [];
const session: Session = {
  user: {
    id: "ckuser_demo_01",
    email: "demo@wingers.co",
    firstName: "Alex",
    lastName: "Baker",
    phone: null,
    blueLightVerifiedUntil: null,
    dateOfBirth: null,
  },
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
  expiresAt: "2099-01-01T00:00:00.000Z",
};

let orderCounter = 1000;
const creditedOrderIds = new Set<string>();
const idempotencyIndex = new Map<string, string>();

const BLUE_LIGHT_PCT = 0.2;
function isBlueLightActive(): boolean {
  const iso = session.user.blueLightVerifiedUntil;
  return iso != null && new Date(iso).getTime() > Date.now();
}

let ledgerCounter = 0;
function mkLedgerId(): string {
  ledgerCounter += 1;
  return `cklg_${String(ledgerCounter).padStart(10, "0")}`;
}

let voucherCounter = 0;
function mkVoucherId(): string {
  voucherCounter += 1;
  return `ckvch_${String(voucherCounter).padStart(10, "0")}`;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const VOUCHER_TTL_DAYS = 30;
const isoAhead = (ms: number): IsoTimestamp => new Date(Date.now() + ms).toISOString();
const isoAgo = (ms: number): IsoTimestamp => new Date(Date.now() - ms).toISOString();

const vouchers: Voucher[] = [
  {
    id: mkVoucherId(),
    rewardId: REWARD_FREE_FRIES,
    rewardName: "Free Fries",
    status: "issued",
    source: "redemption",
    issuedAt: isoAgo(2 * DAY_MS),
    expiresAt: isoAhead(28 * DAY_MS),
    appliedToOrderId: null,
    appliedAt: null,
  },
];

const ledger: LedgerEntry[] = [
  {
    id: mkLedgerId(),
    delta: 400,
    type: "earn",
    sourceType: "order_fulfillment",
    sourceLabel: "Order WG-0410-01",
    createdAt: isoAgo(1 * DAY_MS),
    orderId: null,
  },
  {
    id: mkLedgerId(),
    delta: -150,
    type: "redeem",
    sourceType: "redemption",
    sourceLabel: "Redeemed: Free Fries",
    createdAt: isoAgo(2 * DAY_MS),
    orderId: null,
  },
];

const LEDGER_PAGE_SIZE = 10;

function mkOrderId(): string {
  orderCounter += 1;
  return `ckord_${String(orderCounter).padStart(10, "0")}`;
}

function mkReference(): string {
  const d = new Date();
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const seq = String(orderCounter % 100).padStart(2, "0");
  return `WG-${dd}${mm}-${seq}`;
}

function addMinutesIso(base: IsoTimestamp, minutes: number): IsoTimestamp {
  return new Date(new Date(base).getTime() + minutes * 60_000).toISOString();
}

export class MockPphClient implements PphClient, MockOnlyPphClient {
  async signup(payload: SignupRequest): Promise<ApiResponse<Session>> {
    const s: Session = {
      ...session,
      user: {
        ...session.user,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone ?? null,
        dateOfBirth: null,
      },
    };
    return delay(ok(s));
  }

  async login(email: string, _password: string): Promise<ApiResponse<Session>> {
    const s: Session = {
      ...session,
      user: { ...session.user, email: email || session.user.email },
    };
    return delay(ok(s));
  }

  async refresh(_refreshToken: string): Promise<ApiResponse<RefreshResponse>> {
    return delay(ok<RefreshResponse>({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      expiresAt: session.expiresAt,
    }));
  }

  async logout(_refreshToken: string | null): Promise<ApiResponse<LogoutResponse>> {
    return delay(ok<LogoutResponse>({ revoked: true }));
  }

  async getMe(): Promise<ApiResponse<User>> {
    return delay(ok(session.user));
  }

  async getLocations(): Promise<ApiResponse<LocationSummary[]>> {
    return delay(ok(mockLocations));
  }

  async getMenu(locationId: string): Promise<ApiResponse<Menu>> {
    const menu = MOCK_MENU_BY_LOCATION[locationId];
    if (!menu) return delay(fail<Menu>("NOT_FOUND", "Unknown location"));
    return delay(ok(menu));
  }

  async getLoyaltyAccount(): Promise<ApiResponse<LoyaltyAccount>> {
    return delay(ok(loyalty));
  }

  async getRewards(): Promise<ApiResponse<RewardsResponse>> {
    return delay(ok<RewardsResponse>({ items: rewards }));
  }

  async getTiers(): Promise<ApiResponse<TiersResponse>> {
    return delay(ok<TiersResponse>({ items: mockTiers }));
  }

  async getLoyaltyLedger(cursor: string | null): Promise<ApiResponse<LoyaltyLedgerResponse>> {
    const offset = cursor ? Math.max(0, parseInt(cursor, 10) || 0) : 0;
    const items = ledger.slice(offset, offset + LEDGER_PAGE_SIZE);
    const nextOffset = offset + items.length;
    const nextCursor = nextOffset < ledger.length ? String(nextOffset) : null;
    return delay(ok<LoyaltyLedgerResponse>({ items, nextCursor }));
  }

  async submitReceiptScan(_code: string): Promise<ApiResponse<ReceiptScanResult>> {
    const credited = 24;
    const result: ReceiptScanResult = {
      orderId: "ckord_scan_01",
      reference: "WG-SCAN-01",
      pointsCredited: credited,
      newBalance: loyalty.points + credited,
    };
    return delay(ok(result));
  }

  async getOrders(): Promise<ApiResponse<OrderHistoryResponse>> {
    return delay(ok<OrderHistoryResponse>(orders.slice(0, 100)));
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    const found = orders.find((o) => o.id === id);
    if (!found) return delay(fail<Order>("NOT_FOUND", "Order not found"));
    return delay(ok(found));
  }

  async submitOrder(payload: OrderSubmissionPayload): Promise<ApiResponse<Order>> {
    await new Promise((r) => setTimeout(r, 500 + Math.floor(Math.random() * 300)));

    const prior = idempotencyIndex.get(payload.idempotencyKey);
    if (prior) {
      const match = orders.find((o) => o.id === prior);
      if (match) return ok(match);
    }

    if (payload.locationId !== MK_LOCATION_ID && payload.locationId !== NPTN_LOCATION_ID) {
      return fail<Order>("NOT_FOUND", "Unknown pickup location");
    }

    const menu = MOCK_MENU_BY_LOCATION[payload.locationId];
    const sauces = menu?.sauces ?? [];

    const isPoints = payload.tender === "points";
    const blueLightActive = isBlueLightActive();

    if (payload.voucherId && payload.promoCode) {
      return fail<Order>("VOUCHER_NOT_COMBINABLE", "Vouchers can't combine with promo codes.");
    }
    if (payload.voucherId && isPoints) {
      return fail<Order>("VOUCHER_NOT_COMBINABLE", "Vouchers can't combine with paying in points.");
    }
    if (blueLightActive && (payload.voucherId || payload.promoCode || isPoints)) {
      return fail<Order>(
        "BLUE_LIGHT_NOT_COMBINABLE",
        "Blue Light 20% can't combine with vouchers, promos, or paying in points.",
      );
    }

    const orderItems: OrderItem[] = [];
    let subtotalPence = 0;
    let pointsEarned = 0;
    let pointsCost = 0;
    let pointsIneligible = false;

    for (const [idx, line] of payload.lines.entries()) {
      const item = findMockMenuItem(line.menuItemId, payload.locationId);
      if (!item) {
        return fail<Order>("NOT_FOUND", `Item ${line.menuItemId} is no longer on the menu`);
      }
      const modifierLabels: string[] = [];
      const modifiersTotalPence = (line.selectedModifierIds ?? []).reduce((sum, modId) => {
        const mod = item.modifiers?.find((m) => m.id === modId);
        if (mod) modifierLabels.push(mod.label);
        return sum + (mod?.addPence ?? 0);
      }, 0);
      const sauceLabels = (line.selectedSauceIds ?? []).flatMap((sauceId) => {
        const sauce = sauces.find((s) => s.id === sauceId);
        return sauce ? [sauce.name] : [];
      });
      const unitPricePence = item.pricePence + modifiersTotalPence;
      const linePricePence = unitPricePence * line.quantity;
      subtotalPence += linePricePence;
      pointsEarned += item.pointsValue * line.quantity;

      if (isPoints) {
        if (item.pointsPrice == null) {
          pointsIneligible = true;
        } else {
          let linePoints = item.pointsPrice;
          for (const modId of line.selectedModifierIds ?? []) {
            const mod = item.modifiers?.find((m) => m.id === modId);
            if (!mod) continue;
            if (mod.pointsPrice == null) pointsIneligible = true;
            else linePoints += mod.pointsPrice;
          }
          pointsCost += linePoints * line.quantity;
        }
      }

      orderItems.push({
        id: `ckoit_${String(idx + 1).padStart(6, "0")}`,
        menuItemId: item.id,
        name: item.name,
        quantity: line.quantity,
        unitPricePence,
        linePricePence,
        modifierLabels,
        sauceLabels,
      });
    }

    if (isPoints && pointsIneligible) {
      return fail<Order>("NOT_POINTS_ELIGIBLE", "One of these items can't be paid with points yet.");
    }
    if (isPoints && pointsCost > loyalty.points) {
      return fail<Order>(
        "INSUFFICIENT_POINTS",
        `You need ${pointsCost - loyalty.points} more points to pay with points.`,
        {
          required: [String(pointsCost)],
          balance: [String(loyalty.points)],
        },
      );
    }

    let voucherDiscountPence = 0;
    let voucherToApply: Voucher | null = null;
    if (payload.voucherId) {
      const v = vouchers.find((x) => x.id === payload.voucherId);
      if (!v) return fail<Order>("VOUCHER_NOT_AVAILABLE", "This voucher has already been used.");
      const nowMs = Date.now();
      if (v.status === "expired" || new Date(v.expiresAt).getTime() < nowMs) {
        return fail<Order>("VOUCHER_EXPIRED", "This voucher has expired.");
      }
      if (v.status !== "issued") {
        return fail<Order>("VOUCHER_NOT_AVAILABLE", "This voucher has already been used.");
      }
      const grantedItemId = REWARD_MENU_ITEM[v.rewardId];
      const matchLine = grantedItemId ? orderItems.find((li) => li.menuItemId === grantedItemId) : undefined;
      if (!matchLine) {
        return fail<Order>("VOUCHER_ITEM_MISSING", `Add ${v.rewardName} to your order to use this voucher.`);
      }
      voucherDiscountPence = matchLine.unitPricePence;
      voucherToApply = v;
    }

    const promoResult = !isPoints && !payload.voucherId && payload.promoCode
      ? applyPromo(subtotalPence, orderItems, payload.promoCode)
      : { discountPence: 0, code: null as string | null };
    if ("error" in promoResult && promoResult.error) {
      return fail<Order>("VALIDATION_ERROR", promoResult.error);
    }

    const blueLightDiscountPence =
      blueLightActive && !isPoints ? Math.floor(subtotalPence * BLUE_LIGHT_PCT) : 0;
    const discountPence = isPoints
      ? 0
      : promoResult.discountPence + voucherDiscountPence + blueLightDiscountPence;
    const totalPence = isPoints ? 0 : Math.max(0, subtotalPence - discountPence);
    const finalPointsEarned = blueLightActive && !isPoints ? 0 : pointsEarned;

    const createdAtIso = now();
    const estimatedReadyAt =
      payload.pickupMode === "scheduled" && payload.scheduledFor
        ? payload.scheduledFor
        : addMinutesIso(createdAtIso, 15 + Math.floor(Math.random() * 6));
    const locationName = payload.locationId === MK_LOCATION_ID ? "Milton Keynes" : "Northampton";
    const orderId = mkOrderId();

    const bypassesStripe = isPoints || totalPence === 0;
    const paymentClientSecret = bypassesStripe
      ? null
      : `pi_mock_${orderId}_secret_${Math.random().toString(36).slice(2, 10)}`;

    const order: Order = {
      id: orderId,
      reference: mkReference(),
      status: bypassesStripe ? "confirmed" : "pending",
      locationId: payload.locationId,
      locationName,
      items: orderItems,
      subtotalPence,
      discountPence,
      totalPence,
      promoCode: promoResult.code,
      pickupMode: payload.pickupMode,
      scheduledFor: payload.scheduledFor,
      estimatedReadyAt,
      createdAt: createdAtIso,
      updatedAt: createdAtIso,
      cancelledAt: null,
      pointsEarned: finalPointsEarned,
      pickupCode: mkPickupCode(orderCounter),
      paymentMethod: isPoints ? "points" : "card",
      paymentClientSecret,
      isPaid: bypassesStripe,
    };

    if (isPoints && pointsCost > 0) {
      loyalty.points = Math.max(0, loyalty.points - pointsCost);
      ledger.unshift({
        id: mkLedgerId(),
        delta: -pointsCost,
        type: "redeem",
        sourceType: "redemption",
        sourceLabel: `Paid with points · ${order.reference}`,
        createdAt: createdAtIso,
        orderId,
      });
    }

    if (voucherToApply) {
      voucherToApply.status = "applied";
      voucherToApply.appliedToOrderId = orderId;
      voucherToApply.appliedAt = createdAtIso;
    }

    orders.unshift(order);
    idempotencyIndex.set(payload.idempotencyKey, orderId);
    return ok(order);
  }

  async updateProfile(body: { dateOfBirth: string }): Promise<ApiResponse<User>> {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.dateOfBirth)) {
      return delay(fail<User>("VALIDATION_ERROR", "dateOfBirth must be YYYY-MM-DD"));
    }
    if (session.user.dateOfBirth != null) {
      return delay(fail<User>("DOB_ALREADY_SET", "Date of birth is already set. Contact support to change it."));
    }
    session.user.dateOfBirth = body.dateOfBirth;
    return delay(ok({ ...session.user }));
  }

  async redeemReward(rewardId: string): Promise<ApiResponse<RedeemResponse>> {
    await new Promise((r) => setTimeout(r, 350));
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return fail<RedeemResponse>("NOT_FOUND", "Reward not found");
    if (!reward.available) {
      return fail<RedeemResponse>("CONFLICT", "This reward isn't available right now.");
    }
    if (loyalty.points < reward.costPoints) {
      return fail<RedeemResponse>(
        "INSUFFICIENT_POINTS",
        `You need ${reward.costPoints - loyalty.points} more points.`,
        { required: [String(reward.costPoints)], balance: [String(loyalty.points)] },
      );
    }
    loyalty.points -= reward.costPoints;
    const issuedAt = now();
    const voucher: Voucher = {
      id: mkVoucherId(),
      rewardId: reward.id,
      rewardName: reward.name,
      status: "issued",
      source: "redemption",
      issuedAt,
      expiresAt: isoAhead(VOUCHER_TTL_DAYS * DAY_MS),
      appliedToOrderId: null,
      appliedAt: null,
    };
    vouchers.unshift(voucher);
    ledger.unshift({
      id: mkLedgerId(),
      delta: -reward.costPoints,
      type: "redeem",
      sourceType: "redemption",
      sourceLabel: `Redeemed: ${reward.name}`,
      createdAt: issuedAt,
      orderId: null,
    });
    return ok<RedeemResponse>({ voucher, balanceAfter: loyalty.points });
  }

  async listVouchers(status?: VoucherStatus | VoucherStatus[]): Promise<ApiResponse<VouchersResponse>> {
    const nowMs = Date.now();
    for (const v of vouchers) {
      if (v.status === "issued" && new Date(v.expiresAt).getTime() < nowMs) v.status = "expired";
    }
    const wanted = status ? new Set(Array.isArray(status) ? status : [status]) : null;
    const items = wanted ? vouchers.filter((v) => wanted.has(v.status)) : vouchers.slice();
    return delay(ok<VouchersResponse>({ items }));
  }

  async _tickLoyalty(orderId: string): Promise<void> {
    if (creditedOrderIds.has(orderId)) return;
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    creditedOrderIds.add(orderId);
    if (order.paymentMethod === "points") return;
    loyalty.points += order.pointsEarned;
    loyalty.lifetimePoints += order.pointsEarned;
    if (order.pointsEarned !== 0) {
      ledger.unshift({
        id: mkLedgerId(),
        delta: order.pointsEarned,
        type: "earn",
        sourceType: "order_fulfillment",
        sourceLabel: `Order ${order.reference}`,
        createdAt: now(),
        orderId: order.id,
      });
    }
  }

  async _restoreVouchersForOrder(orderId: string): Promise<void> {
    for (const v of vouchers) {
      if (v.appliedToOrderId === orderId && v.status === "applied") {
        v.status = "issued";
        v.appliedToOrderId = null;
        v.appliedAt = null;
      }
    }
  }

  async _confirmPayment(orderId: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 400));
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    if (order.status !== "pending") return;
    order.status = "confirmed";
    order.isPaid = true;
    order.paymentClientSecret = null;
    order.updatedAt = now();
  }

  async _declinePayment(orderId: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    order.updatedAt = now();
  }
}
