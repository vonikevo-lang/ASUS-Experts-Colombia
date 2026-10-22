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
  completado: number;
  puntajePromedio: number;
}

export interface EvolucionSemana {
  semana: string;
  completado: number;
}

export interface StoresData {
  tiendas: TiendaStats[];
  evolucionSemanal: EvolucionSemana[];
  modulosCompletadosMes: number;
}
