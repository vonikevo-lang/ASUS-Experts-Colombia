"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { LaptopIllustration } from "@/components/entrenamiento/LaptopIllustration";
import { vivobookTokens } from "../tokens/vivobook";

export interface StickerDato {
  id: string;
  texto: string;
}

interface StickersCaenProps {
  nombreProducto: string;
  /** Exactamente 3 stickers; se usan en orden para posición y rotación final. */
  stickers: StickerDato[];
  imagen?: string;
  accentColor?: string;
}

const POSICIONES = [
  { top: "2%", left: "2%", rotacion: -8 },
  { top: "4%", right: "2%", rotacion: 6 },
  { top: "80%", rotacion: -4, centrado: true },
] as const;

/**
 * "Stickers que caen": 3 etiquetas caen desde arriba girando y rebotan sobre
 * el marco del portátil (nunca sobre la pantalla); al pasar el mouse el
 * sticker se despega y se endereza (diseño: Vivobook · Tarea 3).
 */
export function StickersCaen({
  nombreProducto,
  stickers,
  imagen,
  accentColor = vivobookTokens.colors.from,
}: StickersCaenProps) {
  const reduced = useReducedMotion();
  const stickerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [levantado, setLevantado] = useState<number | null>(null);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      const nodos = stickerRefs.current.filter((el): el is HTMLDivElement => Boolean(el));

      if (reduced) {
        gsap.set(nodos, { opacity: 1, y: 0, rotate: (i: number) => POSICIONES[i].rotacion });
        return;
      }

      gsap.set(nodos, { opacity: 0, y: -140, rotate: -25 });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          nodos.forEach((el, i) => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              rotate: POSICIONES[i].rotacion,
              duration: 0.9,
              delay: i * 0.15,
              ease: "back.out(2)",
            });
          });
        },
      });

      return () => st.kill();
    },
    [reduced],
  );

  function handleEnter(i: number) {
    if (reduced) return;
    setLevantado(i);
    gsap.to(stickerRefs.current[i], { y: -8, rotate: 0, duration: 0.25, ease: "power2.out" });
  }

  function handleLeave(i: number) {
    setLevantado((cur) => (cur === i ? null : cur));
    gsap.to(stickerRefs.current[i], {
      y: 0,
      rotate: POSICIONES[i].rotacion,
      duration: 0.25,
      ease: "power2.out",
    });
  }

  return (
    <div ref={scope} className="mx-auto w-full max-w-sm">
      <p className="mb-4 text-center font-sans text-xs font-medium uppercase tracking-[0.04em] text-faint">
        {nombreProducto}
      </p>

      <div className="relative mx-auto aspect-[4/3] w-full rounded-card bg-asus-blue-soft p-6">
        <div className="relative h-full w-full">
          {imagen ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imagen} alt={nombreProducto} className="h-full w-full object-contain" />
          ) : (
            <LaptopIllustration accent={accentColor} className="h-full w-full" />
          )}
        </div>

        {stickers.slice(0, 3).map((sticker, i) => {
          const pos = POSICIONES[i];
          return (
            <div
              key={sticker.id}
              className={`absolute ${"centrado" in pos && pos.centrado ? "left-1/2 -translate-x-1/2" : ""}`}
              style={{
                top: pos.top,
                left: "left" in pos ? pos.left : undefined,
                right: "right" in pos ? pos.right : undefined,
              }}
            >
              <div
                ref={(el) => {
                  stickerRefs.current[i] = el;
                }}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
                className={`max-w-[7rem] rounded-2xl border-4 border-white bg-white px-3 py-2 text-center font-sans text-[0.7rem] font-bold leading-tight text-asus-dark shadow-card transition-shadow duration-200 ${
                  levantado === i ? "shadow-elev" : ""
                }`}
              >
                {sticker.texto}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
