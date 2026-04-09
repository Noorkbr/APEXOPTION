"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/FadeIn";

const mockAssets = [
  { symbol: "EUR/USD", price: 1.0847, change: 0.23, type: "FOREX" },
  { symbol: "GBP/USD", price: 1.2634, change: -0.12, type: "FOREX" },
  { symbol: "BTC/USD", price: 67245.50, change: 2.45, type: "CRYPTO" },
  { symbol: "ETH/USD", price: 3456.20, change: 1.87, type: "CRYPTO" },
  { symbol: "XAU/USD", price: 2345.80, change: 0.56, type: "COMMODITY" },
];

const mockTrades = [
  { asset: "EUR/USD", direction: "CALL" as const, amount: 100, result: "WIN" as const, payout: 85, time: "2m ago" },
  { asset: "BTC/USD", direction: "PUT" as const, amount: 250, result: "LOSS" as const, payout: 0, time: "5m ago" },
  { asset: "XAU/USD", direction: "CALL" as const, amount: 500, result: "PENDING" as const, payout: 0, time: "1m ago" },
];

export default function TradePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-8 px-4 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left: Asset Selector */}
          <div className="lg:col-span-1">
            <FadeIn direction="right">
              <GlassPanel className="h-full">
                <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-accent-light" />
                  Markets
                </h3>
                <div className="space-y-2">
                  {mockAssets.map((asset) => (
                    <motion.div
                      key={asset.symbol}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{asset.symbol}</p>
                        <Badge variant="muted" className="text-[10px]">{asset.type}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono text-text-primary">
                          {asset.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                        <p className={`text-xs font-medium flex items-center gap-0.5 justify-end ${asset.change >= 0 ? "text-success" : "text-danger"}`}>
                          {asset.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                          {Math.abs(asset.change)}%
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassPanel>
            </FadeIn>
          </div>

          {/* Center: Chart Area */}
          <div className="lg:col-span-2">
            <FadeIn>
              <GlassPanel>
                {/* Chart Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-accent-light" />
                    <span className="text-lg font-bold text-text-primary">EUR/USD</span>
                    <span className="text-xl font-bold text-success">1.0847</span>
                    <span className="text-sm text-success">+0.23%</span>
                  </div>
                  <div className="flex gap-1">
                    {["1m", "5m", "15m", "1h"].map((tf) => (
                      <button
                        key={tf}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          tf === "5m"
                            ? "bg-accent/20 text-accent-light border border-accent/30"
                            : "text-text-muted hover:text-text-primary hover:bg-white/5"
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-[400px] rounded-xl bg-surface-2 border border-border flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-10" />
                  <div className="text-center relative z-10">
                    <BarChart3 className="w-12 h-12 text-text-muted/30 mx-auto mb-3" />
                    <p className="text-text-muted text-sm">TradingView Lightweight Charts</p>
                    <p className="text-text-muted/50 text-xs mt-1">Live chart renders here</p>
                  </div>
                </div>

                {/* Trading Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="call" size="xl" className="h-16 text-lg">
                    <TrendingUp size={20} />
                    CALL (UP)
                  </Button>
                  <Button variant="put" size="xl" className="h-16 text-lg">
                    <TrendingDown size={20} />
                    PUT (DOWN)
                  </Button>
                </div>
              </GlassPanel>
            </FadeIn>
          </div>

          {/* Right: Order Panel */}
          <div className="lg:col-span-1 space-y-4">
            <FadeIn direction="left">
              <GlassPanel>
                <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <DollarSign size={16} className="text-accent-light" />
                  Trade Settings
                </h3>

                {/* Amount */}
                <div className="mb-4">
                  <label className="text-xs text-text-muted mb-2 block">Investment Amount</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 glass rounded-xl px-4 py-3 text-lg font-bold text-text-primary">
                      $100.00
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[25, 50, 100, 250].map((amt) => (
                      <button
                        key={amt}
                        className="flex-1 glass rounded-lg py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Expiration */}
                <div className="mb-4">
                  <label className="text-xs text-text-muted mb-2 block flex items-center gap-1">
                    <Clock size={12} />
                    Expiration Time
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "1 min", value: "60" },
                      { label: "5 min", value: "300" },
                      { label: "15 min", value: "900" },
                      { label: "1 hour", value: "3600" },
                    ].map((exp) => (
                      <button
                        key={exp.value}
                        className={`glass rounded-lg py-2 text-xs font-medium transition-colors ${
                          exp.value === "60"
                            ? "bg-accent/20 text-accent-light border border-accent/30"
                            : "text-text-muted hover:text-text-primary hover:bg-white/5"
                        }`}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payout Info */}
                <div className="glass rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">Payout</span>
                    <span className="text-sm font-bold text-success">85%</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-text-muted">Potential Profit</span>
                    <span className="text-sm font-bold text-success">$85.00</span>
                  </div>
                </div>
              </GlassPanel>
            </FadeIn>

            {/* Active Trades */}
            <FadeIn direction="left" delay={0.1}>
              <GlassPanel>
                <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-accent-light" />
                  Recent Trades
                </h3>
                <div className="space-y-2">
                  {mockTrades.map((trade, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          trade.direction === "CALL" ? "bg-success/20" : "bg-danger/20"
                        }`}>
                          {trade.direction === "CALL" ? (
                            <TrendingUp size={12} className="text-success" />
                          ) : (
                            <TrendingDown size={12} className="text-danger" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-primary">{trade.asset}</p>
                          <p className="text-[10px] text-text-muted">{trade.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-text-primary">${trade.amount}</p>
                        <Badge
                          variant={
                            trade.result === "WIN" ? "success" :
                            trade.result === "LOSS" ? "danger" : "warning"
                          }
                          className="text-[10px]"
                          dot
                        >
                          {trade.result}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </FadeIn>
          </div>
        </div>
      </main>
    </div>
  );
}
