"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { BloqueSelectorColor } from "@/types/apoyo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { Placeholder } from "./Placeholder";
import { IconArrowLeft, IconArrowRight } from "../icons";

/** Galería tipo "Elige tu color" de asus.com: imagen grande + swatches + flechas. */
export function SelectorColor({ bloque }: { bloque: BloqueSelectorColor }) {
  const reduced = useReducedMotion();
  const [activoId, setActivoId] = useState(bloque.controlInicial);
  const indice = bloque.colores.findIndex((c) => c.id === activoId);
  const activo = bloque.colores[indice] ?? bloque.colores[0];

  function ir(paso: 1 | -1) {
    const total = bloque.colores.length;
    const siguiente = bloque.colores[(indice + paso + total) % total];
    setActivoId(siguiente.id);
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-asus-dark">{bloque.titulo}</h2>
      {bloque.descripcion && (
        <p className="font-sans text-sm text-muted mt-1 mb-5">{bloque.descripcion}</p>
      )}

      <div className="rounded-card border border-border bg-asus-blue-soft p-4 flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => ir(-1)}
          aria-label="Color anterior"
          className="shrink-0 w-10 h-10 rounded-full border border-asus-blue bg-white text-asus-blue flex items-center justify-center transition-colors hover:bg-asus-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
        >
          <IconArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activo.id}
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, x: -12 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
            >
              <Placeholder texto={activo.imagen} className="aspect-[4/3] w-full" />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => ir(1)}
          aria-label="Siguiente color"
          className="shrink-0 w-10 h-10 rounded-full border border-asus-blue bg-white text-asus-blue flex items-center justify-center transition-colors hover:bg-asus-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
        >
          <IconArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        {bloque.colores.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActivoId(c.id)}
            aria-label={c.nombre}
            aria-pressed={c.id === activo.id}
            className="p-0.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
          >
            <span
              style={{ backgroundColor: c.hex }}
              className={cn(
                "block w-7 h-7 rounded-full border-2 transition-shadow",
                c.id === activo.id ? "border-asus-blue shadow-elev" : "border-white shadow-card",
              )}
            />
          </button>
        ))}
      </div>
      <p className="text-center font-sans text-sm font-medium text-asus-dark mt-2">{activo.nombre}</p>
    </div>
  );
}
