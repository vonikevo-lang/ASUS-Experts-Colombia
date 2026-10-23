import type { Producto } from "@/types/product";
import type { Segmento, Slide } from "@/types/platform";

const COPILOT_PLUS_MIN_TOPS = 40;

export function esCopilotPlus(npuTops: number | null): boolean {
  return npuTops !== null && npuTops >= COPILOT_PLUS_MIN_TOPS;
}

function findVecino(
  comparacion: { id: string; diferencias: string[] } | null,
  productos: Producto[],
) {
  if (!comparacion) return null;
  const vecino = productos.find((p) => p.id === comparacion.id);
  if (!vecino) return null;
  return { id: vecino.id, nombre: vecino.nombre, imagen: vecino.imagen, diferencias: comparacion.diferencias };
}

/**
 * Genera las 13 slides del módulo de una referencia (punto 8 de la guía
 * general de `/contenido/00-guia-general.md`). Es el mismo molde para las
 * 20 referencias de los 4 segmentos, así que no se guarda como JSON: se
 * arma en runtime a partir de los datos estructurados de `Producto`.
 */
export function buildSlides(producto: Producto, segmento: Segmento | null, todos: Producto[]): Slide[] {
  const slides: Slide[] = [];

  // 1. Portada
  slides.push({
    tipo: "texto",
    titulo: producto.nombre,
    queEs: segmento ? `Referencia del segmento ${segmento.nombre}.` : "Referencia del catálogo ASUS.",
    queSignifica: producto.clienteIdeal ?? "Un equipo del catálogo ASUS Experts.",
    comoDecirlo: producto.ganchosCard?.[0]?.frase ?? producto.argumentosVenta[0],
    imagen: producto.imagen,
  });

  // 2. Procesador
  if (producto.procesador) {
    slides.push({
      tipo: "texto",
      titulo: `Procesador — ${producto.procesador.modelo}`,
      queEs: "El procesador es el \"cerebro\" del equipo: define qué tan rápido hace las tareas.",
      queSignifica: producto.procesador.queSignifica,
      comoDecirlo: producto.procesador.comoDecirlo,
      imagen: producto.imagen,
    });
  }

  // 3. Gráficos (integrados o GPU en la escala 5050→5090)
  if (producto.graficos) {
    const esGpu = producto.graficos.tipo === "dedicados";
    slides.push({
      tipo: "texto",
      titulo: esGpu ? `Gráficos — ${producto.graficos.modelo}` : "Gráficos integrados",
      queEs: esGpu
        ? "La GPU (tarjeta de video) es la que mueve los gráficos de los juegos y programas pesados."
        : "Gráficos integrados: comparten el chip con el procesador, no es una tarjeta de video aparte.",
      queSignifica: esGpu
        ? `Escalón ${producto.graficos.escalaPosicion ?? "?"} de 6 en la escala 5050 → 5090 del catálogo.`
        : "No hay tarjeta de video dedicada: el equipo no está pensado para juegos exigentes ni renders pesados.",
      comoDecirlo: producto.graficos.comoDecirlo,
      imagen: producto.imagen,
    });
  }

  // 4. ¿Tiene IA? — ESPECIAL
  const npuTops = producto.procesador?.npuTops ?? null;
  slides.push({
    tipo: "ia",
    npuTops,
    copilotPlus: esCopilotPlus(npuTops),
    comoDecirlo:
      producto.procesador?.comoDecirlo ??
      "Este equipo usa la tarjeta de video para tareas de IA, no tiene un chip NPU dedicado.",
    imagen: producto.imagen,
  });

  // 5. Memoria RAM — ESPECIAL
  if (producto.memoria) {
    slides.push({
      tipo: "ram",
      caso: producto.memoria.caso ?? "se-cambia",
      ram: producto.memoria.ram,
      comoDecirlo: producto.memoria.comoDecirlo,
      imagen: producto.imagen,
    });
  }

  // 6. Almacenamiento
  if (producto.memoria) {
    slides.push({
      tipo: "texto",
      titulo: `Almacenamiento — ${producto.memoria.almacenamiento}`,
      queEs: "El SSD es donde se guardan los archivos, fotos y programas.",
      queSignifica: "Es una memoria de estado sólido, mucho más rápida que un disco duro tradicional.",
      comoDecirlo: `Trae ${producto.memoria.almacenamiento} de espacio bien rápido: suficiente para fotos, documentos y programas.`,
      imagen: producto.imagen,
    });
  }

  // 7. Pantalla
  if (producto.pantalla) {
    slides.push({
      tipo: "texto",
      titulo: `Pantalla — ${producto.pantalla.pulgadas}"`,
      queEs: "Tamaño, resolución y tipo de panel de la pantalla.",
      queSignifica: `${producto.pantalla.resolucion}, panel ${producto.pantalla.tipo}, ${producto.pantalla.hz}Hz.`,
      comoDecirlo: producto.pantalla.comoDecirlo,
      imagen: producto.imagen,
    });
  }

  // 8. Batería y portabilidad
  if (producto.bateria) {
    slides.push({
      tipo: "texto",
      titulo: "Batería y portabilidad",
      queEs: "Cuánto dura la batería y qué tan fácil es cargar el equipo todos los días.",
      queSignifica: [
        producto.bateria.horasEstimadas ? `Hasta ${producto.bateria.horasEstimadas} horas de uso típico.` : null,
        producto.portabilidad?.pesoKg ? `Pesa aprox. ${producto.portabilidad.pesoKg}kg.` : null,
      ]
        .filter(Boolean)
        .join(" "),
      comoDecirlo: [producto.bateria.comoDecirlo, producto.portabilidad?.comoDecirlo].filter(Boolean).join(" "),
      imagen: producto.imagen,
    });
  }

  // 9. Conectividad
  if (producto.conectividad) {
    slides.push({
      tipo: "texto",
      titulo: "Conectividad",
      queEs: "Cómo se conecta el equipo a internet y a otros dispositivos.",
      queSignifica: `${producto.conectividad.wifi}, Bluetooth ${producto.conectividad.bluetooth}, puertos: ${producto.conectividad.puertos.join(", ")}.`,
      comoDecirlo: producto.conectividad.comoDecirlo,
      imagen: producto.imagen,
    });
  }

  // 10. Cámara y privacidad
  if (producto.camara) {
    slides.push({
      tipo: "texto",
      titulo: "Cámara y privacidad",
      queEs: "Resolución de la cámara web y si tiene protección física de privacidad.",
      queSignifica: producto.camara.obturadorFisico
        ? `Cámara ${producto.camara.resolucion} con obturador físico.`
        : `Cámara ${producto.camara.resolucion}, sin obturador físico.`,
      comoDecirlo: producto.camara.comoDecirlo,
      imagen: producto.imagen,
    });
  }

  // 11. Ganchos de venta — ESPECIAL
  if (producto.ganchosCard && producto.ganchosCard.length > 0) {
    slides.push({ tipo: "ganchos", ganchos: producto.ganchosCard });
  }

  // 12. Objeciones frecuentes — ESPECIAL
  if (producto.objeciones && producto.objeciones.length > 0) {
    slides.push({ tipo: "objeciones", objeciones: producto.objeciones });
  }

  // 13. ¿Con cuál la comparo? — ESPECIAL
  if (producto.comparaciones) {
    slides.push({
      tipo: "comparacion",
      abajo: findVecino(producto.comparaciones.abajo, todos),
      arriba: findVecino(producto.comparaciones.arriba, todos),
    });
  }

  return slides;
}
