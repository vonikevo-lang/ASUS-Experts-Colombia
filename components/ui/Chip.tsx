import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ProductLine = "zenbook" | "vivobook" | "proart" | "rog" | "tuf" | "gaming";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  line?: ProductLine;
}

const lineClass: Record<ProductLine, string> = {
  zenbook: "bg-line-zenbook text-white",
  vivobook: "bg-line-vivobook text-white",
  proart: "bg-line-proart text-white",
  rog: "bg-line-rog text-white",
  tuf: "bg-line-tuf text-asus-dark",
  gaming: "bg-line-gaming text-white",
};

export function Chip({ className, line, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center h-6 px-3 rounded-chip font-sans text-xs font-medium",
        line ? lineClass[line] : "bg-asus-blue text-white",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
