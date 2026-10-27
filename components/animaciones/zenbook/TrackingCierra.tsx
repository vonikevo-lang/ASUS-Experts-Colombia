"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { zenbookTokens } from "../tokens/zenbook";

interface TrackingCierraProps {
  titulo: string;
  subtitulo: string;
}

/**
 * "Tracking que se cierra": el título entra con las letras muy separadas,
 * desenfocado y transparente, y se cierra hasta su tracking normal mientras
 * se enfoca. Debajo se traza una línea fina y el subtítulo aparece con fade
 * (diseño: Zenbook · Tarea 9).
 */
export function TrackingCierra({ titulo, subtitulo }: TrackingCierraProps) {
  const reduced = useReducedMotion();
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const lineaRef = useRef<HTMLDivElement>(null);
  const subtituloRef = useRef<HTMLParagraphElement>(null);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (!tituloRef.current || !lineaRef.current || !subtituloRef.current) return;

      if (reduced) {
        gsap.set(tituloRef.current, {
          letterSpacing: zenbookTokens.letterSpacing.normal,
          filter: "blur(0px)",
          opacity: 1,
          whiteSpace: "normal",
        });
        gsap.set(lineaRef.current, { scaleX: 1 });
        gsap.set(subtituloRef.current, { opacity: 1 });
        return;
      }

      gsap.set(tituloRef.current, {
        letterSpacing: zenbookTokens.letterSpacing.wide,
        filter: "blur(8px)",
        opacity: 0,
        whiteSpace: "nowrap",
      });
      gsap.set(lineaRef.current, { scaleX: 0 });
      gsap.set(subtituloRef.current, { opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({
            onComplete: () => gsap.set(tituloRef.current, { whiteSpace: "normal" }),
          });

          tl.to(
            tituloRef.current,
            {
              letterSpacing: zenbookTokens.letterSpacing.normal,
              filter: "blur(0px)",
              opacity: 1,
              duration: zenbookTokens.duration.long,
              ease: zenbookTokens.ease.out,
            },
            0,
          );
          tl.to(lineaRef.current, { scaleX: 1, duration: 1.6, ease: zenbookTokens.ease.out }, 0.4);
          tl.to(subtituloRef.current, { opacity: 1, duration: 1.2, ease: "power1.out" }, 0.9);
        },
      });

      return () => st.kill();
    },
    [reduced, titulo, subtitulo],
  );

  return (
    <div ref={scope} className="mx-auto w-full max-w-lg overflow-x-hidden px-4 text-center">
      <h2 ref={tituloRef} className="font-display text-3xl font-light uppercase text-asus-dark sm:text-4xl">
        {titulo}
      </h2>
      <div
        ref={lineaRef}
        aria-hidden="true"
        className="mx-auto mt-5 h-px w-24 bg-asus-dark/30"
        style={{ transformOrigin: "left center" }}
      />
      <p ref={subtituloRef} className="mt-4 font-sans text-xs font-light uppercase tracking-[0.3em] text-muted">
        {subtitulo}
      </p>
    </div>
  );
}
