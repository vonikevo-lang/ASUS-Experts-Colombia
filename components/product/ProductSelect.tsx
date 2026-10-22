import productsData from "@/data/products.json";
import type { Producto } from "@/types/product";

const products = productsData as Producto[];

interface ProductSelectProps {
  value: string | null;
  onChange: (id: string | null) => void;
  exclude: (string | null)[];
  allowNone?: boolean;
  label?: string;
}

export function ProductSelect({ value, onChange, exclude, allowNone, label }: ProductSelectProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="font-sans text-xs text-muted">{label}</span>}
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="h-11 rounded-btn border border-border px-3 font-sans text-sm bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue"
      >
        {allowNone && <option value="">Ninguno</option>}
        {products
          .filter((p) => p.id === value || !exclude.includes(p.id))
          .map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
      </select>
    </label>
  );
}
