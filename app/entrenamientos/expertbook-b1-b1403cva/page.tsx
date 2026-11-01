import type { Metadata } from "next";
import { getReferencia } from "@/data/referencias";
import { EntrenamientoExpertBookB1 } from "@/components/entrenamiento/expertbookb1/EntrenamientoExpertBookB1";

const SLUG = "expertbook-b1-b1403cva";

export function generateMetadata(): Metadata {
  const referencia = getReferencia(SLUG);
  if (!referencia) return {};
  return {
    title: `Entrenamiento: ${referencia.nombre}`,
    description: referencia.tagline,
  };
}

/**
 * Ruta estática propia (en vez de pasar por /entrenamientos/[slug]) para que
 * esta página a la medida tenga su propio chunk de JS/CSS: ver la nota en
 * lib/entrenamientoMaterialPropio.ts.
 */
export default function Page() {
  return <EntrenamientoExpertBookB1 />;
}
