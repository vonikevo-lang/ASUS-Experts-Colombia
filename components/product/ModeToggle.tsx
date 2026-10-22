"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type CompareMode = "tecnico" | "cliente";

interface ModeToggleProps {
  value: CompareMode;
  onChange: (mode: CompareMode) => void;
  className?: string;
}

const OPTIONS: { id: CompareMode; label: string }[] = [
  { id: "tecnico", label: "Modo técnico" },
  { id: "cliente", label: "Modo cliente" },
];

export function ModeToggle({ value, onChange, className }: ModeToggleProps) {
  const reduced = useReducedMotion();

  return (
    <div
      role="radiogroup"
      aria-label="Modo de visualización"
      className={cn("inline-flex p-1 rounded-chip bg-asus-blue-soft", className)}
    >
      {OPTIONS.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.id)}
            className="relative px-4 h-9 rounded-chip font-sans text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
          >
            {active && (
              <motion.span
                layoutId="mode-toggle-bg"
                className="absolute inset-0 bg-asus-blue rounded-chip"
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className={cn("relative z-10", active ? "text-white" : "text-asus-dark")}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
