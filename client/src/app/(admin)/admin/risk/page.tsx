"use client";

import React from "react";
import { Shield, AlertTriangle, Percent, DollarSign, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FadeIn } from "@/components/animations/FadeIn";
import { useUIStore } from "@/store/uiStore";

export default function AdminRiskPage() {
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
            <h1 className="text-2xl font-bold text-text-primary mb-1">Risk Management</h1>
            <p className="text-sm text-text-muted">Configure platform risk parameters and exposure limits.</p>
          </div>
        </FadeIn>

        {/* Risk Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Current Exposure", value: "$45,200", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
            { label: "Max Exposure Limit", value: "$500,000", icon: Shield, color: "text-accent-light", bg: "bg-accent/10" },
            { label: "Default Payout", value: "85%", icon: Percent, color: "text-success", bg: "bg-success/10" },
            { label: "Active Positions", value: "34", icon: BarChart3, color: "text-info", bg: "bg-info/10" },
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payout Settings */}
          <FadeIn delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent size={18} className="text-success" />
                  Payout Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Default Payout (%)" type="number" defaultValue="85" />
                <Input label="Maximum Payout (%)" type="number" defaultValue="92" />
                <Input label="Minimum Payout (%)" type="number" defaultValue="70" />

                <GlassPanel className="py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">House Edge</span>
                    <span className="font-bold text-accent-light">15%</span>
                  </div>
                </GlassPanel>

                <Button variant="primary" size="md">Save Payout Settings</Button>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Exposure Limits */}
          <FadeIn delay={0.35}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield size={18} className="text-warning" />
                  Exposure Limits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Global Exposure Limit ($)" type="number" defaultValue="500000" />
                <Input label="Per-User Max Trade ($)" type="number" defaultValue="10000" />
                <Input label="Per-User Max Daily Volume ($)" type="number" defaultValue="50000" />
                <Input label="Max Concurrent Trades Per User" type="number" defaultValue="10" />

                <Button variant="primary" size="md">Save Exposure Limits</Button>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Trade Limits */}
          <FadeIn delay={0.4}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign size={18} className="text-accent-light" />
                  Trade Amount Limits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Minimum Trade Amount ($)" type="number" defaultValue="1" />
                <Input label="Maximum Trade Amount ($)" type="number" defaultValue="10000" />
                <Input label="Minimum Withdrawal ($)" type="number" defaultValue="10" />
                <Input label="Maximum Withdrawal ($)" type="number" defaultValue="50000" />

                <Button variant="primary" size="md">Save Trade Limits</Button>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Risk Alerts */}
          <FadeIn delay={0.45}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-danger" />
                  Risk Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { level: "Critical", msg: "User #1247 has 15 consecutive wins", severity: "danger" },
                  { level: "Warning", msg: "Daily volume approaching 80% of limit", severity: "warning" },
                  { level: "Info", msg: "BTC/USD volatility increased by 35%", severity: "info" },
                  { level: "Warning", msg: "User #892 rapid-fire trading detected", severity: "warning" },
                ].map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 glass rounded-xl">
                    <Badge
                      variant={alert.severity as "danger" | "warning" | "info"}
                      dot
                      className="mt-0.5 whitespace-nowrap"
                    >
                      {alert.level}
                    </Badge>
                    <p className="text-xs text-text-primary">{alert.msg}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
