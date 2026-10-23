"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import productsData from "@/data/products.json";
import type { Producto } from "@/types/product";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealContainer, revealItem } from "@/lib/motion";
import { LINE_LABELS } from "@/lib/lineLabels";

const products = productsData as Producto[];

export function ProductGrid() {
  const reduced = useReducedMotion();

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
      <h2 className="font-display text-[32px] font-semibold text-asus-dark mt-2 mb-10">
        El portafolio que vas a dominar
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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
