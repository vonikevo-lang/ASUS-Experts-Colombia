"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

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

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section className="bg-asus-blue-soft">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue-hover font-medium">
          Lo que dicen los asesores
        </p>

        <div className="min-h-[220px] flex items-center justify-center mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.name}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, y: -16 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
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

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Testimonio de ${item.name}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
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
      </div>
    </section>
  );
}
