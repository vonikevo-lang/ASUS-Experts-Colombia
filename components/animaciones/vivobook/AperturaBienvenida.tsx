"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { vivobookTokens } from "../tokens/vivobook";

interface AperturaBienvenidaProps {
  nombreProducto: string;
  clienteIdeal: string;
  specDestacada: string;
  accentColor?: string;
}

const HINGE_X = 40;
const HINGE_Y = 150;
const ANGULO_ABIERTO = 125;

/**
 * "Apertura de bienvenida": versión de entrada (sin scroll "pin") de la
 * bisagra lateral: la tapa se abre una sola vez al entrar en pantalla y
 * aterriza con el cliente ideal y el dato más fuerte de esta referencia
 * (diseño: Vivobook, variante de portada).
 */
export function AperturaBienvenida({
  nombreProducto,
  clienteIdeal,
  specDestacada,
  accentColor = vivobookTokens.colors.from,
}: AperturaBienvenidaProps) {
  const reduced = useReducedMotion();
  const lidRef = useRef<SVGGElement>(null);
  const textoRef = useRef<HTMLDivElement>(null);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (!lidRef.current || !textoRef.current) return;

      if (reduced) {
        gsap.set(lidRef.current, { transformOrigin: `${HINGE_X}px ${HINGE_Y}px`, rotate: -ANGULO_ABIERTO });
        gsap.set(textoRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(lidRef.current, { transformOrigin: `${HINGE_X}px ${HINGE_Y}px`, rotate: 0 });
      gsap.set(textoRef.current, { opacity: 0, y: 12 });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(lidRef.current, {
            rotate: -ANGULO_ABIERTO,
            duration: vivobookTokens.duration.long,
            ease: vivobookTokens.ease.bounce,
          });
          tl.to(textoRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.25");
        },
      });

      return () => st.kill();
    },
    [reduced],
  );

  return (
    <div ref={scope} className="mx-auto w-full max-w-sm">
      <p className="mb-4 text-center font-sans text-xs font-medium uppercase tracking-[0.04em] text-faint">
        {nombreProducto}
      </p>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-asus-blue-soft">
        <svg viewBox="0 0 300 220" className="h-full w-full" role="img" aria-hidden="true">
          <rect x={HINGE_X} y={HINGE_Y} width="220" height="16" rx="8" fill="#ffffff" stroke={accentColor} strokeWidth="2" />
          <g ref={lidRef}>
            <rect x={HINGE_X} y={HINGE_Y} width="180" height="16" rx="8" fill={accentColor} opacity="0.85" />
          </g>
          <circle cx={HINGE_X} cy={HINGE_Y + 8} r="7" fill={vivobookTokens.colors.glow} />
        </svg>
      </div>

      <div ref={textoRef} className="mt-4 rounded-card bg-white p-4 text-center shadow-elev">
        <p className="font-display text-base font-bold text-asus-dark">{specDestacada}</p>
        <p className="mt-1 font-sans text-sm text-muted">{clienteIdeal}</p>
      </div>
    </div>
  );
}
