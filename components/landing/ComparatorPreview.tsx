"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import productsData from "@/data/products.json";
import type { Producto } from "@/types/product";
import { Chip } from "@/components/ui/Chip";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { ModeToggle, type CompareMode } from "@/components/product/ModeToggle";
import { ProductSelect } from "@/components/product/ProductSelect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { findSpec, METRIC_ROWS } from "@/lib/compare";

const products = productsData as Producto[];

export function ComparatorPreview() {
  const [idA, setIdA] = useState(products[0].id);
  const [idB, setIdB] = useState(products[1].id);
  const [mode, setMode] = useState<CompareMode>("cliente");
  const reduced = useReducedMotion();

  const productA = products.find((p) => p.id === idA) ?? products[0];
  const productB = products.find((p) => p.id === idB) ?? products[1];
  const comboKey = `${idA}-${idB}`;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
            Compara y explica
          </p>
          <h2 className="font-display text-[32px] font-semibold text-asus-dark mt-2">
            Encuentra la diferencia en segundos
          </h2>
        </div>
        <ModeToggle value={mode} onChange={setMode} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-xl">
        <ProductSelect value={idA} onChange={(id) => id && setIdA(id)} exclude={[idB]} label="Producto A" />
        <ProductSelect value={idB} onChange={(id) => id && setIdB(id)} exclude={[idA]} label="Producto B" />
      </div>

      <div className="rounded-card border border-border p-6 md:p-8 bg-white">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <ProductHeading product={productA} align="left" />
          <ProductHeading product={productB} align="right" />
        </div>

        <div className="space-y-7">
          {METRIC_ROWS.map((row) => (
            <MetricRow
              key={row.key}
              titulo={row.titulo}
              specA={findSpec(productA, row.etiqueta)}
              specB={findSpec(productB, row.etiqueta)}
              valueA={productA.metricas[row.key]}
              valueB={productB.metricas[row.key]}
              mode={mode}
              comboKey={comboKey}
              reduced={reduced}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/comparador" className={buttonClasses("primary")}>
            Abrir comparador completo
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductHeading({ product, align }: { product: Producto; align: "left" | "right" }) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <Chip line={product.linea}>{product.pantallaPulgadas}&quot;</Chip>
      <p className="font-display text-lg font-semibold text-asus-dark mt-2">{product.nombre}</p>
      <p className="font-mono text-xs text-faint">{product.referencia}</p>
      {product.verificar && (
        <Badge tone="warning" className="mt-2">
          Datos en verificación
        </Badge>
      )}
    </div>
  );
}

function MetricRow({
  titulo,
  specA,
  specB,
  valueA,
  valueB,
  mode,
  comboKey,
  reduced,
}: {
  titulo: string;
  specA: { valorTecnico: string; valorCliente: string } | undefined;
  specB: { valorTecnico: string; valorCliente: string } | undefined;
  valueA: number;
  valueB: number;
  mode: CompareMode;
  comboKey: string;
  reduced: boolean;
}) {
  const aWins = valueA > valueB;
  const bWins = valueB > valueA;
  const springTransition = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 26 };

  return (
    <div>
      <p className="font-sans text-xs text-muted text-center mb-2">{titulo}</p>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="h-3 rounded-chip bg-asus-blue-soft overflow-hidden">
          <motion.div
            key={comboKey + "-a"}
            className={aWins || !bWins ? "h-full w-full rounded-chip bg-asus-blue" : "h-full w-full rounded-chip bg-asus-silver"}
            style={{ transformOrigin: "right" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: valueA / 10 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={springTransition}
          />
        </div>
        <span className="font-mono text-xs text-faint w-12 text-center">
          {valueA}–{valueB}
        </span>
        <div className="h-3 rounded-chip bg-asus-blue-soft overflow-hidden">
          <motion.div
            key={comboKey + "-b"}
            className={bWins || !aWins ? "h-full w-full rounded-chip bg-asus-blue" : "h-full w-full rounded-chip bg-asus-silver"}
            style={{ transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: valueB / 10 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={springTransition}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${comboKey}-a-${mode}`}
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="font-sans text-xs text-muted text-right"
          >
            {specA ? (mode === "tecnico" ? specA.valorTecnico : specA.valorCliente) : "—"}
          </motion.p>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={`${comboKey}-b-${mode}`}
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="font-sans text-xs text-muted text-left"
          >
            {specB ? (mode === "tecnico" ? specB.valorTecnico : specB.valorCliente) : "—"}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
