"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

interface CompareBarProps {
  value: number;
  max?: number;
  highlight?: boolean;
  animateKey: string;
  reduced: boolean;
  className?: string;
}

export function CompareBar({ value, max = 10, highlight, animateKey, reduced, className }: CompareBarProps) {
  return (
    <div className={cn("h-2.5 rounded-chip bg-asus-blue-soft overflow-hidden", className)}>
      <motion.div
        key={animateKey}
        className={cn("h-full rounded-chip", highlight ? "bg-asus-blue" : "bg-asus-silver")}
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 26 }}
      />
    </div>
  );
}
