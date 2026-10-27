"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}

const MotionTag = { div: motion.div, li: motion.li };

/** Fade + translateY(24px) al entrar en viewport, una sola vez (diseño §6). */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionEl = MotionTag[as];
  return (
    <MotionEl
      className={className}
      variants={revealItem(reduced)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionEl>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
}

/** Contenedor que escalona (80ms) la entrada de sus hijos `<Reveal>`. */
export function RevealGroup({ children, className }: RevealGroupProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={revealContainer(reduced)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
