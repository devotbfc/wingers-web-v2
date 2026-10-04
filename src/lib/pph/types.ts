// PPH wire contract, verbatim from
// C:\Users\marka\Projects\wing-app\src\api\types.ts. Keep in lockstep.
// Any divergence from server shape must be reconciled against
// pushpull-hub-api/src/routes/app*.ts (server wins).

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
};

export type Cuid = string;
export type IsoTimestamp = string;

export type MenuItemModifier = {
  id: Cuid;
  label: string;
  addPence: number;
  kind: "add-on" | "remove";
  pointsPrice: number | null;
};

export type MenuItemBadge = "new" | "premium";

export type MenuItem = {
  id: Cuid;
  categoryId: Cuid;
  name: string;
  description: string;
  pricePence: number;
  pointsValue: number;
  pointsPrice: number | null;
  imageUrl: string | null;
  available: boolean;
  heatLevel?: 1 | 2 | 3 | 4 | 5;
  badge?: MenuItemBadge;
  modifiers?: MenuItemModifier[];
  compatibleSauceIds?: Cuid[];
};

export type MenuCategory = {
  id: Cuid;
  name: string;
  slug: string;
  items: MenuItem[];
};

export type SauceStatus = "available" | "limited" | "coming-soon";
export type SauceStyle = "wet" | "dry";

export type Sauce = {
  id: Cuid;
  name: string;
  heat: 1 | 2 | 3 | 4 | 5;
  style: SauceStyle;
  description: string;
  status: SauceStatus;
  compatibleMenuItemIds: Cuid[];
};

export type Dip = {
  id: Cuid;
  name: string;
  pricePence: number;
  imageUrl: string | null;
  available: boolean;
};

export type Menu = {
  locationId: Cuid;
  updatedAt: IsoTimestamp;
  categories: MenuCategory[];
  sauces: Sauce[];
  dips: Dip[];
};

export type LoyaltyTier = "silver" | "gold" | "pink" | "black" | "purple";
export type LadderTier = Exclude<LoyaltyTier, "purple">;

export type TierRule = {
  tier: LadderTier;
  tierName: string;
  thresholdPoints: number;
  multiplier: number;
};

export type LoyaltyAccount = {
  userId: Cuid;
  points: number;
  lifetimePoints: number;
  tier: LoyaltyTier;
  tierName: string;
  nextTierAt: number | null;
  memberSince: IsoTimestamp;
  blueLightVerifiedUntil: IsoTimestamp | null;
};

export type LoyaltyLedgerType = "earn" | "redeem" | "adjust" | "refund" | "expire";
export type LoyaltyLedgerSource =
  | "order_fulfillment"
  | "receipt_scan"
  | "redemption"
  | "admin_adjust"
  | "refund_reversal";

export type LedgerEntry = {
  id: Cuid;
  delta: number;
  type: LoyaltyLedgerType;
  sourceType: LoyaltyLedgerSource;
  sourceLabel: string;
  createdAt: IsoTimestamp;
  orderId: Cuid | null;
};

export type LoyaltyLedgerResponse = {
  items: LedgerEntry[];
  nextCursor: string | null;
};

export type Reward = {
  id: Cuid;
  name: string;
  description: string;
  costPoints: number;
  imageUrl: string | null;
  available: boolean;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "collected"
  | "cancelled";

export type OrderItem = {
  id: Cuid;
  menuItemId: Cuid;
  name: string;
  quantity: number;
  unitPricePence: number;
  linePricePence: number;
  modifierLabels: string[];
  sauceLabels: string[];
};

export type OrderPickupMode = "asap" | "scheduled";

export type PaymentMethod = "card" | "cash" | "wallet" | "points";
export type Tender = "mock_card" | "points";

export type VoucherStatus = "issued" | "applied" | "expired" | "void";
export type VoucherSource = "redemption" | "purchase" | "grant";

export type Voucher = {
  id: Cuid;
  rewardId: Cuid;
  rewardName: string;
  status: VoucherStatus;
  source: VoucherSource;
  issuedAt: IsoTimestamp;
  expiresAt: IsoTimestamp;
  appliedToOrderId: Cuid | null;
  appliedAt: IsoTimestamp | null;
};

export type Order = {
  id: Cuid;
  reference: string;
  status: OrderStatus;
  locationId: Cuid;
  locationName: string;
  items: OrderItem[];
  subtotalPence: number;
  discountPence: number;
  totalPence: number;
  promoCode: string | null;
  pickupMode: OrderPickupMode;
  scheduledFor: IsoTimestamp | null;
  estimatedReadyAt: IsoTimestamp | null;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
  cancelledAt: IsoTimestamp | null;
  pointsEarned: number;
  pickupCode: string | null;
  paymentMethod: PaymentMethod;
  paymentClientSecret: string | null;
  isPaid: boolean;
};

// PPH returns a bare Order[] (not wrapped).
export type OrderHistoryResponse = Order[];

export type OrderSubmissionLine = {
  menuItemId: Cuid;
  quantity: number;
  selectedModifierIds: Cuid[];
  selectedSauceIds: Cuid[];
};

export type OrderSubmissionPayload = {
  idempotencyKey: string;
  locationId: Cuid;
  menuUpdatedAt: IsoTimestamp;
  lines: OrderSubmissionLine[];
  clientSubtotalPence: number;
  pickupMode: OrderPickupMode;
  scheduledFor: IsoTimestamp | null;
  promoCode: string | null;
  notes: string | null;
  tender?: Tender;
  voucherId?: Cuid;
};

export type User = {
  id: Cuid;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  blueLightVerifiedUntil: IsoTimestamp | null;
  dateOfBirth: string | null;
};

export type Session = {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: IsoTimestamp;
};

export type ReceiptScanResult = {
  orderId: Cuid;
  reference: string;
  pointsCredited: number;
  newBalance: number;
};

export type SignupRequest = {
  orgSlug: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
  expiresAt: IsoTimestamp;
};

export type LogoutResponse = { revoked: boolean };

export type OpeningHours = {
  day: number;
  closed: boolean;
  openTime: string;
  closeTime: string;
};

export type LocationSummary = {
  id: Cuid;
  name: string;
  address: string;
  phone?: string;
  hours: OpeningHours[];
  minPickupLeadMinutes?: number;
};

// `{ items }` wrapper on the wire (matches server).
export type RewardsResponse = { items: Reward[] };
export type TiersResponse = { items: TierRule[] };
export type RedeemResponse = { voucher: Voucher; balanceAfter: number };
export type VouchersResponse = { items: Voucher[] };
