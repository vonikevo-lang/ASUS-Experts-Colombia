"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useDemoUser } from "@/lib/demoUser";

export default function IngresarPage() {
  const router = useRouter();
  const { state, hydrated, login } = useDemoUser();

  useEffect(() => {
    if (hydrated && state.loggedIn) router.replace("/app/inicio");
  }, [hydrated, state.loggedIn, router]);

  function handleEnter() {
    login();
    router.push("/app/inicio");
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="bg-hero-gradient text-white flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <Image
          src="/brand/ASUS logo grey.png"
          alt="ASUS"
          width={116}
          height={24}
          className="h-6 w-auto invert brightness-0"
          priority
        />
        <h1 className="font-display text-2xl font-bold uppercase tracking-[-0.01em] mt-6">
          Plataforma de asesores
        </h1>
        <p className="font-sans text-sm text-white/80 mt-2 max-w-xs">
          Entrena, compara y gana puntos vendiendo el portafolio ASUS.
        </p>
      </div>

      <div className="px-6 py-10 flex flex-col items-center gap-3">
        <Button variant="primary" className="w-full max-w-xs" onClick={handleEnter}>
          Entrar como asesor demo
        </Button>
        <p className="font-sans text-xs text-faint text-center max-w-xs">Demo: no se piden datos.</p>
      </div>
    </div>
  );
}
