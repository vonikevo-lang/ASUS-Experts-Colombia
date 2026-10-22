export type LineaProducto = "zenbook" | "vivobook" | "proart" | "rog" | "tuf" | "gaming";

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
}
