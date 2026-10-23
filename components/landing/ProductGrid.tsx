"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import productsData from "@/data/products.json";
import segmentosData from "@/data/segmentos.json";
import type { Producto } from "@/types/product";
import type { Segmento } from "@/types/platform";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";
import { LINE_LABELS } from "@/lib/lineLabels";
import { cn } from "@/lib/cn";

const products = productsData as Producto[];
const segmentos = segmentosData as Segmento[];

export function ProductGrid() {
  const reduced = useReducedMotion();
  const [filtro, setFiltro] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    if (!filtro) return products;
    const segmento = segmentos.find((s) => s.id === filtro);
    if (!segmento) return products;
    return segmento.orden
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Producto => Boolean(p));
  }, [filtro]);

  return (
    <motion.section
      className="mx-auto max-w-7xl px-4 sm:px-6 py-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={revealContainer(reduced)}
    >
      <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
        Portafolio
      </p>
      <h2 className="font-display text-[32px] font-semibold text-asus-dark mt-2">
        El portafolio que vas a dominar
      </h2>
      <p className="font-sans text-sm text-muted mt-2">
        Organizado en 4 segmentos, cada uno con su propia escalera de referencias.
      </p>

      <div className="flex flex-wrap gap-2 mt-6 mb-10">
        <button
          type="button"
          onClick={() => setFiltro(null)}
          className={cn(
            "h-9 px-4 rounded-chip font-sans text-sm font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue",
            filtro === null
              ? "bg-asus-dark text-white border-asus-dark"
              : "bg-white text-asus-dark border-border hover:border-asus-dark",
          )}
        >
          Todos
        </button>
        {segmentos.map((segmento) => {
          const active = filtro === segmento.id;
          return (
            <button
              key={segmento.id}
              type="button"
              onClick={() => setFiltro(segmento.id)}
              className="h-9 px-4 rounded-chip font-sans text-sm font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
              style={
                active
                  ? { backgroundColor: segmento.color, borderColor: segmento.color, color: "#ffffff" }
                  : { borderColor: segmento.color, color: segmento.color }
              }
            >
              {segmento.nombre}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtrados.map((product) => (
          <motion.div key={product.id} variants={revealItem(reduced)}>
            <Card className="h-full flex flex-col overflow-hidden group">
              <div className="aspect-[4/3] overflow-hidden bg-asus-blue-soft">
                <Image
                  src={product.imagen}
                  alt={product.nombre}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Chip>{product.pantallaPulgadas}&quot;</Chip>
                  <Chip line={product.linea}>{LINE_LABELS[product.linea]}</Chip>
                </div>
                <p className="font-display text-lg font-semibold text-asus-dark mt-3">
                  {product.nombre}
                </p>
                <p className="font-mono text-xs text-faint mt-0.5">{product.referencia}</p>
                <ul className="font-sans text-sm text-muted mt-3 space-y-1 list-disc list-inside flex-1">
                  {product.specs.slice(0, 4).map((spec) => (
                    <li key={spec.etiqueta}>{spec.valorTecnico}</li>
                  ))}
                </ul>
                <div className="flex gap-3 mt-5">
                  <Link href="/app" className={buttonClasses("primary", "flex-1 h-9 text-xs px-3")}>
                    Entrenarme
                  </Link>
                  <Link href="/comparador" className={buttonClasses("secondary", "flex-1 h-9 text-xs px-3")}>
                    Comparar
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
