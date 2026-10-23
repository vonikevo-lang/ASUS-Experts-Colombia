"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import productsData from "@/data/products.json";
import modulesData from "@/data/modules.json";
import quizzesData from "@/data/quizzes.json";
import rankingData from "@/data/ranking.json";
import type { Producto } from "@/types/product";
import type { Modulo, Quiz, AsesorRanking } from "@/types/platform";
import { Counter } from "@/components/ui/Counter";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClasses } from "@/components/ui/Button";
import { useDemoUser, levelFor, levelProgress } from "@/lib/demoUser";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";
import { IconGift, IconTrophy } from "@/components/icons";
import { cn } from "@/lib/cn";

const products = productsData as Producto[];
const modules = modulesData as Modulo[];
const quizzes = quizzesData as Quiz[];
const ranking = rankingData as AsesorRanking[];

const RETO_PUNTOS = 10;

export default function InicioPage() {
  const { state, addPoints } = useDemoUser();
  const { user, completedModules, quizResults } = state;
  const reduced = useReducedMotion();

  const [retoRespuesta, setRetoRespuesta] = useState<number | null>(null);

  const modulo = modules[0];
  const producto = products.find((p) => p.id === modulo.productoId);
  const retoPregunta = quizzes[0]?.preguntas[0];
  const quizDone = Boolean(quizResults[modulo.slug]);
  const moduleDone = completedModules.includes(modulo.slug);

  const continuar = !moduleDone
    ? { label: "Empezar módulo", href: `/app/modulos/${modulo.slug}`, sub: modulo.titulo }
    : !quizDone
      ? { label: "Hacer el quiz", href: `/app/quiz/${modulo.slug}`, sub: modulo.titulo }
      : { label: "Repasar módulo", href: `/app/modulos/${modulo.slug}`, sub: `Último puntaje: ${quizResults[modulo.slug].score}/${quizResults[modulo.slug].total}` };

  const top3 = [...ranking]
    .map((a) => (a.esUsuarioDemo ? { ...a, puntos: user.puntos } : a))
    .filter((a) => a.tienda === user.tienda)
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 3);

  function responderReto(i: number) {
    if (retoRespuesta !== null || !retoPregunta) return;
    setRetoRespuesta(i);
    if (i === retoPregunta.correctaIndex) addPoints(RETO_PUNTOS);
  }

  return (
    <motion.main
      className="mx-auto max-w-2xl px-4 sm:px-6 py-8 space-y-8"
      initial="hidden"
      animate="show"
      variants={revealContainer(reduced)}
    >
      <motion.div variants={revealItem(reduced)}>
        <p className="font-sans text-sm text-muted">
          Hola, <span className="text-asus-dark font-medium">{user.tienda}</span>
        </p>
        <h1 className="font-display text-2xl font-semibold text-asus-dark">{user.nombre.split(" ")[0]} 👋</h1>
      </motion.div>

      <motion.div variants={revealItem(reduced)} className="rounded-card border border-border p-5">
        <div className="flex items-center justify-between">
          <p className="font-sans text-sm text-muted">Nivel {levelFor(user.puntos)}</p>
          <p className="font-sans text-sm font-semibold text-asus-blue">
            <Counter value={user.puntos} suffix=" pts" />
          </p>
        </div>
        <ProgressBar value={levelProgress(user.puntos)} max={100} className="mt-2" />
      </motion.div>

      {producto && (
        <motion.div variants={revealItem(reduced)}>
          <Link
            href={continuar.href}
            className="block rounded-card border border-border p-5 hover:border-asus-blue transition-colors"
          >
            <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
              Continúa donde quedaste
            </p>
            <p className="font-display text-lg font-semibold text-asus-dark mt-1">{continuar.label}</p>
            <p className="font-sans text-sm text-muted mt-0.5">{continuar.sub}</p>
          </Link>
        </motion.div>
      )}

      {retoPregunta && (
        <motion.div variants={revealItem(reduced)} className="rounded-card bg-asus-blue-soft p-5">
          <div className="flex items-start gap-3">
            <IconGift className="h-6 w-6 text-asus-blue shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted">Reto del día</p>
                <span className="font-sans text-xs font-semibold text-asus-blue">+{RETO_PUNTOS} pts</span>
              </div>
              <p className="font-sans text-sm font-medium text-asus-dark mt-1">{retoPregunta.pregunta}</p>

              <div className="mt-3 space-y-2">
                {retoPregunta.opciones.map((opcion, i) => {
                  const answered = retoRespuesta !== null;
                  const isCorrect = i === retoPregunta.correctaIndex;
                  const isSelected = retoRespuesta === i;
                  return (
                    <button
                      key={opcion}
                      type="button"
                      disabled={answered}
                      onClick={() => responderReto(i)}
                      className={cn(
                        "w-full text-left rounded-btn border px-3 py-2.5 font-sans text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue",
                        answered && isCorrect
                          ? "border-success bg-success/10 text-success font-medium"
                          : answered && isSelected
                            ? "border-danger bg-danger/10 text-danger font-medium"
                            : "border-border bg-white text-asus-dark disabled:opacity-60",
                      )}
                    >
                      {opcion}
                    </button>
                  );
                })}
              </div>

              {retoRespuesta !== null && (
                <p className="font-sans text-xs text-muted mt-2">
                  {retoRespuesta === retoPregunta.correctaIndex
                    ? `¡Bien! Sumaste ${RETO_PUNTOS} puntos.`
                    : "Casi. La respuesta correcta quedó en verde."}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <motion.div variants={revealItem(reduced)}>
        <div className="flex items-center gap-2 mb-3">
          <IconTrophy className="h-5 w-5 text-asus-blue" />
          <p className="font-display text-lg font-semibold text-asus-dark">Top 3 de tu tienda</p>
        </div>
        <ul className="rounded-card border border-border divide-y divide-border">
          {top3.map((asesor, i) => (
            <li
              key={asesor.id}
              className={
                asesor.esUsuarioDemo
                  ? "flex items-center gap-3 px-4 py-3 bg-asus-blue-soft"
                  : "flex items-center gap-3 px-4 py-3"
              }
            >
              <span className="font-display text-sm font-semibold text-muted w-5">{i + 1}</span>
              <span className="font-sans text-sm text-asus-dark flex-1">{asesor.nombre}</span>
              <span className="font-mono text-xs text-faint">{asesor.puntos.toLocaleString("es-CO")} pts</span>
            </li>
          ))}
        </ul>
        <Link href="/app/ranking" className={buttonClasses("secondary", "w-full mt-3 h-10 text-xs")}>
          Ver ranking completo
        </Link>
      </motion.div>
    </motion.main>
  );
}
