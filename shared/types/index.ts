export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum KycStatus {
  NONE = "NONE",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum TradeDirection {
  CALL = "CALL",
  PUT = "PUT",
}

export enum TradeResult {
  PENDING = "PENDING",
  WIN = "WIN",
  LOSS = "LOSS",
  DRAW = "DRAW",
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum AssetType {
  FOREX = "FOREX",
  CRYPTO = "CRYPTO",
  COMMODITY = "COMMODITY",
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  kycStatus: KycStatus;
  avatar?: string;
  balance: number;
  demoBalance: number;
  isDemoMode: boolean;
  createdAt: string;
}

export interface ITrade {
  id: string;
  userId: string;
  asset: string;
  direction: TradeDirection;
  amount: number;
  entryPrice: number;
  exitPrice?: number;
  expiresAt: string;
  result: TradeResult;
  payout: number;
  createdAt: string;
}

export interface ITransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  method: string;
  reference?: string;
  createdAt: string;
}

export interface IAsset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  isActive: boolean;
  payoutPercentage: number;
  currentPrice?: number;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IPriceUpdate {
  symbol: string;
  price: number;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface IAdminStats {
  totalUsers: number;
  activeUsers: number;
  totalTrades: number;
  liveTrades: number;
  totalVolume: number;
  platformPnl: number;
  pendingWithdrawals: number;
  pendingKyc: number;
}
