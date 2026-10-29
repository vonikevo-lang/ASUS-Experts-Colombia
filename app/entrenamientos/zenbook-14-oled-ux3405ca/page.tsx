import type { Metadata } from "next";
import { getReferencia } from "@/data/referencias";
import { EntrenamientoZenbook14Oled } from "@/components/entrenamiento/zenbook14oled/EntrenamientoZenbook14Oled";

const SLUG = "zenbook-14-oled-ux3405ca";

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
  return <EntrenamientoZenbook14Oled />;
}
