export interface LoadoutRef {
  cores: [number, string];
  thr: [number, string];
  vram: [number, string];
  bat: [number, string];
  hz: [number, string];
  ref: string;
  cpu: string;
  gpu: string;
  ram: string;
  ssd: string;
  scr: string;
  bw: string;
  ext: string;
}

/** Valores máximos de la escala (para las barras segmentadas de 10). */
export const LOADOUT_MAX = { cores: 12, thr: 16, vram: 8, bat: 90, hz: 144 } as const;

/** Specs reales de cada referencia, transcritas del comparador en vivo del diseño fuente. */
export const LOADOUT_TUF: Record<"f16" | "f15", LoadoutRef> = {
  f16: {
    cores: [8, "8"],
    thr: [12, "12"],
    vram: [6, "6 GB"],
    bat: [56, "56 Wh"],
    hz: [144, "144 Hz"],
    ref: "TUF Gaming F16 · FX607VJB",
    cpu: "Intel Core 5 210H · 8 núcleos / 12 hilos · hasta 4,8 GHz",
    gpu: "NVIDIA GeForce RTX 3050 · 6 GB GDDR6",
    ram: "8 o 16 GB DDR5 · 2 ranuras, ampliable",
    ssd: "512 GB SSD NVMe PCIe 4.0",
    scr: "16\" FHD+ 1920 × 1200 · 16:10 · 144 Hz · IPS",
    bw: "56 Wh · 2,2 kg",
    ext: "Wi-Fi 6 · Bluetooth 5.3 · RGB 1 zona · tecla Copilot · Mecha Gray",
  },
  f15: {
    cores: [10, "10"],
    thr: [16, "16"],
    vram: [8, "8 GB"],
    bat: [90, "90 Wh"],
    hz: [144, "144 Hz"],
    ref: "TUF Gaming F15 · FX507VV",
    cpu: "Intel Core i7-13620H · 10 núcleos / 16 hilos · hasta 4,9 GHz",
    gpu: "NVIDIA GeForce RTX 4060 · 8 GB GDDR6 · hasta 140 W · MUX Switch",
    ram: "16 GB DDR5-4800 · 2 ranuras, ampliable",
    ssd: "512 GB o 1 TB SSD NVMe PCIe 4.0",
    scr: "15,6\" FHD 1920 × 1080 · 144 Hz · 100 % sRGB · G-SYNC",
    bw: "90 Wh · 2,2 kg",
    ext: "Wi-Fi 6 · Thunderbolt 4 · Dolby Atmos · RGB 1 zona · Mecha Gray",
  },
};

export interface MisionTuf {
  color: string;
  numero: string;
  etiqueta: string;
  titulo: string;
  links: { numero: string; texto: string; href: string }[];
}

export const MISIONES_TUF: MisionTuf[] = [
  { color: "#FFB020", numero: "MISIÓN 01", etiqueta: "RECON", titulo: "Conoce al jugador", links: [{ numero: "03", texto: "Perfiles de cliente", href: "#t3" }] },
  {
    color: "#2FD3F0",
    numero: "MISIÓN 02",
    etiqueta: "EQUIPO",
    titulo: "Elige el equipo",
    links: [
      { numero: "04", texto: "Core 5 vs Core i7", href: "#t4" },
      { numero: "05", texto: "Grado militar", href: "#t5" },
    ],
  },
  {
    color: "#3DDC84",
    numero: "MISIÓN 03",
    etiqueta: "DEMO",
    titulo: "Demuéstralo",
    links: [
      { numero: "06", texto: "Pantalla 144 Hz", href: "#t6" },
      { numero: "07", texto: "Gráfica y enfriamiento", href: "#t7" },
      { numero: "08", texto: "Puertos y teclado", href: "#t8" },
    ],
  },
  { color: "#FF5A52", numero: "MISIÓN 04", etiqueta: "CIERRE", titulo: "Cierra la venta", links: [{ numero: "09", texto: "Objeciones y quiz", href: "#t9" }] },
];

export interface PerfilTuf {
  titulo: string;
  texto: string;
  dile: string;
}

export const PERFILES_TUF: PerfilTuf[] = [
  { titulo: "El competitivo", texto: "Juega shooters y eSports. Le importan los FPS, la pantalla rápida y que el equipo no se caliente.", dile: "Pantalla de 144 Hz: ves al rival antes. Y con el modo Turbo el equipo se mantiene frío en partidas largas." },
  { titulo: "El de ingeniería", texto: "Arquitectura, diseño o ingeniería. Usa programas de modelado y render que piden tarjeta gráfica.", dile: "Es gamer, pero también es tu equipo de trabajo: la RTX acelera el render y la RAM se puede ampliar." },
  { titulo: "El streamer", texto: "Juega y transmite al tiempo. Necesita potencia, buen audio y conexión estable por cable.", dile: "Juegas y transmites en el mismo equipo, conectas el internet por cable y el micrófono limpia el ruido con IA." },
  { titulo: "Su primer PC gamer", texto: "Viene de consola o de un portátil de oficina. Quiere entrar al PC gaming sin gastar de más.", dile: "Con el F16 entras con RTX y pantalla de 144 Hz, y el chasis aguanta el trajín del día a día." },
];

export const PRUEBAS_MILITARES = {
  drop: { etiqueta: "CAÍDAS", duracion: 1500 },
  vib: { etiqueta: "VIBRACIÓN", duracion: 1500 },
  hum: { etiqueta: "HUMEDAD", duracion: 1700 },
  temp: { etiqueta: "TEMPERATURAS EXTREMAS", duracion: 1900 },
} as const;

