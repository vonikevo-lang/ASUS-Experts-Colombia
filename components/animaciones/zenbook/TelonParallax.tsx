"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { zenbookTokens } from "../tokens/zenbook";

interface TelonParallaxProps {
  imagenSrc: string;
  imagenAlt: string;
  lineas: string[];
}

/**
 * "Telón con parallax": una imagen grande se revela de abajo hacia arriba y
 * el texto entra línea por línea desde detrás de una máscara. Mientras se
 * hace scroll, la imagen se mueve más lento que el texto (diseño: Zenbook ·
 * Tarea 12).
 */
export function TelonParallax({ imagenSrc, imagenAlt, lineas }: TelonParallaxProps) {
  const reduced = useReducedMotion();
  const clipRef = useRef<HTMLDivElement>(null);
  const imagenWrapRef = useRef<HTMLDivElement>(null);
  const lineaRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (!clipRef.current || !imagenWrapRef.current) return;
      const lineasEls = lineaRefs.current.filter((el): el is HTMLParagraphElement => el !== null);
      if (lineasEls.length === 0) return;

      if (reduced) {
        gsap.set(clipRef.current, { clipPath: "inset(0% 0 0 0)" });
        gsap.set(imagenWrapRef.current, { scale: 1, yPercent: 0 });
        gsap.set(lineasEls, { y: "0%" });
        return;
      }

      gsap.set(clipRef.current, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(imagenWrapRef.current, { scale: 1.25 });
      gsap.set(lineasEls, { y: "110%" });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(clipRef.current, { clipPath: "inset(0% 0 0 0)", duration: zenbookTokens.duration.long, ease: zenbookTokens.ease.out }, 0);
          tl.to(imagenWrapRef.current, { scale: 1, duration: zenbookTokens.duration.long, ease: zenbookTokens.ease.out }, 0);
          lineasEls.forEach((el, i) => {
            tl.to(el, { y: "0%", duration: 0.9, ease: "power3.out" }, 0.9 + i * zenbookTokens.stagger);
          });
        },
      });

      const parallax = gsap.to(imagenWrapRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        st.kill();
        parallax.kill();
      };
    },
    [reduced, lineas],
  );

  return (
    <div ref={scope} className="mx-auto w-full max-w-lg">
      <div
        ref={clipRef}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-card"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      >
        <div ref={imagenWrapRef} className="absolute inset-x-0" style={{ top: "-15%", height: "130%" }}>
          <Image src={imagenSrc} alt={imagenAlt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 512px" />
        </div>
      </div>

      <div className="mt-6 space-y-1 text-center">
        {lineas.map((linea, i) => (
          <div key={linea + i} className="overflow-hidden">
            <p
              ref={(el) => {
                lineaRefs.current[i] = el;
              }}
              className="font-display text-xl font-light text-asus-dark sm:text-2xl"
            >
              {linea}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
