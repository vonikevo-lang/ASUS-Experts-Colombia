"use client";

import { useRouter } from "next/navigation";
import quizzesData from "@/data/quizzes.json";
import modulesData from "@/data/modules.json";
import productsData from "@/data/products.json";
import type { Quiz, Modulo } from "@/types/platform";
import type { Producto } from "@/types/product";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { useDemoUser, levelFor, levelProgress } from "@/lib/demoUser";
import { QUIZ_PASS_THRESHOLD } from "@/lib/quiz";
import { IconLock, IconTrophy, IconUser } from "@/components/icons";
import { cn } from "@/lib/cn";

const quizzes = quizzesData as Quiz[];
const modules = modulesData as Modulo[];
const products = productsData as Producto[];

export default function PerfilPage() {
  const router = useRouter();
  const { state, logout } = useDemoUser();
  const { user, completedModules, quizResults } = state;

  const badges = quizzes.map((quiz) => {
    const modulo = modules.find((m) => m.slug === quiz.moduloSlug);
    const producto = modulo ? products.find((p) => p.id === modulo.productoId) : undefined;
    const resultado = quizResults[quiz.slug];
    const earned = Boolean(resultado && resultado.score / resultado.total >= QUIZ_PASS_THRESHOLD);
    return {
      id: quiz.slug,
      nombre: producto ? `Experto ${producto.nombre}` : `Experto ${quiz.slug}`,
      earned,
    };
  });

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-asus-blue flex items-center justify-center shrink-0">
          <IconUser className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold text-asus-dark">{user.nombre}</h1>
          <p className="font-sans text-sm text-muted">{user.tienda}</p>
        </div>
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

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-card border border-border p-4 text-center">
          <p className="font-display text-2xl font-bold text-asus-blue">{completedModules.length}</p>
          <p className="font-sans text-xs text-muted mt-1">módulos completados</p>
        </div>
        <div className="rounded-card border border-border p-4 text-center">
          <p className="font-display text-2xl font-bold text-asus-blue">{Object.keys(quizResults).length}</p>
          <p className="font-sans text-xs text-muted mt-1">quizzes hechos</p>
        </div>
      </div>

      <div>
        <p className="font-display text-lg font-semibold text-asus-dark mb-3">Mis badges</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={cn(
                "rounded-card border p-4 flex flex-col items-center text-center gap-2",
                badge.earned ? "border-border bg-white" : "border-border bg-asus-blue-soft/40",
              )}
            >
              <div
                className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center",
                  badge.earned ? "bg-gold" : "bg-asus-silver",
                )}
              >
                {badge.earned ? (
                  <IconTrophy className="h-6 w-6 text-white" />
                ) : (
                  <IconLock className="h-5 w-5 text-white" />
                )}
              </div>
              <p
                className={cn(
                  "font-sans text-xs font-medium",
                  badge.earned ? "text-asus-dark" : "text-muted",
                )}
              >
                {badge.nombre}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="secondary"
        className="w-full"
        onClick={() => {
          logout();
          router.replace("/app/ingresar");
        }}
      >
        Cerrar sesión
      </Button>
    </main>
  );
}
