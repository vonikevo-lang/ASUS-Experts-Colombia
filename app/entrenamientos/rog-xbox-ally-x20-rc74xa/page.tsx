import type { Metadata } from "next";
import { getReferencia } from "@/data/referencias";
import { EntrenamientoRogXboxAllyX20 } from "@/components/entrenamiento/rogxboxallyx20/EntrenamientoRogXboxAllyX20";

const SLUG = "rog-xbox-ally-x20-rc74xa";

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
  return <EntrenamientoRogXboxAllyX20 />;
}
