"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { rogTokens } from "../tokens/rog";

type Modo = "ola" | "respiracion" | "estatico";

interface Tecla {
  id: string;
  col: number;
  span: number;
}

const COLUMNAS = 14;

/** 4 filas de 14 teclas + una fila inferior con espaciadora de 8 columnas. */
const TECLADO: Tecla[][] = (() => {
  const filas: Tecla[][] = [];
  for (let fila = 0; fila < 4; fila++) {
    filas.push(Array.from({ length: COLUMNAS }, (_, col) => ({ id: `${fila}-${col}`, col, span: 1 })));
  }
  filas.push([
    { id: "4-0", col: 0, span: 1 },
    { id: "4-1", col: 1, span: 1 },
    { id: "4-2", col: 2, span: 1 },
    { id: "4-espaciadora", col: 3, span: 8 },
    { id: "4-11", col: 11, span: 1 },
    { id: "4-12", col: 12, span: 1 },
    { id: "4-13", col: 13, span: 1 },
  ]);
  return filas;
})();

/** Color arcoíris según la columna (rojo a magenta), usado en reposo y en la ola. */
function colorColumna(col: number, luz: number, sat = 90) {
  const hue = (col / (COLUMNAS - 1)) * 300;
  return `hsl(${hue}deg ${sat}% ${luz}%)`;
}

const MODOS: { id: Modo; etiqueta: string }[] = [
  { id: "ola", etiqueta: "Ola" },
  { id: "respiracion", etiqueta: "Respiración" },
  { id: "estatico", etiqueta: "Estático" },
];

interface OlaRgbTecladoProps {
  titulo?: string;
}

/**
 * "Ola RGB de teclado": ilustra Aura Sync (RGB por tecla) con una ola de
 * color que recorre el teclado al entrar en pantalla y 3 modos para
 * explorar: Ola, Respiración y Estático (diseño: ROG · Tarea 6).
 */
export function OlaRgbTeclado({ titulo = "Aura Sync · Iluminación RGB por tecla" }: OlaRgbTecladoProps) {
  const reduced = useReducedMotion();
  const teclasRef = useRef<Record<string, HTMLDivElement | null>>({});
  const loopRef = useRef<gsap.core.Timeline | null>(null);
  const [modoActivo, setModoActivo] = useState<Modo | null>(null);

  function teclasDeColumna(col: number) {
    return Object.entries(teclasRef.current)
      .filter(([id]) => TECLADO.flat().find((t) => t.id === id)?.col === col)
      .map(([, el]) => el)
      .filter((el): el is HTMLDivElement => el !== null);
  }

  function todasLasTeclas() {
    return Object.values(teclasRef.current).filter((el): el is HTMLDivElement => el !== null);
  }

  function reposoArcoiris(duration = 0.4) {
    TECLADO.flat().forEach((tecla) => {
      const el = teclasRef.current[tecla.id];
      if (!el) return;
      gsap.to(el, {
        backgroundColor: colorColumna(tecla.col, 22, 55),
        boxShadow: "none",
        duration,
        overwrite: "auto",
      });
    });
  }

  function pasoOla() {
    const tl = gsap.timeline();
    for (let col = 0; col < COLUMNAS; col++) {
      const teclas = teclasDeColumna(col);
      if (!teclas.length) continue;
      const t = col * 0.045;
      tl.to(
        teclas,
        {
          backgroundColor: colorColumna(col, 55),
          boxShadow: `0 0 10px 2px ${colorColumna(col, 55)}`,
          duration: 0.18,
          overwrite: "auto",
        },
        t,
      ).to(
        teclas,
        { backgroundColor: colorColumna(col, 22, 55), boxShadow: "none", duration: 0.5 },
        t + 0.22,
      );
    }
    return tl;
  }

  function iniciarModo(modo: Modo) {
    loopRef.current?.kill();
    setModoActivo(modo);

    if (reduced) {
      if (modo === "estatico") {
        todasLasTeclas().forEach((el) => gsap.set(el, { backgroundColor: rogTokens.colors.accent, boxShadow: "none" }));
      } else if (modo === "respiracion") {
        todasLasTeclas().forEach((el) => gsap.set(el, { backgroundColor: rogTokens.colors.accent, boxShadow: "none" }));
      } else {
        reposoArcoiris(0);
      }
      return;
    }

    if (modo === "ola") {
      loopRef.current = gsap.timeline({ repeat: -1, repeatDelay: 0.8 }).add(pasoOla());
    } else if (modo === "respiracion") {
      const teclas = todasLasTeclas();
      loopRef.current = gsap
        .timeline({ repeat: -1, yoyo: true })
        .to(teclas, {
          backgroundColor: rogTokens.colors.accent,
          boxShadow: `0 0 12px 3px ${rogTokens.colors.accent}`,
          duration: 1.1,
          ease: "sine.inOut",
        });
    } else {
      todasLasTeclas().forEach((el) =>
        gsap.to(el, { backgroundColor: rogTokens.colors.accent, boxShadow: "none", duration: 0.3, overwrite: "auto" }),
      );
    }
  }

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (reduced) {
        reposoArcoiris(0);
        return;
      }

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          pasoOla().eventCallback("onComplete", () => reposoArcoiris(0.3));
        },
      });

      return () => {
        st.kill();
        loopRef.current?.kill();
      };
    },
    [reduced],
  );

  return (
    <div ref={scope} className="mx-auto w-full max-w-xl">
      <p className="mb-4 text-center font-sans text-xs font-medium uppercase tracking-[0.04em] text-faint">
        {titulo}
      </p>

      <div
        className="rounded-card p-4"
        style={{ background: `linear-gradient(135deg, ${rogTokens.colors.from}, ${rogTokens.colors.to})` }}
      >
        <div className="flex flex-col gap-1.5">
          {TECLADO.map((fila, filaIndex) => (
            <div
              key={filaIndex}
              className="grid gap-1.5"
              style={{ gridTemplateColumns: `repeat(${COLUMNAS}, minmax(0, 1fr))` }}
            >
              {fila.map((tecla) => (
                <div
                  key={tecla.id}
                  ref={(el) => {
                    teclasRef.current[tecla.id] = el;
                  }}
                  aria-hidden="true"
                  className="h-5 rounded-[3px] bg-black/40 sm:h-6"
                  style={{ gridColumn: `span ${tecla.span} / span ${tecla.span}` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {MODOS.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={modoActivo === m.id}
            onClick={() => iniciarModo(m.id)}
            className="px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.04em] text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
            style={{
              clipPath: rogTokens.clipDiagonal,
              backgroundColor: modoActivo === m.id ? rogTokens.colors.accent : "rgba(255,255,255,0.08)",
            }}
          >
            {m.etiqueta}
          </button>
        ))}
      </div>
    </div>
  );
}
