"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { zenbookTokens } from "../tokens/zenbook";

interface DestelloMetalicoProps {
  nombreAcabado: string;
  material: string;
}

/**
 * "Destello metálico": la tapa (aluminio cepillado) gira muy poco en 3D
 * mientras una franja de luz la cruza, como el reflejo al girar el equipo.
 * En escritorio el reflejo sigue al mouse; en táctil se repite cada 5 s
 * (diseño: Zenbook · Tarea 11).
 */
export function DestelloMetalico({ nombreAcabado, material }: DestelloMetalicoProps) {
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tapaRef = useRef<HTMLDivElement>(null);
  const reflejoRef = useRef<HTMLDivElement>(null);
  const textoRef = useRef<HTMLDivElement>(null);
  const entroRef = useRef(false);
  const moverReflejoRef = useRef<((valor: number) => void) | null>(null);
  const repeticionRef = useRef<gsap.core.Tween | null>(null);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (!tapaRef.current || !reflejoRef.current || !textoRef.current) return;

      if (reduced) {
        gsap.set(tapaRef.current, { rotateY: 0 });
        gsap.set(reflejoRef.current, { opacity: 0 });
        gsap.set(textoRef.current, { opacity: 1 });
        return;
      }

      gsap.set(tapaRef.current, { rotateY: -16 });
      gsap.set(reflejoRef.current, { xPercent: -150, opacity: 0 });
      gsap.set(textoRef.current, { opacity: 0 });

      moverReflejoRef.current = gsap.quickTo(reflejoRef.current, "xPercent", {
        duration: 0.6,
        ease: "power3.out",
      });

      const esTactil = window.matchMedia("(hover: none)").matches;

      function repetirDestello() {
        if (!reflejoRef.current) return;
        gsap
          .timeline()
          .set(reflejoRef.current, { xPercent: -150, opacity: 1 })
          .to(reflejoRef.current, { xPercent: 150, duration: 1.2, ease: "power2.inOut" })
          .to(reflejoRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
        repeticionRef.current = gsap.delayedCall(5, repetirDestello);
      }

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({
            onComplete: () => {
              entroRef.current = true;
              if (esTactil) repeticionRef.current = gsap.delayedCall(5, repetirDestello);
            },
          });

          tl.to(reflejoRef.current, { opacity: 1, duration: 0.1 }, 0);
          tl.to(
            reflejoRef.current,
            { xPercent: 150, duration: zenbookTokens.duration.long, ease: "power2.inOut" },
            0,
          );
          tl.to(tapaRef.current, { rotateY: 0, duration: zenbookTokens.duration.long, ease: "power2.inOut" }, 0);
          tl.to(reflejoRef.current, { opacity: 0, duration: 0.3 }, zenbookTokens.duration.long - 0.1);
          tl.to(textoRef.current, { opacity: 1, duration: 0.6, ease: "power1.out" }, zenbookTokens.duration.long + 0.1);
        },
      });

      return () => {
        st.kill();
        repeticionRef.current?.kill();
      };
    },
    [reduced],
  );

  function manejarMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!entroRef.current || !moverReflejoRef.current || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const relativoX = (e.clientX - rect.left) / rect.width;
    moverReflejoRef.current(relativoX * 160 - 80);
    gsap.to(reflejoRef.current, { opacity: 0.6, duration: 0.3 });
  }

  function manejarMouseLeave() {
    if (!entroRef.current) return;
    gsap.to(reflejoRef.current, { opacity: 0, duration: 0.4 });
  }

  return (
    <div ref={scope} className="mx-auto w-full max-w-sm">
      <div
        ref={wrapperRef}
        className="relative aspect-square rounded-card shadow-elev"
        style={{ perspective: "1000px" }}
        onMouseMove={manejarMouseMove}
        onMouseLeave={manejarMouseLeave}
      >
        <div
          ref={tapaRef}
          className="absolute inset-0 overflow-hidden rounded-card"
          style={{
            background:
              "repeating-linear-gradient(100deg, #cfd3d8 0px, #e8eaed 2px, #b8bcc2 4px, #dde0e4 6px)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25))" }}
          />
          <div
            ref={reflejoRef}
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/2 w-1/2"
            style={{
              background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.8), transparent)",
              filter: "blur(10px)",
            }}
          />
        </div>
      </div>

      <div ref={textoRef} className="mt-4 text-center">
        <p className="font-display text-sm font-light uppercase tracking-[0.3em] text-asus-dark">
          {nombreAcabado}
        </p>
        <p className="mt-1 font-sans text-xs text-muted">{material}</p>
      </div>
    </div>
  );
}
