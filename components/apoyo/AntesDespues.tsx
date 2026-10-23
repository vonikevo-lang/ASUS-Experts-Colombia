"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { BloqueAntesDespues } from "@/types/apoyo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { Placeholder } from "./Placeholder";

export function AntesDespues({ bloque }: { bloque: BloqueAntesDespues }) {
  const reduced = useReducedMotion();
  const [estado, setEstado] = useState<"antes" | "despues">("antes");
  const actual = estado === "antes" ? bloque.antes : bloque.despues;

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-asus-dark mb-4">{bloque.titulo}</h2>

      <div className="flex gap-1.5 mb-4">
        {(["antes", "despues"] as const).map((key) => {
          const label = key === "antes" ? bloque.antes.etiqueta : bloque.despues.etiqueta;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setEstado(key)}
              className={cn(
                "flex-1 rounded-btn py-2.5 px-2 font-sans text-sm font-medium transition-colors",
                estado === key ? "bg-asus-blue text-white" : "bg-asus-blue-soft text-muted",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={estado}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <Placeholder texto={actual.imagen} className="aspect-[4/3] w-full" />
          <p className="font-sans text-sm text-asus-dark mt-3">{actual.texto}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
