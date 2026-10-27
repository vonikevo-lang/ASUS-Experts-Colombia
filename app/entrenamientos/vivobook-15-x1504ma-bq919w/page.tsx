import type { Metadata } from "next";
import { getReferencia } from "@/data/referencias";
import { EntrenamientoVivobook15X1504 } from "@/components/entrenamiento/vivobook15x1504/EntrenamientoVivobook15X1504";

const SLUG = "vivobook-15-x1504ma-bq919w";

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
  return <EntrenamientoVivobook15X1504 />;
}
