"use client";

import { useState } from "react";
import { motion } from "motion/react";
import rankingData from "@/data/ranking.json";
import type { AsesorRanking } from "@/types/platform";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { useDemoUser } from "@/lib/demoUser";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const ranking = rankingData as AsesorRanking[];

const PODIUM_STYLES = [
  { place: 1, height: "h-28", tone: "bg-gold", text: "text-white", order: "order-2" },
  { place: 2, height: "h-20", tone: "bg-asus-silver", text: "text-asus-dark", order: "order-1" },
  { place: 3, height: "h-16", tone: "bg-bronze", text: "text-white", order: "order-3" },
];

export default function RankingPage() {
  const { state, addPoints } = useDemoUser();
  const reduced = useReducedMotion();
  const [scope, setScope] = useState<"tienda" | "colombia">("tienda");

  const merged = ranking.map((a) => (a.esUsuarioDemo ? { ...a, puntos: state.user.puntos } : a));
  const filtered = scope === "tienda" ? merged.filter((a) => a.tienda === state.user.tienda) : merged;
  const sorted = [...filtered].sort((a, b) => b.puntos - a.puntos);

  const top3 = sorted.slice(0, 3);
  const resto = sorted.slice(3);

  function simularPuntaje() {
    const extra = 30 + Math.floor(Math.random() * 60);
    addPoints(extra);
  }

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl font-semibold text-asus-dark">Ranking</h1>
        <Button variant="secondary" className="h-9 text-xs px-4" onClick={simularPuntaje}>
          Simular nuevo puntaje
        </Button>
      </div>

      <Tabs
        items={[
          { id: "tienda", label: "Mi tienda" },
          { id: "colombia", label: "Colombia" },
        ]}
        value={scope}
        onChange={(v) => setScope(v as "tienda" | "colombia")}
        className="border-b border-border mb-8"
      />

      {top3.length > 0 && (
        <div className="flex items-end justify-center gap-3 mb-10">
          {top3.map((asesor, i) => {
            const style = PODIUM_STYLES[i];
            return (
              <motion.div
                key={asesor.id}
                className={cn("flex flex-col items-center w-24", style.order)}
                initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-sans text-xs font-medium text-asus-dark text-center truncate w-full">
                  {asesor.nombre}
                </p>
                <p className="font-mono text-xs text-faint mb-2">{asesor.puntos.toLocaleString("es-CO")}</p>
                <div
                  className={cn(
                    "w-full rounded-t-card flex items-start justify-center pt-2",
                    style.height,
                    style.tone,
                  )}
                >
                  <span className={cn("font-display text-lg font-bold", style.text)}>{style.place}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {resto.length > 0 && (
        <ul key={scope} className="rounded-card border border-border divide-y divide-border overflow-hidden">
          {resto.map((asesor, i) => (
            <motion.li
              key={asesor.id}
              layout
              transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "flex items-center gap-3 px-4 py-3",
                asesor.esUsuarioDemo && "bg-asus-blue-soft",
              )}
            >
              <span className="font-display text-sm font-semibold text-muted w-6">{i + 4}</span>
              <span className="font-sans text-sm text-asus-dark flex-1">{asesor.nombre}</span>
              {scope === "colombia" && <span className="font-sans text-xs text-faint">{asesor.tienda}</span>}
              <span className="font-mono text-xs text-faint w-16 text-right">
                {asesor.puntos.toLocaleString("es-CO")} pts
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </main>
  );
}
