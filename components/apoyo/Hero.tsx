import type { BloqueHero } from "@/types/apoyo";
import { Placeholder } from "./Placeholder";

export function Hero({ bloque }: { bloque: BloqueHero }) {
  return (
    <div>
      <Placeholder texto={bloque.imagen} className="aspect-video w-full" />
      <h1 className="font-display text-2xl font-semibold text-asus-dark mt-5">{bloque.titulo}</h1>
      <p className="font-sans text-sm text-muted mt-2">{bloque.subtitulo}</p>
    </div>
  );
}
