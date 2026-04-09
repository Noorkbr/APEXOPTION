"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  DollarSign,
  Layers,
  Shield,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";

const adminLinks = [
  { label: "Overview", href: "/admin", icon: BarChart3 },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Finance", href: "/admin/finance", icon: DollarSign },
  { label: "Assets", href: "/admin/assets", icon: Layers },
  { label: "Risk", href: "/admin/risk", icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 260 : 72 }}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed left-0 top-16 bottom-0 z-40 glass-strong border-r border-border flex flex-col"
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between">
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-primary">Admin Panel</p>
              <p className="text-[10px] text-text-muted">God Mode</p>
            </div>
          </motion.div>
        )}

        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "text-accent-light bg-accent/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                )}
              >
                <Icon size={18} className="flex-shrink-0" />
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {link.label}
                  </motion.span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeSidebar"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full"
                    transition={{ type: "spring", bounce: 0.15 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t border-border"
        >
          <div className="glass rounded-xl p-3">
            <p className="text-xs text-text-muted mb-1">Platform Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success font-medium">All systems operational</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}
