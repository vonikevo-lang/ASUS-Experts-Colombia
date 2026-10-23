export interface PantallaModulo {
  dato: string;
  explicacion: string;
  imagen: string;
}

export interface Modulo {
  slug: string;
  titulo: string;
  productoId: string;
  pantallas: PantallaModulo[];
}

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
