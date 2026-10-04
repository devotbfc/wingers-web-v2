// Base PphClient interface + mock-only extension. Mirrors
// wing-app/src/api/client.ts.

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

export interface PphClient {
  signup(payload: SignupRequest): Promise<ApiResponse<Session>>;
  login(email: string, password: string): Promise<ApiResponse<Session>>;
  refresh(refreshToken: string): Promise<ApiResponse<RefreshResponse>>;
  logout(refreshToken: string | null): Promise<ApiResponse<LogoutResponse>>;
  getMe(): Promise<ApiResponse<User>>;
  getLocations(): Promise<ApiResponse<LocationSummary[]>>;
  getMenu(locationId: string): Promise<ApiResponse<Menu>>;
  getLoyaltyAccount(): Promise<ApiResponse<LoyaltyAccount>>;
  getRewards(): Promise<ApiResponse<RewardsResponse>>;
  getTiers(): Promise<ApiResponse<TiersResponse>>;
  getLoyaltyLedger(cursor: string | null): Promise<ApiResponse<LoyaltyLedgerResponse>>;
  // Deliberately non-idempotent server-side: HTTP client MUST NOT auto-retry.
  redeemReward(rewardId: string): Promise<ApiResponse<RedeemResponse>>;
  listVouchers(status?: VoucherStatus | VoucherStatus[]): Promise<ApiResponse<VouchersResponse>>;
  submitReceiptScan(code: string): Promise<ApiResponse<ReceiptScanResult>>;
  getOrders(): Promise<ApiResponse<OrderHistoryResponse>>;
  getOrder(id: string): Promise<ApiResponse<Order>>;
  submitOrder(payload: OrderSubmissionPayload): Promise<ApiResponse<Order>>;
  updateProfile(body: { dateOfBirth: string }): Promise<ApiResponse<User>>;
}

// Mock-only side effects to stand in for Stripe webhooks + client-authoritative
// optimistic cancellation. Not part of PphClient — real HTTP client never
// implements these.
export interface MockOnlyPphClient {
  _confirmPayment(orderId: string): Promise<void>;
  _declinePayment(orderId: string): Promise<void>;
  _tickLoyalty(orderId: string): Promise<void>;
  _restoreVouchersForOrder(orderId: string): Promise<void>;
}
