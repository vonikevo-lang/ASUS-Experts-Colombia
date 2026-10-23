"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import storesData from "@/data/stores.json";
import type { StoresData, TiendaStats } from "@/types/platform";
import { Counter } from "@/components/ui/Counter";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const data = storesData as StoresData;

type SortKey = keyof TiendaStats;
type Periodo = "mes" | "3m";

function weightedAverage(rows: TiendaStats[], key: "completado" | "puntajePromedio") {
  const totalAsesores = rows.reduce((sum, r) => sum + r.asesores, 0);
  const weighted = rows.reduce((sum, r) => sum + r[key] * r.asesores, 0);
  return Math.round(weighted / totalAsesores);
}

function exportCsv(rows: TiendaStats[]) {
  const header = ["Tienda", "Ciudad", "Asesores", "Asesores activos", "% Completado", "Puntaje promedio", "Módulos completados"];
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [r.tienda, r.ciudad, r.asesores, r.asesoresActivos, r.completado, r.puntajePromedio, r.modulosCompletados]
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
  const [periodo, setPeriodo] = useState<Periodo>("mes");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "tienda", dir: "asc" });
  const [busqueda, setBusqueda] = useState("");

  const asesoresActivos = data.tiendas.reduce((sum, t) => sum + t.asesoresActivos, 0);
  const completadoPromedio = weightedAverage(data.tiendas, "completado");
  const puntajePromedio = weightedAverage(data.tiendas, "puntajePromedio");

  const tiendasFiltradas = useMemo(
    () => data.tiendas.filter((t) => t.ciudad.toLowerCase().includes(busqueda.toLowerCase())),
    [busqueda],
  );

  const sortedTiendas = useMemo(() => {
    const rows = [...tiendasFiltradas];
    rows.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [tiendasFiltradas, sort]);

  function toggleSort(key: SortKey) {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  }

  const barData = [...data.tiendas].sort((a, b) => b.completado - a.completado);
  const productosData = [...data.productosEntrenados].sort((a, b) => b.modulosCompletados - a.modulosCompletados);

  return (
    <div className="min-h-dvh bg-white">
      <header className="border-b border-border bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <Image
              src="/brand/ASUS logo grey.png"
              alt="ASUS"
              width={90}
              height={20}
              className="h-5 w-auto shrink-0"
            />
            <span className="font-display text-sm font-semibold uppercase tracking-[-0.01em] text-asus-dark truncate">
              Panel de marca
            </span>
          </div>
          <Tabs
            items={[
              { id: "mes", label: "Este mes" },
              { id: "3m", label: "Últimos 3 meses" },
            ]}
            value={periodo}
            onChange={(v) => setPeriodo(v as Periodo)}
          />
        </div>
      </header>

      <div className="bg-asus-blue-soft">
        <p className="mx-auto max-w-5xl px-4 sm:px-6 py-2 font-sans text-xs text-asus-blue-hover text-center">
          Datos simulados para demostración
        </p>
      </div>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <Kpi
            label="Asesores activos"
            value={asesoresActivos}
            anterior={data.periodoAnterior.asesoresActivos}
          />
          <Kpi
            label="Completó el entrenamiento"
            value={completadoPromedio}
            anterior={data.periodoAnterior.completadoPromedio}
            suffix="%"
          />
          <Kpi
            label="Puntaje promedio en quizzes"
            value={puntajePromedio}
            anterior={data.periodoAnterior.puntajePromedio}
          />
          <Kpi
            label="Módulos completados este mes"
            value={data.modulosCompletadosMes}
            anterior={data.periodoAnterior.modulosCompletadosMes}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-card border border-border p-5">
            <p className="font-sans text-sm font-medium text-asus-dark mb-4">
              % completado por tienda
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey="tienda"
                  tick={{ fontSize: 10, fill: "var(--text-soft)" }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={50}
                />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-soft)" }} unit="%" />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Completado"]}
                  contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "var(--border)" }}
                />
                <Bar
                  dataKey="completado"
                  fill="var(--asus-blue)"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={!reduced}
                  animationDuration={700}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-card border border-border p-5">
            <p className="font-sans text-sm font-medium text-asus-dark mb-4">
              Evolución semanal — módulos completados
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data.evolucionSemanal} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="semana" tick={{ fontSize: 10, fill: "var(--text-soft)" }} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-soft)" }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "var(--border)" }} />
                <Line
                  type="monotone"
                  dataKey="modulosCompletados"
                  stroke="var(--asus-blue)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "var(--asus-blue)" }}
                  isAnimationActive={!reduced}
                  animationDuration={700}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-card border border-border p-5 mb-10">
          <p className="font-sans text-sm font-medium text-asus-dark mb-4">Productos más entrenados</p>
          <ResponsiveContainer width="100%" height={Math.max(160, productosData.length * 48)}>
            <BarChart
              data={productosData}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} stroke="var(--border)" />
              <XAxis type="number" tick={{ fontSize: 11, fill: "var(--text-soft)" }} />
              <YAxis
                type="category"
                dataKey="producto"
                tick={{ fontSize: 12, fill: "var(--asus-dark)" }}
                width={100}
              />
              <Tooltip
                formatter={(value) => [value, "Módulos completados"]}
                contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "var(--border)" }}
              />
              <Bar
                dataKey="modulosCompletados"
                fill="var(--asus-blue)"
                radius={[0, 4, 4, 0]}
                isAnimationActive={!reduced}
                animationDuration={700}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-card border border-border overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-border">
            <p className="font-sans text-sm font-medium text-asus-dark">Tiendas</p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por ciudad…"
                className="h-9 w-40 sm:w-48 rounded-btn border border-border px-3 font-sans text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
              />
              <Button variant="secondary" className="h-9 px-3 text-xs shrink-0" onClick={() => exportCsv(sortedTiendas)}>
                Descargar reporte
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  {(
                    [
                      ["tienda", "Tienda"],
                      ["ciudad", "Ciudad"],
                      ["asesores", "Asesores"],
                      ["asesoresActivos", "Activos"],
                      ["completado", "% Completado"],
                      ["puntajePromedio", "Puntaje promedio"],
                      ["modulosCompletados", "Módulos"],
                    ] as [SortKey, string][]
                  ).map(([key, label]) => (
                    <th key={key} className="p-3 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => toggleSort(key)}
                        className="font-sans text-xs font-medium uppercase tracking-[0.04em] text-muted hover:text-asus-dark inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
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
                    <td className="p-3 font-sans text-sm text-asus-dark whitespace-nowrap">{t.tienda}</td>
                    <td className="p-3 font-sans text-sm text-muted whitespace-nowrap">{t.ciudad}</td>
                    <td className="p-3 font-mono text-sm text-asus-dark">{t.asesores}</td>
                    <td className="p-3 font-mono text-sm text-asus-dark">{t.asesoresActivos}</td>
                    <td className="p-3 font-mono text-sm text-asus-dark">{t.completado}%</td>
                    <td className="p-3 font-mono text-sm text-asus-dark">{t.puntajePromedio.toLocaleString("es-CO")}</td>
                    <td className="p-3 font-mono text-sm text-asus-dark">{t.modulosCompletados}</td>
                  </tr>
                ))}
                {sortedTiendas.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center font-sans text-sm text-muted">
                      Ninguna tienda coincide con “{busqueda}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function Kpi({
  label,
  value,
  anterior,
  suffix,
}: {
  label: string;
  value: number;
  anterior: number;
  suffix?: string;
}) {
  const delta = value - anterior;
  const up = delta > 0;
  const flat = delta === 0;

  return (
    <div className="rounded-card border border-border p-4">
      <p className="font-display text-2xl font-bold text-asus-dark">
        <Counter value={value} suffix={suffix} />
      </p>
      <p className="font-sans text-xs text-muted mt-1">{label}</p>
      <p
        className={cn(
          "font-sans text-xs font-medium mt-2",
          flat ? "text-muted" : up ? "text-success" : "text-danger",
        )}
      >
        {flat ? "— sin cambio" : up ? `▲ +${delta}${suffix ?? ""}` : `▼ ${delta}${suffix ?? ""}`}
        <span className="text-faint"> vs. periodo anterior</span>
      </p>
    </div>
  );
}
