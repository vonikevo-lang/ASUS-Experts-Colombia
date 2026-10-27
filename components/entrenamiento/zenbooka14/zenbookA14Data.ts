export interface PreguntaZenbookA14 {
  pregunta: string;
  opciones: [string, string, string];
  correcta: number;
  feedback: string;
}

/** Transcrito tal cual del diseño fuente (Entrenamiento_Zenbook_A14.html). */
export const QUIZ_ZENBOOK_A14: PreguntaZenbookA14[] = [
  {
    pregunta: "¿El Zenbook A14 es un Copilot+ PC?",
    opciones: ["Sí: su NPU pasa de los 40 TOPS", "No, eso es solo con internet", "Solo si le instalas Copilot"],
    correcta: 0,
    feedback: "Su NPU es de 45 TOPS, y Copilot+ pide 40.",
  },
  {
    pregunta: "¿De qué está hecho el chasis?",
    opciones: ["Plástico reforzado", "Ceraluminum: cerámica y aluminio", "Vidrio templado"],
    correcta: 1,
    feedback: "Ceraluminum: resiste rayones, golpes y casi no marca huellas.",
  },
  {
    pregunta: "El cliente usa un programa contable antiguo. ¿Qué haces?",
    opciones: [
      "Le dices que todo funciona igual",
      "Verificas que el programa corra en Snapdragon antes de cerrar",
      "Le ofreces más RAM",
    ],
    correcta: 1,
    feedback: "La mayoría de apps funcionan, pero lo muy específico o antiguo hay que verificarlo.",
  },
  {
    pregunta: "¿Cuánto pesa más o menos?",
    opciones: ["Menos de 1 kg", "Kilo y medio", "Dos kilos"],
    correcta: 0,
    feedback: "Pesa 978 g: menos que una botella de agua de un litro.",
  },
  {
    pregunta: "¿Cómo entra el cliente sin escribir contraseña?",
    opciones: ["Con un lector de huella", "Con la cámara IR y Windows Hello", "Con una tarjeta"],
    correcta: 1,
    feedback: "La cámara IR reconoce la cara con Windows Hello.",
  },
  {
    pregunta: "¿Qué hace diferente a la pantalla OLED?",
    opciones: ["Siempre tiene más brillo", "Cada punto se apaga solo: el negro es negro de verdad", "Es táctil"],
    correcta: 1,
    feedback: "Por eso los colores resaltan: muéstralo con una imagen oscura.",
  },
];

export interface PasoMapaZenbookA14 {
  numero: string;
  bloque: string;
  titulo: string;
  href: string;
}

export const PASOS_ZENBOOK_A14: PasoMapaZenbookA14[] = [
  { numero: "03", bloque: "Conoce al cliente", titulo: "Para quién es", href: "#z3" },
  { numero: "04", bloque: "Lee el equipo", titulo: "Menos de 1 kg", href: "#z4" },
  { numero: "05", bloque: "Lee el equipo", titulo: "Ceraluminum y colores", href: "#z5" },
  { numero: "06", bloque: "Demuéstralo", titulo: "Pantalla Lumina OLED", href: "#z6" },
  { numero: "07", bloque: "Demuéstralo", titulo: "Copilot+ PC y Snapdragon", href: "#z7" },
  { numero: "08", bloque: "Lee el equipo", titulo: "RAM, almacenamiento y tecnologías", href: "#z11" },
  { numero: "09", bloque: "Demuéstralo", titulo: "Batería de todo el día", href: "#z8" },
  { numero: "10", bloque: "Demuéstralo", titulo: "Puertos y cámara IR", href: "#z9" },
  { numero: "11", bloque: "Cierra la venta", titulo: "Objeciones y quiz", href: "#z10" },
];

export interface PerfilClienteZenbookA14 {
  id: string;
  titulo: string;
  copy: string;
  dile: string;
}

export const PERFILES_ZENBOOK_A14: PerfilClienteZenbookA14[] = [
  {
    id: "viaja",
    titulo: "El que viaja",
    copy: "Aeropuertos, cafés, reuniones fuera de la oficina. Le pesa la maleta y le preocupa el cargador.",
    dile: "Levántalo con una mano: pesa menos de un kilo y la batería te aguanta el día sin buscar enchufe.",
  },
  {
    id: "creador",
    titulo: "El creador",
    copy: "Edita fotos y videos para redes. Necesita colores fieles y una pantalla que se vea bien en cualquier ángulo.",
    dile: "Mira los negros: en OLED son negros de verdad, y los colores cubren el 100 % del estándar de cine DCI-P3.",
  },
  {
    id: "profesional",
    titulo: "El profesional",
    copy: "Correo, Teams y documentos todo el día. Quiere verse bien en la reunión y no perder tiempo.",
    dile: "Entras con la cara, sin contraseña, y la IA te mejora la cámara y el audio en cada llamada.",
  },
  {
    id: "universitario",
    titulo: "El universitario exigente",
    copy: "Clases, biblioteca y trabajos en grupo. Quiere lo nuevo y que le dure toda la carrera.",
    dile: "Es un Copilot+ PC: trae las funciones de IA más nuevas de Windows y el chasis aguanta la mochila.",
  },
];

