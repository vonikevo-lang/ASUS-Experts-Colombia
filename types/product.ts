export type LineaProducto = "zenbook" | "vivobook" | "proart" | "rog" | "tuf" | "gaming";

export type FamiliaProducto =
  | "vivobook-go"
  | "vivobook"
  | "vivobook-s"
  | "zenbook"
  | "proart"
  | "rog"
  | "tuf"
  | "gaming";

export type PerfilUso = "hogar" | "trabajo" | "creadores" | "estudiantes" | "gamers";

export interface Spec {
  etiqueta: string;
  valorTecnico: string;
  valorCliente: string;
}

export interface Metricas {
  bateria: number;
  rendimiento: number;
  ia: number;
  portabilidad: number;
  pantalla: number;
}

export interface Procesador {
  marca: string;
  modelo: string;
  serie: string;
  nucleos: number;
  hilos: number;
  frecuenciaMax: string;
  npuTops: number | null;
  queSignifica: string;
  comoDecirlo: string;
  paraQueAlcanza: string[];
}

export type CasoRam = "soldada" | "se-cambia" | "se-suma";

export interface Memoria {
  ram: string;
  tipoRam: string;
  almacenamiento: string;
  comoDecirlo: string;
  /** Caso de expansión (punto 7 de la guía general): soldada = no se puede subir;
   * se-cambia = una sola ranura, toca reemplazar el módulo; se-suma = hay
   * ranura libre, se puede agregar un módulo sin quitar el actual. */
  caso?: CasoRam;
}

export interface Graficos {
  tipo: "integrados" | "dedicados";
  modelo?: string;
  vram?: string;
  /** Posición en la escala 5050→5090 (1 a 6), solo para GPU dedicada. */
  escalaPosicion?: number;
  comoDecirlo: string;
}

export interface Bateria {
  wh?: number;
  horasEstimadas?: number;
  comoDecirlo: string;
}

export interface Portabilidad {
  pesoKg?: number;
  grosorCm?: number;
  comoDecirlo: string;
}

export interface Conectividad {
  wifi: string;
  bluetooth: string;
  puertos: string[];
  comoDecirlo: string;
}

export interface Camara {
  resolucion: string;
  obturadorFisico: boolean;
  comoDecirlo: string;
}

export interface GanchoCard {
  cliente: string;
  frase: string;
}

export interface ComparacionVecino {
  id: string;
  diferencias: string[];
}

export interface Comparaciones {
  abajo: ComparacionVecino | null;
  arriba: ComparacionVecino | null;
}

export interface PantallaDetalle {
  pulgadas: number;
  resolucion: string;
  tipo: string;
  hz: number;
  nits: number;
  comoDecirlo: string;
}

export interface Objecion {
  objecion: string;
  respuesta: string;
}

export interface Producto {
  id: string;
  nombre: string;
  linea: LineaProducto;
  referencia: string;
  pantallaPulgadas: number;
  imagen: string;
  perfiles: PerfilUso[];
  specs: Spec[];
  metricas: Metricas;
  argumentosVenta: [string, string, string];
  verificar: boolean;
  /** Campos extendidos (fase 2: línea Vivobook). Opcionales para no romper productos existentes. */
  familia?: FamiliaProducto;
  slug?: string;
  procesador?: Procesador;
  memoria?: Memoria;
  pantalla?: PantallaDetalle;
  extras?: string[];
  enLaCaja?: string[];
  ganchos?: string[];
  ganchosCard?: GanchoCard[];
  objeciones?: Objecion[];
  clienteIdeal?: string;
  notasTodo?: string[];
  /** Campos extendidos (fase 3: segmentos). `linea` hace de id de segmento
   * para vivobook/zenbook/tuf/rog; proart/gaming quedan fuera de un segmento. */
  graficos?: Graficos;
  bateria?: Bateria;
  portabilidad?: Portabilidad;
  conectividad?: Conectividad;
  camara?: Camara;
  comparaciones?: Comparaciones;
}
