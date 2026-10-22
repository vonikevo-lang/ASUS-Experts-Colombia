"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { buttonClasses } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: string;
}

const SLIDES: Slide[] = [
  {
    id: "domina",
    title: "DOMINA ASUS. VENDE CON CONFIANZA.",
    subtitle: "Entrenamientos de 5 minutos desde tu celular.",
    primaryCta: { label: "Empezar entrenamiento", href: "/app" },
    secondaryCta: { label: "Ver comparador", href: "/comparador" },
    image: "/products/zenbook-a14.svg",
  },
  {
    id: "compara",
    title: "COMPARA EN SEGUNDOS",
    subtitle: "Explícale a tu cliente la diferencia en palabras simples.",
    primaryCta: { label: "Empezar entrenamiento", href: "/app" },
    secondaryCta: { label: "Ver comparador", href: "/comparador" },
    image: "/products/zenbook-a16.svg",
  },
  {
    id: "gana",
    title: "GANA MIENTRAS APRENDES",
    subtitle: "Puntos, badges y premios cada mes.",
    primaryCta: { label: "Empezar entrenamiento", href: "/app" },
    secondaryCta: { label: "Ver comparador", href: "/comparador" },
    image: "/products/zenbook-duo.svg",
  },
];

const AUTOPLAY_MS = 6000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const slide = SLIDES[index];

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, index]);

  const titleWords = slide.title.split(" ");

  return (
    <section
      className="relative overflow-hidden bg-hero-gradient text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center min-h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={reduced ? false : "hidden"}
            animate="show"
            exit={reduced ? undefined : "hidden"}
            className="relative z-10"
          >
            <motion.h1
              className="font-display text-[36px] md:text-[64px] font-bold uppercase tracking-[-0.01em] leading-[1.05]"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.06 } } }}
            >
              {titleWords.map((word, i) => (
                <motion.span
                  key={`${slide.id}-${i}`}
                  className="inline-block mr-[0.28em]"
                  variants={{
                    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="font-sans text-base md:text-lg text-white/85 mt-5 max-w-md"
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={slide.primaryCta.href}
                className={buttonClasses("primary", "!bg-white !text-asus-blue hover:!bg-white/90")}
              >
                {slide.primaryCta.label}
              </Link>
              <Link href={slide.secondaryCta.href} className={buttonClasses("onDark")}>
                {slide.secondaryCta.label}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-image"}
            className="relative z-10 hidden md:flex justify-end"
            initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={reduced ? "" : "animate-float"}>
              <Image
                src={slide.image}
                alt=""
                width={420}
                height={315}
                className="w-full max-w-md drop-shadow-2xl rounded-card"
                priority={index === 0}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores / progreso */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pb-8 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Ir al slide ${i + 1}: ${s.title}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className="h-1 flex-1 max-w-[120px] rounded-chip bg-white/25 overflow-hidden"
          >
            <div
              className={
                i === index
                  ? reduced
                    ? "h-full w-full bg-white"
                    : "h-full w-full bg-white animate-hero-fill"
                  : i < index
                    ? "h-full w-full bg-white"
                    : "h-full w-0 bg-white"
              }
              style={i === index && !reduced ? { animationPlayState: paused ? "paused" : "running" } : undefined}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
