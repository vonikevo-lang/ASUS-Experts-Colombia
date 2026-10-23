"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import quizzesData from "@/data/quizzes.json";
import modulesData from "@/data/modules.json";
import productsData from "@/data/products.json";
import type { Quiz } from "@/types/platform";
import type { Modulo } from "@/types/platform";
import type { Producto } from "@/types/product";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { useDemoUser } from "@/lib/demoUser";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconArrowLeft, IconTrophy } from "@/components/icons";
import { cn } from "@/lib/cn";
import { BRAND_COLORS } from "@/lib/tokens";
import { POINTS_PER_CORRECT, QUIZ_PASS_THRESHOLD } from "@/lib/quiz";

const quizzes = quizzesData as Quiz[];
const modules = modulesData as Modulo[];
const products = productsData as Producto[];

export default function QuizPage() {
  const params = useParams<{ slug: string }>();
  const reduced = useReducedMotion();
  const { addPoints, recordQuizResult } = useDemoUser();

  const quiz = quizzes.find((q) => q.slug === params.slug);
  const modulo = modules.find((m) => m.slug === params.slug);
  const producto = modulo ? products.find((p) => p.id === modulo.productoId) : undefined;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!quiz || !modulo || !producto) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <p className="font-sans text-sm text-muted">Quiz no encontrado.</p>
        <Link href="/app/modulos" className="font-sans text-sm text-asus-blue underline mt-2 inline-block">
          Volver a módulos
        </Link>
      </main>
    );
  }

  const pregunta = quiz.preguntas[index];
  const answered = selected !== null;

  function handleSelect(i: number) {
    if (answered) return;
    setSelected(i);
    if (i === pregunta.correctaIndex) {
      setScore((s) => s + 1);
      setSessionPoints((p) => p + POINTS_PER_CORRECT);
    }
  }

  function handleNext() {
    if (index < quiz!.preguntas.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      return;
    }
    recordQuizResult(quiz!.slug, score, quiz!.preguntas.length);
    if (sessionPoints > 0) addPoints(sessionPoints);
    setFinished(true);
  }

  const passed = score / quiz.preguntas.length >= QUIZ_PASS_THRESHOLD;

  if (finished) {
    return (
      <ResultScreen
        producto={producto}
        moduloSlug={modulo.slug}
        score={score}
        total={quiz.preguntas.length}
        passed={passed}
        pointsEarned={sessionPoints}
        reduced={reduced}
        onRetry={() => {
          setIndex(0);
          setSelected(null);
          setScore(0);
          setSessionPoints(0);
          setFinished(false);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-xl px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href={`/app/modulos/${modulo.slug}`}
              aria-label="Salir del quiz"
              className="h-9 w-9 -ml-2 flex items-center justify-center rounded-btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
            >
              <IconArrowLeft className="h-5 w-5 text-asus-dark" />
            </Link>
            <p className="font-sans text-sm font-medium text-asus-dark">
              Pregunta {index + 1} de {quiz.preguntas.length}
            </p>
          </div>
          <motion.p
            key={sessionPoints}
            initial={reduced ? { scale: 1 } : { scale: 1.3 }}
            animate={{ scale: 1 }}
            className="font-sans text-sm font-semibold text-asus-blue"
          >
            +{sessionPoints} pts
          </motion.p>
        </div>
        <div className="mx-auto max-w-xl px-4 pb-3 flex gap-1.5">
          {quiz.preguntas.map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-chip bg-asus-blue-soft overflow-hidden">
              <div className={cn("h-full rounded-chip bg-asus-blue", i <= index ? "w-full" : "w-0")} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 mx-auto w-full max-w-xl px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
          >
            <h1 className="font-display text-xl font-semibold text-asus-dark">{pregunta.pregunta}</h1>

            <div className="mt-6 space-y-3">
              {pregunta.opciones.map((opcion, i) => {
                const isSelected = selected === i;
                const isCorrectOption = i === pregunta.correctaIndex;
                const showCorrect = answered && isCorrectOption;
                const showWrong = answered && isSelected && !isCorrectOption;

                return (
                  <motion.button
                    key={opcion}
                    type="button"
                    disabled={answered}
                    onClick={() => handleSelect(i)}
                    animate={
                      showCorrect && !reduced
                        ? { scale: [1, 1.04, 1] }
                        : showWrong && !reduced
                          ? { x: [0, -6, 6, -4, 4, 0] }
                          : {}
                    }
                    transition={{ duration: 0.4 }}
                    className={cn(
                      "w-full text-left rounded-card border px-4 py-3.5 font-sans text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue",
                      showCorrect
                        ? "border-success bg-success/10 text-success font-medium"
                        : showWrong
                          ? "border-danger bg-danger/10 text-danger font-medium"
                          : "border-border text-asus-dark hover:border-asus-blue disabled:opacity-60",
                    )}
                  >
                    {opcion}
                  </motion.button>
                );
              })}
            </div>

            {answered && (
              <motion.div
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-card bg-asus-blue-soft p-4"
              >
                <p className="font-sans text-sm text-asus-dark">{pregunta.explicacion}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {answered && (
        <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-border px-4 py-4">
          <div className="mx-auto max-w-xl">
            <Button variant="primary" className="w-full" onClick={handleNext}>
              {index < quiz.preguntas.length - 1 ? "Siguiente" : "Ver resultado"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultScreen({
  producto,
  moduloSlug,
  score,
  total,
  passed,
  pointsEarned,
  reduced,
  onRetry,
}: {
  producto: Producto;
  moduloSlug: string;
  score: number;
  total: number;
  passed: boolean;
  pointsEarned: number;
  reduced: boolean;
  onRetry: () => void;
}) {
  const [confettiPieces] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.6 + Math.random() * 0.8,
      rotate: Math.random() * 360,
      color: [BRAND_COLORS.blue, BRAND_COLORS.gold, BRAND_COLORS.success, BRAND_COLORS.blueAccent][i % 4],
    })),
  );

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-10 text-center relative overflow-hidden">
      {passed && !reduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {confettiPieces.map((piece) => (
            <motion.span
              key={piece.id}
              className="absolute top-0 h-2.5 w-2.5 rounded-sm"
              style={{ left: `${piece.x}%`, backgroundColor: piece.color }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{ y: 420, opacity: 0, rotate: piece.rotate }}
              transition={{ duration: piece.duration, delay: piece.delay, ease: "easeIn" }}
            />
          ))}
        </div>
      )}

      <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
        Resultado del quiz
      </p>
      <p className="font-display text-[56px] font-bold text-asus-dark mt-2">
        <Counter value={score} />/{total}
      </p>
      <p className="font-sans text-sm text-muted mt-1">
        <Counter value={pointsEarned} prefix="+" suffix=" puntos ganados" />
      </p>

      {passed ? (
        <motion.div
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 14, delay: 0.3 }}
          className="mt-8"
        >
          <motion.div
            animate={
              reduced
                ? {}
                : {
                    boxShadow: [
                      `0 0 0px ${BRAND_COLORS.gold}`,
                      `0 0 28px ${BRAND_COLORS.gold}`,
                      `0 0 0px ${BRAND_COLORS.gold}`,
                    ],
                  }
            }
            transition={{ duration: 1.8, repeat: reduced ? 0 : Infinity, repeatDelay: 0.6 }}
            className="h-20 w-20 rounded-full bg-gold flex items-center justify-center mx-auto"
          >
            <IconTrophy className="h-10 w-10 text-white" />
          </motion.div>
          <p className="font-display text-lg font-semibold text-asus-dark mt-4">
            ¡Badge desbloqueado!
          </p>
          <p className="font-sans text-sm text-muted mt-1">Experto {producto.nombre}</p>
        </motion.div>
      ) : (
        <p className="font-sans text-sm text-muted mt-6 max-w-xs">
          ¡Vas por buen camino! Repasa el módulo y vuelve a intentarlo para desbloquear el badge
          (necesitas {Math.ceil(total * QUIZ_PASS_THRESHOLD)}/{total}).
        </p>
      )}

      <div className="flex flex-col gap-3 mt-10 w-full max-w-xs">
        {!passed && (
          <Link href={`/app/modulos/${moduloSlug}`} className={buttonClasses("secondary")}>
            Repasar el módulo
          </Link>
        )}
        <Button variant="primary" onClick={onRetry}>
          Reintentar
        </Button>
        <Link href="/app/inicio" className="font-sans text-sm text-asus-blue underline text-center">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
