import { GalaxySection } from "./GalaxySection";
import { Reveal } from "./Reveal";
import { IconCpu, IconSparkles, IconMemory, IconDisplay } from "@/components/icons";
import type { Referencia } from "@/types/referencia";
import type { SVGProps } from "react";

interface BloquesTecnologiaProps {
  referencia: Referencia;
}

interface Bloque {
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  titulo: string;
  texto: string;
}

export function BloquesTecnologia({ referencia }: BloquesTecnologiaProps) {
  const { procesador, memoria, pantallaDetalle } = referencia;

  const esCopilotPlus = (procesador.npuTops ?? 0) >= 40;

  const bloques: Bloque[] = [
    {
      icon: IconCpu,
      titulo: `Procesador ${procesador.marca} ${procesador.modelo}`,
      texto: procesador.comoDecirlo,
    },
    {
      icon: IconSparkles,
      titulo: procesador.npuTops
        ? `NPU ✓ ${procesador.npuTops} TOPS · Copilot+ PC ${esCopilotPlus ? "✓" : "✗"} (requiere 40 TOPS)`
        : "NPU ✗ (usa la GPU para tareas de IA)",
      texto: procesador.queSignifica,
    },
    {
      icon: IconMemory,
      titulo:
        memoria.caso === "se-suma"
          ? "RAM: se puede sumar"
          : memoria.caso === "se-cambia"
            ? "RAM: se cambia, no se suma"
            : "Memoria RAM",
      texto: memoria.comoDecirlo,
    },
    {
      icon: IconDisplay,
      titulo: `Pantalla ${pantallaDetalle.pulgadas}" ${pantallaDetalle.tipo}`,
      texto: pantallaDetalle.comoDecirlo,
    },
  ];

  return (
    <GalaxySection className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl space-y-16 px-6">
        {bloques.map((bloque, i) => (
          <Reveal key={bloque.titulo}>
            <div
              className={`flex flex-col items-center gap-6 text-center md:flex-row md:text-left ${
                i % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
              }`}
            >
              <span className="animate-ring-pulse flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white text-white">
                <bloque.icon className="h-10 w-10" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                  {bloque.titulo}
                </h3>
                <p className="mt-2 max-w-md text-[17px] leading-[1.6] text-white/80">
                  {bloque.texto}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </GalaxySection>
  );
}
