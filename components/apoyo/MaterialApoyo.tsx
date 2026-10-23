import type { BloqueApoyo } from "@/types/apoyo";
import { BloqueApoyoView } from "./BloqueApoyoView";

export function MaterialApoyo({ bloques }: { bloques: BloqueApoyo[] }) {
  return (
    <div className="space-y-10">
      {bloques.map((bloque, i) => (
        <div key={i} className={i > 0 ? "pt-10 border-t border-border" : undefined}>
          <BloqueApoyoView bloque={bloque} />
        </div>
      ))}
    </div>
  );
}
