/** ROG: agresivo y gamer — cortes rápidos, glitch, rojo neón sobre negro. */
export const rogTokens = {
  duration: { short: 0.2, long: 0.6 },
  ease: {
    glitch: "steps(7)",
    inOut: "power4.inOut",
    out: "power4.out",
  },
  stagger: 0.05,
  colors: {
    from: "#050505",
    to: "#3a0008",
    accent: "#ff1e3c",
    glow: "#ff2fa0",
    cian: "#22d3ee",
  },
  scanlineOpacity: 0.05,
  skew: -14,
  /** Esquinas cortadas en diagonal, estética ROG. Aplicar en clipPath. */
  clipDiagonal: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
} as const;
