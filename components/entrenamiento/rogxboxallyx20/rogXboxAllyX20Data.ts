export interface PerfilJugador {
  id: string;
  titulo: string;
  texto: string;
  dile: string;
}

export const PERFILES_ROG_ALLY: PerfilJugador[] = [
  {
    id: "pc",
    titulo: "El gamer de PC",
    texto: "Tiene juegos en Steam, Xbox o Epic y quiere jugarlos fuera de su escritorio.",
    dile: "Es un PC con Windows: llevas tu biblioteca de juegos completa en las manos.",
  },
  {
    id: "xbox",
    titulo: "El fan de Xbox",
    texto: "Juega con Game Pass y quiere la experiencia Xbox sin estar pegado al televisor.",
    dile: "Prende directo en la experiencia Xbox, con botón Xbox y tus juegos de Game Pass.",
  },
  {
    id: "cama",
    titulo: "El que juega en la cama",
    texto: "Juega en el sofá, en la cama o de viaje. Le importa la comodidad y la batería.",
    dile: "Agárrala: los mangos están hechos para jugar horas, y la batería es de 80 Wh.",
  },
  {
    id: "coleccionista",
    titulo: "El coleccionista ROG",
    texto: "Sigue la marca, quiere lo más nuevo y valora las ediciones especiales.",
    dile: "Es la edición de los 20 años de ROG: chasis translúcido con detalles dorados, y en el bundle vienen las gafas XREAL.",
  },
];

export interface LootItem {
  id: string;
  rareza: string;
  titulo: string;
  texto: string;
}

export const BUNDLE_ROG_ALLY: LootItem[] = [
  {
    id: "consola",
    rareza: "LEGENDARIO",
    titulo: "ROG Xbox Ally X20",
    texto: "Consola portátil edición 20 años de ROG, chasis negro translúcido con detalles dorados.",
  },
  {
    id: "xreal",
    rareza: "ÉPICO",
    titulo: "Gafas ROG XREAL R1",
    texto: "Edición 20: pantalla virtual gigante para jugar sin televisor, conectadas por USB-C.",
  },
  {
    id: "case",
    rareza: "RARO",
    titulo: "Case protector",
    texto: "Estuche rígido para llevar la consola y los accesorios sin miedo a los golpes.",
  },
];

export interface ObjecionRogAlly {
  dice: string;
  responde: string;
}

export const OBJECIONES_ROG_ALLY: ObjecionRogAlly[] = [
  {
    dice: "¿Por qué no compro una consola de sobremesa?",
    responde:
      "Porque esta es un PC que va contigo. Juegas tu biblioteca de Xbox y de PC en la cama, de viaje o conectada a un monitor por USB4, y con las gafas tienes pantalla gigante en cualquier lugar.",
  },
  {
    dice: "¿Cuánto dura la batería?",
    responde:
      "Depende del juego y del modo. Trae 80 Wh. En juegos exigentes rinde menos; en juegos livianos o en la nube rinde mucho más. Muéstrale los modos de energía.",
  },
  {
    dice: "¿Me corren los juegos de Steam?",
    responde:
      "Sí, es Windows 11. Funciona con Steam, Xbox, Epic y otras tiendas de PC. Algunos juegos con antitrampa muy estricta pueden tener restricciones; verifícalo si el cliente juega uno en particular.",
  },
  {
    dice: "¿Las gafas son de realidad virtual?",
    responde:
      "No. Muestran una pantalla virtual gigante frente a ti; no son un visor de realidad virtual que te encierra en un mundo 3D.",
  },
];

export interface PreguntaTrivia {
  pregunta: string;
  opciones: [string, string, string];
  correcta: number;
  explicacion: string;
}

export const TRIVIA_ROG_ALLY: PreguntaTrivia[] = [
  {
    pregunta: "¿Qué procesador trae la ROG Xbox Ally X20?",
    opciones: ["AMD Ryzen AI Z2 Extreme", "Intel Core Ultra 7", "Snapdragon X Elite"],
    correcta: 0,
    explicacion: "Ryzen AI Z2 Extreme: 8 núcleos, 16 hilos y NPU de hasta 50 TOPS.",
  },
  {
    pregunta: "¿Cuánta memoria RAM tiene?",
    opciones: ["16 GB", "24 GB LPDDR5X", "32 GB DDR4"],
    correcta: 1,
    explicacion: "24 GB LPDDR5X de doble canal, soldada a la placa.",
  },
  {
    pregunta: "¿Qué tipo de pantalla trae?",
    opciones: ["LCD de 7\" a 60 Hz", "OLED de 7,4\" a 120 Hz", "OLED de 10\" a 90 Hz"],
    correcta: 1,
    explicacion: "Pantalla ROG Nebula HDR: OLED de 7,4\" Full HD a 120 Hz.",
  },
  {
    pregunta: "¿Cuál es su brillo máximo en HDR?",
    opciones: ["500 nits", "1400 nits", "3000 nits"],
    correcta: 1,
    explicacion: "Hasta 1400 nits en HDR y 600 en SDR.",
  },
  {
    pregunta: "¿Para qué sirve el D-pad transformable?",
    opciones: ["Para cambiar entre 4 y 8 direcciones", "Para cargar la consola", "Para quitar los joysticks"],
    correcta: 0,
    explicacion: "En 8 direcciones las diagonales son más precisas.",
  },
  {
    pregunta: "¿Qué ventaja tienen los joysticks TMR?",
    opciones: ["Brillan más", "Evitan el drift: no se mueven solos con el tiempo", "Son desmontables"],
    correcta: 1,
    explicacion: "Los sensores TMR mantienen el centro exacto.",
  },
  {
    pregunta: "¿Qué hacen las gafas ROG XREAL R1?",
    opciones: ["Son un visor de realidad virtual completo", "Muestran una pantalla virtual de hasta 171\"", "Proyectan la imagen en la pared"],
    correcta: 1,
    explicacion: "Pantalla micro-OLED a 240 Hz que se ve como una pantalla gigante.",
  },
  {
    pregunta: "¿Qué juegos puede jugar el cliente?",
    opciones: ["Solo juegos de celular", "Xbox, Game Pass y tiendas de PC como Steam", "Solo juegos en disco"],
    correcta: 1,
    explicacion: "Es un PC con Windows 11 y experiencia Xbox.",
  },
  {
    pregunta: "¿Qué trae el bundle además de la consola?",
    opciones: ["Un televisor", "Gafas ROG XREAL R1 y un case protector", "Un teclado y un mouse"],
    correcta: 1,
    explicacion: "Confirma en la caja los accesorios exactos de tu país.",
  },
  {
    pregunta: "¿De cuánto es la batería?",
    opciones: ["50 Wh", "80 Wh", "120 Wh"],
    correcta: 1,
    explicacion: "80 Wh, con cargador USB-C de 68 W.",
  },
];
