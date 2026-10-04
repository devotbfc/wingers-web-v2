// In-memory PphClient for dev when NEXT_PUBLIC_PPH_URL is unset. Ports
// wing-app/src/api/mock.ts so the web flow has the same screen behaviours
// as the mobile app on cold boot: same menu cuids, same loyalty seed, same
// voucher seeds, same payment-sheet lifecycle (I5.a: Pay / Decline).

import type { MockOnlyPphClient, PphClient } from "./client";
import { mkPickupCode } from "./pickup-code";
import { applyPromo } from "./promo";
import type {
  ApiResponse,
  Dip,
  IsoTimestamp,
  LedgerEntry,
  LocationSummary,
  LogoutResponse,
  LoyaltyAccount,
  LoyaltyLedgerResponse,
  Menu,
  MenuItem,
  MenuItemModifier,
  Order,
  OrderHistoryResponse,
  OrderItem,
  OrderSubmissionPayload,
  ReceiptScanResult,
  RedeemResponse,
  RefreshResponse,
  Reward,
  RewardsResponse,
  Sauce,
  Session,
  SignupRequest,
  TierRule,
  TiersResponse,
  User,
  Voucher,
  VoucherStatus,
  VouchersResponse,
} from "./types";

const MK_LOCATION_ID = "ckloc0000000000000000mktnk";
const NPTN_LOCATION_ID = "ckloc00000000000000000nptn";

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

// Menu cuids. Match wing-app so cross-porting any component works unchanged.
const wings6 = "ckitm000000000000000wings06";
const wings10 = "ckitm000000000000000wings10";
const wings20 = "ckitm000000000000000wings20";
const tend3 = "ckitm000000000000000tend03";
const tend5 = "ckitm000000000000000tend05";
const labBurger = "ckitm000000000000burglab001";
const hotStack = "ckitm000000000000burghot001";
const fries = "ckitm00000000000000fries01";
const slaw = "ckitm00000000000000slaw001";
const macCheese = "ckitm000000000000macche001";
const fizzyCan = "ckitm0000000000drink01";
const stillWater = "ckitm0000000000drink02";

const wingModifiers: MenuItemModifier[] = [
  { id: "ckmod00000000000000mod_exchk", label: "Extra chicken", addPence: 150, kind: "add-on", pointsPrice: 75 },
  { id: "ckmod00000000000000mod_exsce", label: "Extra sauce", addPence: 0, kind: "add-on", pointsPrice: 0 },
  { id: "ckmod00000000000000mod_nochz", label: "No cheese", addPence: 0, kind: "remove", pointsPrice: 0 },
];

const mkSauceId = (n: number) =>
  `cksau0000000000000000sauce${String(n).padStart(2, "0")}`;

const sauces: Sauce[] = [
  { id: mkSauceId(1), name: "Honey Heat", heat: 3, style: "wet", description: "Slow-drizzle honey cut with chilli.", status: "available", compatibleMenuItemIds: [wings6, wings10, tend3, tend5] },
  { id: mkSauceId(2), name: "Smoky BBQ", heat: 1, style: "wet", description: "Deep smoke, sticky finish, zero jeopardy.", status: "available", compatibleMenuItemIds: [wings6, wings10, wings20, tend3, tend5, labBurger] },
  { id: mkSauceId(3), name: "Lemon Pepper", heat: 2, style: "dry", description: "Bright citrus and cracked black pepper, no glaze.", status: "available", compatibleMenuItemIds: [wings6, wings10, tend3, tend5] },
  { id: mkSauceId(4), name: "Peri Riot", heat: 4, style: "wet", description: "African bird's eye, garlic, lemon.", status: "available", compatibleMenuItemIds: [wings6, wings10, tend3, tend5, hotStack] },
  { id: mkSauceId(5), name: "Katsu Dust", heat: 2, style: "dry", description: "Katsu curry powder rubbed straight onto the fry.", status: "available", compatibleMenuItemIds: [wings6, wings10, tend3, tend5] },
  { id: mkSauceId(6), name: "Inferno Rub", heat: 5, style: "dry", description: "Ghost and habanero ground into a powder.", status: "available", compatibleMenuItemIds: [wings10, wings20, tend5] },
  { id: mkSauceId(7), name: "Ghost Buffalo", heat: 5, style: "wet", description: "Classic buffalo tang, then ghost pepper late.", status: "available", compatibleMenuItemIds: [wings6, wings10, wings20, tend3, tend5] },
  { id: mkSauceId(8), name: "Garlic Parm", heat: 1, style: "wet", description: "Roasted garlic, aged parmesan, butter.", status: "available", compatibleMenuItemIds: [wings6, wings10, wings20, tend3, tend5, labBurger] },
  { id: mkSauceId(9), name: "Maple Miso", heat: 3, style: "wet", description: "Maple, white miso, chilli — this month's drop.", status: "limited", compatibleMenuItemIds: [wings6, wings10, tend3, tend5] },
];

