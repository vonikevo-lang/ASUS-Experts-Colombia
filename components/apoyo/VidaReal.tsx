import type { BloqueVidaReal } from "@/types/apoyo";
import { Placeholder } from "./Placeholder";

export function VidaReal({ bloque }: { bloque: BloqueVidaReal }) {
  return (
    <div>
      <Placeholder texto={bloque.imagen} className="aspect-[4/3] w-full" />
      <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium mt-4">
        {bloque.leyenda}
      </p>
      <p className="font-sans text-sm text-asus-dark mt-1">{bloque.texto}</p>
    </div>
  );
}
