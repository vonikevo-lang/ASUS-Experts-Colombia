/**
 * Contenido textual transcrito 1:1 de Entrenamiento_ExpertBook_B1.html
 * (fuente: diseño de Kaisen Design Studio, D:\DESCARGAS\Entrenamiento_ExpertBook_B1.html).
 * No se inventa ningún dato: todo viene del HTML original (ficha, despiece,
 * auditoría de durabilidad, capas de seguridad, funciones de Windows 11 Pro,
 * puertos, objeciones y las 10 preguntas del quiz embebido `var Q`).
 */

export interface AgendaItemEB {
  href: string;
  numero: string;
  tiempo: string;
  titulo: string;
  subtitulo: string;
  duracion: string;
}

export const AGENDA_EXPERTBOOK_B1: AgendaItemEB[] = [
  { href: "#e3", numero: "03", tiempo: "00:00", titulo: "A quién se lo vendes", subtitulo: "El cliente corporativo y qué le importa", duracion: "2 min" },
  { href: "#e4", numero: "04", tiempo: "00:02", titulo: "Despiece del equipo", subtitulo: "Qué hay adentro, capa por capa", duracion: "2 min" },
  { href: "#e5", numero: "05", tiempo: "00:04", titulo: "Ficha técnica desglosada", subtitulo: "Cada dato y lo que significa", duracion: "3 min" },
  { href: "#e6", numero: "06", tiempo: "00:07", titulo: "Medidas y resistencia", subtitulo: "MIL-STD-810H y diseño para la oficina", duracion: "2 min" },
  { href: "#e7", numero: "07", tiempo: "00:09", titulo: "Seguridad por capas", subtitulo: "TPM 2.0, BIOS, tapa de cámara y más", duracion: "2 min" },
  { href: "#e8", numero: "08", tiempo: "00:11", titulo: "Windows 11 Pro", subtitulo: "Lo que la empresa puede hacer y Home no", duracion: "2 min" },
  { href: "#e9", numero: "09", tiempo: "00:13", titulo: "Puertos y conectividad", subtitulo: "Sin adaptadores en la oficina", duracion: "1 min" },
  { href: "#e10", numero: "10", tiempo: "00:14", titulo: "Objeciones y evaluación", subtitulo: "10 preguntas técnicas", duracion: "3 min" },
];

export interface ClienteEB {
  id: string;
  titulo: string;
  copy: string;
  dile: string;
}

export const CLIENTES_EXPERTBOOK_B1: ClienteEB[] = [
  {
    id: "pyme",
    titulo: "La PYME",
    copy: "Contadores, consultorios, oficinas pequeñas. Quieren un equipo que dure y que proteja la información de sus clientes.",
    dile: "Trae Windows 11 Pro con cifrado BitLocker: si se pierde el equipo, nadie puede leer tus archivos.",
  },
  {
    id: "ti",
    titulo: "El área de TI",
    copy: "Compra flotas de equipos. Le importa administrar, actualizar y dar soporte a todos igual.",
    dile: "Se une al dominio o a Microsoft Entra ID, acepta directivas de grupo y se puede rastrear con Absolute.",
  },
  {
    id: "independiente",
    titulo: "El independiente",
    copy: "Abogados, arquitectos, comerciales. Trabajan en la calle y en reuniones con clientes.",
    dile: "Pesa 1,4 kg, trae batería de 63 Wh y carga por USB-C con un cargador pequeño de 65 W.",
  },
  {
    id: "gobierno",
    titulo: "Educación y gobierno",
    copy: "Colegios, universidades y entidades públicas que compran por licitación y necesitan equipos resistentes.",
    dile: "Cumple la norma militar MIL-STD-810H y tiene memoria ampliable hasta 64 GB: es una compra que dura años.",
  },
];

export interface CapaDespieceEB {
  l: "1" | "2" | "3" | "4" | "5";
  numero: string;
  titulo: string;
  copy: string;
  mono: string;
}

