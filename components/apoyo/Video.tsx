import type { BloqueVideo } from "@/types/apoyo";
import { Placeholder } from "./Placeholder";

export function Video({ bloque }: { bloque: BloqueVideo }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-asus-dark mb-3">{bloque.titulo}</h2>
      <div className="relative">
        <Placeholder texto={bloque.miniatura} className="aspect-video w-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-asus-blue flex items-center justify-center shadow-elev">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white ml-0.5" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {bloque.duracionAprox && (
          <span className="absolute bottom-2 right-2 bg-black/70 text-white font-sans text-xs rounded px-2 py-0.5">
            {bloque.duracionAprox}
          </span>
        )}
      </div>
    </div>
  );
}
