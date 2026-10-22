"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NAV_LINKS = [
  { label: "Programa", href: "#programa" },
  { label: "Comparador", href: "/comparador" },
  { label: "Recomendador", href: "/app/recomendador" },
  { label: "Premios", href: "#premios" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/brand/ASUS logo grey.png"
            alt="ASUS"
            width={116}
            height={24}
            priority
            className="h-5 w-auto"
          />
          <span className="font-display text-sm font-semibold uppercase tracking-[-0.01em] text-asus-dark">
            Experts Colombia
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-sm font-medium text-asus-dark hover:text-asus-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="secondary" className="h-9 text-xs px-4">
            Ingresar
          </Button>
          <Button variant="primary" className="h-9 text-xs px-4">
            Unirme
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative h-10 w-10 flex items-center justify-center rounded-btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
        >
          <span className="sr-only">Menú</span>
          <div className="relative h-4 w-5">
            <motion.span
              className="absolute left-0 top-0 h-0.5 w-5 bg-asus-dark"
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={reduced ? { duration: 0 } : undefined}
            />
            <motion.span
              className="absolute left-0 top-1/2 -mt-px h-0.5 w-5 bg-asus-dark"
              animate={{ opacity: open ? 0 : 1 }}
              transition={reduced ? { duration: 0 } : undefined}
            />
            <motion.span
              className="absolute left-0 bottom-0 h-0.5 w-5 bg-asus-dark"
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={reduced ? { duration: 0 } : undefined}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-border bg-white"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-sans text-base font-medium text-asus-dark py-2.5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-3">
                <Button variant="secondary" className="flex-1">
                  Ingresar
                </Button>
                <Button variant="primary" className="flex-1">
                  Unirme
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