/** Orden de leyenda tal como aparece en el DOM original: 5, 4, 3, 2, 1. */
export const DESPIECE_EXPERTBOOK_B1: CapaDespieceEB[] = [
  { l: "5", numero: "5", titulo: "Pantalla", copy: '14" Full HD antirreflejo, 300 nits, con cámara FHD y tapa de privacidad.', mono: "1920 × 1080 · 16:9 · 87 % pantalla/cuerpo" },
  { l: "4", numero: "4", titulo: "Teclado y touchpad", copy: "Teclado retroiluminado con recorrido de 1,35 mm, cómodo para escribir todo el día.", mono: "Chiclet · retroiluminado · 1,35 mm" },
  { l: "3", numero: "3", titulo: "Placa principal", copy: "Procesador Intel Core 5 120U, 2 ranuras de RAM DDR5 y 2 ranuras M.2 para SSD.", mono: "10 núcleos · 12 hilos · hasta 5,0 GHz" },
  { l: "2", numero: "2", titulo: "Batería", copy: "63 Wh de 3 celdas, con carga por USB-C de 65 W.", mono: "63 Wh · Li-ion · USB-C PD" },
  { l: "1", numero: "1", titulo: "Chasis", copy: "Probado bajo MIL-STD-810H, con piezas en plástico reciclado.", mono: "1,40 kg · 1,97 cm de grosor" },
];

export interface FichaRowEB {
  k2: string;
  v: string;
  w: string;
}

export interface FichaTabEB {
  id: string;
  label: string;
  rows: FichaRowEB[];
}

export const FICHA_TABS_EXPERTBOOK_B1: FichaTabEB[] = [
  {
    id: "p1",
    label: "Rendimiento",
    rows: [
      { k2: "Procesador", v: "Intel Core 5 120U", w: "10 núcleos (2 de rendimiento y 8 eficientes), 12 hilos, hasta 5,0 GHz y 12 MB de caché. Hecho para multitarea de oficina con bajo consumo." },
      { k2: "Memoria RAM", v: "16 GB DDR5", w: "En módulos SO-DIMM, con 2 ranuras: se amplía hasta 64 GB. TI puede crecer el equipo en vez de cambiarlo." },
      { k2: "Almacenamiento", v: "SSD 512 GB NVMe PCIe 4.0", w: "Arranque y apertura de archivos rápidos. Tiene 2 ranuras M.2 (2280 y 2230)." },
      { k2: "Gráficos", v: "Intel Graphics integrados", w: "Suficiente para Office, videollamadas, navegador y dos pantallas. No es para diseño 3D pesado." },
      { k2: "Sistema", v: "Windows 11 Pro", w: "ASUS lo recomienda para empresas. Confirma en la caja si la unidad trae Pro o Home." },
    ],
  },
  {
    id: "p2",
    label: "Pantalla y cámara",
    rows: [
      { k2: "Pantalla", v: '14" FHD 1920 × 1080', w: "Antirreflejo y 300 nits: se trabaja cómodo bajo las luces de oficina." },
      { k2: "Bordes", v: "87 % pantalla/cuerpo", w: "Bordes delgados: más pantalla en un equipo compacto." },
      { k2: "Cámara", v: "1080p FHD con tapa", w: "Videollamadas nítidas y privacidad física con la tapa deslizable." },
      { k2: "Audio", v: "Audio by Dirac", w: "Arreglo de micrófonos y parlante ajustado para llamadas claras." },
    ],
  },
  {
    id: "p3",
    label: "Conectividad",
    rows: [
      { k2: "USB-C", v: "2 × USB 3.2 Gen 2", w: "Con salida de video y carga: sirve un monitor o un dock con un solo cable." },
      { k2: "USB-A", v: "2 × USB 3.2 Gen 1", w: "Para mouse, teclado, lectores y memorias de siempre." },
      { k2: "Red cableada", v: "RJ45 Gigabit Ethernet", w: "Muchas empresas exigen red por cable: aquí no necesita adaptador." },
      { k2: "Video", v: "HDMI 1.4", w: "Para el proyector de la sala de juntas o un monitor." },
      { k2: "Inalámbrico", v: "Wi-Fi 6E · Bluetooth 5.4", w: "Tri-banda con 6 GHz: menos congestión en oficinas con muchos equipos." },
    ],
  },
  {
    id: "p4",
    label: "Energía y diseño",
    rows: [
      { k2: "Batería", v: "63 Wh · 3 celdas", w: "Para una jornada de oficina con uso moderado; varía según el brillo y las apps." },
      { k2: "Cargador", v: "65 W USB-C", w: "Cargador pequeño y estándar: fácil de reponer." },
      { k2: "Peso", v: "Desde 1,40 kg", w: "Liviano para llevar entre la oficina, la casa y las reuniones." },
      { k2: "Medidas", v: "32,45 × 21,44 × 1,97 cm", w: 'Cabe en cualquier maletín de 14".' },
      { k2: "Sostenibilidad", v: "28 % plástico reciclado", w: "Partes de la tapa y el marco usan 30 % de plástico PCR: suma en compras con criterios ambientales." },
    ],
  },
];

