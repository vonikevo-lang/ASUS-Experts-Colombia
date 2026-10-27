import { LaptopIllustration } from "./LaptopIllustration";
import { Reveal } from "./Reveal";

interface IntroFranjaProps {
  nombre: string;
  accentVar: string;
}

export function IntroFranja({ nombre, accentVar }: IntroFranjaProps) {
  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[minmax(0,320px)_1fr]">
        <div className="-ml-16 md:-ml-24">
          <LaptopIllustration
            accent={accentVar}
            className="w-[280px] -rotate-6 md:w-[380px]"
          />
        </div>
        <Reveal>
          <p
            className="text-[28px] font-bold leading-[1.3] md:text-[40px]"
            style={{ color: accentVar }}
          >
            En este entrenamiento vas a aprender qué trae el {nombre} y cómo
            venderlo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
