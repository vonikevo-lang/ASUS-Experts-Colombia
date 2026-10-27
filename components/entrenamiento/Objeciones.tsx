"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal, RevealGroup } from "./Reveal";
import { IconChevronDown } from "@/components/icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_STANDARD } from "@/lib/motion";
import type { ObjecionEntrenamiento } from "@/types/referencia";

interface ObjecionesProps {
  objeciones: ObjecionEntrenamiento[];
}

export function Objeciones({ objeciones }: ObjecionesProps) {
  const [abierta, setAbierta] = useState<number | null>(0);
  const reduced = useReducedMotion();

  if (objeciones.length === 0) return null;

  return (
    <section className="bg-asus-blue-soft py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="text-center font-display text-[28px] font-bold md:text-[40px]">
            Si el cliente dice...
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 space-y-3">
          {objeciones.map((obj, i) => {
            const open = abierta === i;
            return (
              <Reveal key={obj.dice} className="overflow-hidden rounded-card border border-border bg-white">
                <button
                  type="button"
                  onClick={() => setAbierta(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-asus-dark">&ldquo;{obj.dice}&rdquo;</span>
                  <IconChevronDown
                    className={`h-5 w-5 shrink-0 text-asus-blue transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.3, ease: EASE_STANDARD }}
                    >
                      <p className="px-5 pb-5 text-[15px] leading-[1.6] text-muted">
                        {obj.responde}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
