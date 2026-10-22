"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";
import { IconPhone } from "./icons";

export function AppBanner() {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="mx-auto max-w-7xl px-4 sm:px-6 py-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealContainer(reduced)}
    >
      <div className="rounded-card bg-asus-blue-soft grid md:grid-cols-[1fr_auto] items-center gap-8 px-6 md:px-12 py-10">
        <motion.div variants={revealItem(reduced)}>
          <h2 className="font-display text-2xl md:text-[32px] font-semibold text-asus-dark">
            Llévalo en tu celular
          </h2>
          <p className="font-sans text-sm md:text-base text-muted mt-3 max-w-md">
            La plataforma es 100% web: ábrela desde el navegador de tu celular y
            agrégala a tu pantalla de inicio como una app, sin descargarla de
            ninguna tienda.
          </p>
        </motion.div>
        <motion.div
          variants={revealItem(reduced)}
          className="h-28 w-28 rounded-card bg-asus-blue flex items-center justify-center mx-auto md:mx-0"
        >
          <IconPhone className="h-14 w-14 text-white" />
        </motion.div>
      </div>
    </motion.section>
  );
}
