export interface PreguntaQuizX1504 {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

/** Preguntas reales del quiz (6/6 desbloquea la insignia), tal como vienen en el diseño fuente. */
export const QUIZ_X1504: PreguntaQuizX1504[] = [
  {
    pregunta: "¿El Vivobook 15 X1504MA es un Copilot+ PC?",
    opciones: ["Sí, porque tiene NPU", "No: su NPU es de 15 TOPS y Copilot+ pide 40", "Solo cuando tiene internet"],
    correcta: 1,
    explicacion: "Trae IA propia de 15 TOPS, pero los Copilot+ PC empiezan en 40 TOPS.",
  },
  {
    pregunta: "¿Qué te dicen las letras MA en X1504MA?",
    opciones: ["El color del equipo", "El procesador: Intel Core Serie 3 con IA", "El tamaño de la pantalla"],
    correcta: 1,
    explicacion: "MA es el procesador nuevo con IA. El X1504VA se ve igual, pero trae el anterior.",
  },
  {
    pregunta: "El cliente quiere ver sus películas en el televisor. ¿Qué puerto le muestras?",
    opciones: ["USB-C", "HDMI", "Audio combo jack"],
    correcta: 1,
    explicacion: "El HDMI lleva la imagen al televisor o a un monitor.",
  },
  {
    pregunta: "¿Qué hace la NPU?",
    opciones: ["Las tareas de IA, sin cargar el procesador", "Guarda los archivos", "Mejora la señal WiFi"],
    correcta: 0,
    explicacion: "La NPU se encarga de la IA y deja libre al procesador.",
  },
  {
    pregunta: "El equipo pasa casi siempre enchufado. ¿Qué modo de Battery Care le recomiendas?",
    opciones: ["Carga completa · 100 %", "Equilibrado · 80 %", "Máxima vida útil · 60 %"],
    correcta: 2,
    explicacion: "Al 60 % la batería sufre menos y dura más años.",
  },
  {
    pregunta: "¿Cuántos puertos USB 3.2 Gen 1 tipo A trae?",
    opciones: ["1", "2", "3"],
    correcta: 1,
    explicacion: "Trae 2, más 1 USB-C 3.2 Gen 1 y 1 USB 2.0.",
  },
];

export interface GanchoHookX1504 {
  who: string;
  q: string;
  color: string;
}

export const HOOKS_X1504: GanchoHookX1504[] = [
  { who: "El estudiante", q: "“¿Cuántas pestañas abres para estudiar? Este te las aguanta, y trae IA de la generación nueva.”", color: "#FF5A4E" },
  { who: "La familia", q: "“Este es el que va a usar toda la casa. Prueba el teclado: es cómodo para todos.”", color: "#FF8A33" },
  { who: "El que trabaja desde casa", q: "“Hagamos una videollamada de prueba: la IA te quita el ruido de fondo.”", color: "#4C8DFF" },
  { who: "El que compara precios", q: "“Te muestro por qué uno de generación nueva con IA vale más que uno con más GHz.”", color: "#8F6BFF" },
];

export interface RamProgramaX1504 {
  nombre: string;
  nivel: 1 | 2 | 3;
}

/** Nivel = GB mínimo recomendado en pasos (1 = 8GB, 2 = 16GB, 3 = 32GB). */
export const RAM_PROGRAMAS_X1504: RamProgramaX1504[] = [
  { nombre: "Word", nivel: 1 },
  { nombre: "Excel", nivel: 1 },
  { nombre: "PowerPoint", nivel: 1 },
  { nombre: "Navegador 10–15 pestañas", nivel: 1 },
  { nombre: "Zoom", nivel: 1 },
  { nombre: "Teams", nivel: 1 },
  { nombre: "Netflix", nivel: 1 },
  { nombre: "Canva web", nivel: 1 },
  { nombre: "Minecraft", nivel: 1 },
  { nombre: "Roblox", nivel: 1 },
  { nombre: "Photoshop", nivel: 2 },
  { nombre: "CapCut / Premiere Full HD", nivel: 2 },
  { nombre: "AutoCAD 2D", nivel: 2 },
  { nombre: "Video 4K", nivel: 3 },
  { nombre: "After Effects", nivel: 3 },
  { nombre: "Blender", nivel: 3 },
];
