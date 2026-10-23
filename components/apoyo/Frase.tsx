import type { BloqueFrase } from "@/types/apoyo";

export function Frase({ bloque }: { bloque: BloqueFrase }) {
  return (
    <div className="rounded-card bg-asus-blue-deep text-white text-center px-6 py-12 -mx-1">
      <p className="font-display text-xl sm:text-2xl font-semibold leading-snug">&quot;{bloque.texto}&quot;</p>
      {bloque.autor && (
        <p className="font-sans text-xs text-asus-blue-soft/80 mt-4">— {bloque.autor}</p>
      )}
    </div>
  );
}
