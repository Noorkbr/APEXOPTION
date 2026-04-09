"use client";

import React from "react";
import {
  Users,
  Search,
  MoreVertical,
  Shield,
  Ban,
  Eye,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/FadeIn";
import { useUIStore } from "@/store/uiStore";

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", balance: 5420, demoBalance: 8500, trades: 142, winRate: "68.3%", status: "Active", kyc: "Approved", joined: "2024-01-01" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", balance: 12300, demoBalance: 10000, trades: 89, winRate: "72.1%", status: "Active", kyc: "Pending", joined: "2024-01-05" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", balance: 890, demoBalance: 3200, trades: 45, winRate: "42.2%", status: "Banned", kyc: "None", joined: "2024-01-10" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", balance: 34560, demoBalance: 10000, trades: 312, winRate: "74.5%", status: "Active", kyc: "Approved", joined: "2023-12-15" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com", balance: 2100, demoBalance: 6700, trades: 67, winRate: "55.2%", status: "Active", kyc: "Rejected", joined: "2024-01-12" },
  { id: "6", name: "Diana Evans", email: "diana@example.com", balance: 8900, demoBalance: 10000, trades: 198, winRate: "65.7%", status: "Active", kyc: "Approved", joined: "2023-11-20" },
];

export default function AdminUsersPage() {
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-1">User Management</h1>
              <p className="text-sm text-text-muted">Manage user accounts, KYC, and permissions.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-64">
                <Input placeholder="Search users..." icon={<Search size={14} />} />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: "2,847", badge: null },
            { label: "Active", value: "2,654", badge: "success" },
            { label: "Banned", value: "42", badge: "danger" },
            { label: "Pending KYC", value: "18", badge: "warning" },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={0.1 * i}>
              <Card>
                <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Users Table */}
        <FadeIn delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={18} className="text-accent-light" />
                All Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">User</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Balance</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Trades</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Win Rate</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">KYC</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Joined</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-text-primary">{user.name}</p>
                            <p className="text-xs text-text-muted">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-text-primary">${user.balance.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-text-primary">{user.trades}</td>
                        <td className="py-3 px-4 text-sm text-text-primary">{user.winRate}</td>
                        <td className="py-3 px-4">
                          <Badge variant={user.status === "Active" ? "success" : "danger"} dot>
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
                        <td className="py-3 px-4 text-sm text-text-muted">{user.joined}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Shield size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-danger">
                              <Ban size={14} />
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
      </main>
    </div>
  );
}
