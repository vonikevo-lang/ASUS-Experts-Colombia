"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip, type ProductLine } from "@/components/ui/Chip";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Counter } from "@/components/ui/Counter";

const colorSwatches: { name: string; className: string }[] = [
  { name: "asus-blue", className: "bg-asus-blue" },
  { name: "asus-blue-deep", className: "bg-asus-blue-deep" },
  { name: "asus-blue-accent", className: "bg-asus-blue-accent" },
  { name: "asus-blue-hover", className: "bg-asus-blue-hover" },
  { name: "asus-blue-soft", className: "bg-asus-blue-soft" },
  { name: "asus-silver", className: "bg-asus-silver" },
  { name: "asus-dark", className: "bg-asus-dark" },
  { name: "muted (text-soft)", className: "bg-muted" },
  { name: "faint (text-faint)", className: "bg-faint" },
  { name: "border", className: "bg-border" },
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "danger", className: "bg-danger" },
  { name: "gold", className: "bg-gold" },
];

const lineSwatches: { name: ProductLine; label: string }[] = [
  { name: "zenbook", label: "Zenbook" },
  { name: "vivobook", label: "Vivobook" },
  { name: "proart", label: "ProArt" },
  { name: "rog", label: "ROG" },
  { name: "tuf", label: "TUF" },
  { name: "gaming", label: "Gaming" },
];

const pilarTabs = [
  { id: "entrenamiento", label: "Entrenamiento" },
  { id: "comparador", label: "Comparador" },
  { id: "gamificacion", label: "Gamificación" },
  { id: "premios", label: "Premios" },
];

export default function StyleguidePage() {
  const [tab, setTab] = useState(pilarTabs[0].id);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 space-y-16">
      <header>
        <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted">
          Styleguide — revisión interna
        </p>
        <h1 className="font-display text-[40px] md:text-[64px] font-bold uppercase tracking-[-0.01em] text-asus-blue">
          Design System
        </h1>
        <p className="font-sans text-base text-muted max-w-xl mt-2">
          Página temporal para revisar colores, tipografías y componentes base
          antes de construir la landing.
        </p>
      </header>

      {/* Colores */}
      <section className="space-y-4">
        <h2 className="font-display text-[32px] font-semibold">Colores</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {colorSwatches.map((swatch) => (
            <div key={swatch.name} className="space-y-2">
              <div className={`h-16 rounded-card border border-border ${swatch.className}`} />
              <p className="font-mono text-xs text-muted">{swatch.name}</p>
            </div>
          ))}
        </div>

        <h3 className="font-display text-[22px] font-semibold pt-4">Líneas de producto</h3>
        <div className="flex flex-wrap gap-3">
          {lineSwatches.map((line) => (
            <Chip key={line.name} line={line.name}>
              {line.label}
            </Chip>
          ))}
        </div>
      </section>

      {/* Tipografía */}
      <section className="space-y-5">
        <h2 className="font-display text-[32px] font-semibold">Tipografía</h2>
        <p className="font-display text-[64px] font-bold uppercase tracking-[-0.01em]">
          Display / Hero
        </p>
        <p className="font-display text-[40px] font-bold">H1 — Saira 700</p>
        <p className="font-display text-[32px] font-semibold">H2 — Saira 600</p>
        <p className="font-display text-[22px] font-semibold">H3 — Saira 600</p>
        <p className="font-sans text-base leading-[1.6]">
          Cuerpo — Roboto 400. Domina ASUS, vende con confianza: explícale a tu
          cliente la diferencia en palabras simples.
        </p>
        <p className="font-sans text-[15px] font-medium uppercase tracking-[0.04em]">
          Botones — Roboto 500
        </p>
        <p className="font-mono text-xs text-muted">UX3407QA-QD232W — specs / códigos, Roboto Mono</p>
      </section>

      {/* Botones */}
      <section className="space-y-4">
        <h2 className="font-display text-[32px] font-semibold">Botones</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Empezar entrenamiento</Button>
          <Button variant="secondary">Ver comparador</Button>
        </div>
        <div className="bg-asus-blue-deep rounded-card p-6 flex flex-wrap items-center gap-4">
          <Button variant="onDark">Ver más</Button>
          <Button variant="primary">Unirme</Button>
        </div>
      </section>

      {/* Card */}
      <section className="space-y-4">
        <h2 className="font-display text-[32px] font-semibold">Card</h2>
        <Card className="p-6 max-w-sm space-y-3">
          <Chip line="zenbook">14&quot;</Chip>
          <h3 className="font-display text-[22px] font-semibold">Zenbook A14</h3>
          <p className="font-mono text-xs text-faint">UX3407QA-QD232W</p>
          <ul className="font-sans text-sm text-muted space-y-1 list-disc list-inside">
            <li>Pantalla OLED 14&quot; WUXGA</li>
            <li>NPU hasta 45 TOPS</li>
            <li>SSD 1 TB NVMe</li>
          </ul>
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="h-9 text-xs px-4">
              Entrenarme
            </Button>
            <Button variant="secondary" className="h-9 text-xs px-4">
              Comparar
            </Button>
          </div>
        </Card>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="font-display text-[32px] font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge tone="neutral">Nuevo módulo</Badge>
          <Badge tone="success">Aprobado</Badge>
          <Badge tone="warning">Datos en verificación</Badge>
          <Badge tone="danger">Pendiente</Badge>
          <Badge tone="gold">+20 puntos</Badge>
        </div>
      </section>

      {/* Tabs */}
      <section className="space-y-4">
        <h2 className="font-display text-[32px] font-semibold">Tabs</h2>
        <Tabs items={pilarTabs} value={tab} onChange={setTab} className="border-b border-border" />
        <p className="font-sans text-sm text-muted">Tab activo: {tab}</p>
      </section>

      {/* ProgressBar + Counter */}
      <section className="space-y-6">
        <h2 className="font-display text-[32px] font-semibold">ProgressBar &amp; Counter</h2>
        <div className="max-w-sm space-y-2">
          <div className="flex justify-between font-sans text-sm text-muted">
            <span>Nivel 3</span>
            <span>1.240 / 2.000 pts</span>
          </div>
          <ProgressBar value={1240} max={2000} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-asus-blue-soft rounded-card p-6">
          <div className="text-center">
            <p className="font-display text-[40px] font-bold text-asus-blue">
              <Counter value={20} suffix="+" />
            </p>
            <p className="font-sans text-xs text-muted">módulos</p>
          </div>
          <div className="text-center">
            <p className="font-display text-[40px] font-bold text-asus-blue">
              <Counter value={4} />
            </p>
            <p className="font-sans text-xs text-muted">líneas de producto</p>
          </div>
          <div className="text-center">
            <p className="font-display text-[40px] font-bold text-asus-blue">
              <Counter value={100} suffix="%" />
            </p>
            <p className="font-sans text-xs text-muted">en español</p>
          </div>
          <div className="text-center">
            <p className="font-display text-[40px] font-bold text-asus-blue">
              <Counter value={1240} />
            </p>
            <p className="font-sans text-xs text-muted">puntos (ejemplo)</p>
          </div>
        </div>
      </section>
    </main>
  );
}
