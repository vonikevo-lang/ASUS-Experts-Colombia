"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { tufTokens } from "../tokens/tuf";

interface PlacasBlindajeProps {
  nombreProducto: string;
}

const TEXTURA_PLACA =
  "repeating-linear-gradient(115deg, #4b4b4b 0px, #5a5a5a 2px, #3c3c3c 4px, #525252 6px)";

const PLACAS = [
  { id: "tl", clase: "left-0 top-0", clip: "polygon(14% 0, 100% 0, 100% 100%, 0 100%, 0 14%)", desde: { x: -200, y: -200 } },
  { id: "tr", clase: "right-0 top-0", clip: "polygon(0 0, 86% 0, 100% 14%, 100% 100%, 0 100%)", desde: { x: 200, y: -200 } },
  { id: "bl", clase: "left-0 bottom-0", clip: "polygon(0 0, 100% 0, 100% 100%, 14% 100%, 0 86%)", desde: { x: -200, y: 200 } },
  { id: "br", clase: "right-0 bottom-0", clip: "polygon(0 0, 100% 0, 100% 86%, 86% 100%, 0 100%)", desde: { x: 200, y: 200 } },
] as const;

const REMACHES = Array.from({ length: 8 }, (_, i) => {
  const angulo = (i / 8) * Math.PI * 2;
  return { x: 50 + Math.cos(angulo) * 38, y: 50 + Math.sin(angulo) * 38 };
});

/**
 * "Placas de blindaje": 4 placas metálicas entran desde las esquinas y se
 * ensamblan en un escudo alrededor del nombre del producto, con remaches y
 * el nombre encendiéndose en amarillo al final (diseño: TUF · Tarea 16).
 */
export function PlacasBlindaje({ nombreProducto }: PlacasBlindajeProps) {
  const reduced = useReducedMotion();
  const placaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const flashRefs = useRef<Array<HTMLDivElement | null>>([]);
  const remacheRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nombreRef = useRef<HTMLParagraphElement>(null);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      const placas = placaRefs.current.filter((el): el is HTMLDivElement => el !== null);
      const flashes = flashRefs.current.filter((el): el is HTMLDivElement => el !== null);
      const remaches = remacheRefs.current.filter((el): el is HTMLDivElement => el !== null);
      if (placas.length !== PLACAS.length || flashes.length !== PLACAS.length || remaches.length === 0 || !nombreRef.current) {
        return;
      }

      if (reduced) {
        gsap.set(placas, { x: 0, y: 0 });
        gsap.set(flashes, { opacity: 0 });
        gsap.set(remaches, { scale: 1 });
        gsap.set(nombreRef.current, { color: tufTokens.colors.accent });
        return;
      }

      gsap.set(placas, { x: (i: number) => PLACAS[i].desde.x, y: (i: number) => PLACAS[i].desde.y });
      gsap.set(flashes, { opacity: 0 });
      gsap.set(remaches, { scale: 0 });
      gsap.set(nombreRef.current, { color: tufTokens.colors.metal });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          const duracionPlaca = 0.5;

          tl.to(
            placas,
            { x: 0, y: 0, duration: duracionPlaca, ease: tufTokens.ease.mechanic, stagger: tufTokens.stagger },
            0,
          );

          placas.forEach((_, i) => {
            const aterriza = i * tufTokens.stagger + duracionPlaca;
            tl.fromTo(
              flashes[i],
              { opacity: 0 },
              { opacity: 0.9, duration: 0.06, repeat: 1, yoyo: true, ease: "none" },
              aterriza,
            );
          });

          const finPlacas = (PLACAS.length - 1) * tufTokens.stagger + duracionPlaca;
          tl.to(remaches, { scale: 1, duration: 0.08, stagger: 0.07, ease: tufTokens.ease.out }, finPlacas + 0.1);

          const finRemaches = finPlacas + 0.1 + 0.08 + 0.07 * (remaches.length - 1);
          tl.to(
            nombreRef.current,
            { color: tufTokens.colors.accent, duration: 0.4, ease: "power2.out" },
            finRemaches,
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
      className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-card"
      style={{ background: `linear-gradient(135deg, ${tufTokens.colors.from}, ${tufTokens.colors.to})` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(60deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 26px), repeating-linear-gradient(-60deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 26px), repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 26px)",
        }}
      />

      {PLACAS.map((placa, i) => (
        <div
          key={placa.id}
          ref={(el) => {
            placaRefs.current[i] = el;
          }}
          aria-hidden="true"
          className={`absolute h-[58%] w-[58%] ${placa.clase}`}
          style={{
            clipPath: placa.clip,
            background: TEXTURA_PLACA,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12), inset 2px 2px 5px rgba(0,0,0,0.5)",
          }}
        >
          <div
            ref={(el) => {
              flashRefs.current[i] = el;
            }}
            className="absolute inset-0 bg-white"
            style={{ clipPath: placa.clip }}
          />
        </div>
      ))}

      {REMACHES.map((r, i) => (
        <div
          key={i}
          ref={(el) => {
            remacheRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="absolute h-2 w-2 rounded-full"
          style={{
            left: `${r.x}%`,
            top: `${r.y}%`,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle at 35% 35%, #e8e8e8, #6b6b6b)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.6)",
          }}
        />
      ))}

      <p
        ref={nombreRef}
        className={`absolute left-1/2 top-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2 text-center text-sm font-bold ${tufTokens.fontStencil}`}
      >
        {nombreProducto}
      </p>
    </div>
  );
}
