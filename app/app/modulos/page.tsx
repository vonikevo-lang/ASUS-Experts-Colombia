"use client";

import Link from "next/link";
import modulesData from "@/data/modules.json";
import productsData from "@/data/products.json";
import type { Modulo } from "@/types/platform";
import type { Producto } from "@/types/product";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Badge } from "@/components/ui/Badge";
import { useDemoUser } from "@/lib/demoUser";

const modules = modulesData as Modulo[];
const products = productsData as Producto[];

export default function ModulosPage() {
  const { state } = useDemoUser();

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-asus-dark">Módulos</h1>
      <p className="font-sans text-sm text-muted mt-1">Entrenamientos cortos, uno por producto.</p>

      <div className="mt-6 space-y-4">
        {modules.map((modulo) => {
          const producto = products.find((p) => p.id === modulo.productoId);
          const done = state.completedModules.includes(modulo.slug);
          const quiz = state.quizResults[modulo.slug];
          return (
            <Link key={modulo.slug} href={`/app/modulos/${modulo.slug}`}>
              <Card className="p-5">
                <div className="flex items-center gap-2">
                  {producto && <Chip line={producto.linea}>{producto.pantallaPulgadas}&quot;</Chip>}
                  {done && <Badge tone="success">Completado</Badge>}
                  {quiz && (
                    <Badge tone="neutral">
                      Quiz {quiz.score}/{quiz.total}
                    </Badge>
                  )}
                </div>
                <p className="font-display text-lg font-semibold text-asus-dark mt-2">{modulo.titulo}</p>
                <p className="font-sans text-sm text-muted mt-1">{modulo.pantallas.length} pantallas · ~5 min</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
