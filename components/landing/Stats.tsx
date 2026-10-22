"use client";

import { motion } from "motion/react";
import { Counter } from "@/components/ui/Counter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";
import { IconTrophy } from "./icons";

export function Stats() {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="bg-asus-blue-soft"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealContainer(reduced)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <motion.div variants={revealItem(reduced)}>
          <p className="font-display text-[40px] font-bold text-asus-blue">
            <Counter value={20} suffix="+" />
          </p>
          <p className="font-sans text-sm text-muted mt-1">módulos</p>
        </motion.div>
        <motion.div variants={revealItem(reduced)}>
          <p className="font-display text-[40px] font-bold text-asus-blue">
            <Counter value={4} />
          </p>
          <p className="font-sans text-sm text-muted mt-1">líneas de producto</p>
        </motion.div>
        <motion.div variants={revealItem(reduced)}>
          <p className="font-display text-[40px] font-bold text-asus-blue">
            <Counter value={100} suffix="%" />
          </p>
          <p className="font-sans text-sm text-muted mt-1">en español</p>
        </motion.div>
        <motion.div variants={revealItem(reduced)} className="flex flex-col items-center">
          <IconTrophy className="h-9 w-9 text-asus-blue" />
          <p className="font-sans text-sm text-muted mt-2">Ranking por tienda</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
