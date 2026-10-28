export interface ResultadoEntrenamiento {
  score: number;
  total: number;
  fecha: string;
}

const STORAGE_KEY = "asus-experts-entrenamientos";

type ResultadosPorSlug = Record<string, ResultadoEntrenamiento>;

function leerTodos(): ResultadosPorSlug {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ResultadosPorSlug) : {};
  } catch {
    return {};
  }
}

export function leerResultado(slug: string): ResultadoEntrenamiento | undefined {
  return leerTodos()[slug];
}

export function leerTodosResultados(): ResultadosPorSlug {
  return leerTodos();
}

export function guardarResultado(slug: string, score: number, total: number): ResultadoEntrenamiento {
  const resultado: ResultadoEntrenamiento = { score, total, fecha: new Date().toISOString() };
  try {
    const todos = leerTodos();
    todos[slug] = resultado;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // localStorage no disponible (modo privado, cuota llena, etc.): el
    // resultado solo vive en memoria para esta sesión de quiz.
  }
  return resultado;
}

/** "ASUS Vivobook 15 (X1504MA)" → "Vivobook 15", para el texto del badge. */
export function nombreCorto(nombre: string): string {
  return nombre.replace(/^ASUS\s+/i, "").replace(/\s*\([^)]*\)\s*$/, "").trim();
}
