export const APP_NAME = "APEX OPTIONS";
export const APP_DESCRIPTION = "Professional Binary Options Trading Platform";

export const DEFAULT_DEMO_BALANCE = 10000;
export const MIN_TRADE_AMOUNT = 1;
export const MAX_TRADE_AMOUNT = 10000;

export const EXPIRATION_TIMES = [
  { label: "1 Minute", value: 60 },
  { label: "5 Minutes", value: 300 },
  { label: "15 Minutes", value: 900 },
  { label: "1 Hour", value: 3600 },
] as const;

export const DEFAULT_PAYOUT_PERCENTAGE = 85;

export const TRADING_ASSETS = {
  FOREX: [
    { symbol: "EUR/USD", name: "Euro / US Dollar" },
    { symbol: "GBP/USD", name: "British Pound / US Dollar" },
    { symbol: "USD/JPY", name: "US Dollar / Japanese Yen" },
    { symbol: "AUD/USD", name: "Australian Dollar / US Dollar" },
    { symbol: "USD/CAD", name: "US Dollar / Canadian Dollar" },
  ],
  CRYPTO: [
    { symbol: "BTC/USD", name: "Bitcoin / US Dollar" },
    { symbol: "ETH/USD", name: "Ethereum / US Dollar" },
    { symbol: "SOL/USD", name: "Solana / US Dollar" },
    { symbol: "BNB/USD", name: "Binance Coin / US Dollar" },
  ],
  COMMODITY: [
    { symbol: "XAU/USD", name: "Gold / US Dollar" },
    { symbol: "XAG/USD", name: "Silver / US Dollar" },
    { symbol: "OIL/USD", name: "Crude Oil / US Dollar" },
  ],
} as const;
