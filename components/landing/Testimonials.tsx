"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { IconArrowLeft } from "@/components/icons";

// Testimonios de ejemplo — reemplazar por testimonios reales de asesores.
const TESTIMONIALS = [
  {
    name: "Laura Martínez",
    role: "Asesora de ventas",
    store: "Alkosto Av. 68 (tienda ficticia)",
    initials: "LM",
    quote:
      "Antes me tocaba adivinar qué portátil recomendar. Ahora en 5 minutos sé explicarle al cliente la diferencia entre un Zenbook y uno gamer.",
  },
  {
    name: "Carlos Rodríguez",
    role: "Asesor senior",
    store: "Éxito Calle 80 (tienda ficticia)",
    initials: "CR",
    quote:
      "El comparador me salvó varias ventas. Le muestro la pantalla al cliente y él mismo entiende por qué pagar un poco más vale la pena.",
  },
  {
    name: "Daniela Gómez",
    role: "Asesora de ventas",
    store: "Falabella Unicentro (tienda ficticia)",
    initials: "DG",
    quote:
      "Me gusta competir en el ranking con las otras tiendas. Los quizzes son cortos y los hago en el celular entre cliente y cliente.",
  },
];

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD = 60;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [index]);

  function goTo(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const t = TESTIMONIALS[index];

  return (
    <motion.section
      className="bg-asus-blue-soft"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealContainer(reduced)}
    >
      <motion.div
        variants={revealItem(reduced)}
        className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center"
      >
        <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue-hover font-medium">
          Lo que dicen los asesores
        </p>

        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            type="button"
            aria-label="Testimonio anterior"
            onClick={() => goTo(index - 1)}
            className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white hover:border-asus-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
          >
            <IconArrowLeft className="h-5 w-5 text-asus-dark" />
          </button>

          <div className="min-h-[220px] flex-1 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.name}
                custom={direction}
                drag={reduced ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) goTo(index + 1);
                  else if (info.offset.x > SWIPE_THRESHOLD) goTo(index - 1);
                }}
                initial={reduced ? { opacity: 1 } : { opacity: 0, x: direction > 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, x: direction > 0 ? -40 : 40 }}
                transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="cursor-grab active:cursor-grabbing"
              >
                <p className="font-display text-xl md:text-2xl font-semibold text-asus-dark leading-snug">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <span className="h-11 w-11 rounded-full bg-asus-blue text-white font-sans text-sm font-semibold flex items-center justify-center">
                    {t.initials}
                  </span>
                  <div className="text-left">
                    <p className="font-sans text-sm font-semibold text-asus-dark">{t.name}</p>
                    <p className="font-sans text-xs text-muted">
                      {t.role} · {t.store}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            aria-label="Siguiente testimonio"
            onClick={() => goTo(index + 1)}
            className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white hover:border-asus-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
          >
            <IconArrowLeft className="h-5 w-5 text-asus-dark rotate-180" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Testimonio de ${item.name}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className="p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
            >
              <span
                className={cn(
                  "block rounded-chip",
                  i === index ? "h-2 w-6 bg-asus-blue" : "h-2 w-2 bg-asus-silver",
                )}
              />
            </button>
          ))}
        </div>
        <p className="font-sans text-xs text-faint mt-3 sm:hidden">Desliza para ver más</p>
      </motion.div>
    </motion.section>
  );
}
