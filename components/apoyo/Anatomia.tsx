"use client";

import { useState } from "react";
import type { BloqueAnatomia } from "@/types/apoyo";
import { cn } from "@/lib/cn";
import { Placeholder } from "./Placeholder";

export function Anatomia({ bloque }: { bloque: BloqueAnatomia }) {
  const [activo, setActivo] = useState<string | null>(null);

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-asus-dark mb-4">Anatomía del equipo</h2>

      <div className="relative">
        <Placeholder texto={bloque.imagen} className="aspect-video w-full" />
        {bloque.puntos.map((punto, i) => (
          <button
            key={punto.id}
            type="button"
            aria-label={punto.etiqueta}
            onClick={() => setActivo((cur) => (cur === punto.id ? null : punto.id))}
            style={{ left: `${punto.x}%`, top: `${punto.y}%` }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border-2 border-white shadow-elev font-sans text-xs font-bold flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue",
              activo === punto.id ? "bg-asus-blue-deep text-white" : "bg-asus-blue text-white",
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {bloque.puntos.map((punto, i) => (
          <button
            key={punto.id}
            type="button"
            onClick={() => setActivo((cur) => (cur === punto.id ? null : punto.id))}
            className={cn(
              "w-full text-left flex gap-3 rounded-card border px-3 py-2.5 transition-colors",
              activo === punto.id ? "border-asus-blue bg-asus-blue-soft" : "border-border",
            )}
          >
            <span className="font-display text-xs font-bold text-asus-blue-deep shrink-0">{i + 1}</span>
            <span>
              <span className="font-sans text-sm font-medium text-asus-dark">{punto.etiqueta}</span>
              <span className="font-sans text-sm text-muted block">{punto.descripcion}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
