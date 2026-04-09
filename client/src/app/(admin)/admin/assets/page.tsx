"use client";

import React from "react";
import { Layers, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/FadeIn";
import { useUIStore } from "@/store/uiStore";

const assets = [
  { symbol: "EUR/USD", name: "Euro / US Dollar", type: "FOREX", payout: 85, active: true },
  { symbol: "GBP/USD", name: "British Pound / US Dollar", type: "FOREX", payout: 85, active: true },
  { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", type: "FOREX", payout: 82, active: true },
  { symbol: "AUD/USD", name: "Australian Dollar / US Dollar", type: "FOREX", payout: 80, active: false },
  { symbol: "BTC/USD", name: "Bitcoin / US Dollar", type: "CRYPTO", payout: 80, active: true },
  { symbol: "ETH/USD", name: "Ethereum / US Dollar", type: "CRYPTO", payout: 80, active: true },
  { symbol: "SOL/USD", name: "Solana / US Dollar", type: "CRYPTO", payout: 78, active: true },
  { symbol: "BNB/USD", name: "Binance Coin / US Dollar", type: "CRYPTO", payout: 75, active: false },
  { symbol: "XAU/USD", name: "Gold / US Dollar", type: "COMMODITY", payout: 82, active: true },
  { symbol: "XAG/USD", name: "Silver / US Dollar", type: "COMMODITY", payout: 80, active: true },
  { symbol: "OIL/USD", name: "Crude Oil / US Dollar", type: "COMMODITY", payout: 78, active: false },
];

export default function AdminAssetsPage() {
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
              <h1 className="text-2xl font-bold text-text-primary mb-1">Asset Management</h1>
              <p className="text-sm text-text-muted">Add, remove, and configure trading assets.</p>
            </div>
            <Button variant="primary" size="md">
              <Plus size={16} />
              Add Asset
            </Button>
          </div>
        </FadeIn>

        {/* Asset Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { type: "FOREX", count: assets.filter(a => a.type === "FOREX").length, color: "text-accent-light", bg: "bg-accent/10" },
            { type: "CRYPTO", count: assets.filter(a => a.type === "CRYPTO").length, color: "text-warning", bg: "bg-warning/10" },
            { type: "COMMODITY", count: assets.filter(a => a.type === "COMMODITY").length, color: "text-success", bg: "bg-success/10" },
          ].map((cat, i) => (
            <FadeIn key={cat.type} delay={0.1 * i}>
              <Card>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center`}>
                    <Layers className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">{cat.type}</p>
                    <p className="text-xl font-bold text-text-primary">{cat.count} Assets</p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Assets Table */}
        <FadeIn delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers size={18} className="text-accent-light" />
                All Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Symbol</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Name</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Type</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Payout %</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Toggle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <tr key={asset.symbol} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-sm font-bold text-text-primary">{asset.symbol}</td>
                        <td className="py-3 px-4 text-sm text-text-secondary">{asset.name}</td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            asset.type === "FOREX" ? "default" :
                            asset.type === "CRYPTO" ? "warning" : "success"
                          }>
                            {asset.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-success">{asset.payout}%</td>
                        <td className="py-3 px-4">
                          <Badge variant={asset.active ? "success" : "muted"} dot>
                            {asset.active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-text-muted hover:text-accent-light transition-colors">
                            {asset.active ? (
                              <ToggleRight size={24} className="text-success" />
                            ) : (
                              <ToggleLeft size={24} />
                            )}
                          </button>
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
