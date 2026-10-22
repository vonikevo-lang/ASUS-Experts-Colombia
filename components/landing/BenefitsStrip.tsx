"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";
import { IconClock, IconPhone, IconStar, IconGift } from "@/components/icons";

const BENEFITS = [
  { icon: IconClock, label: "5 min por módulo" },
  { icon: IconPhone, label: "Desde tu celular" },
  { icon: IconStar, label: "Gana puntos" },
  { icon: IconGift, label: "Premios cada mes" },
];

export function BenefitsStrip() {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="border-b border-border"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealContainer(reduced)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {BENEFITS.map(({ icon: Icon, label }) => (
          <motion.div key={label} className="flex items-center gap-3" variants={revealItem(reduced)}>
            <Icon className="h-7 w-7 text-asus-blue shrink-0" />
            <span className="font-sans text-sm font-medium text-asus-dark">{label}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
