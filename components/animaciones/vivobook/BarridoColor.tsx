"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { LaptopIllustration } from "@/components/entrenamiento/LaptopIllustration";
import { vivobookTokens } from "../tokens/vivobook";

export interface ColorTapa {
  id: string;
  nombre: string;
  hex: string;
  /** Foto real de la tapa en ese color; si falta, se dibuja un portátil en SVG. */
  imagen?: string;
}

interface BarridoColorProps {
  nombreProducto: string;
  colores: ColorTapa[];
}

/**
 * "Barrido de color": la tapa cambia de color con un círculo que crece desde
 * abajo. Al entrar en pantalla recorre sola todos los colores una vez
 * (diseño: Vivobook · Tarea 1).
 */
export function BarridoColor({ nombreProducto, colores }: BarridoColorProps) {
  const reduced = useReducedMotion();
  const revealRef = useRef<HTMLDivElement>(null);
  const swatchRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [baseColor, setBaseColor] = useState(colores[0]);

  function animarSwatches(index: number) {
    swatchRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        scale: i === index ? 1.15 : 1,
        duration: reduced ? 0 : vivobookTokens.duration.short,
        ease: vivobookTokens.ease.bounce,
      });
    });
  }

  function cambiarColor(index: number) {
    const color = colores[index];
    setActiveIndex(index);
    animarSwatches(index);

    if (reduced || !revealRef.current) {
      setBaseColor(color);
      return;
    }

    gsap.set(revealRef.current, { clipPath: "circle(0% at 50% 100%)", opacity: 1 });
    gsap.to(revealRef.current, {
      clipPath: "circle(150% at 50% 100%)",
      duration: vivobookTokens.duration.long,
      ease: "power3.out",
      onComplete: () => {
        setBaseColor(color);
        gsap.set(revealRef.current, { opacity: 0 });
      },
    });
  }

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (reduced || colores.length < 2) return;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          for (let paso = 1; paso <= colores.length; paso++) {
            const indice = paso % colores.length;
            tl.call(() => cambiarColor(indice), undefined, paso * 0.9);
          }
        },
      });

      return () => st.kill();
    },
    [reduced, colores],
  );

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      swatchRefs.current[(index + 1) % colores.length]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      swatchRefs.current[(index - 1 + colores.length) % colores.length]?.focus();
    }
  }

  const colorEnRevelado = colores[activeIndex];

  return (
    <div ref={scope} className="mx-auto w-full max-w-sm text-center">
      <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.04em] text-faint">
        {nombreProducto} · colores disponibles
      </p>

      <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-card bg-asus-dark shadow-elev">
        <div className="absolute inset-0">
          {baseColor.imagen ? (
            <Image
              src={baseColor.imagen}
              alt={`${nombreProducto} en ${baseColor.nombre}`}
              fill
              className="object-cover"
            />
          ) : (
            <LaptopIllustration accent={baseColor.hex} className="h-full w-full" />
          )}
        </div>
        <div
          ref={revealRef}
          className="absolute inset-0 opacity-0"
          style={{ clipPath: "circle(0% at 50% 100%)" }}
        >
          {colorEnRevelado.imagen ? (
            <Image
              src={colorEnRevelado.imagen}
              alt={`${nombreProducto} en ${colorEnRevelado.nombre}`}
              fill
              className="object-cover"
            />
          ) : (
            <LaptopIllustration accent={colorEnRevelado.hex} className="h-full w-full" />
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        {colores.map((color, i) => (
          <button
            key={color.id}
            ref={(el) => {
              swatchRefs.current[i] = el;
            }}
            type="button"
            aria-label={`Ver color ${color.nombre}`}
            aria-pressed={activeIndex === i}
            onClick={() => cambiarColor(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="h-10 w-10 shrink-0 rounded-full border-[3px] border-white shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>

      <p className="mt-3 font-display text-sm font-semibold text-asus-dark">{baseColor.nombre}</p>
    </div>
  );
}
