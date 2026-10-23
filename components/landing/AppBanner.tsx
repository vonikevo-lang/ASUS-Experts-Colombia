"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";

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

        <motion.div variants={revealItem(reduced)} className="mx-auto md:mx-0" aria-hidden="true">
          {/* Mockup simple de celular — placeholder */}
          <div className="relative h-64 w-32 rounded-[1.75rem] border-[6px] border-asus-dark bg-asus-dark shadow-elev">
            <div className="absolute top-1.5 inset-x-0 flex justify-center">
              <div className="h-1.5 w-10 rounded-full bg-black/40" />
            </div>
            <div className="absolute inset-x-0 top-4 bottom-0 rounded-b-[1.1rem] bg-white overflow-hidden flex flex-col">
              <div className="h-10 bg-hero-gradient flex items-center px-2.5 gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span className="h-1.5 w-6 rounded-full bg-white/70" />
              </div>
              <div className="flex-1 p-2.5 space-y-2">
                <div className="h-2 w-3/4 rounded-chip bg-asus-blue-soft" />
                <div className="h-2 w-1/2 rounded-chip bg-asus-blue-soft" />
                <div className="h-12 rounded-card bg-asus-blue-soft mt-2" />
                <div className="h-2 w-2/3 rounded-chip bg-asus-blue-soft mt-2" />
                <div className="h-2 w-1/3 rounded-chip bg-asus-blue-soft" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
