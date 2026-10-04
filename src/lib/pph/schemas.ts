// Zod boundary for PPH responses. Ported from
// C:\Users\marka\Projects\wing-app\src\api\schemas.ts. Keep in lockstep.

import { z } from "zod";

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  // zod v4 requires explicit key schema on z.record.
  details: z.record(z.string(), z.array(z.string())).optional(),
});

export function apiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.boolean(),
    data: dataSchema,
    error: apiErrorSchema.optional(),
  });
}

export const cuidSchema = z.string().min(1);
export const isoTimestampSchema = z.string().datetime({ offset: true });

export const menuItemModifierSchema = z.object({
  id: cuidSchema,
  label: z.string(),
  addPence: z.number().int(),
  kind: z.enum(["add-on", "remove"]),
  pointsPrice: z.number().int().nonnegative().nullable().default(null),
});

export const menuItemSchema = z.object({
  id: cuidSchema,
  categoryId: cuidSchema,
  name: z.string(),
  description: z.string(),
  pricePence: z.number().int().nonnegative(),
  pointsValue: z.number().int().nonnegative(),
  pointsPrice: z.number().int().nonnegative().nullable().default(null),
  imageUrl: z.string().url().nullable(),
  available: z.boolean(),
  heatLevel: z
    .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])
    .optional(),
  badge: z.enum(["new", "premium"]).optional(),
  modifiers: z.array(menuItemModifierSchema).optional(),
  compatibleSauceIds: z.array(cuidSchema).optional(),
});

export const menuCategorySchema = z.object({
  id: cuidSchema,
  name: z.string(),
  slug: z.string(),
  items: z.array(menuItemSchema),
});

export const sauceSchema = z.object({
  id: cuidSchema,
  name: z.string(),
  heat: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  style: z.enum(["wet", "dry"]),
  description: z.string(),
  status: z.enum(["available", "limited", "coming-soon"]),
  compatibleMenuItemIds: z.array(cuidSchema),
});

export const dipSchema = z.object({
  id: cuidSchema,
  name: z.string(),
  pricePence: z.number().int().nonnegative(),
  imageUrl: z.string().url().nullable(),
  available: z.boolean(),
});

export const menuSchema = z.object({
  locationId: cuidSchema,
  updatedAt: isoTimestampSchema,
  categories: z.array(menuCategorySchema),
  sauces: z.array(sauceSchema),
  dips: z.array(dipSchema),
});

export const loyaltyTierSchema = z.enum(["silver", "gold", "pink", "black", "purple"]);

export const loyaltyAccountSchema = z.object({
  userId: cuidSchema,
  points: z.number().int().nonnegative(),
  lifetimePoints: z.number().int().nonnegative(),
  tier: loyaltyTierSchema,
  tierName: z.string(),
  nextTierAt: z.number().int().nullable(),
  memberSince: isoTimestampSchema,
  blueLightVerifiedUntil: isoTimestampSchema.nullable(),
});

export const loyaltyLedgerTypeSchema = z.enum(["earn", "redeem", "adjust", "refund", "expire"]);
export const loyaltyLedgerSourceSchema = z.enum([
  "order_fulfillment",
  "receipt_scan",
  "redemption",
  "admin_adjust",
  "refund_reversal",
]);

export const ledgerEntrySchema = z.object({
  id: cuidSchema,
  delta: z.number().int(),
  type: loyaltyLedgerTypeSchema,
  sourceType: loyaltyLedgerSourceSchema,
  sourceLabel: z.string(),
  createdAt: isoTimestampSchema,
  orderId: cuidSchema.nullable().default(null),
});

export const loyaltyLedgerResponseSchema = z.object({
  items: z.array(ledgerEntrySchema),
  nextCursor: z.string().nullable(),
});

export const rewardSchema = z.object({
  id: cuidSchema,
  name: z.string(),
  description: z.string(),
  costPoints: z.number().int().positive(),
  imageUrl: z.string().url().nullable(),
  available: z.boolean(),
});

export const rewardsResponseSchema = z.object({ items: z.array(rewardSchema) });

export const tierRuleSchema = z.object({
  tier: z.enum(["silver", "gold", "pink", "black"]),
  tierName: z.string(),
  thresholdPoints: z.number().int().nonnegative(),
  multiplier: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((n) => Number.isFinite(n) && n > 0, {
      message: "multiplier must be a positive number",
    }),
});

export const tiersResponseSchema = z.object({ items: z.array(tierRuleSchema) });

