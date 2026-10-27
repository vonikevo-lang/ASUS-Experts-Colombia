/** Zenbook: premium y minimalista — lento, sin rebote, mucho espacio en blanco. */
export const zenbookTokens = {
  duration: { short: 1.2, long: 1.8 },
  ease: {
    out: "expo.out",
    inOut: "power2.inOut",
  },
  stagger: 0.12,
  colors: {
    from: "#0a1030",
    to: "#23307a",
    accent: "#d6dbe6",
    glow: "#8ec5ff",
  },
  letterSpacing: { wide: "0.6em", normal: "0.02em" },
} as const;
