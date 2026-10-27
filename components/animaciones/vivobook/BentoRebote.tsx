"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { vivobookTokens } from "../tokens/vivobook";
import { cn } from "@/lib/cn";

export interface BentoDato {
  id: string;
  etiqueta: string;
  /** Dato no numérico, se muestra tal cual (ej. "OLED 2.8K"). */
  texto?: string;
  /** Dato numérico: se anima con un conteo corto al entrar en pantalla. */
  numero?: number;
  decimales?: number;
  prefijo?: string;
  sufijo?: string;
}

interface BentoReboteProps {
  nombreProducto: string;
  /** Exactamente 6 datos: el 1º ocupa dos filas y el 2º dos columnas (desktop). */
  datos: BentoDato[];
}

const SPAN_CLASSES = ["md:row-span-2", "md:col-span-2", "", "", "", ""];

function formatearValor(valor: number, dato: BentoDato) {
  const decimales = dato.decimales ?? 0;
  return `${dato.prefijo ?? ""}${valor.toFixed(decimales)}${dato.sufijo ?? ""}`;
}

function formatear(dato: BentoDato) {
  return dato.numero !== undefined ? formatearValor(dato.numero, dato) : (dato.texto ?? "");
}

/**
 * "Bento con rebote": cuadrícula de 6 specs clave que entra con stagger y
 * rebote; al pasar el mouse la tarjeta se levanta y se inclina; los datos
 * numéricos cuentan desde 0 (diseño: Vivobook · Tarea 2).
 */
export function BentoRebote({ nombreProducto, datos }: BentoReboteProps) {
  const reduced = useReducedMotion();
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [valores, setValores] = useState<string[]>(() => datos.map(formatear));

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      const tarjetas = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));

      if (reduced) {
        gsap.set(tarjetas, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      gsap.set(tarjetas, { opacity: 0, scale: 0.7, y: 24 });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(tarjetas, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: vivobookTokens.duration.long,
            ease: vivobookTokens.ease.bounce,
            stagger: vivobookTokens.stagger,
          });

          // Los datos numéricos arrancan en 0 y cuentan hasta su valor real.
          setValores((prev) =>
            prev.map((v, i) => (datos[i].numero !== undefined ? formatearValor(0, datos[i]) : v)),
          );

          datos.forEach((dato, i) => {
            if (dato.numero === undefined) return;
            const proxy = { val: 0 };
            gsap.to(proxy, {
              val: dato.numero,
              duration: 0.6,
              delay: i * vivobookTokens.stagger,
              ease: "power1.out",
              onUpdate: () => {
                setValores((prev) => {
                  const next = [...prev];
                  next[i] = formatearValor(proxy.val, dato);
                  return next;
                });
              },
            });
          });
        },
      });

      return () => st.kill();
    },
    [reduced, datos],
  );

  function handleEnter(i: number) {
    if (reduced) return;
    gsap.to(cardRefs.current[i], { y: -4, rotate: 1, duration: 0.25, ease: "power2.out" });
  }

  function handleLeave(i: number) {
    gsap.to(cardRefs.current[i], { y: 0, rotate: 0, duration: 0.25, ease: "power2.out" });
  }

  return (
    <div ref={scope} className="mx-auto w-full max-w-2xl">
      <p className="mb-4 text-center font-sans text-xs font-medium uppercase tracking-[0.04em] text-faint">
        {nombreProducto} · lo esencial
      </p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
        {datos.map((dato, i) => (
          <div
            key={dato.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            className={cn("flex min-h-[6.5rem] flex-col justify-center rounded-2xl p-4", SPAN_CLASSES[i])}
            style={{ backgroundColor: vivobookTokens.pastel[i % vivobookTokens.pastel.length] }}
          >
            <p className="font-display text-lg font-bold text-asus-dark">{valores[i]}</p>
            <p className="mt-1 font-sans text-xs text-muted">{dato.etiqueta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