const dips: Dip[] = [
  { id: "ckdip0000000000000000dip001", name: "Blue Cheese", pricePence: 90, imageUrl: null, available: true },
  { id: "ckdip0000000000000000dip002", name: "Ranch", pricePence: 90, imageUrl: null, available: true },
  { id: "ckdip0000000000000000dip003", name: "Honey Mustard", pricePence: 90, imageUrl: null, available: true },
  { id: "ckdip0000000000000000dip004", name: "Garlic Mayo", pricePence: 90, imageUrl: null, available: true },
];

const menu: Menu = {
  locationId: MK_LOCATION_ID,
  updatedAt: now(),
  categories: [
    {
      id: "ckcat00000000000000000wings",
      name: "Wings",
      slug: "wings",
      items: [
        { id: wings6, categoryId: "ckcat00000000000000000wings", name: "6 Wings", description: "Buttermilk-brined bone-in wings with your choice of sauce.", pricePence: 795, pointsValue: 400, pointsPrice: 400, imageUrl: null, available: true, modifiers: wingModifiers },
        { id: wings10, categoryId: "ckcat00000000000000000wings", name: "10 Wings", description: "Ten wings, two sauces.", pricePence: 1195, pointsValue: 400, pointsPrice: 600, imageUrl: null, available: true, modifiers: wingModifiers },
        { id: wings20, categoryId: "ckcat00000000000000000wings", name: "20 Wing Bucket", description: "Twenty wings, three sauces, one big appetite.", pricePence: 2195, pointsValue: 400, pointsPrice: 1100, imageUrl: null, available: true, badge: "premium", modifiers: wingModifiers },
      ],
    },
    {
      id: "ckcat0000000000000000tendrs",
      name: "Tenders",
      slug: "tenders",
      items: [
        { id: tend3, categoryId: "ckcat0000000000000000tendrs", name: "3 Tenders", description: "Hand-battered chicken tenders, dip included.", pricePence: 795, pointsValue: 400, pointsPrice: 400, imageUrl: null, available: true, modifiers: wingModifiers },
        { id: tend5, categoryId: "ckcat0000000000000000tendrs", name: "5 Tenders", description: "Five tenders, two dips.", pricePence: 1195, pointsValue: 400, pointsPrice: 600, imageUrl: null, available: true, modifiers: wingModifiers },
      ],
    },
    {
      id: "ckcat0000000000000000burger",
      name: "Burgers",
      slug: "burgers",
      items: [
        { id: labBurger, categoryId: "ckcat0000000000000000burger", name: "Lab Burger", description: "Double crispy chicken, lab sauce, pickles, brioche.", pricePence: 995, pointsValue: 500, pointsPrice: 500, imageUrl: null, available: true },
        { id: hotStack, categoryId: "ckcat0000000000000000burger", name: "Hot Honey Stack", description: "Crispy chicken, hot honey glaze, slaw.", pricePence: 1095, pointsValue: 500, pointsPrice: 550, imageUrl: null, available: true, heatLevel: 3, badge: "new" },
      ],
    },
    {
      id: "ckcat00000000000000000sides",
      name: "Sides",
      slug: "sides",
      items: [
        { id: fries, categoryId: "ckcat00000000000000000sides", name: "Wingers Fries", description: "Skin-on fries dusted with our house seasoning.", pricePence: 395, pointsValue: 150, pointsPrice: 200, imageUrl: null, available: true },
        { id: slaw, categoryId: "ckcat00000000000000000sides", name: "Neon Slaw", description: "Crunchy cabbage slaw with a pink twist.", pricePence: 295, pointsValue: 150, pointsPrice: 150, imageUrl: null, available: true },
        { id: macCheese, categoryId: "ckcat00000000000000000sides", name: "Mac & Cheese", description: "Three-cheese mac, breadcrumb crust.", pricePence: 495, pointsValue: 150, pointsPrice: 250, imageUrl: null, available: true },
      ],
    },
    {
      id: "ckcat0000000000000drinks01",
      name: "Drinks",
      slug: "drinks",
      items: [
        { id: fizzyCan, categoryId: "ckcat0000000000000drinks01", name: "Fizzy Can", description: "Ice cold.", pricePence: 195, pointsValue: 100, pointsPrice: 100, imageUrl: null, available: true },
        { id: stillWater, categoryId: "ckcat0000000000000drinks01", name: "Still Water 500ml", description: "Bottled.", pricePence: 150, pointsValue: 100, pointsPrice: 80, imageUrl: null, available: true },
      ],
    },
  ],
  sauces,
  dips,
};