export const orderItemSchema = z.object({
  id: cuidSchema,
  menuItemId: cuidSchema,
  name: z.string(),
  quantity: z.number().int().positive(),
  unitPricePence: z.number().int().nonnegative(),
  linePricePence: z.number().int().nonnegative(),
  modifierLabels: z.array(z.string()).default([]),
  sauceLabels: z.array(z.string()).default([]),
});

export const orderPickupModeSchema = z.enum(["asap", "scheduled"]);
export const paymentMethodSchema = z.enum(["card", "cash", "wallet", "points"]);

export const orderSchema = z.object({
  id: cuidSchema,
  reference: z.string(),
  status: z.enum([
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "collected",
    "cancelled",
  ]),
  locationId: cuidSchema,
  locationName: z.string(),
  items: z.array(orderItemSchema),
  subtotalPence: z.number().int().nonnegative(),
  discountPence: z.number().int().nonnegative(),
  totalPence: z.number().int().nonnegative(),
  promoCode: z.string().nullable(),
  pickupMode: orderPickupModeSchema,
  scheduledFor: isoTimestampSchema.nullable(),
  estimatedReadyAt: isoTimestampSchema.nullable().default(null),
  createdAt: isoTimestampSchema,
  updatedAt: isoTimestampSchema,
  cancelledAt: isoTimestampSchema.nullable(),
  pointsEarned: z.number().int().nonnegative(),
  pickupCode: z.string().nullable().default(null),
  paymentMethod: paymentMethodSchema.default("card"),
  paymentClientSecret: z.string().nullable().default(null),
  isPaid: z.boolean().default(false),
});

export const orderHistoryResponseSchema = z.array(orderSchema);

export const tenderSchema = z.enum(["mock_card", "points"]);

export const orderSubmissionLineSchema = z.object({
  menuItemId: cuidSchema,
  quantity: z.number().int().positive(),
  selectedModifierIds: z.array(cuidSchema),
  selectedSauceIds: z.array(cuidSchema),
});

export const orderSubmissionPayloadSchema = z.object({
  idempotencyKey: z.string().min(1),
  locationId: cuidSchema,
  menuUpdatedAt: isoTimestampSchema,
  lines: z.array(orderSubmissionLineSchema).min(1),
  clientSubtotalPence: z.number().int().nonnegative(),
  pickupMode: orderPickupModeSchema,
  scheduledFor: isoTimestampSchema.nullable(),
  promoCode: z.string().nullable(),
  notes: z.string().nullable(),
  tender: tenderSchema.optional(),
  voucherId: cuidSchema.optional(),
});

export const voucherStatusSchema = z.enum(["issued", "applied", "expired", "void"]);
export const voucherSourceSchema = z.enum(["redemption", "purchase", "grant"]);

export const voucherSchema = z.object({
  id: cuidSchema,
  rewardId: cuidSchema,
  rewardName: z.string(),
  status: voucherStatusSchema,
  source: voucherSourceSchema,
  issuedAt: isoTimestampSchema,
  expiresAt: isoTimestampSchema,
  appliedToOrderId: cuidSchema.nullable(),
  appliedAt: isoTimestampSchema.nullable(),
});

export const redeemResponseSchema = z.object({
  voucher: voucherSchema,
  balanceAfter: z.number().int().nonnegative(),
});

export const vouchersResponseSchema = z.object({ items: z.array(voucherSchema) });

export const dateOfBirthSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "dateOfBirth must be YYYY-MM-DD");

export const userSchema = z.object({
  id: cuidSchema,
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().nullable(),
  blueLightVerifiedUntil: isoTimestampSchema.nullable(),
  dateOfBirth: dateOfBirthSchema.nullable().default(null),
});

export const sessionSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: isoTimestampSchema,
});

export const receiptScanResultSchema = z.object({
  orderId: cuidSchema,
  reference: z.string(),
  pointsCredited: z.number().int().nonnegative(),
  newBalance: z.number().int().nonnegative(),
});

export const refreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: isoTimestampSchema,
});

export const logoutResponseSchema = z.object({ revoked: z.boolean() });

export const openingHoursSchema = z.object({
  day: z.number().int().min(0).max(6),
  closed: z.boolean(),
  openTime: z.string(),
  closeTime: z.string(),
});

export const locationSummarySchema = z.object({
  id: cuidSchema,
  name: z.string(),
  address: z.string(),
  phone: z.string().optional(),
  hours: z.array(openingHoursSchema),
  minPickupLeadMinutes: z.number().int().positive().optional(),
});

export const locationsResponseSchema = z.array(locationSummarySchema);
