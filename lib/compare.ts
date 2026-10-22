import type { Metricas, Producto, Spec } from "@/types/product";

export interface MetricRowDef {
  key: keyof Metricas;
  titulo: string;
  etiqueta: string;
}

export const METRIC_ROWS: MetricRowDef[] = [
  { key: "bateria", titulo: "Batería", etiqueta: "Batería" },
  { key: "rendimiento", titulo: "Rendimiento", etiqueta: "Procesador" },
  { key: "ia", titulo: "Inteligencia artificial", etiqueta: "Inteligencia artificial (IA)" },
  { key: "portabilidad", titulo: "Portabilidad", etiqueta: "Portabilidad" },
  { key: "pantalla", titulo: "Pantalla", etiqueta: "Pantalla" },
];

export function findSpec(product: Producto, etiqueta: string): Spec | undefined {
  return product.specs.find((s) => s.etiqueta === etiqueta);
}