export const AUDITORIA_EXPERTBOOK_B1: string[] = [
  "Cumple la norma MIL-STD-810H",
  "Memoria ampliable: 2 ranuras DDR5, hasta 64 GB",
  "Disco reemplazable: 2 ranuras M.2",
  "Ranura de seguridad Kensington Nano",
  "Piezas con plástico reciclado (28 % total)",
];

export interface MetricaEB {
  valor: string;
  unidad: string;
  copy: string;
}

export const METRICAS_EXPERTBOOK_B1: MetricaEB[] = [
  { valor: "1,40", unidad: "kg", copy: "Peso desde" },
  { valor: "1,97", unidad: "cm", copy: "Grosor" },
  { valor: "63", unidad: "Wh", copy: "Batería de 3 celdas" },
  { valor: "65", unidad: "W", copy: "Cargador USB-C" },
];

export interface CapaSeguridadEB {
  ring: "1" | "2" | "3" | "4";
  ringLabel: string;
  titulo: string;
  copy: string;
}

/** Anillos de afuera hacia adentro: 4 FÍSICA, 3 SISTEMA, 2 FIRMWARE, 1 HARDWARE. */
export const SEGURIDAD_EXPERTBOOK_B1: CapaSeguridadEB[] = [
  { ring: "1", ringLabel: "HARDWARE", titulo: "Hardware · TPM 2.0", copy: "Chip que guarda las claves de cifrado y credenciales aparte del disco. Es requisito de Windows 11 y de BitLocker." },
  { ring: "2", ringLabel: "FIRMWARE", titulo: "Firmware · BIOS y Absolute", copy: "Contraseñas de BIOS, de arranque y de disco. Compatible con Absolute Persistence para rastrear y bloquear el equipo si se pierde." },
  { ring: "3", ringLabel: "SISTEMA", titulo: "Sistema · Windows 11 Pro", copy: "Cifrado BitLocker, inicio con PIN de Windows Hello y administración centralizada por TI." },
  { ring: "4", ringLabel: "FÍSICA", titulo: "Física · Tapa y candado", copy: "Tapa de privacidad en la cámara y ranura Kensington Nano para asegurar el equipo al escritorio." },
];

export interface OpcionWindowsEB {
  listLabel: string;
  listSub: string;
  titulo: string;
  descripcion: string;
  ejemplo: string;
}

