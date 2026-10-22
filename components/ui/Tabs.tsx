"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Tabs({ items, value, onChange, orientation = "horizontal", className }: TabsProps) {
  const reduced = useReducedMotion();
  const indicatorId = useId();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        "flex gap-1",
        orientation === "vertical" ? "flex-col" : "flex-row overflow-x-auto",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative shrink-0 px-4 py-2.5 font-sans text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue",
              active ? "text-asus-blue" : "text-muted hover:text-asus-dark",
            )}
          >
            {active && (
              <motion.span
                layoutId={`tabs-indicator-${indicatorId}`}
                className={cn(
                  "absolute bg-asus-blue",
                  orientation === "vertical"
                    ? "left-0 top-0 bottom-0 w-0.5"
                    : "left-0 right-0 bottom-0 h-0.5",
                )}
                transition={
                  reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                }
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
