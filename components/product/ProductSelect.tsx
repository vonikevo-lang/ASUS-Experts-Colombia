import productsData from "@/data/products.json";
import segmentosData from "@/data/segmentos.json";
import type { Producto } from "@/types/product";
import type { Segmento } from "@/types/platform";

const products = productsData as Producto[];
const segmentos = segmentosData as Segmento[];

interface ProductSelectProps {
  value: string | null;
  onChange: (id: string | null) => void;
  exclude: (string | null)[];
  allowNone?: boolean;
  label?: string;
}

function groupBySegmento(disponibles: Producto[]) {
  const porId = new Map(disponibles.map((p) => [p.id, p]));
  const grupos = segmentos.map((segmento) => ({
    segmento,
    productos: segmento.orden.map((id) => porId.get(id)).filter((p): p is Producto => Boolean(p)),
  }));
  const idsEnSegmento = new Set(segmentos.flatMap((s) => s.orden));
  const otros = disponibles.filter((p) => !idsEnSegmento.has(p.id));
  return { grupos, otros };
}

export function ProductSelect({ value, onChange, exclude, allowNone, label }: ProductSelectProps) {
  const disponibles = products.filter((p) => p.id === value || !exclude.includes(p.id));
  const { grupos, otros } = groupBySegmento(disponibles);

  return (
    <label className="flex flex-col gap-1">
      {label && <span className="font-sans text-xs text-muted">{label}</span>}
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="h-11 rounded-btn border border-border px-3 font-sans text-sm bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
      >
        {allowNone && <option value="">Ninguno</option>}
        {grupos.map(
          ({ segmento, productos }) =>
            productos.length > 0 && (
              <optgroup key={segmento.id} label={segmento.nombre}>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </optgroup>
            ),
        )}
        {otros.length > 0 && (
          <optgroup label="Otros">
            {otros.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </optgroup>
        )}
      </select>
    </label>
  );
}
