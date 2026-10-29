"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import segmentosData from "@/data/segmentos.json";
import { referencias } from "@/data/referencias";
import { ACCENT_BY_LINEA } from "@/lib/entrenamientoTema";
import { leerTodosResultados, type ResultadoEntrenamiento } from "@/lib/entrenamientoResultado";
import { QUIZ_PASS_THRESHOLD } from "@/lib/quiz";
import { LaptopIllustration } from "@/components/entrenamiento/LaptopIllustration";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Segmento } from "@/types/platform";
import type { Referencia } from "@/types/referencia";

const segmentos = segmentosData as Segmento[];

/**
 * Las referencias con material de apoyo propio (ver lib/entrenamientoMaterialPropio.ts)
 * tienen su propia foto y paleta de color reales: la tarjeta del listado debe reflejar
 * eso en vez de la ilustración genérica + acento por línea que usan las demás.
 */
const TARJETA_MATERIAL_PROPIO: Record<string, { imagenSrc: string; imagenAlt: string; fondo: string }> = {
  "vivobook-15-x1504ma-bq919w": {
    imagenSrc: "/entrenamientos/vivobook-15-x1504/vivobook-frente.webp",
    imagenAlt: "ASUS Vivobook 15 X1504MA",
    fondo: "#0B1A33",
  },
  "zenbook-a14": {
    imagenSrc: "/entrenamientos/zenbook-a14/zenbook-a14-front.webp",
    imagenAlt: "ASUS Zenbook A14",
    fondo: "#F1F1EF",
  },
  "tuf-gaming-f16-fx607vjb-rtx3050": {
    imagenSrc: "/entrenamientos/tuf-gaming-f16-f15/tuf-gaming-device.webp",
    imagenAlt: "ASUS TUF Gaming F16",
    fondo: "#0B0C0E",
  },
  "zenbook-14-oled-ux3405ca": {
    imagenSrc: "/entrenamientos/zenbook-14-oled/hero-front.webp",
    imagenAlt: "ASUS Zenbook 14 OLED",
    fondo: "#020306",
  },
  "tuf-gaming-f15-fx507vv-rtx4060": {
    imagenSrc: "/entrenamientos/tuf-gaming-f16-f15/tuf-gaming-device.webp",
    imagenAlt: "ASUS TUF Gaming F15",
    fondo: "#0B0C0E",
  },
};

function estadoDe(resultado: ResultadoEntrenamiento | undefined) {
  if (!resultado) return { label: "Nuevo", tone: "neutral" as const };
  const aprobado = resultado.score / resultado.total >= QUIZ_PASS_THRESHOLD;
  return aprobado ? { label: "Aprobado", tone: "success" as const } : { label: "Repasar", tone: "warning" as const };
}

export default function EntrenamientosListadoPage() {
  const reduced = useReducedMotion();
  const [lineaActiva, setLineaActiva] = useState(segmentos[0]?.id ?? "vivobook");
  const [resultados, setResultados] = useState<Record<string, ResultadoEntrenamiento>>({});

  useEffect(() => {
    // Lectura única de localStorage tras el montaje (no disponible en SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResultados(leerTodosResultados());
  }, []);

  const segmento = segmentos.find((s) => s.id === lineaActiva) ?? segmentos[0];
  const referenciasSegmento = segmento.orden
    .map((id) => referencias.find((r) => r.slug === id))
    .filter((r): r is Referencia => Boolean(r));

  return (
    <div className="min-h-dvh bg-white">
      <header className="sticky top-0 z-10 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/brand/ASUS logo grey.png"
              alt="ASUS"
              width={90}
              height={20}
              className="h-4 w-auto"
            />
            <span className="font-display text-sm font-semibold uppercase text-asus-dark">
              Entrenamientos
            </span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-display text-[32px] font-bold text-asus-dark md:text-[40px]">
          Entrenamientos
        </h1>
        <p className="mt-2 max-w-xl text-[15px] text-muted">
          Elige una línea y empieza por cualquier referencia. 5 minutos por módulo, desde tu celular.
        </p>

        <div role="tablist" className="mt-8 flex gap-2 overflow-x-auto pb-1">
          {segmentos.map((s) => {
            const active = s.id === lineaActiva;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={active}
                onClick={() => setLineaActiva(s.id)}
                className="relative shrink-0 rounded-chip px-4 py-2 font-sans text-sm font-medium transition-colors"
                style={{
                  backgroundColor: active ? s.color : "transparent",
                  color: active ? (s.id === "tuf" ? "#181818" : "#ffffff") : "#5a5a5a",
                  border: active ? "none" : "1px solid var(--border)",
                }}
              >
                {s.nombre}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-muted">{segmento.mensaje}</p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {referenciasSegmento.map((referencia) => {
            const accent = ACCENT_BY_LINEA[referencia.linea];
            const estado = estadoDe(resultados[referencia.slug]);
            const tarjetaPropia = TARJETA_MATERIAL_PROPIO[referencia.slug];

            return (
              <motion.div
                key={referencia.slug}
                whileHover={reduced ? undefined : { y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/entrenamientos/${referencia.slug}`}
                  className="group relative block h-full rounded-card border border-border bg-white p-4 shadow-card transition-shadow duration-200"
                  style={{ "--linea-glow": accent } as React.CSSProperties}
                >
                  {tarjetaPropia ? (
                    <div
                      className="relative h-28 w-full overflow-hidden rounded-btn"
                      style={{ background: tarjetaPropia.fondo }}
                    >
                      <Image
                        src={tarjetaPropia.imagenSrc}
                        alt={tarjetaPropia.imagenAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 360px"
                      />
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-btn bg-asus-dark">
                      <LaptopIllustration accent={accent} className="h-28 w-full" />
                    </div>
                  )}

                  <div className="mt-3 flex items-start justify-between gap-2">
                    <h3 className="font-display text-[15px] font-bold leading-snug text-asus-dark">
                      {referencia.nombre}
                    </h3>
                    <Badge tone={estado.tone} className="shrink-0">
                      {estado.label}
                    </Badge>
                  </div>

                  <p className="mt-2 text-xs text-faint">
                    {referencia.duracionMin} min · <span className="capitalize">{referencia.dificultad}</span>
                  </p>

                  <div
                    className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ boxShadow: `0 16px 36px -14px var(--linea-glow)` }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
