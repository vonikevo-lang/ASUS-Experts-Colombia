import { Reveal, RevealGroup } from "./Reveal";
import { IconCheck, IconCross } from "@/components/icons";
import { cn } from "@/lib/cn";

interface LeAlcanzaNoEsParaProps {
  leAlcanzaPara: string[];
  noEsPara: string[];
}

export function LeAlcanzaNoEsPara({ leAlcanzaPara, noEsPara }: LeAlcanzaNoEsParaProps) {
  const tieneLeAlcanza = leAlcanzaPara.length > 0;
  const tieneNoEsPara = noEsPara.length > 0;

  if (!tieneLeAlcanza && !tieneNoEsPara) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div
        className={cn(
          "mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6",
          tieneLeAlcanza && tieneNoEsPara && "md:grid-cols-2",
        )}
      >
        {tieneLeAlcanza && (
          <RevealGroup>
            <Reveal>
              <h3 className="font-display text-xl font-bold text-success md:text-2xl">
                Le alcanza para
              </h3>
            </Reveal>
            <ul className="mt-5 space-y-3">
              {leAlcanzaPara.map((texto) => (
                <Reveal key={texto} as="li" className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <span className="text-[15px] leading-snug text-asus-dark">{texto}</span>
                </Reveal>
              ))}
            </ul>
          </RevealGroup>
        )}

        {tieneNoEsPara && (
          <RevealGroup>
            <Reveal>
              <h3 className="font-display text-xl font-bold text-faint md:text-2xl">
                No es para
              </h3>
            </Reveal>
            <ul className="mt-5 space-y-3">
              {noEsPara.map((texto) => (
                <Reveal key={texto} as="li" className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-border text-faint">
                    <IconCross className="h-4 w-4" />
                  </span>
                  <span className="text-[15px] leading-snug text-muted">{texto}</span>
                </Reveal>
              ))}
            </ul>
          </RevealGroup>
        )}
      </div>
    </section>
  );
}
