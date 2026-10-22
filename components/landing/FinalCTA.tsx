"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { buttonClasses } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";

export function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <motion.section
      id="premios"
      className="bg-asus-blue-deep text-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={revealContainer(reduced)}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center">
        <motion.h2
          variants={revealItem(reduced)}
          className="font-display text-[32px] md:text-[40px] font-bold uppercase tracking-[-0.01em]"
        >
          Únete y empieza a ganar
        </motion.h2>
        <motion.p variants={revealItem(reduced)} className="font-sans text-base text-white/80 mt-4">
          Entrena, compara y sube en el ranking de tu tienda. Es gratis para
          asesores de venta ASUS.
        </motion.p>
        <motion.div variants={revealItem(reduced)} className="mt-8">
          <Link href="/app" className={buttonClasses("primary", "!bg-white !text-asus-blue hover:!bg-white/90")}>
            Únete y empieza a ganar
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
