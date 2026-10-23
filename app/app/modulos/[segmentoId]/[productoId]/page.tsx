"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import segmentosData from "@/data/segmentos.json";
import productsData from "@/data/products.json";
import apoyoX1504ma from "@/data/apoyo/vivobook-15-x1504ma-bq919w.json";
import type { Segmento, Slide } from "@/types/platform";
import type { Producto } from "@/types/product";
import type { BloqueApoyo } from "@/types/apoyo";
import { Button } from "@/components/ui/Button";
import { MaterialApoyo } from "@/components/apoyo/MaterialApoyo";
import { useDemoUser } from "@/lib/demoUser";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { buildSlides } from "@/lib/buildSlides";
import { IconArrowLeft, IconChevronDown } from "@/components/icons";
import { cn } from "@/lib/cn";

const segmentos = segmentosData as Segmento[];
const products = productsData as Producto[];

// Registro de material de apoyo (Paso 1) por producto. Por ahora solo
// vivobook-15-x1504ma-bq919w lo tiene; las demás referencias siguen con
// el flujo de 2 pasos (historias → quiz) sin este registro.
const APOYO_POR_PRODUCTO: Record<string, BloqueApoyo[]> = {
  "vivobook-15-x1504ma-bq919w": apoyoX1504ma as BloqueApoyo[],
};

const STEP_VARIANTS = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
};

