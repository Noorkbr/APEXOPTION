"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  TrendingUp,
  LayoutDashboard,
  Wallet,
  Clock,
  LogOut,
  User,
  Menu,
  X,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const navLinks = [
  { label: "Trade", href: "/trade", icon: TrendingUp },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "History", href: "/history", icon: Clock },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { isMobileNavOpen, toggleMobileNav } = useUIStore();

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isLandingPage = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass-strong border-b border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg shadow-accent/30"
              >
                <Activity className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-lg font-bold tracking-tight">
                <span className="gradient-text">APEX</span>
                <span className="text-text-primary"> OPTIONS</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            {isAuthenticated && !isAuthPage && (
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link key={link.href} href={link.href}>
                      <motion.div
                        whileHover={{ y: -1 }}
                        className={cn(
                          "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "text-accent-light"
                            : "text-text-secondary hover:text-text-primary"
                        )}
                      >
                        <Icon size={16} />
                        {link.label}
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-accent/10 rounded-lg"
                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                <>
                  {/* Balance Display */}
                  <div className="hidden sm:flex items-center gap-2 glass rounded-xl px-4 py-2">
                    <span className="text-xs text-text-muted">
                      {user.isDemoMode ? "Demo" : "Live"}
                    </span>
                    <span className="text-sm font-bold text-text-primary">
                      ${(user.isDemoMode ? user.demoBalance : user.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                    {user.isDemoMode && (
                      <Badge variant="warning" className="text-[10px]">
                        DEMO
                      </Badge>
                    )}
                  </div>

                  {/* User Menu */}
                  <Link href="/profile">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="hidden sm:flex items-center gap-2 glass rounded-xl px-3 py-2 cursor-pointer hover:border-accent/20 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                        <User size={14} className="text-white" />
                      </div>
                      <span className="text-sm text-text-primary max-w-[100px] truncate">
                        {user.name}
                      </span>
                    </motion.div>
                  </Link>

                  {/* Logout */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => logout()}
                    className="hidden sm:flex text-text-muted hover:text-danger"
                  >
                    <LogOut size={16} />
                  </Button>

                  {/* Mobile Menu Toggle */}
                  <button
                    onClick={toggleMobileNav}
                    className="md:hidden p-2 text-text-secondary hover:text-text-primary"
                  >
                    {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </>
              ) : (
                !isAuthPage && (
                  <div className="flex items-center gap-2">
                    <Link href="/login">
                      <Button variant="ghost" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button variant="primary" size="sm">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isAuthenticated && isMobileNavOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-strong border-b border-border"
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href} onClick={toggleMobileNav}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent/10 text-accent-light"
                        : "text-text-secondary hover:bg-white/5"
                    )}
                  >
                    <Icon size={18} />
                    {link.label}
                  </div>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-border mt-2">
              <button
                onClick={() => { logout(); toggleMobileNav(); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-danger w-full hover:bg-danger/10 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
