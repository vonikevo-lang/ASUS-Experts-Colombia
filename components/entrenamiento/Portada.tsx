"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_STANDARD } from "@/lib/motion";
import { Chip } from "@/components/ui/Chip";
import { IconClose } from "@/components/icons";
import { referencias } from "@/data/referencias";
import { StickersCaen } from "@/components/animaciones/vivobook/StickersCaen";
import { BentoRebote, type BentoDato } from "@/components/animaciones/vivobook/BentoRebote";
import { AperturaBienvenida } from "@/components/animaciones/vivobook/AperturaBienvenida";
import { FichaDestacada } from "@/components/animaciones/vivobook/FichaDestacada";
import { CorteDiagonal } from "@/components/animaciones/rog/CorteDiagonal";
import { GlitchRgb } from "@/components/animaciones/rog/GlitchRgb";
import { MedidorHz } from "@/components/animaciones/rog/MedidorHz";
import { TrackingCierra } from "@/components/animaciones/zenbook/TrackingCierra";
import { PerfilDelgado } from "@/components/animaciones/zenbook/PerfilDelgado";
import { TelonParallax } from "@/components/animaciones/zenbook/TelonParallax";
import { FijacionObjetivo } from "@/components/animaciones/tuf/FijacionObjetivo";
import { SelloCertificacion } from "@/components/animaciones/tuf/SelloCertificacion";
import { PlacasBlindaje } from "@/components/animaciones/tuf/PlacasBlindaje";
import type { FichaItem, Referencia } from "@/types/referencia";

interface PortadaProps {
  referencia: Referencia;
  accent: string;
  volverHref: string;
}

/** Lee "Aprox. X kg, Y cm de grosor" de la ficha; null si el dato no viene en ese formato. */
function extraerPortabilidad(ficha: FichaItem[]) {
  const item = ficha.find((f) => f.componente === "Portabilidad");
  const match = item?.dato.match(/([\d.,]+)\s*kg.*?([\d.,]+)\s*cm/i);
  if (!match) return null;
  return { pesoKg: Number(match[1].replace(",", ".")), grosorCm: Number(match[2].replace(",", ".")) };
}

/** Lee la tasa de refresco ("240Hz", "60 Hz"...) de la ficha "Pantalla"; null si no viene. */
function extraerHz(ficha: FichaItem[]) {
  const item = ficha.find((f) => f.componente === "Pantalla");
  const match = item?.dato.match(/(\d+)\s*Hz/i);
  return match ? Number(match[1]) : null;
}

function fichaABento(ficha: FichaItem[]): BentoDato[] {
  return ficha.slice(0, 6).map((item, i) => ({ id: `${item.componente}-${i}`, etiqueta: item.componente, texto: item.dato }));
}

/**
 * Qué animación usa cada referencia dentro de su línea, para que no se vean
 * todas iguales. Cada lista solo incluye las animaciones que hoy tienen todo
 * el dato real que necesitan desde `data/referencias.ts`:
 * - Vivobook: Barrido de color (necesita colores de tapa reales) y Bisagra
 *   180° (usa scroll "pin" de 1.5 pantallas, no cabe en una portada) quedan
 *   fuera; en su lugar hay 2 variantes de portada hechas a la medida
 *   (Apertura de bienvenida, Ficha destacada) para llegar a 4 opciones.
 * - Zenbook: Destello metálico queda fuera (necesita nombre de acabado y
 *   material reales, que no existen todavía en el modelo de datos).
 * - ROG/TUF: Ola RGB de teclado y Pruebas de resistencia quedan disponibles
 *   para cuando haya una 4ª referencia en esa línea.
 */
const ROTACION_VIVOBOOK = ["stickers", "bento", "apertura", "ficha"] as const;
const ROTACION_ROG = ["corte", "glitch", "medidor"] as const;
const ROTACION_ZENBOOK = ["tracking", "perfil", "telon"] as const;
const ROTACION_TUF = ["fijacion", "sello", "placas"] as const;

