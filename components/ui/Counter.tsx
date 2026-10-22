"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION } from "@/lib/motion";

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({
  value,
  duration = DURATION.counter,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString("es-CO"));
  const [display, setDisplay] = useState("0");

  useEffect(() => rounded.on("change", setDisplay), [rounded]);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduced, value, duration, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
