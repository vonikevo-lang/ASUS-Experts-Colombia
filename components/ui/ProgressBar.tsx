"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE_STANDARD } from "@/lib/motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  trackClassName?: string;
  barClassName?: string;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  trackClassName,
  barClassName,
}: ProgressBarProps) {
  const reduced = useReducedMotion();
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("h-2 w-full rounded-chip bg-asus-blue-soft overflow-hidden", trackClassName, className)}
    >
      <motion.div
        className={cn("h-full rounded-chip bg-asus-blue", barClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={
          reduced ? { duration: 0 } : { duration: DURATION.section, ease: EASE_STANDARD }
        }
      />
    </div>
  );
}
