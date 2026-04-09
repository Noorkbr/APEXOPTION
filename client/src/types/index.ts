export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  kycStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED";
  avatar?: string;
  balance: number;
  demoBalance: number;
  isDemoMode: boolean;
  createdAt: string;
}

export interface Trade {
  id: string;
  userId: string;
  asset: string;
  direction: "CALL" | "PUT";
  amount: number;
  entryPrice: number;
  exitPrice?: number;
  expiresAt: string;
  result: "PENDING" | "WIN" | "LOSS" | "DRAW";
  payout: number;
  isDemo: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "DEPOSIT" | "WITHDRAWAL";
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  method: string;
  reference?: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: "FOREX" | "CRYPTO" | "COMMODITY";
  isActive: boolean;
  payoutPercentage: number;
  currentPrice?: number;
}

export interface PriceUpdate {
  symbol: string;
  price: number;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalTrades: number;
  liveTrades: number;
  totalVolume: number;
  platformPnl: number;
  pendingWithdrawals: number;
  pendingKyc: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}
