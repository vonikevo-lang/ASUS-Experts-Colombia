"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { vivobookTokens } from "../tokens/vivobook";

export interface SpecDestacada {
  id: string;
  etiqueta: string;
  valor: string;
}

interface FichaDestacadaProps {
  nombreProducto: string;
  specs: SpecDestacada[];
  clienteIdeal: string;
}

/**
 * "Ficha destacada": lista vertical de las specs que más diferencian a esta
 * referencia (pantalla, memoria, etc.), cada fila entra alternando desde un
 * lado distinto; cierra con el cliente ideal (diseño: Vivobook, variante de
 * portada).
 */
export function FichaDestacada({ nombreProducto, specs, clienteIdeal }: FichaDestacadaProps) {
  const reduced = useReducedMotion();
  const filaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const clienteRef = useRef<HTMLParagraphElement>(null);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      const filas = filaRefs.current.filter((el): el is HTMLDivElement => el !== null);
      if (filas.length === 0 || !clienteRef.current) return;

      if (reduced) {
        gsap.set(filas, { opacity: 1, x: 0 });
        gsap.set(clienteRef.current, { opacity: 1 });
        return;
      }

      gsap.set(filas, { opacity: 0, x: (i: number) => (i % 2 === 0 ? -24 : 24) });
      gsap.set(clienteRef.current, { opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(filas, {
            opacity: 1,
            x: 0,
            duration: vivobookTokens.duration.short,
            ease: vivobookTokens.ease.bounce,
            stagger: vivobookTokens.stagger,
          });
          tl.to(clienteRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.1");
        },
      });

      return () => st.kill();
    },
    [reduced, specs],
  );

  return (
    <div ref={scope} className="mx-auto w-full max-w-sm rounded-card bg-white p-6 shadow-elev">
      <p className="mb-4 text-center font-sans text-xs font-medium uppercase tracking-[0.04em] text-faint">
        {nombreProducto} · lo que lo diferencia
      </p>

      <div className="space-y-3">
        {specs.map((spec, i) => (
          <div
            key={spec.id}
            ref={(el) => {
              filaRefs.current[i] = el;
            }}
            className="flex items-center gap-3 rounded-2xl p-3"
            style={{ backgroundColor: vivobookTokens.pastel[i % vivobookTokens.pastel.length] }}
          >
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: vivobookTokens.colors.from }}
            />
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.04em] text-muted">{spec.etiqueta}</p>
              <p className="font-display text-sm font-bold text-asus-dark">{spec.valor}</p>
            </div>
          </div>
        ))}
      </div>

      <p ref={clienteRef} className="mt-4 text-center font-sans text-xs italic text-muted">
        {clienteIdeal}
      </p>
    </div>
  );
}
