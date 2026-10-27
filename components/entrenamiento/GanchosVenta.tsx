"use client";

import { useState } from "react";
import { Reveal, RevealGroup } from "./Reveal";
import { IconUser } from "@/components/icons";
import type { GanchoCard } from "@/types/product";

interface GanchosVentaProps {
  ganchos: GanchoCard[];
}

function FlipCard({ gancho }: { gancho: GanchoCard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      aria-pressed={flipped}
      aria-label={`Gancho de venta: ${gancho.cliente}`}
      className="flip-card h-48 w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-asus-blue"
    >
      <div
        className="flip-card-inner h-full w-full"
        style={{ transform: flipped ? "rotateY(180deg)" : undefined }}
      >
        <div className="flip-card-face flex h-full flex-col justify-between rounded-card border border-border bg-asus-blue-soft p-5 shadow-card">
          <IconUser className="h-6 w-6 text-asus-blue" />
          <p className="text-[15px] font-semibold leading-snug text-asus-dark">
            {gancho.cliente}
          </p>
          <span className="text-xs text-faint">Toca para ver qué decirle</span>
        </div>
        <div className="flip-card-face flip-card-back flex h-full flex-col justify-center rounded-card bg-asus-blue p-5 text-white shadow-elev">
          <p className="text-[15px] font-medium leading-snug">{gancho.frase}</p>
        </div>
      </div>
    </button>
  );
}

export function GanchosVenta({ ganchos }: GanchosVentaProps) {
  if (ganchos.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-center font-display text-[28px] font-bold md:text-[40px]">
            Ganchos de venta
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-[15px] text-muted">
            Toca cada tarjeta para ver la frase lista para decir.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ganchos.map((gancho) => (
            <Reveal key={gancho.cliente}>
              <FlipCard gancho={gancho} />
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