export function Portada({ referencia, accent, volverHref }: PortadaProps) {
  const reduced = useReducedMotion();

  const titleLines = referencia.nombre.split(" — ");
  const indiceEnLinea = referencias.filter((r) => r.linea === referencia.linea).findIndex((r) => r.slug === referencia.slug);

  function renderAnimacionPortada() {
    const imagenSrc = referencia.imagen ?? "";

    switch (referencia.linea) {
      case "vivobook": {
        const opcion = ROTACION_VIVOBOOK[indiceEnLinea % ROTACION_VIVOBOOK.length];
        if (opcion === "bento") {
          return <BentoRebote nombreProducto={referencia.nombre} datos={fichaABento(referencia.ficha)} />;
        }
        if (opcion === "apertura") {
          return (
            <AperturaBienvenida
              nombreProducto={referencia.nombre}
              clienteIdeal={referencia.clienteIdeal}
              specDestacada={`${referencia.pantallaDetalle.pulgadas}" ${referencia.pantallaDetalle.tipo} · ${referencia.memoria.ram} ${referencia.memoria.tipoRam}`}
              accentColor={accent}
            />
          );
        }
        if (opcion === "ficha") {
          return (
            <FichaDestacada
              nombreProducto={referencia.nombre}
              clienteIdeal={referencia.clienteIdeal}
              specs={[
                {
                  id: "pantalla",
                  etiqueta: "Pantalla",
                  valor: `${referencia.pantallaDetalle.pulgadas}" ${referencia.pantallaDetalle.tipo} ${referencia.pantallaDetalle.resolucion}${referencia.pantallaDetalle.hz > 60 ? ` · ${referencia.pantallaDetalle.hz} Hz` : ""}`,
                },
                { id: "memoria", etiqueta: "Memoria", valor: `${referencia.memoria.ram} ${referencia.memoria.tipoRam}` },
                { id: "procesador", etiqueta: "Procesador", valor: `${referencia.procesador.marca} ${referencia.procesador.modelo}` },
              ]}
            />
          );
        }
        return (
          <StickersCaen
            nombreProducto={referencia.nombre}
            imagen={referencia.imagen}
            accentColor={accent}
            stickers={referencia.leAlcanzaPara.slice(0, 3).map((texto, i) => ({ id: `beneficio-${i}`, texto }))}
          />
        );
      }

      case "rog": {
        const opcion = ROTACION_ROG[indiceEnLinea % ROTACION_ROG.length];
        if (opcion === "glitch") {
          return <GlitchRgb texto={referencia.nombre} />;
        }
        if (opcion === "medidor") {
          const hz = extraerHz(referencia.ficha);
          if (hz) {
            return <MedidorHz valorHz={hz} opciones={Array.from(new Set([60, 144, hz])).sort((a, b) => a - b)} />;
          }
        }
        return (
          <CorteDiagonal
            imagenSrc={imagenSrc}
            imagenAlt={referencia.nombre}
            titulo={referencia.nombre}
            etiqueta={`${referencia.linea.toUpperCase()} · ${referencia.codigo}`}
          />
        );
      }

      case "zenbook": {
        const opcion = ROTACION_ZENBOOK[indiceEnLinea % ROTACION_ZENBOOK.length];
        let contenido = <TrackingCierra titulo={referencia.nombre} subtitulo={referencia.tagline} />;
        if (opcion === "perfil") {
          const portabilidad = extraerPortabilidad(referencia.ficha);
          if (portabilidad) contenido = <PerfilDelgado nombreProducto={referencia.nombre} {...portabilidad} />;
        } else if (opcion === "telon" && imagenSrc) {
          contenido = (
            <TelonParallax
              imagenSrc={imagenSrc}
              imagenAlt={referencia.nombre}
              lineas={referencia.ganchos.slice(0, 3).map((g) => g.frase)}
            />
          );
        }
        // Zenbook está pensado para fondo claro (tokens): se envuelve en su
        // propia tarjeta blanca al montarse sobre el hero oscuro de Portada.
        return <div className="rounded-card bg-white p-6 shadow-elev">{contenido}</div>;
      }

      case "tuf": {
        const opcion = ROTACION_TUF[indiceEnLinea % ROTACION_TUF.length];
        if (opcion === "sello") {
          return (
            <SelloCertificacion
              nombreProducto={referencia.nombre}
              caracteristicas={referencia.ficha.slice(0, 4).map((item, i) => ({ id: `${item.componente}-${i}`, texto: `${item.componente}: ${item.dato}` }))}
            />
          );
        }
        if (opcion === "placas") {
          return <PlacasBlindaje nombreProducto={referencia.nombre} />;
        }
        return (
          <FijacionObjetivo
            nombreProducto={referencia.nombre}
            imagenSrc={imagenSrc}
            imagenAlt={referencia.nombre}
            lineas={[
              "ESCANEANDO CHASIS... OK",
              `${referencia.codigo}: VERIFICADO`,
              `OBJETIVO: ${referencia.nombre.toUpperCase()}`,
            ]}
          />
        );
      }

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
