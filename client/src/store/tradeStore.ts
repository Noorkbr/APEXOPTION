import { create } from "zustand";

interface TradeState {
  selectedAsset: string;
  direction: "CALL" | "PUT";
  amount: number;
  expiration: number;
  currentPrice: number;
  isTrading: boolean;

  setAsset: (asset: string) => void;
  setDirection: (direction: "CALL" | "PUT") => void;
  setAmount: (amount: number) => void;
  setExpiration: (expiration: number) => void;
  setCurrentPrice: (price: number) => void;
  setIsTrading: (isTrading: boolean) => void;
}

export const useTradeStore = create<TradeState>((set) => ({
  selectedAsset: "EUR/USD",
  direction: "CALL",
  amount: 100,
  expiration: 60,
  currentPrice: 0,
  isTrading: false,

  setAsset: (asset: string) => set({ selectedAsset: asset }),
  setDirection: (direction: "CALL" | "PUT") => set({ direction }),
  setAmount: (amount: number) => set({ amount }),
  setExpiration: (expiration: number) => set({ expiration }),
  setCurrentPrice: (price: number) => set({ currentPrice: price }),
  setIsTrading: (isTrading: boolean) => set({ isTrading }),
}));
