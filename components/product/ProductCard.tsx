import Image from "next/image";
import type { ReactNode } from "react";
import type { Producto } from "@/types/product";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Badge } from "@/components/ui/Badge";
import { LINE_LABELS } from "@/lib/lineLabels";
import { cn } from "@/lib/cn";

interface ProductCardProps {
  product: Producto;
  reason?: string;
  actions?: ReactNode;
  className?: string;
}

export function ProductCard({ product, reason, actions, className }: ProductCardProps) {
  return (
    <Card className={cn("overflow-hidden group", className)}>
      <div className="aspect-[4/3] overflow-hidden bg-asus-blue-soft">
        <Image
          src={product.imagen}
          alt={product.nombre}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 flex-wrap">
          <Chip>{product.pantallaPulgadas}&quot;</Chip>
          <Chip line={product.linea}>{LINE_LABELS[product.linea]}</Chip>
          {product.verificar && <Badge tone="warning">Datos en verificación</Badge>}
        </div>
        <p className="font-display text-lg font-semibold text-asus-dark mt-3">{product.nombre}</p>
        <p className="font-mono text-xs text-faint mt-0.5">{product.referencia}</p>
        {reason && <p className="font-sans text-sm text-muted mt-2">{reason}</p>}
        {actions && <div className="flex gap-3 mt-5">{actions}</div>}
      </div>
    </Card>
  );
}
