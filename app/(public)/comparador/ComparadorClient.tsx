"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import productsData from "@/data/products.json";
import type { Producto } from "@/types/product";
import { Chip } from "@/components/ui/Chip";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ModeToggle, type CompareMode } from "@/components/product/ModeToggle";
import { ProductSelect } from "@/components/product/ProductSelect";
import { CompareBar } from "@/components/product/CompareBar";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { findSpec, METRIC_ROWS } from "@/lib/compare";
import { IconChevronDown } from "@/components/icons";
import { cn } from "@/lib/cn";

const products = productsData as Producto[];

const COLUMN_WIDTH = "w-[160px] sm:w-56 lg:w-72 shrink-0";
const KNOWN_ETIQUETAS = new Set(METRIC_ROWS.map((r) => r.etiqueta));

function readSlotsFromParam(param: string | null): (string | null)[] {
  const defaults = [products[0]?.id ?? null, products[1]?.id ?? null, products[2]?.id ?? null];
  if (!param) return defaults;
  const ids = param.split(",");
  return defaults.map((fallback, i) => {
    const id = ids[i];
    return id && products.some((p) => p.id === id) ? id : i === 2 ? null : fallback;
  });
}

export function ComparadorClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduced = useReducedMotion();

  const [mode, setModeState] = useState<CompareMode>(searchParams.get("modo") === "tecnico" ? "tecnico" : "cliente");
  const [slots, setSlots] = useState<(string | null)[]>(() => readSlotsFromParam(searchParams.get("p")));
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function syncUrl(nextMode: CompareMode, nextSlots: (string | null)[]) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modo", nextMode);
    const ids = nextSlots.filter((id): id is string => Boolean(id));
    if (ids.length > 0) params.set("p", ids.join(","));
    else params.delete("p");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function setMode(next: CompareMode) {
    setModeState(next);
    syncUrl(next, slots);
  }

  function setSlot(index: number, id: string | null) {
    setSlots((prev) => {
      const next = prev.map((v, i) => (i === index ? id : v));
      syncUrl(mode, next);
      return next;
    });
  }

  async function handleCopy(product: Producto) {
    const text = product.argumentosVenta.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(product.id);
      setTimeout(() => setCopiedId((current) => (current === product.id ? null : current)), 2000);
    } catch {
      // Clipboard no disponible (permiso denegado o navegador sin soporte); se ignora silenciosamente.
    }
  }

  const activeIds = slots.filter((id): id is string => Boolean(id));
  const activeProducts = activeIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Producto => Boolean(p));
  const comboKey = activeIds.join("-");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
            Comparador
          </p>
          <h1 className="font-display text-[32px] font-semibold text-asus-dark mt-2">
            Comparador completo
          </h1>
          <p className="font-sans text-sm text-muted mt-1">
            Compara hasta 3 portátiles lado a lado. El modo y los productos elegidos quedan en el
            enlace, para compartirlo.
          </p>
        </div>
        <ModeToggle value={mode} onChange={setMode} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-3xl">
        {slots.map((id, i) => (
          <ProductSelect
            key={i}
            label={`Portátil ${i + 1}`}
            value={id}
            onChange={(next) => setSlot(i, next)}
            exclude={slots.filter((_, idx) => idx !== i)}
            allowNone={i === 2}
          />
        ))}
      </div>

      {activeProducts.length === 0 ? (
        <p className="font-sans text-sm text-muted">Elige al menos un portátil para comparar.</p>
      ) : (
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div>
            {/* Encabezados de columna — sticky bajo el header del sitio */}
            <div className="sticky top-16 z-10 bg-white/95 backdrop-blur flex gap-4 pb-4 border-b border-border">
              {activeProducts.map((product) => (
                <motion.div
                  key={comboKey + product.id}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={COLUMN_WIDTH}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <Chip line={product.linea}>{product.pantallaPulgadas}&quot;</Chip>
                    {product.verificar && <Badge tone="warning">Datos en verificación</Badge>}
                  </div>
                  <p className="font-display text-base font-semibold text-asus-dark mt-2">
                    {product.nombre}
                  </p>
                  <p className="font-mono text-xs text-faint">{product.referencia}</p>
                </motion.div>
              ))}
            </div>

            {METRIC_ROWS.map((row) => (
              <AccordionSection key={row.key} title={row.titulo} defaultOpen reduced={reduced}>
                <div className="flex gap-4">
                  {activeProducts.map((product) => {
                    const value = product.metricas[row.key];
                    const maxValue = Math.max(...activeProducts.map((p) => p.metricas[row.key]));
                    const spec = findSpec(product, row.etiqueta);
                    return (
                      <div key={product.id} className={COLUMN_WIDTH}>
                        <CompareBar
                          value={value}
                          highlight={value === maxValue}
                          animateKey={comboKey + row.key}
                          reduced={reduced}
                        />
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={mode}
                            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: reduced ? 0 : 0.2 }}
                            className="font-sans text-xs text-muted mt-2"
                          >
                            {spec ? (mode === "tecnico" ? spec.valorTecnico : spec.valorCliente) : "—"}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </AccordionSection>
            ))}

            <AccordionSection title="Otras especificaciones" reduced={reduced}>
              <div className="flex gap-4">
                {activeProducts.map((product) => (
                  <div key={product.id} className={cn(COLUMN_WIDTH, "space-y-3")}>
                    {product.specs
                      .filter((s) => !KNOWN_ETIQUETAS.has(s.etiqueta))
                      .map((spec) => (
                        <div key={spec.etiqueta}>
                          <p className="font-sans text-xs text-muted">{spec.etiqueta}</p>
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={mode}
                              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={reduced ? { opacity: 1 } : { opacity: 0 }}
                              transition={{ duration: reduced ? 0 : 0.2 }}
                              className="font-sans text-sm text-asus-dark mt-0.5"
                            >
                              {mode === "tecnico" ? spec.valorTecnico : spec.valorCliente}
                            </motion.p>
                          </AnimatePresence>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="Cómo explicárselo al cliente" defaultOpen reduced={reduced}>
              <div className="flex gap-4">
                {activeProducts.map((product) => (
                  <div key={product.id} className={COLUMN_WIDTH}>
                    <Button
                      variant="secondary"
                      className="h-8 px-3 text-xs mb-3"
                      onClick={() => handleCopy(product)}
                    >
                      {copiedId === product.id ? "¡Copiado!" : "Copiar"}
                    </Button>
                    <ul className="font-sans text-sm text-asus-dark space-y-2 list-disc list-inside">
                      {product.argumentosVenta.map((frase) => (
                        <li key={frase}>{frase}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AccordionSection>
          </div>
        </div>
      )}
    </div>
  );
}

function AccordionSection({
  title,
  defaultOpen = false,
  reduced,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  reduced: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
      >
        <span className="font-display text-base font-semibold text-asus-dark">{title}</span>
        <IconChevronDown
          className={cn("h-5 w-5 text-muted transition-transform shrink-0", open && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
