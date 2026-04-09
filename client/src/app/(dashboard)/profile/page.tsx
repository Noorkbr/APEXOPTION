"use client";

import React from "react";
import { User, Mail, Shield, Camera, Bell } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FadeIn } from "@/components/animations/FadeIn";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-8 px-4 max-w-3xl mx-auto">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-1">Profile Settings</h1>
            <p className="text-sm text-text-muted">Manage your account information and preferences.</p>
          </div>
        </FadeIn>

        {/* Avatar Section */}
        <FadeIn delay={0.1}>
          <Card className="mb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-surface-3 border border-border flex items-center justify-center hover:bg-surface-2 transition-colors">
                  <Camera size={12} className="text-text-muted" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Demo User</h3>
                <p className="text-sm text-text-muted">demo@apexoptions.com</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="warning" dot>Demo Mode</Badge>
                  <Badge variant="muted">KYC: Not Verified</Badge>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* Personal Info */}
        <FadeIn delay={0.15}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={18} className="text-accent-light" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="Your name" defaultValue="Demo User" />
                <Input label="Email" type="email" placeholder="Email" defaultValue="demo@apexoptions.com" icon={<Mail size={16} />} />
              </div>
              <Button variant="primary" size="md">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Security */}
        <FadeIn delay={0.2}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={18} className="text-accent-light" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Current Password" type="password" placeholder="Enter current password" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="New Password" type="password" placeholder="New password" />
                <Input label="Confirm Password" type="password" placeholder="Confirm password" />
              </div>
              <Button variant="secondary" size="md">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </FadeIn>

        {/* KYC */}
        <FadeIn delay={0.25}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={18} className="text-warning" />
                KYC Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GlassPanel className="text-center py-8">
                <Shield size={40} className="text-text-muted/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Verify Your Identity
                </h3>
                <p className="text-sm text-text-muted max-w-sm mx-auto mb-6">
                  Complete KYC verification to unlock live trading, deposits, and withdrawals.
                </p>
                <Button variant="primary">
                  Start Verification
                </Button>
              </GlassPanel>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Notifications */}
        <FadeIn delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={18} className="text-accent-light" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Trade Notifications", desc: "Get notified when trades complete" },
                { label: "Deposit/Withdrawal", desc: "Updates on financial transactions" },
                { label: "Market Alerts", desc: "Price movement notifications" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 glass rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{item.label}</p>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                  <div className="w-10 h-6 bg-accent rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>
      </main>
    </div>
  );
}
