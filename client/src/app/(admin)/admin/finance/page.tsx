"use client";

import React from "react";
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/FadeIn";
import { useUIStore } from "@/store/uiStore";

const pendingWithdrawals = [
  { id: "W001", user: "John Doe", amount: 500, method: "Bank Transfer", requested: "2024-01-15 14:32" },
  { id: "W002", user: "Alice Brown", amount: 1200, method: "PayPal", requested: "2024-01-15 12:15" },
  { id: "W003", user: "Diana Evans", amount: 3000, method: "Crypto (BTC)", requested: "2024-01-15 10:45" },
  { id: "W004", user: "Charlie Davis", amount: 250, method: "Bank Transfer", requested: "2024-01-14 16:20" },
];

const recentDeposits = [
  { id: "D001", user: "Jane Smith", amount: 1000, method: "Stripe", status: "Completed", date: "2024-01-15 15:00" },
  { id: "D002", user: "Bob Wilson", amount: 500, method: "Crypto (ETH)", status: "Completed", date: "2024-01-15 13:30" },
  { id: "D003", user: "Alice Brown", amount: 2500, method: "PayPal", status: "Completed", date: "2024-01-15 11:00" },
  { id: "D004", user: "John Doe", amount: 750, method: "Stripe", status: "Completed", date: "2024-01-14 17:45" },
];

export default function AdminFinancePage() {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />

      <main
        className="pt-20 pb-8 px-6 transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? 260 : 72 }}
      >
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-1">Financial Control</h1>
            <p className="text-sm text-text-muted">Monitor deposits, withdrawals, and platform revenue.</p>
          </div>
        </FadeIn>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Deposits", value: "$245,600", icon: ArrowUpRight, color: "text-success", bg: "bg-success/10" },
            { label: "Total Withdrawals", value: "$98,400", icon: ArrowDownRight, color: "text-danger", bg: "bg-danger/10" },
            { label: "Pending Withdrawals", value: "$4,950", icon: Clock, color: "text-warning", bg: "bg-warning/10" },
            { label: "Net Revenue", value: "$147,200", icon: DollarSign, color: "text-accent-light", bg: "bg-accent/10" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={stat.label} delay={0.1 * i}>
                <Card>
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                  <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                </Card>
              </FadeIn>
            );
          })}
        </div>

        {/* Pending Withdrawals */}
        <FadeIn delay={0.3}>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock size={18} className="text-warning" />
                  Pending Withdrawals
                  <Badge variant="warning">{pendingWithdrawals.length}</Badge>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">ID</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">User</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Amount</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Method</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Requested</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingWithdrawals.map((w) => (
                      <tr key={w.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-sm font-mono text-text-muted">{w.id}</td>
                        <td className="py-3 px-4 text-sm font-medium text-text-primary">{w.user}</td>
                        <td className="py-3 px-4 text-sm font-medium text-danger">${w.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-text-primary">{w.method}</td>
                        <td className="py-3 px-4 text-sm text-text-muted">{w.requested}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="primary" size="sm" className="h-7 text-xs">
                              <CheckCircle size={12} />
                              Approve
                            </Button>
                            <Button variant="danger" size="sm" className="h-7 text-xs">
                              <XCircle size={12} />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Recent Deposits */}
        <FadeIn delay={0.4}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpRight size={18} className="text-success" />
                Recent Deposits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">ID</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">User</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Amount</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Method</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDeposits.map((d) => (
                      <tr key={d.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-sm font-mono text-text-muted">{d.id}</td>
                        <td className="py-3 px-4 text-sm font-medium text-text-primary">{d.user}</td>
                        <td className="py-3 px-4 text-sm font-medium text-success">+${d.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-text-primary">{d.method}</td>
                        <td className="py-3 px-4">
                          <Badge variant="success" dot>{d.status}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-text-muted">{d.date}</td>
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
