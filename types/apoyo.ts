// Tipos del "material de apoyo" (Paso 1 del flujo de cada referencia).
// Ver /contenido/05-material-apoyo.md, sección 2, para el porqué de cada campo.

export interface BloqueHero {
  tipo: "hero";
  imagen: string;
  titulo: string;
  subtitulo: string;
}

export interface DemoUIControl {
  id: string;
  etiqueta: string;
  imagen: string;
  notaSobreImagen?: string;
}

export interface BloqueDemoUI {
  tipo: "demoUI";
  titulo: string;
  descripcion: string;
  controles: DemoUIControl[];
  controlInicial: string;
}

export interface ArticuloParrafo {
  subtitulo?: string;
  texto: string;
}

export interface BloqueArticulo {
  tipo: "articulo";
  titulo: string;
  parrafos: ArticuloParrafo[];
}

export interface AnatomiaPunto {
  id: string;
  etiqueta: string;
  descripcion: string;
  /** Posición del punto sobre la imagen, en % (0-100). */
  x: number;
  y: number;
}

export interface BloqueAnatomia {
  tipo: "anatomia";
  imagen: string;
  puntos: AnatomiaPunto[];
}

export interface BloqueEscala {
  tipo: "escala";
  titulo: string;
  pasos: string[];
  pasoActual: number;
  comoDecirlo: string;
}

export interface EstadoAntesDespues {
  etiqueta: string;
  imagen: string;
  texto: string;
}

export interface BloqueAntesDespues {
  tipo: "antesDespues";
  titulo: string;
  antes: EstadoAntesDespues;
  despues: EstadoAntesDespues;
}

export interface BloqueVidaReal {
  tipo: "vidaReal";
  imagen: string;
  leyenda: string;
  texto: string;
}

export interface BloqueFrase {
  tipo: "frase";
  texto: string;
  autor?: string;
}

export interface BloqueVideo {
  tipo: "video";
  titulo: string;
  miniatura: string;
  duracionAprox?: string;
}

export interface SelectorColorOpcion {
  id: string;
  nombre: string;
  /** Color aproximado para el swatch (no oficial, verificar con kit de marca). */
  hex: string;
  imagen: string;
}

export interface BloqueSelectorColor {
  tipo: "selectorColor";
  titulo: string;
  descripcion?: string;
  controlInicial: string;
  colores: SelectorColorOpcion[];
}

export type BloqueApoyo =
  | BloqueHero
  | BloqueDemoUI
  | BloqueArticulo
  | BloqueAnatomia
  | BloqueEscala
  | BloqueAntesDespues
  | BloqueVidaReal
  | BloqueFrase
  | BloqueVideo
  | BloqueSelectorColor;
