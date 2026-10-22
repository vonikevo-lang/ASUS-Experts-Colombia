import type { Metricas, PerfilUso, Producto } from "@/types/product";

export type Prioridad = "bateria" | "pantalla" | "potencia" | "peso" | "precio";

// "precio" no tiene métrica asociada: el catálogo no trae datos de precio
// verificados, así que esa prioridad no pondera el puntaje.
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

function score(product: Producto, prioridades: Prioridad[]): number {
  const metrics = prioridades
    .map((p) => PRIORITY_TO_METRIC[p])
    .filter((m): m is keyof Metricas => Boolean(m));
  if (metrics.length === 0) return 0;
  return metrics.reduce((sum, m) => sum + product.metricas[m], 0) / metrics.length;
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
