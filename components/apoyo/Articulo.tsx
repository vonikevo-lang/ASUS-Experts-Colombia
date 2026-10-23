import type { BloqueArticulo } from "@/types/apoyo";

export function Articulo({ bloque }: { bloque: BloqueArticulo }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-asus-dark">{bloque.titulo}</h2>
      <div className="mt-4 space-y-4">
        {bloque.parrafos.map((p, i) => (
          <div key={i}>
            {p.subtitulo && (
              <p className="font-sans text-xs uppercase tracking-[0.04em] text-asus-blue font-medium">
                {p.subtitulo}
              </p>
            )}
            <p className="font-sans text-sm text-asus-dark leading-relaxed mt-1">{p.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
