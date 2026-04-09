"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, TrendingDown, Filter } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";

const tradeHistory = [
  { id: "1", asset: "EUR/USD", direction: "CALL", amount: 100, entryPrice: 1.0845, exitPrice: 1.0867, payout: 85, result: "WIN", time: "2024-01-15 14:32" },
  { id: "2", asset: "BTC/USD", direction: "PUT", amount: 250, entryPrice: 67234.5, exitPrice: 67456.2, payout: 0, result: "LOSS", time: "2024-01-15 14:15" },
  { id: "3", asset: "XAU/USD", direction: "CALL", amount: 500, entryPrice: 2340.2, exitPrice: 2348.7, payout: 425, result: "WIN", time: "2024-01-15 13:45" },
  { id: "4", asset: "GBP/USD", direction: "PUT", amount: 150, entryPrice: 1.2645, exitPrice: 1.2612, payout: 127.5, result: "WIN", time: "2024-01-15 12:30" },
  { id: "5", asset: "ETH/USD", direction: "CALL", amount: 200, entryPrice: 3445.8, exitPrice: 3432.1, payout: 0, result: "LOSS", time: "2024-01-15 11:20" },
  { id: "6", asset: "USD/JPY", direction: "CALL", amount: 175, entryPrice: 148.23, exitPrice: 148.67, payout: 148.75, result: "WIN", time: "2024-01-15 10:05" },
  { id: "7", asset: "SOL/USD", direction: "PUT", amount: 300, entryPrice: 102.45, exitPrice: 101.23, payout: 255, result: "WIN", time: "2024-01-14 16:45" },
  { id: "8", asset: "EUR/USD", direction: "PUT", amount: 100, entryPrice: 1.0832, exitPrice: 1.0845, payout: 0, result: "LOSS", time: "2024-01-14 15:20" },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-8 px-4 max-w-[1440px] mx-auto">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-1">Trade History</h1>
              <p className="text-sm text-text-muted">View all your past trades and performance.</p>
            </div>
            <Button variant="secondary" size="sm">
              <Filter size={14} />
              Filter
            </Button>
          </div>
        </FadeIn>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Trades", value: "142", color: "text-accent-light" },
            { label: "Wins", value: "97", color: "text-success" },
            { label: "Losses", value: "45", color: "text-danger" },
            { label: "Win Rate", value: "68.3%", color: "text-warning" },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={0.1 * i}>
              <Card>
                <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Trade Table */}
        <FadeIn delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock size={18} className="text-accent-light" />
                All Trades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Asset</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Direction</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Amount</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Entry</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Exit</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Payout</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Result</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradeHistory.map((trade, i) => (
                      <motion.tr
                        key={trade.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.03 }}
                        className="border-b border-border/50 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-text-primary">{trade.asset}</td>
                        <td className="py-3 px-4">
                          <Badge variant={trade.direction === "CALL" ? "success" : "danger"}>
                            {trade.direction === "CALL" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            {trade.direction}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-text-primary">${trade.amount}</td>
                        <td className="py-3 px-4 text-sm font-mono text-text-secondary">{trade.entryPrice}</td>
                        <td className="py-3 px-4 text-sm font-mono text-text-secondary">{trade.exitPrice}</td>
                        <td className={`py-3 px-4 text-sm font-medium ${trade.payout > 0 ? "text-success" : "text-text-muted"}`}>
                          {trade.payout > 0 ? `+$${trade.payout}` : "-"}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={trade.result === "WIN" ? "success" : "danger"} dot>
                            {trade.result}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-text-muted whitespace-nowrap">{trade.time}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </main>
    </div>
  );
}
