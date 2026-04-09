"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

const directionConfig = {
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  up: { x: 0, y: 60 },
  down: { x: 0, y: -60 },
};

export function SlideIn({
  children,
  delay = 0,
  direction = "left",
  className,
}: SlideInProps) {
  const offset = directionConfig[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
