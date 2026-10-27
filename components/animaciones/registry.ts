export type LineaAnimacion = "vivobook" | "zenbook" | "tuf" | "rog";

export type AnimacionId =
  | "vivobook-barrido-color"
  | "vivobook-bento-rebote"
  | "vivobook-stickers-caen"
  | "vivobook-bisagra-180"
  | "rog-glitch-rgb"
  | "rog-ola-rgb-teclado"
  | "rog-medidor-hz"
  | "rog-corte-diagonal"
  | "zenbook-tracking-cierra"
  | "zenbook-perfil-delgado"
  | "zenbook-destello-metalico"
  | "zenbook-telon-parallax"
  | "tuf-fijacion-objetivo"
  | "tuf-sello-certificacion"
  | "tuf-pruebas-resistencia"
  | "tuf-placas-blindaje";

interface AnimacionMeta {
  linea: LineaAnimacion;
  nombre: string;
  /** Si no está construida todavía, la página de laboratorio la muestra como "próximamente". */
  construida: boolean;
}

/**
 * Catálogo de todas las animaciones del sistema (construidas o no). Para
 * elegir cuál usa una sección del entrenamiento, se guarda su `id` (este
 * string) en los datos de esa sección — nunca se importa el componente
 * directamente desde el contenido.
 */
export const ANIMACIONES_META: Record<AnimacionId, AnimacionMeta> = {
  "vivobook-barrido-color": { linea: "vivobook", nombre: "Barrido de color", construida: true },
  "vivobook-bento-rebote": { linea: "vivobook", nombre: "Bento con rebote", construida: true },
  "vivobook-stickers-caen": { linea: "vivobook", nombre: "Stickers que caen", construida: true },
  "vivobook-bisagra-180": { linea: "vivobook", nombre: "Bisagra 180°", construida: true },
  "rog-glitch-rgb": { linea: "rog", nombre: "Glitch RGB", construida: true },
  "rog-ola-rgb-teclado": { linea: "rog", nombre: "Ola RGB de teclado", construida: true },
  "rog-medidor-hz": { linea: "rog", nombre: "Medidor de Hz", construida: true },
  "rog-corte-diagonal": { linea: "rog", nombre: "Corte diagonal", construida: true },
  "zenbook-tracking-cierra": { linea: "zenbook", nombre: "Tracking que se cierra", construida: true },
  "zenbook-perfil-delgado": { linea: "zenbook", nombre: "Perfil delgado", construida: true },
  "zenbook-destello-metalico": { linea: "zenbook", nombre: "Destello metálico", construida: true },
  "zenbook-telon-parallax": { linea: "zenbook", nombre: "Telón con parallax", construida: true },
  "tuf-fijacion-objetivo": { linea: "tuf", nombre: "Fijación de objetivo", construida: true },
  "tuf-sello-certificacion": { linea: "tuf", nombre: "Sello de certificación", construida: true },
  "tuf-pruebas-resistencia": { linea: "tuf", nombre: "Pruebas de resistencia", construida: true },
  "tuf-placas-blindaje": { linea: "tuf", nombre: "Placas de blindaje", construida: true },
};
