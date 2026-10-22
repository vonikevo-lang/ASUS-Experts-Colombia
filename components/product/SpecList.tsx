import type { Spec } from "@/types/product";
import type { CompareMode } from "@/components/product/ModeToggle";
import { cn } from "@/lib/cn";

interface SpecListProps {
  specs: Spec[];
  mode: CompareMode;
  className?: string;
}

export function SpecList({ specs, mode, className }: SpecListProps) {
  return (
    <dl className={cn("divide-y divide-border", className)}>
      {specs.map((spec) => (
        <div key={spec.etiqueta} className="py-2.5">
          <dt className="font-sans text-xs text-muted">{spec.etiqueta}</dt>
          <dd className="font-sans text-sm text-asus-dark mt-0.5">
            {mode === "tecnico" ? spec.valorTecnico : spec.valorCliente}
          </dd>
        </div>
      ))}
    </dl>
  );
}
