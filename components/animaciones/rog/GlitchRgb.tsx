"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { rogTokens } from "../tokens/rog";

interface GlitchRgbProps {
  texto: string;
  /** Repite un micro-glitch cada 6 a 8 s mientras la sección sigue montada. */
  microGlitch?: boolean;
}

/** Recortes "inset()" en 7 pasos para simular franjas que saltan (steps(1)). */
const PASOS_GLITCH = [
  "inset(0% 0% 92% 0%)",
  "inset(18% 0% 60% 0%)",
  "inset(45% 0% 40% 0%)",
  "inset(10% 0% 75% 0%)",
  "inset(60% 0% 15% 0%)",
  "inset(30% 0% 55% 0%)",
  "inset(0% 0% 0% 0%)",
];

const DURACION_GLITCH = 0.8;
const DURACION_MICRO = 0.15;

/**
 * "Glitch RGB": título que entra con dos copias (cian y roja) desplazadas y
 * cortadas en franjas que saltan, parpadea y se estabiliza en texto blanco
 * con brillo rojo (diseño: ROG · Tarea 5).
 */
export function GlitchRgb({ texto, microGlitch = true }: GlitchRgbProps) {
  const reduced = useReducedMotion();
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const cianRef = useRef<HTMLHeadingElement>(null);
  const rojoRef = useRef<HTMLHeadingElement>(null);

  function glitchear(duracion: number) {
    if (!cianRef.current || !rojoRef.current || !tituloRef.current) return;
    const pasoDuracion = duracion / PASOS_GLITCH.length;
    const tl = gsap.timeline();

    PASOS_GLITCH.forEach((inset, i) => {
      const t = i * pasoDuracion;
      tl.set(cianRef.current, { clipPath: inset, x: i % 2 === 0 ? -4 : 2 }, t);
      tl.set(
        rojoRef.current,
        { clipPath: PASOS_GLITCH[(i + 2) % PASOS_GLITCH.length], x: i % 2 === 0 ? 3 : -2 },
        t,
      );
      tl.set(tituloRef.current, { opacity: i % 3 === 0 ? 0.35 : 1 }, t);
    });

    tl.set([cianRef.current, rojoRef.current], { clipPath: "inset(0% 0% 100% 0%)", x: 0 }, duracion);
    tl.set(tituloRef.current, { opacity: 1 }, duracion);
    tl.to(
      tituloRef.current,
      { textShadow: `0 0 14px ${rogTokens.colors.accent}99`, duration: 0.3 },
      duracion,
    );

    return tl;
  }

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (reduced) return;

      let microTimer: gsap.core.Tween | undefined;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          glitchear(DURACION_GLITCH);
          if (microGlitch) {
            const repetir = () => {
              glitchear(DURACION_MICRO);
              microTimer = gsap.delayedCall(gsap.utils.random(6, 8), repetir);
            };
            microTimer = gsap.delayedCall(gsap.utils.random(6, 8), repetir);
          }
        },
      });

      return () => {
        microTimer?.kill();
        st.kill();
      };
    },
    [reduced, microGlitch],
  );

  return (
    <div
      ref={scope}
      className="relative isolate overflow-hidden rounded-card px-6 py-10 text-center"
      style={{ background: `linear-gradient(135deg, ${rogTokens.colors.from}, ${rogTokens.colors.to})` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: rogTokens.scanlineOpacity,
          backgroundImage:
            "repeating-linear-gradient(to bottom, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative">
        <h2
          ref={tituloRef}
          className="relative font-display text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl"
          style={reduced ? { textShadow: `0 0 14px ${rogTokens.colors.accent}99` } : undefined}
        >
          {texto}
        </h2>
        {!reduced && (
          <>
            <h2
              ref={cianRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl"
              style={{ color: rogTokens.colors.cian, clipPath: "inset(0% 0% 100% 0%)" }}
            >
              {texto}
            </h2>
            <h2
              ref={rojoRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl"
              style={{ color: rogTokens.colors.accent, clipPath: "inset(0% 0% 100% 0%)" }}
            >
              {texto}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}
