"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import storesData from "@/data/stores.json";
import type { StoresData, TiendaStats } from "@/types/platform";
import { Counter } from "@/components/ui/Counter";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const data = storesData as StoresData;

type SortKey = keyof TiendaStats;

function weightedAverage(rows: TiendaStats[], key: "completado" | "puntajePromedio") {
  const totalAsesores = rows.reduce((sum, r) => sum + r.asesores, 0);
  const weighted = rows.reduce((sum, r) => sum + r[key] * r.asesores, 0);
  return Math.round(weighted / totalAsesores);
}

function exportCsv(rows: TiendaStats[]) {
  const header = ["Tienda", "Ciudad", "Asesores", "% Completado", "Puntaje promedio"];
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [r.tienda, r.ciudad, r.asesores, r.completado, r.puntajePromedio]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    ),
  ];
  const csv = lines.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reporte-tiendas-asus-experts.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function MarcaPage() {
  const reduced = useReducedMotion();
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "tienda", dir: "asc" });

  const asesoresActivos = data.tiendas.reduce((sum, t) => sum + t.asesores, 0);
  const completadoPromedio = weightedAverage(data.tiendas, "completado");
  const puntajePromedio = weightedAverage(data.tiendas, "puntajePromedio");

  const sortedTiendas = useMemo(() => {
    const rows = [...data.tiendas];
    rows.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [sort]);

  function toggleSort(key: SortKey) {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  }

  const maxCompletado = Math.max(...data.tiendas.map((t) => t.completado));
  const maxEvolucion = Math.max(...data.evolucionSemanal.map((e) => e.completado));

  return (
    <main className="w-full mx-auto max-w-5xl min-w-0 px-4 sm:px-6 py-10">
      <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted font-medium">ASUS Experts Colombia</p>
      <h1 className="font-display text-2xl font-semibold text-asus-dark mt-1 mb-8">Dashboard de marca</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Kpi label="Asesores activos" value={asesoresActivos} />
        <Kpi label="Completó el entrenamiento" value={completadoPromedio} suffix="%" />
        <Kpi label="Puntaje promedio en quizzes" value={puntajePromedio} />
        <Kpi label="Módulos completados este mes" value={data.modulosCompletadosMes} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="rounded-card border border-border p-5">
          <p className="font-sans text-sm font-medium text-asus-dark mb-4">Avance por tienda</p>
          <div className="flex items-end justify-between gap-3 h-40">
            {data.tiendas.map((t, i) => (
              <div key={t.tienda} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full h-32">
                  <motion.div
                    className="absolute bottom-0 left-0 w-full rounded-t-btn bg-asus-blue"
                    initial={reduced ? { height: `${(t.completado / maxCompletado) * 100}%` } : { height: 0 }}
                    whileInView={{ height: `${(t.completado / maxCompletado) * 100}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="font-sans text-[11px] text-muted text-center leading-tight">{t.tienda}</p>
                <p className="font-mono text-[11px] text-faint">{t.completado}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-border p-5">
          <p className="font-sans text-sm font-medium text-asus-dark mb-4">Evolución semanal (% completado)</p>
          <LineChart data={data.evolucionSemanal} max={maxEvolucion} reduced={reduced} />
        </div>
      </div>

      <div className="rounded-card border border-border overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <p className="font-sans text-sm font-medium text-asus-dark">Tiendas</p>
          <Button variant="secondary" className="h-8 px-3 text-xs" onClick={() => exportCsv(sortedTiendas)}>
            Descargar reporte
          </Button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              {(
                [
                  ["tienda", "Tienda"],
                  ["ciudad", "Ciudad"],
                  ["asesores", "Asesores"],
                  ["completado", "% Completado"],
                  ["puntajePromedio", "Puntaje promedio"],
                ] as [SortKey, string][]
              ).map(([key, label]) => (
                <th key={key} className="p-3">
                  <button
                    type="button"
                    onClick={() => toggleSort(key)}
                    className="font-sans text-xs font-medium uppercase tracking-[0.04em] text-muted hover:text-asus-dark inline-flex items-center gap-1"
                  >
                    {label}
                    {sort.key === key && <span>{sort.dir === "asc" ? "↑" : "↓"}</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedTiendas.map((t) => (
              <tr key={t.tienda} className="border-b border-border last:border-0">
                <td className="p-3 font-sans text-sm text-asus-dark">{t.tienda}</td>
                <td className="p-3 font-sans text-sm text-muted">{t.ciudad}</td>
                <td className="p-3 font-mono text-sm text-asus-dark">{t.asesores}</td>
                <td className="p-3 font-mono text-sm text-asus-dark">{t.completado}%</td>
                <td className="p-3 font-mono text-sm text-asus-dark">{t.puntajePromedio.toLocaleString("es-CO")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Kpi({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-card border border-border p-4">
      <p className="font-display text-2xl font-bold text-asus-dark">
        <Counter value={value} suffix={suffix} />
      </p>
      <p className="font-sans text-xs text-muted mt-1">{label}</p>
    </div>
  );
}

function LineChart({
  data,
  max,
  reduced,
}: {
  data: { semana: string; completado: number }[];
  max: number;
  reduced: boolean;
}) {
  const width = 280;
  const height = 120;
  const padding = 8;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - (d.completado / max) * (height - padding * 2);
    return { x, y, label: d.semana, value: d.completado };
  });

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32">
        <motion.path
          d={path}
          fill="none"
          stroke="var(--asus-blue)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduced ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
        />
        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r={2.5} fill="var(--asus-blue)" />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {points.map((p) => (
          <span key={p.label} className="font-sans text-[10px] text-faint">
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}
