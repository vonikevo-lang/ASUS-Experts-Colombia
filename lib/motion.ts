import type { Variants } from "motion/react";

export const EASE_STANDARD: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  micro: 0.18,
  section: 0.6,
  counter: 1.2,
} as const;

export const STAGGER_CHILD = 0.08;

export function revealContainer(reduced: boolean): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : STAGGER_CHILD } },
  };
}

export function revealItem(reduced: boolean): Variants {
  return {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : DURATION.section, ease: EASE_STANDARD },
    },
  };
}