export type PruebaMilitarId = keyof typeof PRUEBAS_MILITARES;

export const MILGRID_TUF = [
  { titulo: "Caídas", texto: "Resiste golpes y caídas de la vida real: la mochila, el bus, la mesa." },
  { titulo: "Vibración", texto: "Aguanta el movimiento constante de viajes y traslados." },
  { titulo: "Humedad", texto: "Probado en ambientes húmedos, como los de la costa." },
  { titulo: "Temperatura", texto: "Funciona en calor y frío extremos dentro de los rangos de prueba." },
];

export const HZ_INFO = [
  { titulo: "F15 · 15,6\"", texto: "Full HD 1920 × 1080, 144 Hz, 100 % sRGB y G-SYNC: colores fieles y cero cortes de imagen." },
  { titulo: "F16 · 16\"", texto: "FHD+ 1920 × 1200 en formato 16:10, 144 Hz: más alto para ver más del juego y de los documentos." },
  { titulo: "El gesto", texto: "Abre un juego o un video de prueba a 144 Hz y pídele al cliente que mueva el mouse rápido." },
];

export const MODOS_VENTILADOR = {
  sil: { velocidad: "6s", desc: "Silencioso: menos ruido para clases, series y oficina." },
  perf: { velocidad: "2.4s", desc: "Rendimiento: el equilibrio para el día a día y para jugar sin tanto ruido." },
  turbo: { velocidad: ".45s", desc: "Turbo: máxima potencia y ventiladores al máximo para partidas exigentes (conectado a la corriente)." },
} as const;

export type ModoVentiladorId = keyof typeof MODOS_VENTILADOR;

export interface PuertoTuf {
  titulo: string;
  texto: string;
}

export const PUERTOS_F15: PuertoTuf[] = [
  { titulo: "1 × Thunderbolt 4", texto: "Lo más rápido para monitores y discos externos" },
  { titulo: "1 × USB-C 3.2 Gen 2", texto: "Con salida de video y carga" },
  { titulo: "2 × USB-A 3.2 Gen 1", texto: "Mouse gamer, control y memorias" },
  { titulo: "1 × HDMI 2.1", texto: "Monitor gamer o televisor" },
  { titulo: "1 × RJ45 (cable de red)", texto: "Internet por cable: menos lag en línea" },
  { titulo: "Audio combo jack", texto: "Diadema gamer con micrófono" },
];

export interface ObjecionTuf {
  pregunta: string;
  respuestaTitulo: string;
  respuesta: string;
}

export const OBJECIONES_TUF: ObjecionTuf[] = [
  { pregunta: "¿Por qué no un ROG?", respuestaTitulo: "TUF es la entrada al gaming de ASUS con chasis reforzado.", respuesta: "ROG apunta a más potencia y más precio. Si el cliente quiere jugar bien sin pagar de más, TUF es la opción." },
  { pregunta: "¿Cuánto dura la batería jugando?", respuestaTitulo: "Para jugar, siempre conectado.", respuesta: "Ningún portátil gamer da su máxima potencia con batería. La batería sirve para clases y trabajo: 90 Wh en el F15 y 56 Wh en el F16." },
  { pregunta: "¿Me corre tal juego?", respuestaTitulo: "Pregunta cuál juego y en qué calidad.", respuesta: "Para eSports, los dos van bien. Para juegos nuevos en calidad alta, recomienda el F15 con RTX 4060." },
  { pregunta: "¿Se puede mejorar después?", respuestaTitulo: "Sí.", respuesta: "Los dos tienen 2 ranuras de RAM, así que la memoria se puede ampliar. Confirma en la ficha el máximo de cada referencia." },
];

export interface PreguntaTuf {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

export const QUIZ_TUF: PreguntaTuf[] = [
  { pregunta: "¿Qué es MIL-STD-810H?", opciones: ["Una certificación de resistencia al agua", "Una norma de pruebas de durabilidad del Departamento de Defensa de EE. UU.", "Una garantía militar de por vida"], correcta: 1, explicacion: "Es una norma de pruebas: caídas, vibración, humedad y temperatura. No hace al equipo indestructible." },
  { pregunta: "Un cliente juega shooters competitivos. ¿Qué le destacas primero?", opciones: ["El color del chasis", "La pantalla de 144 Hz", "El lector de tarjetas"], correcta: 1, explicacion: "Con 144 Hz el movimiento es más fluido y reacciona antes." },
  { pregunta: "¿Cuál de las dos referencias trae RTX 4060?", opciones: ["TUF F16 con Core 5", "TUF F15 con Core i7", "Las dos"], correcta: 1, explicacion: "El F15 FX507VV trae RTX 4060; el F16 FX607VJB trae RTX 3050." },
  { pregunta: "¿Se puede ampliar la RAM?", opciones: ["No, viene soldada", "Sí: las dos tienen 2 ranuras de RAM", "Solo con un adaptador USB"], correcta: 1, explicacion: "Las dos tienen 2 ranuras. Confirma el máximo en la ficha." },
  { pregunta: "¿Qué hace el MUX Switch del F15?", opciones: ["Manda la imagen de la gráfica directo a la pantalla para más FPS", "Enfría el teclado", "Cambia el color RGB"], correcta: 0, explicacion: "Evita que la imagen pase por el procesador: más FPS." },
  { pregunta: "El cliente pregunta cuánto dura la batería jugando. ¿Qué le dices?", opciones: ["Todo el día jugando", "Para jugar, conectado; la batería es para clases y trabajo", "No tiene batería"], correcta: 1, explicacion: "Ningún portátil gamer da su máxima potencia con batería." },
];
