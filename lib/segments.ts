import type { Producto } from "@/types/product";
import type { Segmento } from "@/types/platform";
import { QUIZ_PASS_THRESHOLD } from "@/lib/quiz";

interface QuizResult {
  score: number;
  total: number;
}

export function segmentoDe(producto: Producto, segmentos: Segmento[]): Segmento | null {
  return segmentos.find((s) => s.orden.includes(producto.id)) ?? null;
}

export function referenciaDominada(quizResults: Record<string, QuizResult>, productoId: string): boolean {
  const r = quizResults[productoId];
  return Boolean(r && r.total > 0 && r.score / r.total >= QUIZ_PASS_THRESHOLD);
}

export function progresoSegmento(quizResults: Record<string, QuizResult>, segmento: Segmento) {
  const done = segmento.orden.filter((id) => referenciaDominada(quizResults, id)).length;
  return { done, total: segmento.orden.length };
}

export function segmentoCompleto(quizResults: Record<string, QuizResult>, segmento: Segmento): boolean {
  const { done, total } = progresoSegmento(quizResults, segmento);
  return total > 0 && done === total;
}

export function badgeNombre(segmento: Segmento) {
  return `Experto ${segmento.nombre}`;
}

/** Primera referencia sin dominar de un segmento (o la primera si no hay ninguna hecha). */
export function siguienteReferencia(quizResults: Record<string, QuizResult>, segmento: Segmento) {
  return segmento.orden.find((id) => !referenciaDominada(quizResults, id)) ?? segmento.orden[segmento.orden.length - 1];
}