export interface PropiedadMaterialZenbookA14 {
  id: string;
  titulo: string;
  copy: string;
}

export const PROPIEDADES_MATERIAL_ZENBOOK_A14: PropiedadMaterialZenbookA14[] = [
  {
    id: "rayones",
    titulo: "Resiste rayones y golpes",
    copy: "La capa cerámica protege el aluminio en la tapa, el marco del teclado y la base.",
  },
  {
    id: "huellas",
    titulo: "Casi no marca huellas",
    copy: "Pídele al cliente que lo toque: el acabado mate no se llena de huellas como un metal brillante.",
  },
  {
    id: "tacto",
    titulo: "Un tacto suave y mate",
    copy: "Es la diferencia que se siente en la mano frente a un portátil de plástico.",
  },
];

export const TONOS_ZENBOOK_A14 = {
  gray: { tone: "#6F7174", toneL: "#F1F1EF", toneInk: "#FFFFFF", nombre: "Iceland Gray" },
  beige: { tone: "#C2AE93", toneL: "#F3EEE7", toneInk: "#2A2218", nombre: "Zabriskie Beige" },
} as const;

export interface SpecOledZenbookA14 {
  id: string;
  valor: string;
  copy: string;
}

export const SPECS_OLED_ZENBOOK_A14: SpecOledZenbookA14[] = [
  { id: "tamano", valor: '14"', copy: "Pantalla Lumina OLED, formato 16:10: más alto para leer y escribir" },
  { id: "resolucion", valor: "1920 × 1200", copy: "WUXGA a 60 Hz, 400 nits y hasta 600 en HDR" },
  { id: "color", valor: "100 % DCI-P3", copy: "El estándar de color del cine" },
  { id: "luzazul", valor: "Baja luz azul", copy: "Certificaciones SGS y TÜV Rheinland para cuidar la vista" },
];

export interface FeatCopilotZenbookA14 {
  id: string;
  titulo: string;
  copy: string;
}

export const FEATS_COPILOT_ZENBOOK_A14: FeatCopilotZenbookA14[] = [
  { id: "studio", titulo: "Windows Studio Effects", copy: "Desenfoca el fondo, mantiene la cara en cuadro y mejora la mirada en videollamadas." },
  { id: "subtitulos", titulo: "Subtítulos en vivo", copy: "Pone subtítulos a cualquier audio o video, con traducción." },
  { id: "cocreator", titulo: "Cocreator en Paint", copy: "Convierte un dibujo simple en una imagen terminada con IA." },
  { id: "recall", titulo: "Recall", copy: "Encuentra lo que viste en el PC describiéndolo con tus palabras. Llega con las actualizaciones de Windows." },
];

export interface PuertoZenbookA14 {
  id: string;
  titulo: string;
  copy: string;
}

export const PUERTOS_ZENBOOK_A14: PuertoZenbookA14[] = [
  { id: "usb4", titulo: "2 × USB4 tipo C", copy: "Datos rápidos, monitor externo y carga del equipo" },
  { id: "hdmi", titulo: "1 × HDMI 2.1", copy: "Al televisor, al proyector o a un monitor" },
  { id: "usba", titulo: "1 × USB 3.2 Gen 2 tipo A", copy: "Memorias, mouse y accesorios de siempre" },
  { id: "audio", titulo: "Audio combo jack", copy: "Audífonos con micrófono en un solo conector" },
];

export interface ObjecionZenbookA14 {
  id: string;
  pregunta: string;
  respuestaFuerte: string;
  respuesta: string;
}

export const OBJECIONES_ZENBOOK_A14: ObjecionZenbookA14[] = [
  {
    id: "precio",
    pregunta: "¿Por qué cuesta más que un Vivobook?",
    respuestaFuerte: "Porque pagas lo que se siente.",
    respuesta:
      "Chasis de Ceraluminum, menos de un kilo, pantalla OLED, batería de todo el día y funciones Copilot+ que un portátil de entrada no trae.",
  },
  {
    id: "programas",
    pregunta: "¿Me corren todos mis programas?",
    respuestaFuerte: "La gran mayoría sí.",
    respuesta:
      "Office, navegadores, Teams, Zoom y las apps más usadas funcionan. Si usa un programa muy específico o antiguo, verifícalo antes de cerrar la venta.",
  },
  {
    id: "oled-danio",
    pregunta: "¿La pantalla OLED se daña?",
    respuestaFuerte: "ASUS la cuida por ti.",
    respuesta: "MyASUS trae funciones de cuidado OLED que mueven y refrescan los píxeles para alargar la vida de la pantalla.",
  },
  {
    id: "juegos",
    pregunta: "¿Sirve para juegos?",
    respuestaFuerte: "Juegos livianos o en la nube, sí.",
    respuesta: "No es un equipo gamer: para eso muéstrale la línea ROG o TUF.",
  },
];
