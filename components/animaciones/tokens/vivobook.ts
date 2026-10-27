/** Vivobook: divertido y juvenil — rebote, colores vivos, formas redondeadas. */
export const vivobookTokens = {
  duration: { short: 0.5, long: 0.8 },
  ease: {
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.6)",
    out: "power2.out",
  },
  stagger: 0.08,
  colors: {
    from: "#1b1fff",
    to: "#7b2cff",
    accent: "#22d3ee",
    glow: "#ff4fd8",
  },
  /** Paleta pastel para tarjetas tipo bento (una por tarjeta, en orden). */
  pastel: ["#dbeafe", "#fce7f3", "#dcfce7", "#fef3c7", "#ede9fe", "#cffafe"],
  radius: "1.25rem",
} as const;
