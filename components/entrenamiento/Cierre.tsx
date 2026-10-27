import Link from "next/link";
import { Reveal } from "./Reveal";
import { GalaxySection } from "./GalaxySection";

interface CierreProps {
  slug: string;
  argumentoPrincipal: string;
}

export function Cierre({ slug, argumentoPrincipal }: CierreProps) {
  return (
    <GalaxySection className="py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <p className="font-display text-2xl font-bold leading-[1.3] text-white md:text-3xl">
            {argumentoPrincipal}
          </p>
          {/* TODO Paso 2: construir /entrenamientos/[slug]/quiz (pantalla completa) */}
          <Link
            href={`/entrenamientos/${slug}/quiz`}
            className="btn-shimmer mt-10 inline-flex h-11 items-center justify-center rounded-btn bg-white px-8 font-sans text-[15px] font-medium uppercase tracking-[0.04em] text-asus-blue-deep transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Responder el cuestionario
          </Link>
        </Reveal>
      </div>
    </GalaxySection>
  );
}
