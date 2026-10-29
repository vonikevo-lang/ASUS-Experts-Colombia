export interface PasoGuion {
  titulo: string;
  tiempo: string;
  subtitulo: string;
  cita: string;
  accion: string;
}

export const GUION_ZENBOOK_14_OLED: PasoGuion[] = [
  {
    titulo: "Abre",
    tiempo: "0–10 s",
    subtitulo: "Pregunta antes de mostrar",
    cita: "¿Para qué lo va a usar más: series y fotos, estudio o trabajo? ¿Cuántas horas al día frente a la pantalla?",
    accion: "Escucha la respuesta. Si menciona contenido, fotos u horas largas, esta es su máquina.",
  },
  {
    titulo: "Demuestra",
    tiempo: "10–25 s",
    subtitulo: "Enciende la diferencia",
    cita: "Mire este video oscuro. ¿Ve que el negro no se ve gris? Cada punto de esta pantalla tiene su propia luz y aquí está apagado. Eso es OLED.",
    accion: "Pon una escena oscura con brillo alto. Si hay un LCD al lado, compáralos.",
  },
  {
    titulo: "Color",
    tiempo: "25–35 s",
    subtitulo: "Conecta con lo que le gusta",
    cita: "Cubre el 100% del color que se usa en el cine, 1.070 millones de colores. Sus fotos se ven como son.",
    accion: "Abre una foto colorida o un tráiler. Deja que el cliente toque la pantalla.",
  },
  {
    titulo: "Ojos",
    tiempo: "35–45 s",
    subtitulo: "Cuida al cliente",
    cita: "Y si pasa muchas horas aquí, emite 70% menos luz azul dañina, certificada por TÜV Rheinland, sin volver la imagen amarilla.",
    accion: "Este argumento convence a estudiantes, oficinistas y padres.",
  },
  {
    titulo: "Cierra",
    tiempo: "45–60 s",
    subtitulo: "Respáldalo y pide la venta",
    cita: "Por dentro: Intel Core Ultra 7 con IA, 16 GB, Wi-Fi 7, 1,2 kilos y batería de 75 Wh. ¿Se lo dejo listo para llevar?",
    accion: "Termina con una pregunta de cierre. Si duda, pasa a Objeciones.",
  },
];

export interface ObjecionZenbook14 {
  dice: string;
  responde: string;
}

export const OBJECIONES_ZENBOOK_14_OLED: ObjecionZenbook14[] = [
  {
    dice: "¿El OLED no se quema con el tiempo?",
    responde:
      'ASUS incluye <b>ASUS OLED Care</b> en MyASUS: mueve los píxeles levemente, oculta la barra de tareas y activa un protector de pantalla en negro. Con uso normal, no es un problema. Recomienda no dejar imágenes fijas a brillo máximo por horas.',
  },
  {
    dice: "¿Por qué 60 Hz si otros tienen 120 Hz?",
    responde:
      'Esta referencia es <b>WUXGA a 60 Hz</b>, ideal para estudio, oficina y series. Con 0,2 ms de respuesta el movimiento se ve limpio. Si el cliente juega competitivo, llévalo a la línea <b>TUF o ROG</b>.',
  },
  {
    dice: "¿Para qué quiero pantalla táctil?",
    responde:
      'Para <b>hacer zoom en fotos, firmar documentos, desplazarse rápido y presentar</b>. Es un plus que el cliente usa más de lo que cree: déjalo tocarla en la demo.',
  },
  {
    dice: "La RAM no se puede ampliar.",
    responde:
      'Son <b>16 GB LPDDR5X en doble canal</b>, integrados: más rápidos y eficientes que módulos sueltos, y suficientes para oficina, estudio y edición ligera durante años.',
  },
  {
    dice: "Está más caro que un Vivobook.",
    responde:
      'Paga por <b>pantalla OLED de cine, 1,2 kg, norma militar, 2 Thunderbolt 4, Wi-Fi 7 y batería de 75 Wh</b>. Es un equipo premium para muchos años.',
  },
  {
    dice: "¿Se ve bien con luz fuerte?",
    responde:
      'Tiene <b>400 nits</b> y acabado brillante: en interiores y oficinas se ve excelente. Al sol directo, como cualquier portátil, conviene buscar sombra.',
  },
];

