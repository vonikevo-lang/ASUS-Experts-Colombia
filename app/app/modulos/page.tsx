"use client";

import Link from "next/link";
import { motion } from "motion/react";
import segmentosData from "@/data/segmentos.json";
import type { Segmento } from "@/types/platform";
import { Card } from "@/components/ui/Card";
import { useDemoUser } from "@/lib/demoUser";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";
import { progresoSegmento } from "@/lib/segments";
import { IconBook, IconChevronDown } from "@/components/icons";

const segmentos = segmentosData as Segmento[];

export default function ModulosPage() {
  const { state } = useDemoUser();
  const reduced = useReducedMotion();

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-asus-dark">Módulos</h1>
      <p className="font-sans text-sm text-muted mt-1">
        Entrena por segmento: cada uno tiene su propia escalera de referencias.
      </p>

      <Link href="/app/modulos/general" className="block mt-6">
        <Card className="p-5 flex items-center gap-4 border-asus-blue/40 bg-asus-blue-soft/40">
          <div className="h-11 w-11 rounded-full bg-asus-blue flex items-center justify-center shrink-0">
            <IconBook className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-display text-base font-semibold text-asus-dark">
              Lo que todo asesor debe saber
            </p>
            <p className="font-sans text-xs text-muted mt-0.5">
              Guía general: los 4 segmentos, la escalera y cómo explicar IA y memoria.
            </p>
          </div>
        </Card>
      </Link>

      <motion.div
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        initial="hidden"
        animate="show"
        variants={revealContainer(reduced)}
      >
        {segmentos.map((segmento) => {
          const { done, total } = progresoSegmento(state.quizResults, segmento);
          return (
            <motion.div key={segmento.id} variants={revealItem(reduced)}>
              <Link href={`/app/modulos/${segmento.id}`} className="block h-full">
                <Card
                  className="p-6 h-full flex flex-col justify-between overflow-hidden relative text-white"
                  style={{ backgroundColor: segmento.color }}
                >
                  <div>
                    <p className="font-display text-xl font-bold">{segmento.nombre}</p>
                    <p className="font-sans text-sm mt-2 opacity-90">{segmento.mensaje}</p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <span className="font-sans text-xs font-medium bg-white/15 rounded-chip px-2.5 py-1">
                      Dominas {done} de {total}
                    </span>
                    <IconChevronDown className="h-4 w-4 -rotate-90 opacity-80" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </main>
  );
}
