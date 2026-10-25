import type { BloqueApoyo } from "@/types/apoyo";
import { Hero } from "./Hero";
import { DemoUI } from "./DemoUI";
import { Articulo } from "./Articulo";
import { Anatomia } from "./Anatomia";
import { Escala } from "./Escala";
import { AntesDespues } from "./AntesDespues";
import { VidaReal } from "./VidaReal";
import { Frase } from "./Frase";
import { Video } from "./Video";
import { SelectorColor } from "./SelectorColor";

export function BloqueApoyoView({ bloque }: { bloque: BloqueApoyo }) {
  switch (bloque.tipo) {
    case "hero":
      return <Hero bloque={bloque} />;
    case "demoUI":
      return <DemoUI bloque={bloque} />;
    case "articulo":
      return <Articulo bloque={bloque} />;
    case "anatomia":
      return <Anatomia bloque={bloque} />;
    case "escala":
      return <Escala bloque={bloque} />;
    case "antesDespues":
      return <AntesDespues bloque={bloque} />;
    case "vidaReal":
      return <VidaReal bloque={bloque} />;
    case "frase":
      return <Frase bloque={bloque} />;
    case "video":
      return <Video bloque={bloque} />;
    case "selectorColor":
      return <SelectorColor bloque={bloque} />;
  }
}
