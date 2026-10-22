// Espejo en JS de los tokens de color de app/globals.css, para los pocos
// casos (arrays de Motion, animate de boxShadow) que necesitan un valor de
// color en tiempo de ejecución y no pueden usar una clase de Tailwind.
export const BRAND_COLORS = {
  blue: "#006CE1",
  blueAccent: "#0073E6",
  success: "#2D8659",
  gold: "#F5A623",
} as const;
