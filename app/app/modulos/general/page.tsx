"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import segmentosData from "@/data/segmentos.json";
import type { Segmento } from "@/types/platform";
import { Button } from "@/components/ui/Button";
import { useDemoUser } from "@/lib/demoUser";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconArrowLeft } from "@/components/icons";
import { cn } from "@/lib/cn";

const segmentos = segmentosData as Segmento[];

const SLIDES = [
  {
    titulo: "Los 4 segmentos",
    queEs: "El catálogo se organiza en 4 segmentos, cada uno con su color y su mensaje.",
    comoDecirlo:
      "Vivobook (azul) es el equipo de todos los días. Zenbook (gris) es diseño premium y portabilidad. TUF (amarillo) es gaming resistente a buen precio. ROG (rojo) es lo más potente del catálogo.",
  },
  {
    titulo: "La escalera y \"dominar\" una referencia",
    queEs: "Cada segmento tiene una escalera de referencias, de entrada a tope.",
    comoDecirlo:
      "Dominas una referencia cuando completas su módulo y apruebas su quiz. El progreso se ve como \"Dominas X de Y\" en cada segmento.",
  },
  {
    titulo: "Cómo explicar la IA y Copilot+ PC",
    queEs: "Todas las referencias pasan por la misma prueba: ¿tiene NPU? ¿Llega a 40 TOPS?",
    comoDecirlo:
      "Si la NPU no llega a 40 TOPS, el equipo puede tener IA útil, pero no es Copilot+ PC. Ni siquiera los portátiles gamer más potentes lo son si su NPU no alcanza ese número.",
  },
  {
    titulo: "Cómo explicar si la RAM \"se suma\" o \"se cambia\"",
    queEs: "Depende de si hay una ranura libre o no.",
    comoDecirlo:
      "Si solo hay una ranura ocupada, subir la RAM significa cambiar el módulo por uno más grande. Si hay una ranura libre, se puede sumar un módulo nuevo sin tocar el actual. Algunos equipos traen la memoria soldada y no se puede subir.",
  },
  {
    titulo: "Usar \"¿Con cuál la comparo?\" en piso",
    queEs: "Cada módulo termina mostrando el escalón de arriba y el de abajo en su escalera.",
    comoDecirlo:
      "Si el cliente duda entre dos opciones, usa esa comparación: son 2-3 diferencias claras que puedes decir en piso, sin ficha técnica completa.",
  },
];

export default function ModuloGeneralPage() {
  const router = useRouter();
  const reduced = useReducedMotion();
  const { markModuleCompleted } = useDemoUser();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLast = index === SLIDES.length - 1;
  const transition = reduced ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

  function handleNext() {
    if (index < SLIDES.length - 1) {
      setDirection(1);
      setIndex((i) => i + 1);
      return;
    }
    markModuleCompleted("general");
    router.push("/app/quiz/general");
  }

  function handleBack() {
    if (index === 0) {
      router.push("/app/modulos");
      return;
    }
    setDirection(-1);
    setIndex((i) => i - 1);
  }

  const slide = SLIDES[index];

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-xl px-4 h-14 flex items-center gap-3">
          <button
            type="button"
            aria-label="Atrás"
            onClick={handleBack}
            className="h-9 w-9 -ml-2 flex items-center justify-center rounded-btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
          >
            <IconArrowLeft className="h-5 w-5 text-asus-dark" />
          </button>
          <p className="font-sans text-sm font-medium text-asus-dark truncate">
            Lo que todo asesor debe saber
          </p>
        </div>
        <div className="mx-auto max-w-xl px-4 pb-3 flex gap-1.5">
          {SLIDES.map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-chip bg-asus-blue-soft overflow-hidden">
              <div className={cn("h-full rounded-chip bg-asus-blue", i <= index ? "w-full" : "w-0")} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 mx-auto w-full max-w-xl px-4 py-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: direction > 0 ? 48 : -48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: direction > 0 ? -48 : 48 }}
            transition={transition}
          >
            <div className="flex gap-2 flex-wrap">
              {segmentos.map((s) => (
                <span
                  key={s.id}
                  className="font-sans text-xs font-medium text-white rounded-chip px-2.5 py-1"
                  style={{ backgroundColor: s.color }}
                >
                  {s.nombre}
                </span>
              ))}
            </div>
            <p className="font-display text-2xl font-semibold text-asus-dark mt-5">{slide.titulo}</p>
            <p className="font-sans text-sm text-muted mt-2">{slide.queEs}</p>
            <div className="rounded-card bg-asus-blue-soft p-4 mt-5">
              <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
                Así se lo dices
              </p>
              <p className="font-sans text-sm text-asus-dark mt-1">{slide.comoDecirlo}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-border px-4 py-4">
        <div className="mx-auto max-w-xl">
          <Button variant="primary" className="w-full" onClick={handleNext}>
            {isLast ? "Ir al mini-quiz" : "Siguiente"}
          </Button>
        </div>
      </div>
    </div>
  );
}