export default function ModuloReferenciaPage() {
  const params = useParams<{ segmentoId: string; productoId: string }>();
  const router = useRouter();
  const reduced = useReducedMotion();
  const { markModuleCompleted } = useDemoUser();

  const segmento = segmentos.find((s) => s.id === params.segmentoId) ?? null;
  const producto = products.find((p) => p.id === params.productoId);
  const bloquesApoyo = producto ? APOYO_POR_PRODUCTO[producto.id] : undefined;
  const tieneApoyo = Boolean(bloquesApoyo && bloquesApoyo.length > 0);

  const slides = useMemo(() => (producto ? buildSlides(producto, segmento, products) : []), [producto, segmento]);

  const [fase, setFase] = useState<"apoyo" | "historias">(tieneApoyo ? "apoyo" : "historias");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!producto || !segmento) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <p className="font-sans text-sm text-muted">Módulo no encontrado.</p>
        <Link href="/app/modulos" className="font-sans text-sm text-asus-blue underline mt-2 inline-block">
          Volver a módulos
        </Link>
      </main>
    );
  }

  const totalPasos = tieneApoyo ? 3 : 2;
  const pasoActual = fase === "apoyo" ? 1 : tieneApoyo ? 2 : 1;
  const totalScreens = slides.length + 1; // + pantalla final "así se lo dices"
  const isLast = index === totalScreens - 1;
  const transition = reduced ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

  function goTo(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }

  function handleNext() {
    if (fase === "apoyo") {
      setFase("historias");
      return;
    }
    if (index < totalScreens - 1) {
      goTo(index + 1);
      return;
    }
    markModuleCompleted(producto!.id);
    router.push(`/app/quiz/${producto!.id}`);
  }

  function handleBack() {
    if (fase === "historias" && index === 0) {
      if (tieneApoyo) {
        setFase("apoyo");
        return;
      }
      router.push(`/app/modulos/${segmento!.id}`);
      return;
    }
    if (fase === "apoyo") {
      router.push(`/app/modulos/${segmento!.id}`);
      return;
    }
    goTo(index - 1);
  }

  const slide = index < slides.length ? slides[index] : null;

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
          <div className="min-w-0">
            {tieneApoyo && (
              <p className="font-sans text-[11px] uppercase tracking-[0.04em] text-asus-blue font-medium">
                Paso {pasoActual} de {totalPasos} · {fase === "apoyo" ? "Material de apoyo" : "Entrenamiento"}
              </p>
            )}
            <p className="font-sans text-sm font-medium text-asus-dark truncate">{producto.nombre}</p>
          </div>
        </div>
        {fase === "historias" && (
          <div className="mx-auto max-w-xl px-4 pb-3 flex gap-1.5">
            {Array.from({ length: totalScreens }).map((_, i) => (
              <div key={i} className="h-1 flex-1 rounded-chip bg-asus-blue-soft overflow-hidden">
                <div className={cn("h-full rounded-chip bg-asus-blue", i <= index ? "w-full" : "w-0")} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 mx-auto w-full max-w-xl px-4 py-8 overflow-hidden">
        {fase === "apoyo" && bloquesApoyo ? (
          <MaterialApoyo bloques={bloquesApoyo} />
        ) : (
          <AnimatePresence mode="wait" custom={direction}>
            {slide ? (
              <motion.div
                key={index}
                custom={direction}
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <SlideView slide={slide} segmento={segmento} reduced={reduced} />
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
        )}
      </div>

      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-border px-4 py-4">
        <div className="mx-auto max-w-xl">
          <Button variant="primary" className="w-full" onClick={handleNext}>
            {fase === "apoyo" ? "Ir al entrenamiento" : isLast ? "Ir al quiz" : "Siguiente"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function SlideView({ slide, segmento, reduced }: { slide: Slide; segmento: Segmento; reduced: boolean }) {
  switch (slide.tipo) {
    case "texto":
      return <SlideTextoView slide={slide} />;
    case "ia":
      return <SlideIAView slide={slide} reduced={reduced} />;
    case "ram":
      return <SlideRamView slide={slide} reduced={reduced} />;
    case "ganchos":
      return <SlideGanchosView slide={slide} reduced={reduced} />;
    case "objeciones":
      return <SlideObjecionesView slide={slide} reduced={reduced} />;
    case "comparacion":
      return <SlideComparacionView slide={slide} segmento={segmento} />;
  }
}

function SlideImage({ src }: { src: string }) {
  return (
    <div className="aspect-[4/3] rounded-card overflow-hidden bg-asus-blue-soft">
      <Image src={src} alt="" width={400} height={300} className="w-full h-full object-contain p-6" />
    </div>
  );
}

function SlideTextoView({ slide }: { slide: Extract<Slide, { tipo: "texto" }> }) {
  return (
    <div>
      <SlideImage src={slide.imagen} />
      <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium mt-6">Qué es</p>
      <p className="font-display text-2xl font-semibold text-asus-dark mt-1">{slide.titulo}</p>
      <p className="font-sans text-sm text-muted mt-1">{slide.queEs}</p>

      <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium mt-5">
        Qué significa
      </p>
      <p className="font-sans text-sm text-asus-dark mt-1">{slide.queSignifica}</p>

      <div className="rounded-card bg-asus-blue-soft p-4 mt-5">
        <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
          Así se lo dices
        </p>
        <p className="font-sans text-sm text-asus-dark mt-1">{slide.comoDecirlo}</p>
      </div>
    </div>
  );
}

function SlideIAView({ slide, reduced }: { slide: Extract<Slide, { tipo: "ia" }>; reduced: boolean }) {
  const tieneNpu = slide.npuTops !== null;
  return (
    <div>
      <p className="font-display text-2xl font-semibold text-asus-dark">¿Tiene IA?</p>
      <div className="grid grid-cols-2 gap-3 mt-5">
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
          className={cn(
            "rounded-card border p-4 text-center",
            tieneNpu ? "border-success bg-success/10" : "border-border bg-asus-blue-soft/40",
          )}
        >
          <p className="font-display text-3xl font-bold text-asus-dark">{tieneNpu ? "✓" : "✗"}</p>
          <p className="font-sans text-sm font-semibold text-asus-dark mt-1">NPU</p>
          <p className="font-sans text-xs text-muted mt-0.5">
            {tieneNpu ? `${slide.npuTops} TOPS` : "No trae NPU dedicada"}
          </p>
        </motion.div>
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.08 }}
          className={cn(
            "rounded-card border p-4 text-center",
            slide.copilotPlus ? "border-success bg-success/10" : "border-border bg-asus-blue-soft/40",
          )}
        >
          <p className="font-display text-3xl font-bold text-asus-dark">{slide.copilotPlus ? "✓" : "✗"}</p>
          <p className="font-sans text-sm font-semibold text-asus-dark mt-1">Copilot+ PC</p>
          <p className="font-sans text-xs text-muted mt-0.5">(requiere 40 TOPS)</p>
        </motion.div>
      </div>
      <div className="rounded-card bg-asus-blue-soft p-4 mt-5">
        <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
          Así se lo dices
        </p>
        <p className="font-sans text-sm text-asus-dark mt-1">{slide.comoDecirlo}</p>
      </div>
    </div>
  );
}

function SlideRamView({ slide, reduced }: { slide: Extract<Slide, { tipo: "ram" }>; reduced: boolean }) {
  const titulo = slide.caso === "soldada" ? "Memoria RAM — soldada" : "Memoria RAM";
  const transition = reduced ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div>
      <p className="font-display text-2xl font-semibold text-asus-dark">{titulo}</p>
      <p className="font-sans text-sm text-muted mt-1">{slide.ram}</p>

      <div className="h-28 rounded-card bg-asus-blue-soft/60 mt-5 flex items-center justify-center overflow-hidden relative">
        {slide.caso === "soldada" && (
          <div className="flex flex-col items-center gap-1">
            <div className="h-10 w-20 rounded-btn bg-asus-silver border border-border" />
            <p className="font-sans text-xs text-muted">No se puede subir</p>
          </div>
        )}
        {slide.caso === "se-cambia" && (
          <div className="flex items-center gap-3">
            <motion.div
              initial={reduced ? { opacity: 0 } : { x: 0, opacity: 1 }}
              animate={reduced ? { opacity: 0 } : { x: -40, opacity: 0 }}
              transition={{ ...transition, delay: reduced ? 0 : 0.4 }}
              className="h-10 w-16 rounded-btn bg-asus-silver border border-border absolute"
            />
            <motion.div
              initial={reduced ? { opacity: 1 } : { x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ...transition, delay: reduced ? 0 : 0.9 }}
              className="h-12 w-24 rounded-btn bg-asus-blue"
            />
          </div>
        )}
        {slide.caso === "se-suma" && (
          <div className="flex items-center gap-2">
            <div className="h-10 w-16 rounded-btn bg-asus-blue" />
            <motion.div
              initial={reduced ? { opacity: 1 } : { x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ...transition, delay: reduced ? 0 : 0.4 }}
              className="h-10 w-16 rounded-btn bg-asus-blue"
            />
          </div>
        )}
      </div>
      <p className="font-sans text-xs text-center text-muted mt-2">
        {slide.caso === "soldada"
          ? "Memoria soldada, sin ranura adicional."
          : slide.caso === "se-cambia"
            ? "Se cambia, no se suma."
            : "Hay ranura libre: se puede sumar un módulo."}
      </p>

      <div className="rounded-card bg-asus-blue-soft p-4 mt-5">
        <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
          Así se lo dices
        </p>
        <p className="font-sans text-sm text-asus-dark mt-1">{slide.comoDecirlo}</p>
      </div>
    </div>
  );
}

function SlideGanchosView({
  slide,
  reduced,
}: {
  slide: Extract<Slide, { tipo: "ganchos" }>;
  reduced: boolean;
}) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold text-asus-dark">Ganchos de venta</p>
      <p className="font-sans text-sm text-muted mt-1">Toca cada tarjeta para ver la frase.</p>
      <div className="grid grid-cols-1 gap-3 mt-5">
        {slide.ganchos.map((g, i) => (
          <FlipCard key={i} cliente={g.cliente} frase={g.frase} reduced={reduced} />
        ))}
      </div>
    </div>
  );
}

function FlipCard({ cliente, frase, reduced }: { cliente: string; frase: string; reduced: boolean }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      className="text-left rounded-card border border-border p-4 min-h-[88px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
      style={reduced ? undefined : { perspective: 800 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!flipped ? (
          <motion.div
            key="frente"
            initial={reduced ? { opacity: 1 } : { rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { rotateX: 90, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted">Tipo de cliente</p>
            <p className="font-sans text-sm font-medium text-asus-dark mt-1">{cliente}</p>
          </motion.div>
        ) : (
          <motion.div
            key="atras"
            initial={reduced ? { opacity: 1 } : { rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { rotateX: 90, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
              Así se lo dices
            </p>
            <p className="font-sans text-sm text-asus-dark mt-1">{frase}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function SlideObjecionesView({
  slide,
  reduced,
}: {
  slide: Extract<Slide, { tipo: "objeciones" }>;
  reduced: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <p className="font-display text-2xl font-semibold text-asus-dark">Objeciones frecuentes</p>
      <div className="mt-5 divide-y divide-border rounded-card border border-border overflow-hidden">
        {slide.objeciones.map((o, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
              >
                <span className="font-sans text-sm font-medium text-asus-dark">{o.objecion}</span>
                <IconChevronDown
                  className={cn("h-4 w-4 text-muted shrink-0 transition-transform", isOpen && "rotate-180")}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-sm text-muted px-4 pb-4">{o.respuesta}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SlideComparacionView({
  slide,
  segmento,
}: {
  slide: Extract<Slide, { tipo: "comparacion" }>;
  segmento: Segmento;
}) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold text-asus-dark">¿Con cuál la comparo?</p>
      <p className="font-sans text-sm text-muted mt-1">
        Los escalones vecinos en la escalera de {segmento.nombre}.
      </p>
      <div className="space-y-4 mt-5">
        <ComparacionCard titulo="Un escalón abajo" vecino={slide.abajo} segmento={segmento} />
        <ComparacionCard titulo="Un escalón arriba" vecino={slide.arriba} segmento={segmento} />
      </div>
    </div>
  );
}

function ComparacionCard({
  titulo,
  vecino,
  segmento,
}: {
  titulo: string;
  vecino: Extract<Slide, { tipo: "comparacion" }>["abajo"];
  segmento: Segmento;
}) {
  if (!vecino) {
    return (
      <div className="rounded-card border border-dashed border-border p-4">
        <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted">{titulo}</p>
        <p className="font-sans text-sm text-muted mt-1">
          {titulo === "Un escalón abajo"
            ? `Es el piso de la escalera ${segmento.nombre}.`
            : `Es el tope de la escalera ${segmento.nombre}.`}
        </p>
      </div>
    );
  }
  return (
    <Link href={`/app/modulos/${segmento.id}/${vecino.id}`} className="block">
      <div className="rounded-card border border-border p-4 hover:border-asus-blue transition-colors">
        <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted">{titulo}</p>
        <p className="font-sans text-sm font-medium text-asus-dark mt-1">{vecino.nombre}</p>
        <ul className="font-sans text-xs text-muted mt-2 space-y-1 list-disc list-inside">
          {vecino.diferencias.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
