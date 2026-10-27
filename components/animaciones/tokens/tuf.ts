/** TUF: robusto, grado militar — movimiento mecánico (steps), sacudidas cortas. */
export const tufTokens = {
  duration: { short: 0.2, long: 0.6 },
  ease: {
    mechanic: "steps(5)",
    mechanicSoft: "steps(3)",
    out: "power3.out",
  },
  stagger: 0.12,
  colors: {
    from: "#0b0b0b",
    to: "#1d1d1d",
    accent: "#ffd400",
    glow: "#ff7a00",
    metal: "#4b4b4b",
  },
  shakeDuration: 0.35,
  fontStencil: "font-mono tracking-wider uppercase",
} as const;
