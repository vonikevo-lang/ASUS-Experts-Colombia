"use client";

import { useId, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { tufTokens } from "../tokens/tuf";

export interface CaracteristicaFicha {
  id: string;
  texto: string;
}

interface SelloCertificacionProps {
  nombreProducto: string;
  caracteristicas: CaracteristicaFicha[];
  textoSello?: string;
}

/**
 * "Sello de certificación": un sello de aprobación cae e impacta sobre una
 * ficha técnica, con una sacudida corta, un anillo de polvo y textura de
 * tinta gastada (diseño: TUF · Tarea 14).
 */
export function SelloCertificacion({
  nombreProducto,
  caracteristicas,
  textoSello = "MIL-STD-810H · APROBADO",
}: SelloCertificacionProps) {
  const reduced = useReducedMotion();
  const filtroId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const fichaRef = useRef<HTMLDivElement>(null);
  const selloRef = useRef<HTMLDivElement>(null);
  const polvoRef = useRef<HTMLDivElement>(null);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (!fichaRef.current || !selloRef.current || !polvoRef.current) return;

      if (reduced) {
        gsap.set(selloRef.current, { xPercent: -50, yPercent: -50, scale: 1, rotate: -10, opacity: 1 });
        gsap.set(polvoRef.current, { opacity: 0 });
        gsap.set(fichaRef.current, { x: 0, y: 0 });
        return;
      }

      gsap.set(selloRef.current, { xPercent: -50, yPercent: -50, scale: 3, rotate: -25, opacity: 0 });
      gsap.set(polvoRef.current, { xPercent: -50, yPercent: -50, scale: 0.3, opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          const impacto = 0.3 + 0.45;

          tl.to(
            selloRef.current,
            { scale: 1, rotate: -10, opacity: 1, duration: 0.45, ease: tufTokens.ease.out },
            0.3,
          );
          tl.fromTo(
            polvoRef.current,
            { scale: 0.3, opacity: 0.8 },
            { scale: 2, opacity: 0, duration: 0.5, ease: "power2.out" },
            impacto,
          );
          tl.to(
            fichaRef.current,
            {
              keyframes: { x: [0, -3, 3, -2, 2, 0], y: [0, 2, -2, 1, -1, 0] },
              duration: tufTokens.shakeDuration,
            },
            impacto,
          );
        },
      });

      return () => st.kill();
    },
    [reduced],
  );

  return (
    <div
      ref={scope}
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-card p-6"
      style={{ background: `linear-gradient(135deg, ${tufTokens.colors.from}, ${tufTokens.colors.to})` }}
    >
      <svg width="0" height="0" aria-hidden="true">
        <filter id={filtroId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="3" />
        </filter>
      </svg>

      <div ref={fichaRef} className="rounded border border-white/15 bg-black/30 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-white/50">{nombreProducto} · ficha técnica</p>
        <ul className="space-y-1.5">
          {caracteristicas.map((c) => (
            <li key={c.id} className={`text-xs ${tufTokens.fontStencil} text-white/80`}>
              {c.texto}
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={polvoRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 rounded-full"
        style={{ border: `2px solid ${tufTokens.colors.accent}` }}
      />

      <div
        ref={selloRef}
        className="pointer-events-none absolute left-1/2 top-1/2 flex flex-col items-center justify-center rounded-lg border-4 px-5 py-2.5 text-center"
        style={{ borderColor: tufTokens.colors.accent, color: tufTokens.colors.accent, filter: `url(#${filtroId})` }}
      >
        <span className={`whitespace-nowrap text-sm font-bold ${tufTokens.fontStencil}`}>{textoSello}</span>
      </div>
    </div>
  );
}
