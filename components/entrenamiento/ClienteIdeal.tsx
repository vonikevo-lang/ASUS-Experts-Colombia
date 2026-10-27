import { GalaxySection } from "./GalaxySection";
import { RevealGroup, Reveal } from "./Reveal";
import {
  IconBook,
  IconBattery,
  IconBolt,
  IconDisplay,
  IconWeight,
  IconBriefcase,
  IconGamepad,
  IconPalette,
} from "@/components/icons";
import type { SVGProps } from "react";

interface ClienteIdealProps {
  clienteIdeal: string;
  leAlcanzaPara: string[];
}

const ICONS: Array<(props: SVGProps<SVGSVGElement>) => React.JSX.Element> = [
  IconBook,
  IconBolt,
  IconBattery,
  IconDisplay,
  IconWeight,
  IconBriefcase,
  IconGamepad,
  IconPalette,
];

export function ClienteIdeal({ clienteIdeal, leAlcanzaPara }: ClienteIdealProps) {
  return (
    <GalaxySection className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-[28px] font-bold md:text-[40px]">
            ¿Qué busca este cliente?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-[1.6] text-white/80">
            {clienteIdeal}
          </p>
        </Reveal>

        {leAlcanzaPara.length > 0 && (
        <RevealGroup className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {leAlcanzaPara.map((texto, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={texto} className="flex flex-col items-center gap-3">
                <span
                  className="animate-float-soft flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[var(--entreno-accent)] shadow-[0_0_30px_-6px_var(--entreno-accent)]"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <Icon className="h-7 w-7" />
                </span>
                <span className="max-w-[9.5rem] text-sm leading-snug text-white/85">
                  {texto}
                </span>
              </Reveal>
            );
          })}
        </RevealGroup>
        )}
      </div>
    </GalaxySection>
  );
}
