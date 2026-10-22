"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import productsData from "@/data/products.json";
import type { Producto } from "@/types/product";
import { Chip } from "@/components/ui/Chip";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ModeToggle, type CompareMode } from "@/components/product/ModeToggle";
import { ProductSelect } from "@/components/product/ProductSelect";
import { CompareBar } from "@/components/product/CompareBar";
import { SpecList } from "@/components/product/SpecList";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { METRIC_ROWS } from "@/lib/compare";

const products = productsData as Producto[];

export function ComparadorClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduced = useReducedMotion();

  const modeParam = searchParams.get("modo");
  const [mode, setModeState] = useState<CompareMode>(modeParam === "tecnico" ? "tecnico" : "cliente");

  const [slots, setSlots] = useState<(string | null)[]>([
    products[0]?.id ?? null,
    products[1]?.id ?? null,
    products[2]?.id ?? null,
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  function setMode(next: CompareMode) {
    setModeState(next);
    const params = new URLSearchParams(searchParams.toString());
    params.set("modo", next);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function setSlot(index: number, id: string | null) {
    setSlots((prev) => prev.map((v, i) => (i === index ? id : v)));
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
            Compara hasta 3 portátiles lado a lado. El modo elegido queda en el enlace, para compartirlo.
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
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 sm:grid sm:overflow-visible" style={{ gridTemplateColumns: `repeat(${activeProducts.length}, minmax(0,1fr))` }}>
          {activeProducts.map((product) => (
            <motion.div
              key={comboKey + product.id}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 w-[86%] sm:w-auto snap-start rounded-card border border-border bg-white overflow-hidden"
            >
              <div className="p-5 border-b border-border">
                <div className="flex items-center gap-2 flex-wrap">
                  <Chip line={product.linea}>{product.pantallaPulgadas}&quot;</Chip>
                  {product.verificar && <Badge tone="warning">Datos en verificación</Badge>}
                </div>
                <p className="font-display text-lg font-semibold text-asus-dark mt-2">{product.nombre}</p>
                <p className="font-mono text-xs text-faint">{product.referencia}</p>
              </div>

              <div className="p-5 space-y-5 border-b border-border">
                {METRIC_ROWS.map((row) => {
                  const value = product.metricas[row.key];
                  const maxValue = Math.max(...activeProducts.map((p) => p.metricas[row.key]));
                  return (
                    <div key={row.key}>
                      <p className="font-sans text-xs text-muted mb-1.5">
                        {mode === "tecnico" ? row.tecnico : row.cliente}
                      </p>
                      <CompareBar
                        value={value}
                        highlight={value === maxValue}
                        animateKey={comboKey + row.key}
                        reduced={reduced}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="p-5 border-b border-border">
                <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted mb-1">
                  Especificaciones
                </p>
                <SpecList specs={product.specs} mode={mode} />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted">
                    Cómo explicárselo al cliente
                  </p>
                  <Button
                    variant="secondary"
                    className="h-8 px-3 text-xs"
                    onClick={() => handleCopy(product)}
                  >
                    {copiedId === product.id ? "¡Copiado!" : "Copiar"}
                  </Button>
                </div>
                <ul className="font-sans text-sm text-asus-dark space-y-2 list-disc list-inside">
                  {product.argumentosVenta.map((frase) => (
                    <li key={frase}>{frase}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
