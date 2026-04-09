"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Bitcoin,
  DollarSign,
  Plus,
  Minus,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FadeIn } from "@/components/animations/FadeIn";

const transactions = [
  { type: "DEPOSIT", amount: 500, method: "Stripe", status: "APPROVED", date: "2024-01-15" },
  { type: "WITHDRAWAL", amount: 200, method: "PayPal", status: "PENDING", date: "2024-01-14" },
  { type: "DEPOSIT", amount: 1000, method: "Crypto", status: "APPROVED", date: "2024-01-12" },
  { type: "WITHDRAWAL", amount: 300, method: "Bank Transfer", status: "APPROVED", date: "2024-01-10" },
  { type: "DEPOSIT", amount: 250, method: "Stripe", status: "APPROVED", date: "2024-01-08" },
];

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-8 px-4 max-w-[1440px] mx-auto">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-1">Wallet</h1>
            <p className="text-sm text-text-muted">Manage your funds, deposits, and withdrawals.</p>
          </div>
        </FadeIn>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <FadeIn delay={0.1}>
            <GlassPanel className="gradient-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <WalletIcon className="w-5 h-5 text-accent-light" />
                </div>
                <span className="text-sm text-text-muted">Live Balance</span>
              </div>
              <p className="text-3xl font-bold text-text-primary mb-2">$0.00</p>
              <p className="text-xs text-text-muted">Available for trading</p>
            </GlassPanel>
          </FadeIn>

          <FadeIn delay={0.15}>
            <GlassPanel>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-warning" />
                </div>
                <span className="text-sm text-text-muted">Demo Balance</span>
              </div>
              <p className="text-3xl font-bold text-text-primary mb-2">$10,000.00</p>
              <Badge variant="warning" dot>Demo Mode Active</Badge>
            </GlassPanel>
          </FadeIn>

          <FadeIn delay={0.2}>
            <GlassPanel>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-success" />
                </div>
                <span className="text-sm text-text-muted">Total Profit</span>
              </div>
              <p className="text-3xl font-bold text-success mb-2">+$1,250.00</p>
              <p className="text-xs text-text-muted">All time earnings</p>
            </GlassPanel>
          </FadeIn>
        </div>

        {/* Action Buttons */}
        <FadeIn delay={0.25}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card hover className="cursor-pointer text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-7 h-7 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">Deposit</h3>
                <p className="text-xs text-text-muted">Add funds to your account</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <CreditCard size={16} className="text-text-muted" />
                  <Bitcoin size={16} className="text-text-muted" />
                  <DollarSign size={16} className="text-text-muted" />
                </div>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card hover className="cursor-pointer text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Minus className="w-7 h-7 text-accent-light" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">Withdraw</h3>
                <p className="text-xs text-text-muted">Withdraw your earnings</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <CreditCard size={16} className="text-text-muted" />
                  <Bitcoin size={16} className="text-text-muted" />
                </div>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card hover className="cursor-pointer text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center mx-auto mb-4">
                  <ArrowDownRight className="w-7 h-7 text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">Transfer</h3>
                <p className="text-xs text-text-muted">Demo ↔ Live transfer</p>
              </Card>
            </motion.div>
          </div>
        </FadeIn>

        {/* Transaction History */}
        <FadeIn delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Type</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Amount</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Method</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <Badge variant={tx.type === "DEPOSIT" ? "success" : "danger"}>
                            {tx.type === "DEPOSIT" ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                            {tx.type}
                          </Badge>
                        </td>
                        <td className={`py-3 px-4 text-sm font-medium ${tx.type === "DEPOSIT" ? "text-success" : "text-danger"}`}>
                          {tx.type === "DEPOSIT" ? "+" : "-"}${tx.amount}
                        </td>
                        <td className="py-3 px-4 text-sm text-text-primary">{tx.method}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              tx.status === "APPROVED" ? "success" :
                              tx.status === "PENDING" ? "warning" : "danger"
                            }
                            dot
                          >
                            {tx.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-text-muted">{tx.date}</td>
                      </tr>
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
