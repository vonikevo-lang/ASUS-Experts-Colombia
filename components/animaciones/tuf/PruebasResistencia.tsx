"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { tufTokens } from "../tokens/tuf";

export interface PruebaResistencia {
  id: string;
  nombre: string;
}

interface PruebasResistenciaProps {
  pruebas: PruebaResistencia[];
  bloquesPorBarra?: number;
}

const STAGGER_PRUEBAS = 0.6;

/**
 * "Pruebas de resistencia": una lista de pruebas con barras segmentadas que
 * se llenan bloque por bloque; reutilizable para cualquier arreglo de datos
 * (specs, puertos, etc.) (diseño: TUF · Tarea 15).
 */
export function PruebasResistencia({ pruebas, bloquesPorBarra = 10 }: PruebasResistenciaProps) {
  const reduced = useReducedMotion();
  const bloqueRefs = useRef<Array<Array<HTMLDivElement | null>>>(pruebas.map(() => []));
  const etiquetaRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [superadas, setSuperadas] = useState(0);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      const todosLosBloques = bloqueRefs.current.flat();
      if (todosLosBloques.some((b) => b === null) || etiquetaRefs.current.some((e) => e === null)) return;

      if (reduced) {
        pruebas.forEach((_, i) => {
          gsap.set(bloqueRefs.current[i], { opacity: 1 });
          gsap.set(etiquetaRefs.current[i], { opacity: 1 });
        });
        setSuperadas(pruebas.length);
        return;
      }

      pruebas.forEach((_, i) => {
        gsap.set(bloqueRefs.current[i], { opacity: 0.15 });
        gsap.set(etiquetaRefs.current[i], { opacity: 0 });
      });
      setSuperadas(0);

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          const finFila = 0.1 + 0.05 * (bloquesPorBarra - 1);

          pruebas.forEach((_, i) => {
            const inicio = i * STAGGER_PRUEBAS;
            tl.to(
              bloqueRefs.current[i],
              { opacity: 1, duration: 0.1, ease: tufTokens.ease.mechanicSoft, stagger: 0.05 },
              inicio,
            );
            tl.call(() => setSuperadas((s) => s + 1), undefined, inicio + finFila);
            tl.fromTo(
              etiquetaRefs.current[i],
              { opacity: 0 },
              {
                keyframes: [
                  { opacity: 1, duration: 0.08 },
                  { opacity: 0.2, duration: 0.08 },
                  { opacity: 1, duration: 0.1 },
                ],
              },
              inicio + finFila,
            );
          });
        },
      });

      return () => st.kill();
    },
    [reduced, pruebas, bloquesPorBarra],
  );

  return (
    <div
      ref={scope}
      className="mx-auto w-full max-w-md rounded-card p-5"
      style={{ background: `linear-gradient(135deg, ${tufTokens.colors.from}, ${tufTokens.colors.to})` }}
    >
      <div className="space-y-4">
        {pruebas.map((prueba, i) => (
          <div key={prueba.id}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className={`text-xs ${tufTokens.fontStencil} text-white/80`}>{prueba.nombre}</span>
              <span
                ref={(el) => {
                  etiquetaRefs.current[i] = el;
                }}
                className={`text-[10px] font-bold ${tufTokens.fontStencil}`}
                style={{ color: tufTokens.colors.accent }}
              >
                SUPERADA
              </span>
            </div>
            <div className="flex gap-[3px]">
              {Array.from({ length: bloquesPorBarra }, (_, b) => (
                <div
                  key={b}
                  ref={(el) => {
                    bloqueRefs.current[i][b] = el;
                  }}
                  className="h-4 flex-1"
                  style={{
                    backgroundColor: tufTokens.colors.accent,
                    clipPath: "polygon(25% 0, 100% 0, 75% 100%, 0 100%)",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className={`mt-5 text-center text-sm ${tufTokens.fontStencil} text-white/70`} aria-live="polite">
        {superadas} / {pruebas.length}
      </p>
    </div>
  );
}
