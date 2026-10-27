import type { Procesador, GanchoCard, Memoria, PantallaDetalle } from "./product";

export type LineaEntrenamiento = "vivobook" | "zenbook" | "tuf" | "rog";

export type Dificultad = "básico" | "intermedio" | "avanzado";

export interface FichaItem {
  componente: string;
  dato: string;
  verificar?: boolean;
}

export interface ObjecionEntrenamiento {
  dice: string;
  responde: string;
}

export interface ComparacionEscalon {
  id: string;
  diferencias: string[];
}

export interface CompararCon {
  abajo: ComparacionEscalon | null;
  arriba: ComparacionEscalon | null;
}

export interface PreguntaQuiz {
  pregunta: string;
  opciones: [string, string, string, string];
  correcta: number;
  explicacion: string;
}

export interface Referencia {
  slug: string;
  linea: LineaEntrenamiento;
  nombre: string;
  codigo: string;
  tagline: string;
  intro: string;
  ficha: FichaItem[];
  procesador: Procesador;
  /** Para la slide RAM de la sección "Bloques de tecnología" (caso: se-suma / se-cambia). */
  memoria: Memoria;
  /** Para la slide de pantalla de "Bloques de tecnología". */
  pantallaDetalle: PantallaDetalle;
  clienteIdeal: string;
  leAlcanzaPara: string[];
  noEsPara: string[];
  ganchos: GanchoCard[];
  objeciones: ObjecionEntrenamiento[];
  compararCon: CompararCon;
  quiz: PreguntaQuiz[];
  duracionMin: number;
  dificultad: Dificultad;
  imagen?: string;
}
