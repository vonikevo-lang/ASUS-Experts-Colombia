export interface Segmento {
  id: string;
  nombre: string;
  mensaje: string;
  color: string;
  /** Ids de producto, de entrada a tope. */
  orden: string[];
}

/** Las 13 slides del módulo de cada referencia (punto 8 de la guía general).
 * Se generan en runtime con `lib/buildSlides.ts` a partir de `Producto` +
 * `Segmento`; no se guardan como JSON porque son el mismo molde para las
 * 20 referencias. */
export interface SlideTexto {
  tipo: "texto";
  titulo: string;
  queEs: string;
  queSignifica: string;
  comoDecirlo: string;
  imagen: string;
}

export interface SlideIA {
  tipo: "ia";
  npuTops: number | null;
  copilotPlus: boolean;
  comoDecirlo: string;
  imagen: string;
}

export interface SlideRam {
  tipo: "ram";
  caso: "soldada" | "se-cambia" | "se-suma";
  ram: string;
  comoDecirlo: string;
  imagen: string;
}

export interface SlideGanchos {
  tipo: "ganchos";
  ganchos: { cliente: string; frase: string }[];
}

export interface SlideObjeciones {
  tipo: "objeciones";
  objeciones: { objecion: string; respuesta: string }[];
}

export interface SlideComparacionVecino {
  id: string;
  nombre: string;
  imagen: string;
  diferencias: string[];
}

export interface SlideComparacion {
  tipo: "comparacion";
  abajo: SlideComparacionVecino | null;
  arriba: SlideComparacionVecino | null;
}

export type Slide = SlideTexto | SlideIA | SlideRam | SlideGanchos | SlideObjeciones | SlideComparacion;

export interface PreguntaQuiz {
  pregunta: string;
  opciones: string[];
  correctaIndex: number;
  explicacion: string;
}

export interface Quiz {
  slug: string;
  moduloSlug: string;
  preguntas: PreguntaQuiz[];
}

export interface AsesorRanking {
  id: number;
  nombre: string;
  tienda: string;
  puntos: number;
  esUsuarioDemo?: boolean;
}

export interface TiendaStats {
  tienda: string;
  ciudad: string;
  asesores: number;
  asesoresActivos: number;
  completado: number;
  puntajePromedio: number;
  modulosCompletados: number;
}

export interface EvolucionSemana {
  semana: string;
  modulosCompletados: number;
}

export interface ProductoEntrenado {
  producto: string;
  modulosCompletados: number;
}

export interface PeriodoAnterior {
  asesoresActivos: number;
  completadoPromedio: number;
  puntajePromedio: number;
  modulosCompletadosMes: number;
}

export interface StoresData {
  tiendas: TiendaStats[];
  evolucionSemanal: EvolucionSemana[];
  productosEntrenados: ProductoEntrenado[];
  modulosCompletadosMes: number;
  periodoAnterior: PeriodoAnterior;
}