for (const cat of menu.categories) {
  for (const item of cat.items) {
    const compatible = sauces.filter((s) => s.compatibleMenuItemIds.includes(item.id)).map((s) => s.id);
    if (compatible.length > 0) item.compatibleSauceIds = compatible;
  }
}

function findMenuItem(id: string): MenuItem | null {
  for (const cat of menu.categories) {
    const found = cat.items.find((i) => i.id === id);
    if (found) return found;
  }
  return null;
}

const loyalty: LoyaltyAccount = {
  userId: "ckuser00000000000000000001",
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
    phone: "01908 755800",
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

const REWARD_FREE_6_WINGS = "ckrwd00000000000000free06w";
const REWARD_FREE_FRIES = "ckrwd00000000000000freefri";
const REWARD_FREE_LAB_BURGER = "ckrwd00000000000000freeburger";

const rewards: Reward[] = [
  { id: REWARD_FREE_6_WINGS, name: "Free 6 Wings", description: "Redeem against any 6-wing box.", costPoints: 300, imageUrl: null, available: true },
  { id: REWARD_FREE_FRIES, name: "Free Fries", description: "A side of Wingers fries, on us.", costPoints: 150, imageUrl: null, available: true },
  { id: REWARD_FREE_LAB_BURGER, name: "Free Lab Burger", description: "The signature crispy stack.", costPoints: 500, imageUrl: null, available: true },
];

const REWARD_MENU_ITEM: Record<string, string> = {
  [REWARD_FREE_6_WINGS]: wings6,
  [REWARD_FREE_FRIES]: fries,
  [REWARD_FREE_LAB_BURGER]: labBurger,
};

const orders: Order[] = [];
const session: Session = {
  user: {
    id: "ckuser00000000000000000001",
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
  return `cklg${String(ledgerCounter).padStart(24, "0")}`;
}

let voucherCounter = 0;
function mkVoucherId(): string {
  voucherCounter += 1;
  return `ckvch${String(voucherCounter).padStart(23, "0")}`;
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
  return `ckord${String(orderCounter).padStart(23, "0")}`;
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
    return delay(ok({ ...menu, locationId }));
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
      orderId: "ckord00000000000000scan001",
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
      const item = findMenuItem(line.menuItemId);
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
        const sauce = menu.sauces.find((s) => s.id === sauceId);
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
        id: `ckoit${String(idx + 1).padStart(23, "0")}`,
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
