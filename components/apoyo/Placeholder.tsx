import { cn } from "@/lib/cn";

/** Caja de imagen placeholder: el texto describe qué foto real va ahí. */
export function Placeholder({ texto, className }: { texto: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center text-center p-4 rounded-card border border-dashed border-asus-blue bg-asus-blue-soft font-sans text-xs text-asus-blue-deep",
        className,
      )}
    >
      {texto}
    </div>
  );
}
