"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_STANDARD } from "@/lib/motion";
import { Chip } from "@/components/ui/Chip";
import { IconClose } from "@/components/icons";
import { StickersCaen } from "@/components/animaciones/vivobook/StickersCaen";
import { CorteDiagonal } from "@/components/animaciones/rog/CorteDiagonal";
import { TrackingCierra } from "@/components/animaciones/zenbook/TrackingCierra";
import { FijacionObjetivo } from "@/components/animaciones/tuf/FijacionObjetivo";
import type { Referencia } from "@/types/referencia";

interface PortadaProps {
  referencia: Referencia;
  accent: string;
  volverHref: string;
}

export function Portada({ referencia, accent, volverHref }: PortadaProps) {
  const reduced = useReducedMotion();

  const titleLines = referencia.nombre.split(" — ");

  function renderAnimacionPortada() {
    switch (referencia.linea) {
      case "vivobook":
        return (
          <StickersCaen
            nombreProducto={referencia.nombre}
            imagen={referencia.imagen}
            accentColor={accent}
            stickers={referencia.leAlcanzaPara.slice(0, 3).map((texto, i) => ({ id: `beneficio-${i}`, texto }))}
          />
        );
      case "rog":
        return (
          <CorteDiagonal
            imagenSrc={referencia.imagen ?? ""}
            imagenAlt={referencia.nombre}
            titulo={referencia.nombre}
            etiqueta={`${referencia.linea.toUpperCase()} · ${referencia.codigo}`}
          />
        );
      case "zenbook":
        // Zenbook está pensado para fondo claro (tokens): se envuelve en su
        // propia tarjeta blanca al montarse sobre el hero oscuro de Portada.
        return (
          <div className="rounded-card bg-white p-6 shadow-elev">
            <TrackingCierra titulo={referencia.nombre} subtitulo={referencia.tagline} />
          </div>
        );
      case "tuf":
        return (
          <FijacionObjetivo
            nombreProducto={referencia.nombre}
            imagenSrc={referencia.imagen ?? ""}
            imagenAlt={referencia.nombre}
            lineas={["ESCANEANDO CHASIS... OK", `${referencia.codigo}: VERIFICADO`, `OBJETIVO: ${referencia.nombre.toUpperCase()}`]}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="entreno-galaxy relative min-h-[100svh] overflow-hidden">
      <div className="entreno-glow" />

      <Link
        href={volverHref}
        aria-label="Salir del entrenamiento"
        className="absolute left-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:left-8 md:top-8"
      >
        <IconClose className="h-5 w-5" />
      </Link>

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl grid-cols-1 items-center gap-10 px-6 py-28 md:grid-cols-2 md:gap-6 md:py-20">
        <div className="order-1 flex justify-center md:order-1">
          <div className="w-full animate-float-soft drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
            {renderAnimacionPortada()}
          </div>
        </div>

        <div className="order-2 md:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: EASE_STANDARD }}
          >
            <Chip line={referencia.linea}>{referencia.linea.toUpperCase()}</Chip>
          </motion.div>

          <h1 className="mt-4 font-display text-[36px] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-white md:text-[64px]">
            {titleLines.map((line, i) => (
              <motion.span
                key={line}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.5,
                  delay: reduced ? 0 : 0.25 + i * 0.12,
                  ease: EASE_STANDARD,
                }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 0.25 + titleLines.length * 0.12 + 0.1,
              ease: EASE_STANDARD,
            }}
            className="mt-6 max-w-md text-[17px] leading-[1.6] text-white/85"
          >
            {referencia.tagline}
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 0.25 + titleLines.length * 0.12 + 0.24,
              ease: EASE_STANDARD,
            }}
            className="mt-3 max-w-md text-[15px] leading-[1.6] text-white/65"
          >
            {referencia.codigo} · {referencia.duracionMin} min · {referencia.dificultad}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
