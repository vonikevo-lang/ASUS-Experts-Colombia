"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimacionGsap } from "../useAnimacionGsap";
import { vivobookTokens } from "../tokens/vivobook";

export interface EtiquetaAngulo {
  /** Ángulo mínimo (0-180) a partir del cual aplica esta etiqueta. */
  umbral: number;
  texto: string;
}

interface Bisagra180Props {
  nombreProducto: string;
  etiquetas?: EtiquetaAngulo[];
  accentColor?: string;
}

export interface Bisagra180Handle {
  /** Vuelve al inicio de la sección para poder recorrer el giro otra vez. */
  reiniciar: () => void;
}

const ETIQUETAS_DEFAULT: EtiquetaAngulo[] = [
  { umbral: 0, texto: "Cerrada" },
  { umbral: 110, texto: "Modo escritorio" },
  { umbral: 150, texto: "Para compartir pantalla" },
  { umbral: 180, texto: "Totalmente plana" },
];

const HINGE_X = 40;
const HINGE_Y = 150;

function etiquetaPara(angulo: number, etiquetas: EtiquetaAngulo[]) {
  let actual = etiquetas[0];
  for (const e of etiquetas) {
    if (angulo >= e.umbral) actual = e;
  }
  return actual.texto;
}

/**
 * "Bisagra 180°": vista lateral del portátil cuya tapa gira de 0° a 180°
 * sincronizada con el scroll (sección fija/pin); un número grande muestra el
 * ángulo en vivo con su etiqueta correspondiente (diseño: Vivobook · Tarea 4).
 *
 * GSAP envuelve el elemento fijado en un nodo "pin-spacer" propio del DOM: si
 * React desmontara este componente (ej. por un `key` que cambia) mientras ese
 * envoltorio existe, su `removeChild` fallaría porque ya no coincide con el
 * árbol que React recuerda. Por eso "repetir" no remonta el componente: usa
 * el método `reiniciar` (ref) para volver al inicio de la sección y recorrer
 * el giro de nuevo con el propio scroll.
 */
export const Bisagra180 = forwardRef<Bisagra180Handle, Bisagra180Props>(function Bisagra180(
  { nombreProducto, etiquetas = ETIQUETAS_DEFAULT, accentColor = vivobookTokens.colors.from },
  ref,
) {
  const reduced = useReducedMotion();
  const lidRef = useRef<SVGGElement>(null);
  const [angulo, setAngulo] = useState(reduced ? 180 : 0);

  const scope = useAnimacionGsap<HTMLDivElement>(
    (containerRef) => {
      if (reduced || !lidRef.current) return;

      gsap.set(lidRef.current, { transformOrigin: `${HINGE_X}px ${HINGE_Y}px`, rotate: 0 });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1200",
        pin: true,
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nuevoAngulo = Math.min(180, Math.max(0, Math.round(self.progress * 180)));
          gsap.set(lidRef.current, { rotate: -nuevoAngulo });
          setAngulo((prev) => (prev === nuevoAngulo ? prev : nuevoAngulo));
        },
      });

      return () => st.kill();
    },
    [reduced, etiquetas],
  );

  useImperativeHandle(
    ref,
    () => ({
      reiniciar: () => {
        scope.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    }),
    [scope],
  );

  return (
    <div ref={scope} className="mx-auto w-full max-w-sm">
      <p className="mb-4 text-center font-sans text-xs font-medium uppercase tracking-[0.04em] text-faint">
        {nombreProducto} · abre la tapa con scroll
      </p>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-asus-blue-soft">
        <svg viewBox="0 0 300 220" className="h-full w-full" role="img" aria-hidden="true">
          <rect
            x={HINGE_X}
            y={HINGE_Y}
            width="220"
            height="16"
            rx="8"
            fill="#ffffff"
            stroke={accentColor}
            strokeWidth="2"
          />
          <g ref={lidRef}>
            <rect
              x={HINGE_X}
              y={HINGE_Y}
              width="180"
              height="16"
              rx="8"
              fill={accentColor}
              opacity="0.85"
            />
          </g>
          <circle cx={HINGE_X} cy={HINGE_Y + 8} r="7" fill={vivobookTokens.colors.glow} />
        </svg>

        <div className="absolute inset-x-0 bottom-4 text-center">
          <p className="font-display text-4xl font-bold text-asus-dark">{angulo}°</p>
          {reduced ? (
            <ul className="mt-2 flex flex-col items-center gap-0.5">
              {etiquetas.map((e) => (
                <li key={e.texto} className="font-sans text-xs text-muted">
                  {e.umbral}° · {e.texto}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.04em] text-muted">
              {etiquetaPara(angulo, etiquetas)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});
