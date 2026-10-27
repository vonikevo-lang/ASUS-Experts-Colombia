"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { tufTokens } from "../tokens/tuf";

interface FijacionObjetivoProps {
  nombreProducto: string;
  imagenSrc: string;
  imagenAlt: string;
  /** Líneas del panel de terminal, en orden (sin el prefijo "> "). */
  lineas: string[];
}

const ESQUINAS = [
  { id: "tl", clase: "left-3 top-3 border-l-[3px] border-t-[3px]", desde: { x: -36, y: -36 } },
  { id: "tr", clase: "right-3 top-3 border-r-[3px] border-t-[3px]", desde: { x: 36, y: -36 } },
  { id: "bl", clase: "left-3 bottom-3 border-l-[3px] border-b-[3px]", desde: { x: -36, y: 36 } },
  { id: "br", clase: "right-3 bottom-3 border-r-[3px] border-b-[3px]", desde: { x: 36, y: 36 } },
] as const;

/**
 * "Fijación de objetivo": 4 corchetes de mira se cierran sobre el producto,
 * una mira circular gira hasta detenerse y un panel de terminal escribe
 * líneas de diagnóstico una tras otra (diseño: TUF · Tarea 13).
 */
export function FijacionObjetivo({ nombreProducto, imagenSrc, imagenAlt, lineas }: FijacionObjetivoProps) {
  const reduced = useReducedMotion();
  const esquinaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const miraRef = useRef<SVGGElement>(null);
  const lineaRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      const esquinas = esquinaRefs.current.filter((el): el is HTMLDivElement => el !== null);
      const lineasEls = lineaRefs.current.filter((el): el is HTMLParagraphElement => el !== null);
      if (esquinas.length !== ESQUINAS.length || !miraRef.current || lineasEls.length === 0 || !cursorRef.current) {
        return;
      }

      if (reduced) {
        gsap.set(esquinas, { x: 0, y: 0, opacity: 1 });
        gsap.set(miraRef.current, { rotate: 0, opacity: 1 });
        lineasEls.forEach((el, i) => {
          el.textContent = `> ${lineas[i] ?? ""}`;
        });
        gsap.set(cursorRef.current, { opacity: 1 });
        return;
      }

      gsap.set(esquinas, {
        x: (i: number) => ESQUINAS[i].desde.x,
        y: (i: number) => ESQUINAS[i].desde.y,
        opacity: 0,
      });
      gsap.set(miraRef.current, { rotate: -90, opacity: 0, transformOrigin: "50% 50%" });
      lineasEls.forEach((el) => {
        el.textContent = "";
      });
      gsap.set(cursorRef.current, { opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(
            esquinas,
            { x: 0, y: 0, opacity: 1, duration: tufTokens.duration.long, ease: tufTokens.ease.mechanic, stagger: 0.04 },
            0,
          );
          tl.to(miraRef.current, { rotate: 0, opacity: 1, duration: 0.5, ease: tufTokens.ease.mechanic }, 0.2);

          let cursor = 0.9;
          lineasEls.forEach((el, i) => {
            const texto = `> ${lineas[i] ?? ""}`;
            const duracion = Math.max(0.3, texto.length * 0.025);
            const proxy = { n: 0 };
            tl.to(
              proxy,
              {
                n: texto.length,
                duration: duracion,
                ease: "none",
                onUpdate: () => {
                  el.textContent = texto.slice(0, Math.round(proxy.n));
                },
              },
              cursor,
            );
            cursor += duracion + 0.2;
          });

          tl.set(cursorRef.current, { opacity: 1 }, cursor);
        },
      });

      return () => st.kill();
    },
    [reduced, lineas],
  );

  return (
    <div
      ref={scope}
      className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-card"
      style={{ background: `linear-gradient(135deg, ${tufTokens.colors.from}, ${tufTokens.colors.to})` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 23px, #fff 24px), linear-gradient(90deg, transparent 23px, #fff 24px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute inset-10">
        <Image src={imagenSrc} alt={imagenAlt} fill className="object-contain" sizes="(max-width: 640px) 100vw, 448px" />
      </div>

      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <g ref={miraRef}>
          <circle cx="50" cy="50" r="14" fill="none" stroke={tufTokens.colors.accent} strokeWidth="1.2" />
          <line x1="50" y1="30" x2="50" y2="40" stroke={tufTokens.colors.accent} strokeWidth="1.2" />
          <line x1="50" y1="60" x2="50" y2="70" stroke={tufTokens.colors.accent} strokeWidth="1.2" />
          <line x1="30" y1="50" x2="40" y2="50" stroke={tufTokens.colors.accent} strokeWidth="1.2" />
          <line x1="60" y1="50" x2="70" y2="50" stroke={tufTokens.colors.accent} strokeWidth="1.2" />
        </g>
      </svg>

      {ESQUINAS.map((esquina, i) => (
        <div
          key={esquina.id}
          ref={(el) => {
            esquinaRefs.current[i] = el;
          }}
          aria-hidden="true"
          className={`absolute h-7 w-7 ${esquina.clase}`}
          style={{ borderColor: tufTokens.colors.accent }}
        />
      ))}

      <div className="absolute bottom-3 left-3 right-3 rounded bg-black/60 px-3 py-2 backdrop-blur-sm">
        <p className="mb-1 text-[10px] text-white/40">{nombreProducto}</p>
        {lineas.map((_, i) => (
          <p
            key={i}
            ref={(el) => {
              lineaRefs.current[i] = el;
            }}
            className={`text-[11px] ${tufTokens.fontStencil}`}
            style={{ color: tufTokens.colors.accent }}
          />
        ))}
        <span
          ref={cursorRef}
          aria-hidden="true"
          className={`inline-block h-3 w-[7px] ${reduced ? "" : "animate-pulse"}`}
          style={{ backgroundColor: tufTokens.colors.accent }}
        />
      </div>
    </div>
  );
}
