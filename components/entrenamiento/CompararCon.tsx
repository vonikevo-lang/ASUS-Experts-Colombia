import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup } from "./Reveal";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { getReferencia } from "@/data/referencias";
import type { CompararCon as CompararConType } from "@/types/referencia";

interface CompararConProps {
  compararCon: CompararConType;
}

export function CompararCon({ compararCon }: CompararConProps) {
  const { abajo, arriba } = compararCon;

  if (!abajo && !arriba) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <h2 className="text-center font-display text-[28px] font-bold md:text-[40px]">
            ¿Con cuál la comparo?
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {abajo && (
            <Reveal>
              <EscalonCard
                direccion="abajo"
                id={abajo.id}
                diferencias={abajo.diferencias}
              />
            </Reveal>
          )}
          {arriba && (
            <Reveal>
              <EscalonCard
                direccion="arriba"
                id={arriba.id}
                diferencias={arriba.diferencias}
              />
            </Reveal>
          )}
        </RevealGroup>
      </div>
    </section>
  );
}

function EscalonCard({
  direccion,
  id,
  diferencias,
}: {
  direccion: "abajo" | "arriba";
  id: string;
  diferencias: string[];
}) {
  const otra = getReferencia(id);
  const Icon = direccion === "abajo" ? IconArrowLeft : IconArrowRight;

  return (
    <Link href={`/entrenamientos/${id}`} className="block h-full">
      <Card className="flex h-full flex-col gap-3 p-6">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-faint">
          <Icon className="h-4 w-4" />
          {direccion === "abajo" ? "Un escalón abajo" : "Un escalón arriba"}
        </span>
        <p className="font-display text-lg font-bold text-asus-dark">
          {otra?.nombre ?? id}
        </p>
        <ul className="space-y-1.5 text-[14px] leading-snug text-muted">
          {diferencias.map((d) => (
            <li key={d}>· {d}</li>
          ))}
        </ul>
      </Card>
    </Link>
  );
}
