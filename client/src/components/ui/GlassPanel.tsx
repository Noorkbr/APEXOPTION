"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "strong" | "card";
}

export function GlassPanel({ children, className, variant = "default" }: GlassPanelProps) {
  const variantClasses = {
    default: "glass",
    strong: "glass-strong",
    card: "glass-card",
  };

  return (
    <div className={cn(variantClasses[variant], "rounded-2xl p-6", className)}>
      {children}
    </div>
  );
}
