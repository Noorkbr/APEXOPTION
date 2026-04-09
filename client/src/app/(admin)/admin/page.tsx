"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/FadeIn";
import { useUIStore } from "@/store/uiStore";

const adminStats = [
  {
    label: "Total Users",
    value: "2,847",
    change: "+124",
    trend: "up",
    icon: Users,
    color: "text-accent-light",
    bg: "bg-accent/10",
  },
  {
    label: "Active Traders",
    value: "342",
    change: "+28",
    trend: "up",
    icon: Activity,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    label: "Total Volume",
    value: "$1.2M",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    label: "Platform PNL",
    value: "$184,500",
    change: "+8.7%",
    trend: "up",
    icon: TrendingUp,
    color: "text-info",
    bg: "bg-info/10",
  },
];

const alerts = [
  { type: "warning", message: "5 pending withdrawal requests", time: "2m ago" },
  { type: "info", message: "3 new KYC submissions", time: "15m ago" },
  { type: "danger", message: "Unusual trading activity detected on user #1247", time: "1h ago" },
  { type: "success", message: "System backup completed successfully", time: "3h ago" },
];

const recentUsers = [
  { name: "John Doe", email: "john@example.com", balance: 5420, status: "Active", kyc: "Approved" },
  { name: "Jane Smith", email: "jane@example.com", balance: 12300, status: "Active", kyc: "Pending" },
  { name: "Bob Wilson", email: "bob@example.com", balance: 890, status: "Banned", kyc: "None" },
  { name: "Alice Brown", email: "alice@example.com", balance: 34560, status: "Active", kyc: "Approved" },
  { name: "Charlie Davis", email: "charlie@example.com", balance: 2100, status: "Active", kyc: "Rejected" },
];

export default function AdminOverviewPage() {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />

      <main
        className="pt-20 pb-8 px-6 transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? 260 : 72 }}
      >
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-1">Admin Overview</h1>
            <p className="text-sm text-text-muted">Platform analytics and system health at a glance.</p>
          </div>
        </FadeIn>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {adminStats.map((stat, i) => {
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
          {/* Revenue Chart */}
          <FadeIn delay={0.3}>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-accent-light" />
                  Revenue Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-xl bg-surface-2 border border-border flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-10 h-10 text-text-muted/30 mx-auto mb-2" />
                    <p className="text-text-muted text-sm">Revenue chart loads here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Alerts */}
          <FadeIn delay={0.4}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-warning" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-start gap-3 p-3 glass rounded-xl"
                  >
                    <Badge
                      variant={
                        alert.type === "warning" ? "warning" :
                        alert.type === "danger" ? "danger" :
                        alert.type === "success" ? "success" : "info"
                      }
                      dot
                      className="mt-0.5 whitespace-nowrap"
                    >
                      {alert.type}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-primary">{alert.message}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{alert.time}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Recent Users */}
        <FadeIn delay={0.5}>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={18} className="text-accent-light" />
                Recent Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Name</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Email</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Balance</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">KYC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-sm font-medium text-text-primary">{user.name}</td>
                        <td className="py-3 px-4 text-sm text-text-muted">{user.email}</td>
                        <td className="py-3 px-4 text-sm font-medium text-text-primary">${user.balance.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={user.status === "Active" ? "success" : "danger"}
                            dot
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              user.kyc === "Approved" ? "success" :
                              user.kyc === "Pending" ? "warning" :
                              user.kyc === "Rejected" ? "danger" : "muted"
                            }
                          >
                            {user.kyc}
                          </Badge>
                        </td>
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
