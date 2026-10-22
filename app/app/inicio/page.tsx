"use client";

import Link from "next/link";
import productsData from "@/data/products.json";
import modulesData from "@/data/modules.json";
import rankingData from "@/data/ranking.json";
import type { Producto } from "@/types/product";
import type { Modulo, AsesorRanking } from "@/types/platform";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClasses } from "@/components/ui/Button";
import { useDemoUser, levelFor, levelProgress } from "@/lib/demoUser";
import { IconGift, IconTrophy } from "@/components/icons";

const products = productsData as Producto[];
const modules = modulesData as Modulo[];
const ranking = rankingData as AsesorRanking[];

export default function InicioPage() {
  const { state } = useDemoUser();
  const { user, completedModules, quizResults } = state;

  const modulo = modules[0];
  const producto = products.find((p) => p.id === modulo.productoId);
  const quizDone = Boolean(quizResults[modulo.slug]);
  const moduleDone = completedModules.includes(modulo.slug);

  const continuar = !moduleDone
    ? { label: "Empezar módulo", href: `/app/modulos/${modulo.slug}`, sub: modulo.titulo }
    : !quizDone
      ? { label: "Hacer el quiz", href: `/app/quiz/${modulo.slug}`, sub: modulo.titulo }
      : { label: "Repasar módulo", href: `/app/modulos/${modulo.slug}`, sub: `Último puntaje: ${quizResults[modulo.slug].score}/${quizResults[modulo.slug].total}` };

  const top3 = [...ranking]
    .map((a) => (a.esUsuarioDemo ? { ...a, puntos: user.puntos } : a))
    .filter((a) => a.tienda === user.tienda)
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <p className="font-sans text-sm text-muted">Hola,</p>
        <h1 className="font-display text-2xl font-semibold text-asus-dark">{user.nombre.split(" ")[0]} 👋</h1>
      </div>

      <div className="rounded-card border border-border p-5">
        <div className="flex items-center justify-between">
          <p className="font-sans text-sm text-muted">Nivel {levelFor(user.puntos)}</p>
          <p className="font-sans text-sm font-semibold text-asus-blue">
            {user.puntos.toLocaleString("es-CO")} pts
          </p>
        </div>
        <ProgressBar value={levelProgress(user.puntos)} max={100} className="mt-2" />
      </div>

      {producto && (
        <Link
          href={continuar.href}
          className="block rounded-card border border-border p-5 hover:border-asus-blue transition-colors"
        >
          <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
            Continúa donde quedaste
          </p>
          <p className="font-display text-lg font-semibold text-asus-dark mt-1">{continuar.label}</p>
          <p className="font-sans text-sm text-muted mt-0.5">{continuar.sub}</p>
        </Link>
      )}

      <div className="rounded-card bg-asus-blue-soft p-5 flex items-start gap-3">
        <IconGift className="h-6 w-6 text-asus-blue shrink-0 mt-0.5" />
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted">Reto del día</p>
          <p className="font-sans text-sm text-asus-dark mt-1">
            Responde el quiz de <strong>{modulo.titulo}</strong> hoy y suma puntos extra a tu ranking.
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <IconTrophy className="h-5 w-5 text-asus-blue" />
          <p className="font-display text-lg font-semibold text-asus-dark">Top 3 de tu tienda</p>
        </div>
        <ul className="rounded-card border border-border divide-y divide-border">
          {top3.map((asesor, i) => (
            <li
              key={asesor.id}
              className={
                asesor.esUsuarioDemo
                  ? "flex items-center gap-3 px-4 py-3 bg-asus-blue-soft"
                  : "flex items-center gap-3 px-4 py-3"
              }
            >
              <span className="font-display text-sm font-semibold text-muted w-5">{i + 1}</span>
              <span className="font-sans text-sm text-asus-dark flex-1">{asesor.nombre}</span>
              <span className="font-mono text-xs text-faint">{asesor.puntos.toLocaleString("es-CO")} pts</span>
            </li>
          ))}
        </ul>
        <Link href="/app/ranking" className={buttonClasses("secondary", "w-full mt-3 h-10 text-xs")}>
          Ver ranking completo
        </Link>
      </div>
    </main>
  );
}