export const WINDOWS_PRO_EXPERTBOOK_B1: OpcionWindowsEB[] = [
  {
    listLabel: "BitLocker",
    listSub: "Cifrado del disco",
    titulo: "BitLocker",
    descripcion: "Cifra todo el disco con ayuda del chip TPM 2.0. Si el portátil se pierde o lo roban, sin la clave nadie puede leer la información.",
    ejemplo: "Un contador pierde el portátil en un taxi: los datos de sus clientes siguen protegidos.",
  },
  {
    listLabel: "Escritorio remoto",
    listSub: "Conectarse a este equipo a distancia",
    titulo: "Escritorio remoto",
    descripcion: "Permite conectarse a este equipo desde otro computador, como si estuvieras sentado frente a él. Windows Home solo puede conectarse a otros; Pro también puede recibir conexiones.",
    ejemplo: "Desde la casa, el gerente abre su equipo de la oficina y trabaja con sus programas.",
  },
  {
    listLabel: "Dominio y Entra ID",
    listSub: "Unirse a la red de la empresa",
    titulo: "Dominio y Microsoft Entra ID",
    descripcion: "El equipo se une a la red administrada de la empresa: los empleados entran con su usuario corporativo y TI controla accesos.",
    ejemplo: "TI entrega 30 portátiles y todos inician sesión con el correo de la empresa.",
  },
  {
    listLabel: "Directivas de grupo",
    listSub: "Reglas centralizadas de TI",
    titulo: "Directivas de grupo",
    descripcion: "TI define reglas para todos los equipos a la vez: bloquear USB, forzar contraseñas, fondos de pantalla, restricciones de software.",
    ejemplo: "La empresa prohíbe instalar programas sin permiso en todos los equipos con una sola regla.",
  },
  {
    listLabel: "Hyper-V",
    listSub: "Máquinas virtuales",
    titulo: "Hyper-V",
    descripcion: "Crea máquinas virtuales: otro sistema operativo funcionando dentro del portátil, aislado del principal.",
    ejemplo: "Un desarrollador prueba su software en otra versión de Windows sin otro computador.",
  },
  {
    listLabel: "Windows Sandbox",
    listSub: "Probar archivos en un entorno aislado",
    titulo: "Windows Sandbox",
    descripcion: "Abre un Windows desechable y aislado para probar un archivo o programa sospechoso; al cerrarlo, todo se borra.",
    ejemplo: "Llega un adjunto dudoso por correo: se abre en Sandbox sin arriesgar el equipo.",
  },
  {
    listLabel: "Windows Update para empresas",
    listSub: "Controlar cuándo se actualiza",
    titulo: "Windows Update para empresas",
    descripcion: "TI decide cuándo se instalan las actualizaciones para no interrumpir el trabajo ni romper programas críticos.",
    ejemplo: "Las actualizaciones se aplican el fin de semana, no en medio del cierre contable.",
  },
];

export interface PuertoEB {
  titulo: string;
  copy: string;
}

export const PUERTOS_PRINCIPAL_EXPERTBOOK_B1: PuertoEB[] = [
  { titulo: "2 × USB-C 3.2 Gen 2", copy: "Video, carga y dock con un solo cable" },
  { titulo: "2 × USB-A 3.2 Gen 1", copy: "Mouse, teclado, lector de huella externo, memorias" },
  { titulo: "RJ45 Gigabit Ethernet", copy: "Red cableada de la empresa" },
  { titulo: "HDMI 1.4", copy: "Proyector o monitor" },
  { titulo: "Audio combo jack", copy: "Diadema con micrófono para llamadas" },
];

export const PUERTOS_SECUNDARIO_EXPERTBOOK_B1: PuertoEB[] = [
  { titulo: "Wi-Fi 6E tri-banda 2×2", copy: "Banda de 6 GHz: menos interferencia en oficinas llenas" },
  { titulo: "Bluetooth 5.4", copy: "Audífonos, mouse y teclado inalámbricos" },
  { titulo: "Cámara FHD con tapa", copy: "Reuniones en 1080p con privacidad física" },
  { titulo: "Audio by Dirac", copy: "Micrófonos en arreglo para llamadas claras" },
];

export interface ObjecionEB {
  id: string;
  pregunta: string;
  respuestaFuerte: string;
  respuesta: string;
}

export const OBJECIONES_EXPERTBOOK_B1: ObjecionEB[] = [
  {
    id: "hogar",
    pregunta: "¿Por qué no compro un portátil de hogar, que es más barato?",
    respuestaFuerte: "Porque el costo real está en la información y en el tiempo de TI.",
    respuesta: "Windows 11 Pro, TPM 2.0, contraseñas de BIOS, RJ45, memoria ampliable y durabilidad MIL-STD-810H reducen riesgos y reemplazos.",
  },
  {
    id: "ram",
    pregunta: "¿16 GB alcanzan para la oficina?",
    respuestaFuerte: "Sí, de sobra para Office, ERP, navegador y videollamadas.",
    respuesta: "Y si crece la necesidad, tiene 2 ranuras DDR5 hasta 64 GB.",
  },
  {
    id: "diseno",
    pregunta: "¿Sirve para diseño o edición de video?",
    respuestaFuerte: "Para edición liviana sí; para 3D o video pesado, no.",
    respuesta: "Sus gráficos son integrados. Para esos perfiles, ofrece una línea con tarjeta gráfica dedicada.",
  },
  {
    id: "huella",
    pregunta: "¿Tiene lector de huella?",
    respuestaFuerte: "Esta referencia no lo incluye.",
    respuesta: "Se inicia con PIN de Windows Hello; si la empresa lo exige, se puede usar un lector de huella USB.",
  },
];