export interface PreguntaZenbook14 {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

export const QUIZ_ZENBOOK_14_OLED: PreguntaZenbook14[] = [
  {
    pregunta: "¿Por qué una pantalla OLED muestra negro real?",
    opciones: [
      "Porque tiene una lámpara más oscura",
      "Porque cada píxel produce su propia luz y se apaga por completo",
      "Porque usa un filtro negro encima",
      "Porque baja el brillo general de la pantalla",
    ],
    correcta: 1,
    explicacion: "En OLED no hay retroiluminación: el píxel negro está apagado.",
  },
  {
    pregunta: "¿Qué cobertura de color tiene la pantalla del Zenbook 14 OLED?",
    opciones: ["72% NTSC", "100% sRGB", "100% DCI-P3", "90% Adobe RGB"],
    correcta: 2,
    explicacion: "DCI-P3 es el estándar de la industria del cine, más amplio que sRGB.",
  },
  {
    pregunta: "¿Cuántos colores puede mostrar?",
    opciones: ["16,7 millones", "1.070 millones", "256 mil", "500 millones"],
    correcta: 1,
    explicacion: "Son 1.070 millones de colores (10 bits), contra 16,7 millones de una pantalla de 8 bits.",
  },
  {
    pregunta: "¿Cuál es la relación de contraste de la pantalla?",
    opciones: ["1.000:1", "100.000:1", "1.000.000:1", "10.000:1"],
    correcta: 2,
    explicacion: "Al apagar el píxel por completo, el contraste llega a 1.000.000:1.",
  },
  {
    pregunta: "¿Cuánto tiempo de respuesta tiene?",
    opciones: ["0,2 ms", "5 ms", "16 ms", "1 ms"],
    correcta: 0,
    explicacion: "0,2 ms: el movimiento se ve nítido, sin estelas.",
  },
  {
    pregunta: "¿Cuánto reduce la luz azul perjudicial y cómo?",
    opciones: [
      "30%, con un filtro amarillo",
      "70%, desde el hardware y sin alterar el color",
      "100%, apagando el azul",
      "50%, con una app de terceros",
    ],
    correcta: 1,
    explicacion: "ASUS OLED reduce un 70% la luz azul dañina, certificado por TÜV Rheinland, sin teñir la imagen.",
  },
  {
    pregunta: "¿Qué procesador tiene esta referencia?",
    opciones: [
      "Intel Core Ultra 7 255H, 16 núcleos, hasta 5,1 GHz",
      "Intel Core i5 de 12.ª generación",
      "AMD Ryzen 7",
      "Snapdragon X Elite",
    ],
    correcta: 0,
    explicacion: "Core Ultra 7 255H: 16 núcleos, 16 hilos y 24 MB de caché.",
  },
  {
    pregunta: "¿Cuánta capacidad total de IA ofrece la plataforma?",
    opciones: ["Hasta 13 TOPS", "Hasta 40 TOPS", "Hasta 96 TOPS", "Hasta 45 TOPS"],
    correcta: 2,
    explicacion: "NPU (13) + GPU Arc 140T (74) + CPU suman hasta 96 TOPS.",
  },
  {
    pregunta: "El cliente quiere conectar un monitor 4K y cargar con un solo cable. ¿Qué puerto le muestras?",
    opciones: ["USB-A 3.2", "Thunderbolt 4 (USB-C)", "Audio 3,5 mm", "HDMI 2.1"],
    correcta: 1,
    explicacion: "Tiene 2 Thunderbolt 4 de 40 Gbps con video y carga.",
  },
  {
    pregunta: "¿Qué pantalla tiene esta referencia de retail?",
    opciones: [
      '14" WUXGA 1920×1200 OLED táctil, 16:10',
      '15,6" FHD IPS',
      '14" 4K LCD',
      '13" QHD OLED, 3:2',
    ],
    correcta: 0,
    explicacion: "WUXGA OLED táctil en formato 16:10: más alto que 16:9 para documentos.",
  },
];
