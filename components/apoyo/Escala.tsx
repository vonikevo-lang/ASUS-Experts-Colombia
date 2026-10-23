import type { BloqueEscala } from "@/types/apoyo";
import { cn } from "@/lib/cn";

export function Escala({ bloque }: { bloque: BloqueEscala }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-asus-dark mb-3">{bloque.titulo}</h2>
      <div className="flex gap-1.5">
        {bloque.pasos.map((paso, i) => (
          <div
            key={paso}
            className={cn(
              "flex-1 text-center rounded-btn py-2.5 px-1 font-sans text-sm font-medium",
              i === bloque.pasoActual ? "bg-asus-blue text-white" : "bg-asus-blue-soft text-muted",
            )}
          >
            {paso}
          </div>
        ))}
      </div>
      <p className="font-sans text-sm text-asus-dark bg-asus-blue-soft rounded-card p-3.5 mt-4">
        {bloque.comoDecirlo}
      </p>
    </div>
  );
}
