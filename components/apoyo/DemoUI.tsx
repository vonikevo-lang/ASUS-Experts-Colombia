"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { BloqueDemoUI } from "@/types/apoyo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { Placeholder } from "./Placeholder";

export function DemoUI({ bloque }: { bloque: BloqueDemoUI }) {
  const reduced = useReducedMotion();
  const [activo, setActivo] = useState(bloque.controlInicial);
  const control = bloque.controles.find((c) => c.id === activo) ?? bloque.controles[0];

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-asus-dark">{bloque.titulo}</h2>
      <p className="font-sans text-sm text-muted mt-1 mb-5">{bloque.descripcion}</p>

      <div className="rounded-card border border-border overflow-hidden flex flex-col sm:flex-row">
        <div className="flex-[1.1] p-4 bg-asus-blue-soft">
          <AnimatePresence mode="wait">
            <motion.div
              key={control.id}
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
            >
              <Placeholder texto={control.imagen} className="aspect-[4/3] w-full" />
              {control.notaSobreImagen && (
                <p className="font-sans text-xs text-asus-blue-deep mt-2.5">{control.notaSobreImagen}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex-1 bg-asus-dark p-5 flex flex-col gap-2">
          {bloque.controles.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActivo(c.id)}
              className={cn(
                "text-left rounded-btn border px-3 py-2.5 font-sans text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                c.id === control.id
                  ? "bg-asus-blue border-asus-blue text-white font-medium"
                  : "bg-[#2a2a2a] border-[#3a3a3a] text-[#ddd] hover:border-asus-blue-accent",
              )}
            >
              {c.etiqueta}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
