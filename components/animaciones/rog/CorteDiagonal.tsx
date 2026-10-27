"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { rogTokens } from "../tokens/rog";

const CLIP_CENTRO = "polygon(48% 0%, 52% 0%, 58% 100%, 42% 100%)";
const CLIP_COMPLETO = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

interface CorteDiagonalProps {
  imagenSrc: string;
  imagenAlt: string;
  titulo: string;
  etiqueta?: string;
}

/**
 * "Corte diagonal": transición de entrada para una imagen de producto o de
 * juego: una línea roja cruza la sección, la imagen se revela con un
 * paralelogramo que se abre desde el centro y el título entra con skew,
 * seguido de una etiqueta tipo HUD con efecto de tipeo (diseño: ROG · Tarea 8).
 */
export function CorteDiagonal({ imagenSrc, imagenAlt, titulo, etiqueta = "ROG STRIX · SERIE G" }: CorteDiagonalProps) {
  const reduced = useReducedMotion();
  const lineaRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const etiquetaRef = useRef<HTMLSpanElement>(null);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (!clipRef.current || !tituloRef.current || !etiquetaRef.current) return;

      if (reduced) {
        gsap.set(clipRef.current, { clipPath: CLIP_COMPLETO });
        gsap.set(tituloRef.current, { skewX: 0, x: 0, opacity: 1 });
        etiquetaRef.current.textContent = etiqueta;
        return;
      }

      gsap.set(clipRef.current, { clipPath: CLIP_CENTRO });
      gsap.set(tituloRef.current, { skewX: -14, x: -40, opacity: 0 });
      etiquetaRef.current.textContent = "";

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          if (lineaRef.current) {
            tl.fromTo(
              lineaRef.current,
              { xPercent: -140, opacity: 1 },
              { xPercent: 140, duration: 0.25, ease: "power1.in" },
              0,
            );
          }

          tl.to(clipRef.current, { clipPath: CLIP_COMPLETO, duration: 0.9, ease: "power4.inOut" }, 0.1);
          tl.to(tituloRef.current, { skewX: 0, x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.85);

          const texto = { i: 0 };
          tl.to(
            texto,
            {
              i: etiqueta.length,
              duration: Math.min(1.2, etiqueta.length * 0.04),
              ease: "none",
              onUpdate: () => {
                if (etiquetaRef.current) etiquetaRef.current.textContent = etiqueta.slice(0, Math.round(texto.i));
              },
            },
            1.05,
          );

          return tl;
        },
      });

      return () => st.kill();
    },
    [reduced, etiqueta],
  );

  return (
    <div
      ref={scope}
      className="relative mx-auto aspect-[16/10] w-full max-w-lg overflow-hidden"
      style={{ clipPath: rogTokens.clipDiagonal }}
    >
      <div ref={clipRef} className="absolute inset-0" style={{ clipPath: CLIP_CENTRO }}>
        <Image src={imagenSrc} alt={imagenAlt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 512px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      {!reduced && (
        <div
          ref={lineaRef}
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-6 left-1/2 w-1 -translate-x-1/2 opacity-0"
          style={{
            background: rogTokens.colors.accent,
            boxShadow: `0 0 16px 4px ${rogTokens.colors.accent}`,
            transform: "rotate(16deg)",
          }}
        />
      )}

      <div className="absolute inset-x-0 bottom-0 p-5">
        <span
          ref={etiquetaRef}
          className="block font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-asus-blue-accent"
          style={{ color: rogTokens.colors.cian }}
        />
        <h3 ref={tituloRef} className="mt-1 font-display text-xl font-bold uppercase text-white sm:text-2xl">
          {titulo}
        </h3>
      </div>
    </div>
  );
}
