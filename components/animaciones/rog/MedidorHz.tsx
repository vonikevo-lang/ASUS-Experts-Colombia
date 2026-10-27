"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { rogTokens } from "../tokens/rog";

const CX = 100;
const CY = 108;
const R = 82;
const R_NEEDLE = 70;
const MAX_HZ = 300;
const PASO_MARCA = 30;
const BASE_HZ = 60;

function angulo(valor: number) {
  // 180° (izquierda, 0 Hz) a 0° (derecha, MAX_HZ), en radianes.
  return ((180 - (valor / MAX_HZ) * 180) * Math.PI) / 180;
}

/** Redondea a 3 decimales: evita que diferencias de coma flotante entre
 * servidor y cliente (Math.cos/sin) produzcan un mismatch de hidratación. */
function redondear(n: number) {
  return Math.round(n * 1000) / 1000;
}

function puntoEn(valor: number, radio: number) {
  const a = angulo(valor);
  return { x: redondear(CX + radio * Math.cos(a)), y: redondear(CY - radio * Math.sin(a)) };
}

/** Longitud de arco normalizada: con pathLength=100, offset = 100 - %recorrido. */
function offsetArco(valor: number) {
  return 100 - (Math.min(MAX_HZ, Math.max(0, valor)) / MAX_HZ) * 100;
}

function fraseComparativa(valor: number) {
  const veces = valor / BASE_HZ;
  const vecesTexto = Number.isInteger(veces) ? veces : Number(veces.toFixed(1));
  return `${vecesTexto} veces más imágenes por segundo que una pantalla común de ${BASE_HZ} Hz`;
}

interface MedidorHzProps {
  valorHz?: number;
  opciones?: number[];
}

/**
 * "Medidor de Hz": velocímetro semicircular que sube de 0 al valor del
 * modelo al entrar en pantalla, con comparativa frente a una pantalla de
 * 60 Hz y botones para comparar otras tasas (diseño: ROG · Tarea 7).
 */
export function MedidorHz({ valorHz = 240, opciones = [60, 144, 240] }: MedidorHzProps) {
  const reduced = useReducedMotion();
  const agujaRef = useRef<SVGLineElement>(null);
  const arcoRef = useRef<SVGPathElement>(null);
  const brilloRef = useRef<SVGPathElement>(null);
  const valorActualRef = useRef(0);
  const [numero, setNumero] = useState(0);
  const [objetivo, setObjetivo] = useState(valorHz);
  const [mostrarFrase, setMostrarFrase] = useState(false);

  function moverA(valor: number, duration: number) {
    setMostrarFrase(false);
    gsap.to(valorActualRef, {
      current: valor,
      duration,
      ease: "power4.out",
      onUpdate: () => {
        const v = valorActualRef.current;
        setNumero(Math.round(v));
        const { x, y } = puntoEn(v, R_NEEDLE);
        agujaRef.current?.setAttribute("x2", String(x));
        agujaRef.current?.setAttribute("y2", String(y));
        const off = offsetArco(v);
        arcoRef.current?.setAttribute("stroke-dashoffset", String(off));
      },
      onComplete: () => {
        setMostrarFrase(true);
        if (brilloRef.current) {
          gsap.fromTo(
            brilloRef.current,
            { opacity: 0.9 },
            { opacity: 0, duration: 0.6, ease: "power2.out" },
          );
        }
      },
    });
  }

  function elegir(valor: number) {
    setObjetivo(valor);
    moverA(valor, reduced ? 0 : 1.1);
  }

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (reduced) {
        valorActualRef.current = valorHz;
        setNumero(valorHz);
        const { x, y } = puntoEn(valorHz, R_NEEDLE);
        agujaRef.current?.setAttribute("x2", String(x));
        agujaRef.current?.setAttribute("y2", String(y));
        arcoRef.current?.setAttribute("stroke-dashoffset", String(offsetArco(valorHz)));
        setMostrarFrase(true);
        return;
      }

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => moverA(valorHz, 1.4),
      });

      return () => st.kill();
    },
    [reduced, valorHz],
  );

  const marcas = Array.from({ length: MAX_HZ / PASO_MARCA + 1 }, (_, i) => i * PASO_MARCA);

  return (
    <div ref={scope} className="mx-auto w-full max-w-sm text-center">
      <div
        className="rounded-card px-4 pb-6 pt-4"
        style={{ background: `linear-gradient(135deg, ${rogTokens.colors.from}, ${rogTokens.colors.to})` }}
      >
      <svg viewBox="0 0 200 120" className="mx-auto w-full" role="img" aria-label={`Medidor de tasa de refresco, ${numero} hercios`}>
        <defs>
          <linearGradient id="rog-medidor-gradiente" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={rogTokens.colors.accent} />
            <stop offset="100%" stopColor={rogTokens.colors.glow} />
          </linearGradient>
        </defs>

        <path
          d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          ref={arcoRef}
          d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          fill="none"
          stroke="url(#rog-medidor-gradiente)"
          strokeWidth="10"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100}
        />
        <path
          ref={brilloRef}
          d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          fill="none"
          stroke={rogTokens.colors.glow}
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0"
          style={{ filter: "blur(4px)" }}
        />

        {marcas.map((m) => {
          const interior = puntoEn(m, R - 12);
          const exterior = puntoEn(m, R + 2);
          return (
            <line
              key={m}
              x1={interior.x}
              y1={interior.y}
              x2={exterior.x}
              y2={exterior.y}
              stroke="#6b6b6b"
              strokeWidth={m % (PASO_MARCA * 2) === 0 ? 2 : 1}
            />
          );
        })}

        <line ref={agujaRef} x1={CX} y1={CY} x2={CX - R_NEEDLE} y2={CY} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        <circle cx={CX} cy={CY} r="6" fill="#ffffff" />
      </svg>

      <p className="-mt-6 font-display text-4xl font-bold text-white">
        {numero}
        <span className="ml-1 text-lg font-semibold text-white/60">Hz</span>
      </p>

      <p className="mx-auto mt-2 min-h-[2.5rem] max-w-xs font-sans text-sm text-white/70" aria-live="polite">
        {mostrarFrase ? fraseComparativa(objetivo) : ""}
      </p>

      <div className="mt-4 flex items-center justify-center gap-2">
        {opciones.map((op) => (
          <button
            key={op}
            type="button"
            aria-pressed={objetivo === op}
            onClick={() => elegir(op)}
            className="px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.04em] text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
            style={{
              clipPath: rogTokens.clipDiagonal,
              backgroundColor: objetivo === op ? rogTokens.colors.accent : "rgba(255,255,255,0.08)",
            }}
          >
            {op} Hz
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}
