"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import productsData from "@/data/products.json";
import type { PerfilUso, Producto } from "@/types/product";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ProductCard } from "@/components/product/ProductCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { recomendar, type Prioridad } from "@/lib/recommend";
import { LINE_LABELS } from "@/lib/lineLabels";
import {
  IconArrowLeft,
  IconBattery,
  IconBolt,
  IconBook,
  IconBriefcase,
  IconDisplay,
  IconGamepad,
  IconHome,
  IconPalette,
  IconTag,
  IconWeight,
} from "@/components/icons";

const products = productsData as Producto[];

const PERFILES: { id: PerfilUso; label: string; sentenceLabel: string; icon: typeof IconHome }[] = [
  { id: "hogar", label: "Hogar", sentenceLabel: "uso en el hogar", icon: IconHome },
  { id: "trabajo", label: "Trabajo", sentenceLabel: "trabajo", icon: IconBriefcase },
  { id: "creadores", label: "Creadores", sentenceLabel: "creación de contenido", icon: IconPalette },
  { id: "estudiantes", label: "Estudiantes", sentenceLabel: "estudio", icon: IconBook },
  { id: "gamers", label: "Gamers", sentenceLabel: "gaming", icon: IconGamepad },
];

const PRIORIDADES: { id: Prioridad; label: string; sentenceLabel: string; icon: typeof IconHome }[] = [
  { id: "bateria", label: "Batería", sentenceLabel: "batería", icon: IconBattery },
  { id: "pantalla", label: "Pantalla", sentenceLabel: "pantalla", icon: IconDisplay },
  { id: "potencia", label: "Potencia", sentenceLabel: "potencia", icon: IconBolt },
  { id: "peso", label: "Peso (portabilidad)", sentenceLabel: "portabilidad", icon: IconWeight },
  { id: "precio", label: "Precio", sentenceLabel: "precio", icon: IconTag },
];

const STEP_VARIANTS = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
};

function explicarAjuste(perfil: PerfilUso, prioridades: Prioridad[]): string {
  const perfilLabel = PERFILES.find((p) => p.id === perfil)?.sentenceLabel ?? perfil;
  if (prioridades.length === 0) return `Ideal para ${perfilLabel}.`;
  const prioridadLabels = prioridades.map((p) => PRIORIDADES.find((x) => x.id === p)?.sentenceLabel ?? p);
  return `Ideal para ${perfilLabel}, destacando en ${prioridadLabels.join(" y ")}.`;
}

