import type { Metricas, PerfilUso, Producto } from "@/types/product";

export type Prioridad = "bateria" | "pantalla" | "potencia" | "peso" | "precio";

const PRIORITY_TO_METRIC: Partial<Record<Prioridad, keyof Metricas>> = {
  bateria: "bateria",
  pantalla: "pantalla",
  potencia: "rendimiento",
  peso: "portabilidad",
};

export interface Recomendacion {
  principal: Producto;
  alternativa: Producto | null;
}

function priorityValue(product: Producto, prioridad: Prioridad): number | null {
  const metric = PRIORITY_TO_METRIC[prioridad];
  if (metric) return product.metricas[metric];
  if (prioridad === "precio") {
    // TODO: el catálogo no tiene precio real todavía. Como proxy temporal,
    // asumimos que a menor rendimiento, más económico tiende a ser el
    // equipo. Reemplazar por datos de precio reales apenas existan.
    return 10 - product.metricas.rendimiento;
  }
  return null;
}

function score(product: Producto, prioridades: Prioridad[]): number {
  const values = prioridades
    .map((p) => priorityValue(product, p))
    .filter((v): v is number => v !== null);
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function recomendar(
  products: Producto[],
  perfil: PerfilUso,
  prioridades: Prioridad[],
): Recomendacion | null {
  if (products.length === 0) return null;

  const candidatos = products.filter((p) => p.perfiles.includes(perfil));
  const ranked = [...candidatos].sort((a, b) => score(b, prioridades) - score(a, prioridades));

  const principal = ranked[0] ?? products[0];

  let alternativa = ranked[1] ?? null;
  if (!alternativa) {
    const resto = products.filter((p) => p.id !== principal.id);
    alternativa = [...resto].sort((a, b) => score(b, prioridades) - score(a, prioridades))[0] ?? null;
  }

  return { principal, alternativa };
}
