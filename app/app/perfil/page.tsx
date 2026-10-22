"use client";

import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { useDemoUser, levelFor, levelProgress } from "@/lib/demoUser";
import { IconUser } from "@/components/icons";

export default function PerfilPage() {
  const router = useRouter();
  const { state, logout } = useDemoUser();
  const { user, completedModules, quizResults } = state;

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

      <Button
        variant="secondary"
        className="w-full"
        onClick={() => {
          logout();
          router.replace("/app");
        }}
      >
        Cerrar sesión
      </Button>
    </main>
  );
}
