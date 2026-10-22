"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { DemoUserProvider, useDemoUser, levelFor } from "@/lib/demoUser";
import { IconBook, IconHome, IconTarget, IconTrophy, IconUser } from "@/components/icons";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/app/inicio", label: "Inicio", icon: IconHome },
  { href: "/app/modulos", label: "Módulos", icon: IconBook },
  { href: "/app/recomendador", label: "Recomendador", icon: IconTarget },
  { href: "/app/ranking", label: "Ranking", icon: IconTrophy },
  { href: "/app/perfil", label: "Perfil", icon: IconUser },
];

export default function AppPlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoUserProvider>
      <AppShell>{children}</AppShell>
    </DemoUserProvider>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, hydrated, logout } = useDemoUser();
  const isLoginRoute = pathname === "/app";

  useEffect(() => {
    if (!hydrated || isLoginRoute) return;
    if (!state.loggedIn) router.replace("/app");
  }, [hydrated, isLoginRoute, state.loggedIn, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (!hydrated || !state.loggedIn) {
    return <div className="min-h-dvh bg-white" />;
  }

  return (
    <div className="min-h-dvh bg-white md:flex">
      <aside className="hidden md:flex md:flex-col md:w-60 md:fixed md:inset-y-0 border-r border-border bg-white">
        <Link href="/app/inicio" className="flex items-center gap-2 px-5 h-16 border-b border-border">
          <Image src="/brand/ASUS logo grey.png" alt="ASUS" width={90} height={20} className="h-4 w-auto" />
        </Link>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 h-11 rounded-btn font-sans text-sm font-medium",
                  active ? "bg-asus-blue-soft text-asus-blue" : "text-asus-dark hover:bg-asus-blue-soft/60",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <p className="font-sans text-sm font-semibold text-asus-dark">{state.user.nombre}</p>
          <p className="font-sans text-xs text-muted">{state.user.tienda}</p>
          <p className="font-sans text-xs text-asus-blue mt-1">
            {state.user.puntos.toLocaleString("es-CO")} pts · Nivel {levelFor(state.user.puntos)}
          </p>
          <button
            type="button"
            onClick={() => {
              logout();
              router.replace("/app");
            }}
            className="font-sans text-xs text-muted hover:text-asus-dark mt-3 underline"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 md:ml-60 pb-20 md:pb-0">{children}</div>

      <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-border flex">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5"
            >
              <Icon className={cn("h-5 w-5", active ? "text-asus-blue" : "text-muted")} />
              <span className={cn("font-sans text-[10px]", active ? "text-asus-blue font-medium" : "text-muted")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
