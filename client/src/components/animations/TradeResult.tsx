"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TradeResultProps {
  result: "WIN" | "LOSS" | null;
  payout?: number;
  onComplete?: () => void;
}

export function TradeResult({ result, payout, onComplete }: TradeResultProps) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          {/* Overlay pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 1.5, times: [0, 0.3, 1] }}
            className={`absolute inset-0 ${
              result === "WIN" ? "bg-success" : "bg-danger"
            }`}
          />

          {/* Result card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ delay: 0.1, type: "spring", bounce: 0.4 }}
            className={`glass-strong rounded-3xl p-10 text-center ${
              result === "WIN" ? "glow-success" : "glow-danger"
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="text-7xl mb-4"
            >
              {result === "WIN" ? "🎉" : "📉"}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-3xl font-bold mb-2 ${
                result === "WIN" ? "text-success" : "text-danger"
              }`}
            >
              {result === "WIN" ? "TRADE WON!" : "TRADE LOST"}
            </motion.h2>

            {payout !== undefined && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-xl font-semibold ${
                  result === "WIN" ? "text-success-light" : "text-danger-light"
                }`}
              >
                {result === "WIN" ? "+" : "-"}${payout.toFixed(2)}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
