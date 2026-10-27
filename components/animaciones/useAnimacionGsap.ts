"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Envuelve gsap.context() + limpieza automática al desmontar, para que cada
 * animación no tenga que repetir el mismo boilerplate de useEffect/cleanup.
 * El callback recibe el scope (contenedor raíz) ya listo para buscar
 * elementos hijos con gsap.utils.selector o refs propios.
 */
export function useAnimacionGsap<T extends HTMLElement>(
  callback: (scope: RefObject<T | null>) => void,
  deps: React.DependencyList,
): RefObject<T | null> {
  const scope = useRef<T>(null);

  useEffect(() => {
    const ctx = gsap.context(() => callback(scope), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
