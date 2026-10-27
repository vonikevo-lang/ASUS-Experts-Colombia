"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { zenbookTokens } from "../tokens/zenbook";

interface PerfilDelgadoProps {
  nombreProducto: string;
  grosorCm: number;
  pesoKg: number;
}

function formatear(valor: number) {
  return valor.toString().replace(".", ",");
}

/**
 * "Perfil delgado": una ilustración de perfil del portátil entra deslizándose
 * y luego se dibujan cotas técnicas (grosor y largo) con sus cifras, todo
 * dentro de un único SVG para que queden alineadas en cualquier tamaño
 * (diseño: Zenbook · Tarea 10).
 */
export function PerfilDelgado({ nombreProducto, grosorCm, pesoKg }: PerfilDelgadoProps) {
  const reduced = useReducedMotion();
  const ilustracionRef = useRef<SVGGElement>(null);
  const cotaVerticalRef = useRef<SVGPathElement>(null);
  const cotaHorizontalRef = useRef<SVGPathElement>(null);
  const grosorTextoRef = useRef<SVGTextElement>(null);
  const pesoTextoRef = useRef<SVGTextElement>(null);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (
        !ilustracionRef.current ||
        !cotaVerticalRef.current ||
        !cotaHorizontalRef.current ||
        !grosorTextoRef.current ||
        !pesoTextoRef.current
      ) {
        return;
      }

      if (reduced) {
        gsap.set(ilustracionRef.current, { x: 0, opacity: 1 });
        gsap.set([cotaVerticalRef.current, cotaHorizontalRef.current], { strokeDashoffset: 0 });
        gsap.set([grosorTextoRef.current, pesoTextoRef.current], { opacity: 1 });
        return;
      }

      gsap.set(ilustracionRef.current, { x: 40, opacity: 0 });
      gsap.set([cotaVerticalRef.current, cotaHorizontalRef.current], { strokeDashoffset: 100 });
      gsap.set([grosorTextoRef.current, pesoTextoRef.current], { opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(
            ilustracionRef.current,
            { x: 0, opacity: 1, duration: zenbookTokens.duration.long, ease: zenbookTokens.ease.out },
            0,
          );
          tl.to(
            cotaVerticalRef.current,
            { strokeDashoffset: 0, duration: 0.7, ease: "power2.out" },
            0.9,
          );
          tl.to(
            cotaHorizontalRef.current,
            { strokeDashoffset: 0, duration: 0.7, ease: "power2.out" },
            1.05,
          );
          tl.to(
            [grosorTextoRef.current, pesoTextoRef.current],
            { opacity: 1, duration: 0.5, ease: "power1.out" },
            1.75,
          );
        },
      });

      return () => st.kill();
    },
    [reduced, grosorCm, pesoKg],
  );

  return (
    <div ref={scope} className="mx-auto w-full max-w-md text-center">
      <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.3em] text-faint">
        {nombreProducto} · perfil
      </p>

      <svg viewBox="0 0 480 240" className="mx-auto w-full" role="img" aria-label={`Perfil del equipo: ${formatear(grosorCm)} cm de grosor, ${formatear(pesoKg)} kg`}>
        <g ref={ilustracionRef}>
          <rect x={60} y={138} width={340} height={14} rx={7} fill="#d7dade" stroke="#b9bdc4" strokeWidth={1} />
          <circle cx={74} cy={145} r={8} fill="#c3c7cd" />
          <rect x={372} y={128} width={18} height={10} rx={4} fill="#eceef0" stroke="#b9bdc4" strokeWidth={1} />
        </g>

        <path
          ref={cotaVerticalRef}
          d="M 430 138 L 418 138 M 430 138 L 430 152 M 430 152 L 418 152"
          fill="none"
          stroke={zenbookTokens.colors.glow}
          strokeWidth={1.5}
          pathLength={100}
          strokeDasharray={100}
        />
        <text ref={grosorTextoRef} x={436} y={149} className="fill-asus-dark font-sans text-[13px] font-light">
          {formatear(grosorCm)} cm
        </text>

        <path
          ref={cotaHorizontalRef}
          d="M 60 180 L 60 192 M 60 186 L 400 186 M 400 180 L 400 192"
          fill="none"
          stroke={zenbookTokens.colors.glow}
          strokeWidth={1.5}
          pathLength={100}
          strokeDasharray={100}
        />

        <text
          ref={pesoTextoRef}
          x={30}
          y={48}
          className="fill-asus-dark font-display text-[34px] font-light"
        >
          {formatear(pesoKg)} kg
        </text>
      </svg>
    </div>
  );
}
