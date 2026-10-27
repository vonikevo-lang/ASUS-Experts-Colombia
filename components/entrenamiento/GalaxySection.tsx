"use client";

import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GalaxySectionProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

/**
 * Fondo oscuro de la línea (galaxia + halo) con paralaje suave (0.3x), diseño §6.
 */
export function GalaxySection({ children, className, glow = true }: GalaxySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40]);

  return (
    <section ref={ref} className={cn("entreno-galaxy relative overflow-hidden", className)}>
      <motion.div className="pointer-events-none absolute inset-[-10%]" style={{ y }}>
        {glow && <div className="entreno-glow" />}
      </motion.div>
      <div className="relative">{children}</div>
    </section>
  );
}
