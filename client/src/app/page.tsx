"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  Globe,
  Lock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animations/FadeIn";

const features = [
  {
    icon: Zap,
    title: "Instant Execution",
    description: "One-click Call/Put trading with sub-second order execution on all markets.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: BarChart3,
    title: "Advanced Charts",
    description: "Real-time candlestick charts with RSI, Bollinger Bands, and Moving Averages.",
    color: "text-accent-light",
    bg: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "JWT authentication, encrypted data, and comprehensive KYC verification.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Globe,
    title: "Multi-Asset Trading",
    description: "Trade Forex pairs, Cryptocurrencies, and Commodities — all in one platform.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Lock,
    title: "Risk Management",
    description: "Set your own limits with adjustable expiration times and investment amounts.",
    color: "text-danger-light",
    bg: "bg-danger/10",
  },
  {
    icon: Sparkles,
    title: "Demo Account",
    description: "Practice with $10,000 virtual balance. Master trading before going live.",
    color: "text-accent-light",
    bg: "bg-accent/10",
  },
];

const stats = [
  { value: "85%", label: "Max Payout" },
  { value: "12+", label: "Trading Assets" },
  { value: "<1s", label: "Execution Speed" },
  { value: "24/7", label: "Market Access" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-dark/10 rounded-full blur-[100px]" />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-text-secondary font-medium">
                  Markets are open — Start trading now
                </span>
              </div>
            </FadeIn>

            {/* Heading */}
            <FadeIn delay={0.2}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="text-text-primary">Trade Smarter with</span>
                <br />
                <span className="gradient-text animate-gradient">APEX OPTIONS</span>
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn delay={0.3}>
              <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
                Professional binary options platform with real-time charts,
                instant execution, and up to{" "}
                <span className="text-accent-light font-semibold">85% returns</span>.
                Start with a free $10,000 demo account.
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button variant="primary" size="xl" className="min-w-[200px]">
                    Start Trading Free
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/trade">
                  <Button variant="secondary" size="xl" className="min-w-[200px]">
                    <Activity size={18} />
                    View Live Markets
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* Stats Bar */}
            <FadeIn delay={0.5}>
              <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="glass rounded-2xl p-4 text-center"
                  >
                    <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                Everything You Need to{" "}
                <span className="gradient-text">Trade Like a Pro</span>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                Advanced tools, real-time data, and institutional-grade security —
                all in one sleek platform.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <FadeIn key={feature.title} delay={0.1 * i}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="glass-card p-6 hover:border-accent/20 transition-colors h-full"
                  >
                    <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trading Preview Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                Powerful <span className="gradient-text">Trading Terminal</span>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                Professional-grade charting with real-time data feeds and one-click execution.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass-card p-1 rounded-2xl overflow-hidden max-w-5xl mx-auto">
              {/* Mock Trading Terminal */}
              <div className="bg-surface rounded-xl p-6">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-accent-light" />
                      <span className="text-lg font-bold text-text-primary">EUR/USD</span>
                    </div>
                    <span className="text-2xl font-bold text-success">1.0847</span>
                    <span className="text-sm text-success">+0.23%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="glass rounded-lg px-3 py-1.5 text-xs text-text-muted">1m</div>
                    <div className="glass rounded-lg px-3 py-1.5 text-xs text-accent-light border border-accent/20">5m</div>
                    <div className="glass rounded-lg px-3 py-1.5 text-xs text-text-muted">15m</div>
                    <div className="glass rounded-lg px-3 py-1.5 text-xs text-text-muted">1h</div>
                  </div>
                </div>

                {/* Chart Area (Placeholder with gradient) */}
                <div className="h-[300px] rounded-xl bg-surface-2 border border-border mb-6 flex items-end justify-center overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-text-muted text-sm">Live chart loads here</p>
                  </div>
                  {/* Fake candlestick bars */}
                  <div className="flex items-end gap-1 p-4 relative z-10">
                    {Array.from({ length: 40 }).map((_, i) => {
                      const height = 30 + Math.random() * 200;
                      const isGreen = Math.random() > 0.45;
                      return (
                        <div
                          key={i}
                          className={`w-2 rounded-sm ${isGreen ? "bg-success/60" : "bg-danger/60"}`}
                          style={{ height: `${height}px` }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center cursor-pointer hover:bg-success/20 transition-colors">
                      <p className="text-xs text-success mb-1">CALL</p>
                      <p className="text-2xl font-bold text-success">↑ UP</p>
                      <p className="text-xs text-text-muted mt-1">85% Payout</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 text-center cursor-pointer hover:bg-danger/20 transition-colors">
                      <p className="text-xs text-danger mb-1">PUT</p>
                      <p className="text-2xl font-bold text-danger">↓ DOWN</p>
                      <p className="text-xs text-text-muted mt-1">85% Payout</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="glass-card p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                  Ready to Start Trading?
                </h2>
                <p className="text-text-secondary max-w-lg mx-auto mb-8">
                  Join thousands of traders on APEX OPTIONS.
                  Get your free $10,000 demo account and start practicing today.
                </p>
                <Link href="/register">
                  <Button variant="primary" size="xl">
                    Create Free Account
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
