"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import modulesData from "@/data/modules.json";
import productsData from "@/data/products.json";
import type { Modulo } from "@/types/platform";
import type { Producto } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { useDemoUser } from "@/lib/demoUser";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconArrowLeft } from "@/components/icons";
import { cn } from "@/lib/cn";

const modules = modulesData as Modulo[];
const products = productsData as Producto[];

const STEP_VARIANTS = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
};

export default function ModuloPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const reduced = useReducedMotion();
  const { markModuleCompleted } = useDemoUser();

  const modulo = modules.find((m) => m.slug === params.slug);
  const producto = modulo ? products.find((p) => p.id === modulo.productoId) : undefined;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!modulo || !producto) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <p className="font-sans text-sm text-muted">Módulo no encontrado.</p>
        <Link href="/app/modulos" className="font-sans text-sm text-asus-blue underline mt-2 inline-block">
          Volver a módulos
        </Link>
      </main>
    );
  }

  const totalScreens = modulo.pantallas.length + 1;
  const isLast = index === totalScreens - 1;
  const transition = reduced ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

  function goTo(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }

  function handleNext() {
    if (index < totalScreens - 1) {
      goTo(index + 1);
      return;
    }
    markModuleCompleted(modulo!.slug);
    router.push(`/app/quiz/${modulo!.slug}`);
  }

  function handleBack() {
    if (index === 0) {
      router.push("/app/modulos");
      return;
    }
    goTo(index - 1);
  }

  const pantalla = index < modulo.pantallas.length ? modulo.pantallas[index] : null;

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
          <p className="font-sans text-sm font-medium text-asus-dark truncate">{modulo.titulo}</p>
        </div>
        <div className="mx-auto max-w-xl px-4 pb-3 flex gap-1.5">
          {Array.from({ length: totalScreens }).map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-chip bg-asus-blue-soft overflow-hidden">
              <div
                className={cn("h-full rounded-chip bg-asus-blue", i <= index ? "w-full" : "w-0")}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 mx-auto w-full max-w-xl px-4 py-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {pantalla ? (
            <motion.div
              key={index}
              custom={direction}
              variants={STEP_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <div className="aspect-[4/3] rounded-card overflow-hidden bg-asus-blue-soft">
                <Image
                  src={pantalla.imagen}
                  alt=""
                  width={400}
                  height={300}
                  className="w-full h-full object-contain p-6"
                />
              </div>
              <p className="font-display text-2xl font-semibold text-asus-dark mt-6">{pantalla.dato}</p>
              <p className="font-sans text-base text-muted mt-2">{pantalla.explicacion}</p>
            </motion.div>
          ) : (
            <motion.div
              key="como-decirlo"
              custom={direction}
              variants={STEP_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
                Así se lo dices al cliente
              </p>
              <h2 className="font-display text-2xl font-semibold text-asus-dark mt-2">{producto.nombre}</h2>
              <ul className="font-sans text-base text-asus-dark space-y-3 mt-5 list-disc list-inside">
                {producto.argumentosVenta.map((frase) => (
                  <li key={frase}>{frase}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-border px-4 py-4">
        <div className="mx-auto max-w-xl">
          <Button variant="primary" className="w-full" onClick={handleNext}>
            {isLast ? "Ir al quiz" : "Siguiente"}
          </Button>
        </div>
      </div>
    </div>
  );
}
