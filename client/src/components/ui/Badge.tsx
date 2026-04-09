"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-accent/20 text-accent-light",
        success: "bg-success/20 text-success",
        danger: "bg-danger/20 text-danger",
        warning: "bg-warning/20 text-warning",
        info: "bg-info/20 text-blue-300",
        muted: "bg-white/5 text-text-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "success" && "bg-success",
            variant === "danger" && "bg-danger",
            variant === "warning" && "bg-warning",
            variant === "info" && "bg-blue-400",
            (!variant || variant === "default") && "bg-accent",
            variant === "muted" && "bg-text-muted"
          )}
        />
      )}
      {children}
    </span>
  );
}
