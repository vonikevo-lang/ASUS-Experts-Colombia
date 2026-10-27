import type { Metadata } from "next";
import { getReferencia } from "@/data/referencias";
import { EntrenamientoTufGamingF16F15 } from "@/components/entrenamiento/tufgamingf16f15/EntrenamientoTufGamingF16F15";

const SLUG = "tuf-gaming-f15-fx507vv-rtx4060";

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
 * lib/entrenamientoMaterialPropio.ts. El mismo componente sirve esta
 * referencia y la F16 (comparador en vivo entre las dos).
 */
export default function Page() {
  return <EntrenamientoTufGamingF16F15 referenciaInicial="f15" />;
}
