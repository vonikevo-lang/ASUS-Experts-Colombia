"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconBook, IconCompare, IconGamepad, IconGift } from "./icons";

const PILLARS = [
  {
    id: "entrenamiento",
    icon: IconBook,
    label: "Entrenamiento",
    description: "Módulos cortos por producto, con videos e interactivos.",
    image: "/products/zenbook-a14.svg",
  },
  {
    id: "comparador",
    icon: IconCompare,
    label: "Comparador",
    description: "Modo técnico y modo cliente, para explicar como tú quieras.",
    image: "/products/zenbook-a16.svg",
  },
  {
    id: "gamificacion",
    icon: IconGamepad,
    label: "Gamificación",
    description: "Quizzes, retos diarios y ranking por tienda.",
    image: "/products/gaming-v16.svg",
  },
  {
    id: "premios",
    icon: IconGift,
    label: "Premios",
    description: "Puntos, badges, merch ASUS y concursos.",
    image: "/products/zenbook-duo.svg",
  },
];

const AUTOPLAY_MS = 7000;

export function Pillars() {
  const [active, setActive] = useState(PILLARS[0].id);
  const [userInteracted, setUserInteracted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (userInteracted) return;
    const timer = setInterval(() => {
      setActive((current) => {
        const i = PILLARS.findIndex((p) => p.id === current);
        return PILLARS[(i + 1) % PILLARS.length].id;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [userInteracted]);

  const current = PILLARS.find((p) => p.id === active) ?? PILLARS[0];

  return (
    <section id="programa" className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
        Cómo funciona el programa
      </p>
      <h2 className="font-display text-[32px] font-semibold text-asus-dark mt-2 mb-10">
        Cuatro pilares, un mismo objetivo: vender mejor
      </h2>

      <div className="md:grid md:grid-cols-[300px_1fr] md:gap-10">
        <div
          role="tablist"
          aria-orientation="vertical"
          className="flex gap-2 overflow-x-auto pb-3 md:flex-col md:overflow-visible md:pb-0"
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = pillar.id === active;
            return (
              <button
                key={pillar.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActive(pillar.id);
                  setUserInteracted(true);
                }}
                className="relative shrink-0 w-56 md:w-full text-left p-4 rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
              >
                {isActive && (
                  <motion.div
                    layoutId="pillar-active-bg"
                    className="absolute inset-0 bg-asus-blue-soft rounded-card"
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <div className="relative flex items-center gap-3">
                  <Icon className={isActive ? "h-6 w-6 text-asus-blue shrink-0" : "h-6 w-6 text-muted shrink-0"} />
                  <p
                    className={
                      isActive
                        ? "font-display text-base font-semibold text-asus-blue"
                        : "font-display text-base font-semibold text-asus-dark"
                    }
                  >
                    {pillar.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="relative mt-6 md:mt-0 rounded-card overflow-hidden bg-asus-blue-soft min-h-[320px] md:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={current.image} alt="" fill className="object-contain p-10" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-text"}
              className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur px-6 py-5"
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-xl font-semibold text-asus-dark">{current.label}</p>
              <p className="font-sans text-sm text-muted mt-1">{current.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