export default function RecomendadorPage() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState(1);
  const [perfil, setPerfil] = useState<PerfilUso | null>(null);
  const [prioridades, setPrioridades] = useState<Prioridad[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const resultado = useMemo(() => {
    if (!perfil) return null;
    return recomendar(products, perfil, prioridades);
  }, [perfil, prioridades]);

  function goTo(next: 1 | 2 | 3) {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  function selectPerfil(id: PerfilUso) {
    setPerfil(id);
    goTo(2);
  }

  function togglePrioridad(id: Prioridad) {
    setPrioridades((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }

  function reiniciar() {
    setPerfil(null);
    setPrioridades([]);
    setCopiedIndex(null);
    goTo(1);
  }

  async function handleCopyFrase(i: number, texto: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiedIndex(i);
      setTimeout(() => setCopiedIndex((current) => (current === i ? null : current)), 2000);
    } catch {
      // Clipboard no disponible (permiso denegado o navegador sin soporte); se ignora silenciosamente.
    }
  }

  const transition = reduced ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };
  const tapBounce = reduced ? {} : { scale: 0.94 };

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-xl px-4 h-14 flex items-center gap-3">
          {step > 1 ? (
            <button
              type="button"
              aria-label="Volver"
              onClick={() => goTo((step - 1) as 1 | 2)}
              className="h-9 w-9 -ml-2 flex items-center justify-center rounded-btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
            >
              <IconArrowLeft className="h-5 w-5 text-asus-dark" />
            </button>
          ) : (
            <Link
              href="/"
              aria-label="Volver al inicio"
              className="h-9 w-9 -ml-2 flex items-center justify-center rounded-btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
            >
              <IconArrowLeft className="h-5 w-5 text-asus-dark" />
            </Link>
          )}
          <p className="font-display text-sm font-semibold uppercase tracking-[-0.01em] text-asus-dark">
            Recomendador
          </p>
        </div>
        <ProgressBar value={step} max={3} className="rounded-none h-1" trackClassName="rounded-none" />
      </div>

      <div className="flex-1 mx-auto w-full max-w-xl px-4 py-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="perfil"
              custom={direction}
              variants={STEP_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <h1 className="font-display text-2xl font-semibold text-asus-dark">
                ¿Para qué lo va a usar tu cliente?
              </h1>
              <p className="font-sans text-sm text-muted mt-1">Elige el perfil que más se le parezca.</p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {PERFILES.map(({ id, label, icon: Icon }) => (
                  <motion.button
                    key={id}
                    type="button"
                    whileTap={tapBounce}
                    onClick={() => selectPerfil(id)}
                    className="flex min-h-[44px] flex-col items-center justify-center gap-2 rounded-card border border-border bg-white py-8 hover:border-asus-blue hover:bg-asus-blue-soft transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
                  >
                    <Icon className="h-8 w-8 text-asus-blue" />
                    <span className="font-sans text-sm font-medium text-asus-dark">{label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="prioridades"
              custom={direction}
              variants={STEP_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <h1 className="font-display text-2xl font-semibold text-asus-dark">
                ¿Qué es lo más importante para él?
              </h1>
              <p className="font-sans text-sm text-muted mt-1">Elige hasta 2.</p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {PRIORIDADES.map(({ id, label, icon: Icon }) => {
                  const selected = prioridades.includes(id);
                  const disabled = !selected && prioridades.length >= 2;
                  return (
                    <motion.button
                      key={id}
                      type="button"
                      aria-pressed={selected}
                      disabled={disabled}
                      whileTap={disabled ? {} : tapBounce}
                      onClick={() => togglePrioridad(id)}
                      className={
                        selected
                          ? "flex min-h-[44px] flex-col items-center justify-center gap-2 rounded-card border-2 border-asus-blue bg-asus-blue-soft py-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
                          : "flex min-h-[44px] flex-col items-center justify-center gap-2 rounded-card border border-border bg-white py-8 hover:border-asus-blue transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue disabled:opacity-40 disabled:pointer-events-none"
                      }
                    >
                      <Icon className={selected ? "h-8 w-8 text-asus-blue" : "h-8 w-8 text-muted"} />
                      <span className="font-sans text-sm font-medium text-asus-dark">{label}</span>
                    </motion.button>
                  );
                })}
              </div>

              <Button
                variant="primary"
                className="w-full mt-8"
                disabled={prioridades.length === 0}
                onClick={() => goTo(3)}
              >
                Ver recomendación
              </Button>
            </motion.div>
          )}

          {step === 3 && resultado && perfil && (
            <motion.div
              key="resultado"
              custom={direction}
              variants={STEP_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
                Le recomendamos
              </p>
              <ProductCard
                product={resultado.principal}
                reason={explicarAjuste(perfil, prioridades)}
                className="mt-3"
              />

              <div className="mt-5 rounded-card bg-asus-blue-soft p-5">
                <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted mb-3">
                  Así se lo dices al cliente
                </p>
                <ul className="space-y-3">
                  {resultado.principal.argumentosVenta.map((frase, i) => (
                    <li key={frase} className="flex items-start justify-between gap-3">
                      <span className="font-sans text-sm text-asus-dark">{frase}</span>
                      <Button
                        variant="secondary"
                        className="h-8 px-3 text-xs shrink-0"
                        onClick={() => handleCopyFrase(i, frase)}
                      >
                        {copiedIndex === i ? "¡Copiado!" : "Copiar"}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              {resultado.alternativa && (
                <div className="mt-6">
                  <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted mb-2">
                    También podría servirle
                  </p>
                  <div className="flex items-center gap-3 rounded-card border border-border p-3">
                    <Chip line={resultado.alternativa.linea}>{LINE_LABELS[resultado.alternativa.linea]}</Chip>
                    <div>
                      <p className="font-display text-sm font-semibold text-asus-dark">
                        {resultado.alternativa.nombre}
                      </p>
                      <p className="font-mono text-xs text-faint">{resultado.alternativa.referencia}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 mt-8">
                {resultado.alternativa ? (
                  <Link
                    href={`/comparador?p=${resultado.principal.id},${resultado.alternativa.id}&modo=cliente`}
                    className={buttonClasses("primary")}
                  >
                    Comparar ambos
                  </Link>
                ) : (
                  <Link href="/comparador" className={buttonClasses("primary")}>
                    Abrir comparador
                  </Link>
                )}
                <Button variant="secondary" onClick={reiniciar}>
                  Empezar de nuevo
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
