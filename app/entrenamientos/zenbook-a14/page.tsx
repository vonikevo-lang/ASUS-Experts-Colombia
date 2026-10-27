import type { Metadata } from "next";
import { getReferencia } from "@/data/referencias";
import { EntrenamientoZenbookA14 } from "@/components/entrenamiento/zenbooka14/EntrenamientoZenbookA14";

const SLUG = "zenbook-a14";

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
  return <EntrenamientoZenbookA14 />;
}
