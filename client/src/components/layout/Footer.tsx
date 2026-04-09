"use client";

import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">APEX</span>
                <span className="text-text-primary"> OPTIONS</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted max-w-sm leading-relaxed">
              Professional binary options trading platform with real-time charts,
              instant execution, and advanced risk management tools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Platform</h4>
            <ul className="space-y-2">
              {["Trade", "Dashboard", "Wallet", "History"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-text-muted hover:text-accent-light transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Terms of Service", "Privacy Policy", "Risk Disclosure", "AML Policy"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-text-muted hover:text-accent-light transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} APEX OPTIONS. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Trading involves significant risk. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
