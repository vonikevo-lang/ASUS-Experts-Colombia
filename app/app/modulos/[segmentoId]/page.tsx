"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import segmentosData from "@/data/segmentos.json";
import productsData from "@/data/products.json";
import type { Segmento } from "@/types/platform";
import type { Producto } from "@/types/product";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useDemoUser } from "@/lib/demoUser";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";
import { progresoSegmento, referenciaDominada } from "@/lib/segments";
import { IconArrowLeft, IconTrophy } from "@/components/icons";

const segmentos = segmentosData as Segmento[];
const products = productsData as Producto[];

export default function SegmentoPage() {
  const params = useParams<{ segmentoId: string }>();
  const { state } = useDemoUser();
  const reduced = useReducedMotion();

  const segmento = segmentos.find((s) => s.id === params.segmentoId);

  if (!segmento) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <p className="font-sans text-sm text-muted">Segmento no encontrado.</p>
        <Link href="/app/modulos" className="font-sans text-sm text-asus-blue underline mt-2 inline-block">
          Volver a módulos
        </Link>
      </main>
    );
  }

  const { done, total } = progresoSegmento(state.quizResults, segmento);
  const completo = done === total;

  // De tope a entrada, para que la "escalera" se vea de arriba hacia abajo.
  const referencias = [...segmento.orden].reverse();

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
      <Link
        href="/app/modulos"
        className="inline-flex items-center gap-2 font-sans text-sm text-muted hover:text-asus-dark"
      >
        <IconArrowLeft className="h-4 w-4" /> Módulos
      </Link>

      <div
        className="mt-4 rounded-card p-5 text-white"
        style={{ backgroundColor: segmento.color }}
      >
        <p className="font-display text-2xl font-bold">{segmento.nombre}</p>
        <p className="font-sans text-sm mt-1 opacity-90">{segmento.mensaje}</p>
      </div>

      <div className="mt-5 rounded-card border border-border p-4">
        <div className="flex items-center justify-between">
          <p className="font-sans text-sm font-medium text-asus-dark">
            Dominas {done} de {total}
          </p>
          {completo && (
            <Badge tone="success">
              <IconTrophy className="h-3.5 w-3.5" /> Experto {segmento.nombre}
            </Badge>
          )}
        </div>
        <ProgressBar value={done} max={total} className="mt-2" />
      </div>

      <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted mt-6 mb-3">
        Escalera: de tope a entrada
      </p>

      <motion.div className="space-y-3" initial="hidden" animate="show" variants={revealContainer(reduced)}>
        {referencias.map((id, i) => {
          const producto = products.find((p) => p.id === id);
          if (!producto) return null;
          const dominada = referenciaDominada(state.quizResults, id);
          const escalon = segmento.orden.length - i;
          return (
            <motion.div key={id} variants={revealItem(reduced)}>
              <Link href={`/app/modulos/${segmento.id}/${id}`}>
                <Card className="p-4 flex items-center gap-3">
                  <span
                    className="h-7 w-7 rounded-full flex items-center justify-center font-display text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: segmento.color }}
                  >
                    {escalon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-asus-dark truncate">{producto.nombre}</p>
                    <p className="font-mono text-xs text-faint truncate">{producto.referencia}</p>
                  </div>
                  {dominada ? (
                    <Badge tone="success">Dominada</Badge>
                  ) : (
                    <Badge tone="neutral">Por entrenar</Badge>
                  )}
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </main>
  );
}
