"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign,
  BarChart3,
  Clock,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/FadeIn";

const statsData = [
  {
    label: "Total Balance",
    value: "$10,000.00",
    change: "+12.5%",
    trend: "up",
    icon: Wallet,
    color: "text-accent-light",
    bg: "bg-accent/10",
  },
  {
    label: "Total Profit",
    value: "$1,250.00",
    change: "+8.3%",
    trend: "up",
    icon: TrendingUp,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    label: "Win Rate",
    value: "68.5%",
    change: "+2.1%",
    trend: "up",
    icon: BarChart3,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    label: "Total Trades",
    value: "142",
    change: "+24",
    trend: "up",
    icon: Activity,
    color: "text-info",
    bg: "bg-info/10",
  },
];

const recentTrades = [
  { asset: "EUR/USD", direction: "CALL", amount: 100, payout: 85, result: "WIN", time: "2 min ago" },
  { asset: "BTC/USD", direction: "PUT", amount: 250, payout: 0, result: "LOSS", time: "15 min ago" },
  { asset: "XAU/USD", direction: "CALL", amount: 500, payout: 425, result: "WIN", time: "1 hour ago" },
  { asset: "GBP/USD", direction: "PUT", amount: 150, payout: 127.5, result: "WIN", time: "2 hours ago" },
  { asset: "ETH/USD", direction: "CALL", amount: 200, payout: 0, result: "LOSS", time: "3 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-8 px-4 max-w-[1440px] mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-1">Dashboard</h1>
            <p className="text-sm text-text-muted">Welcome back! Here&apos;s your trading overview.</p>
          </div>
        </FadeIn>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={stat.label} delay={0.1 * i}>
                <Card hover>
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className={`text-xs font-medium flex items-center gap-0.5 ${
                      stat.trend === "up" ? "text-success" : "text-danger"
                    }`}>
                      {stat.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {stat.change}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-text-muted">{stat.label}</p>
                    <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Balance Chart */}
          <FadeIn delay={0.2}>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign size={18} className="text-accent-light" />
                  Balance History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-xl bg-surface-2 border border-border flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-10 h-10 text-text-muted/30 mx-auto mb-2" />
                    <p className="text-text-muted text-sm">Balance chart loads here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Quick Actions */}
          <FadeIn delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity size={18} className="text-accent-light" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full glass rounded-xl p-4 text-left hover:border-accent/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">Start Trading</p>
                      <p className="text-xs text-text-muted">Open the trading terminal</p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full glass rounded-xl p-4 text-left hover:border-accent/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-accent-light" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">Deposit Funds</p>
                      <p className="text-xs text-text-muted">Add funds to your wallet</p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full glass rounded-xl p-4 text-left hover:border-accent/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">Trade History</p>
                      <p className="text-xs text-text-muted">View past trades</p>
                    </div>
                  </div>
                </motion.button>

                {/* Demo Mode Toggle */}
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-text-primary">Demo Mode</p>
                      <p className="text-xs text-text-muted">Trading with virtual funds</p>
                    </div>
                    <Badge variant="warning" dot>Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Recent Trades */}
        <FadeIn delay={0.4}>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock size={18} className="text-accent-light" />
                Recent Trades
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
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Payout</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Result</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrades.map((trade, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.05 }}
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
                        <td className="py-3 px-4 text-sm text-text-primary">
                          {trade.payout > 0 ? `+$${trade.payout}` : "-"}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={trade.result === "WIN" ? "success" : "danger"} dot>
                            {trade.result}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-text-muted">{trade.time}</td>
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
