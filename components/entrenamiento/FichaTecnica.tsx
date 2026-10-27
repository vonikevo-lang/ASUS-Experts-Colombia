import { Card } from "@/components/ui/Card";
import { RevealGroup, Reveal } from "./Reveal";
import {
  IconCpu,
  IconMemory,
  IconStorage,
  IconDisplay,
  IconGamepad,
  IconSparkles,
  IconBattery,
  IconShield,
  IconWifi,
  IconCamera,
  IconTag,
} from "@/components/icons";
import type { FichaItem } from "@/types/referencia";
import type { SVGProps } from "react";

interface FichaTecnicaProps {
  ficha: FichaItem[];
}

const ICON_BY_COMPONENTE: Record<string, (props: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  "Sistema operativo": IconTag,
  Procesador: IconCpu,
  "Memoria RAM": IconMemory,
  Gráficos: IconGamepad,
  "Tarjeta de video": IconGamepad,
  "IA / NPU": IconSparkles,
  Pantalla: IconDisplay,
  Almacenamiento: IconStorage,
  Batería: IconBattery,
  Portabilidad: IconTag,
  Conectividad: IconWifi,
  Cámara: IconCamera,
  Garantía: IconShield,
};

export function FichaTecnica({ ficha }: FichaTecnicaProps) {
  if (ficha.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-center font-display text-[28px] font-bold md:text-[40px]">
            Ficha técnica
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ficha.map((item) => {
            const Icon = ICON_BY_COMPONENTE[item.componente] ?? IconTag;
            return (
              <Reveal key={item.componente}>
                <Card className="flex h-full flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-asus-blue-soft text-asus-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    {item.verificar && (
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-warning"
                        title="Confirmar en ficha de tienda"
                        aria-label="Dato por confirmar en ficha de tienda"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-faint">
                      {item.componente}
                    </p>
                    <p className="mt-1 text-[15px] font-semibold leading-snug text-asus-dark">
                      {item.dato}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