export interface PreguntaQuizEB {
  pregunta: string;
  opciones: [string, string, string];
  correcta: number;
  explicacion: string;
}

/** Las 10 preguntas del `var Q` embebido en el HTML original, transcritas verbatim (3 opciones cada una). */
export const QUIZ_EXPERTBOOK_B1: PreguntaQuizEB[] = [
  {
    pregunta: "¿Cuántos núcleos e hilos tiene el Intel Core 5 120U?",
    opciones: ["4 núcleos y 8 hilos", "10 núcleos y 12 hilos", "16 núcleos y 32 hilos"],
    correcta: 1,
    explicacion: "2 núcleos de rendimiento y 8 eficientes, con 12 hilos y hasta 5,0 GHz.",
  },
  {
    pregunta: "¿Hasta cuánta memoria RAM admite el B1403CVA?",
    opciones: ["16 GB, viene soldada", "32 GB en una ranura", "64 GB en 2 ranuras DDR5"],
    correcta: 2,
    explicacion: "Usa módulos SO-DIMM DDR5 en 2 ranuras: se puede ampliar.",
  },
  {
    pregunta: "¿Qué función de Windows 11 Pro cifra el disco completo?",
    opciones: ["BitLocker", "Windows Sandbox", "Hyper-V"],
    correcta: 0,
    explicacion: "BitLocker cifra el disco con la ayuda del chip TPM 2.0.",
  },
  {
    pregunta: "¿Para qué sirve el chip TPM 2.0?",
    opciones: ["Para acelerar los gráficos", "Para guardar claves de cifrado y credenciales en hardware", "Para mejorar el Wi-Fi"],
    correcta: 1,
    explicacion: "Protege claves aparte del disco y es requisito de Windows 11 y BitLocker.",
  },
  {
    pregunta: "El cliente necesita conectarse a la red cableada de la oficina. ¿Qué puerto usa?",
    opciones: ["HDMI 1.4", "USB-A", "RJ45 Gigabit Ethernet"],
    correcta: 2,
    explicacion: "El RJ45 integrado evita comprar adaptadores de red.",
  },
  {
    pregunta: "¿Qué permite Windows 11 Pro que Windows 11 Home no?",
    opciones: ["Unirse al dominio o a Microsoft Entra ID y usar directivas de grupo", "Navegar en internet", "Usar Microsoft Office"],
    correcta: 0,
    explicacion: "Pro está hecho para administrar equipos dentro de una empresa.",
  },
  {
    pregunta: "¿Qué es Absolute Persistence?",
    opciones: ["Un antivirus gratuito", "Una tecnología en firmware para rastrear y bloquear el equipo si se pierde", "Un modo de ahorro de batería"],
    correcta: 1,
    explicacion: "Vive en el firmware y sobrevive aunque se formatee el disco.",
  },
  {
    pregunta: "¿Cómo se carga el ExpertBook B1?",
    opciones: ["Solo con un conector redondo propietario", "Por USB-C con un cargador de 65 W", "Por el puerto HDMI"],
    correcta: 1,
    explicacion: "Sus 2 puertos USB-C 3.2 Gen 2 tienen carga y salida de video.",
  },
  {
    pregunta: "¿Qué significa que cumpla MIL-STD-810H?",
    opciones: ["Que es indestructible", "Que pasó pruebas de durabilidad basadas en una norma militar de EE. UU.", "Que tiene garantía de por vida"],
    correcta: 1,
    explicacion: "Es más resistente al uso diario, pero no indestructible ni reemplaza la garantía.",
  },
  {
    pregunta: "¿Qué ventaja tiene el Wi-Fi 6E frente al Wi-Fi 6?",
    opciones: ["Usa la banda de 6 GHz, con menos congestión", "No necesita router", "Funciona sin electricidad"],
    correcta: 0,
    explicacion: "En oficinas con muchos equipos, la banda de 6 GHz reduce la interferencia.",
  },
];
