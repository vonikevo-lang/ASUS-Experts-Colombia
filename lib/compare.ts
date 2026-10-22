import type { Metricas } from "@/types/product";

export const METRIC_ROWS: { key: keyof Metricas; tecnico: string; cliente: string }[] = [
  { key: "bateria", tecnico: "Batería (autonomía)", cliente: "Qué tanto dura la batería" },
  { key: "rendimiento", tecnico: "Rendimiento (CPU/GPU)", cliente: "Qué tan rápido es" },
  { key: "ia", tecnico: "IA / NPU (TOPS)", cliente: "Qué tan inteligente es" },
  { key: "portabilidad", tecnico: "Portabilidad (peso y grosor)", cliente: "Qué tan fácil es cargarlo" },
  { key: "pantalla", tecnico: "Pantalla (resolución y brillo)", cliente: "Qué tan buena se ve la pantalla" },
];
