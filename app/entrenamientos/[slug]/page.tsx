import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReferencia, referencias } from "@/data/referencias";
import { ACCENT_BY_LINEA } from "@/lib/entrenamientoTema";
import { Portada } from "@/components/entrenamiento/Portada";
import { IntroFranja } from "@/components/entrenamiento/IntroFranja";
import { ClienteIdeal } from "@/components/entrenamiento/ClienteIdeal";
import { FichaTecnica } from "@/components/entrenamiento/FichaTecnica";
import { BloquesTecnologia } from "@/components/entrenamiento/BloquesTecnologia";
import { LeAlcanzaNoEsPara } from "@/components/entrenamiento/LeAlcanzaNoEsPara";
import { GanchosVenta } from "@/components/entrenamiento/GanchosVenta";
import { Objeciones } from "@/components/entrenamiento/Objeciones";
import { CompararCon } from "@/components/entrenamiento/CompararCon";
import { Cierre } from "@/components/entrenamiento/Cierre";
import { NotasLegales } from "@/components/entrenamiento/NotasLegales";
import { EntrenamientoVivobook15X1504 } from "@/components/entrenamiento/vivobook15x1504/EntrenamientoVivobook15X1504";

/** Referencia con material de apoyo propio (scroll-story a la medida) en vez de la cadena genérica. */
const SLUG_CON_MATERIAL_PROPIO = "vivobook-15-x1504ma-bq919w";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return referencias.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const referencia = getReferencia(slug);
  if (!referencia) return {};
  return {
    title: `Entrenamiento: ${referencia.nombre}`,
    description: referencia.tagline,
  };
}

export default async function EntrenamientoPage({ params }: PageProps) {
  const { slug } = await params;
  const referencia = getReferencia(slug);

  if (!referencia) notFound();

  if (referencia.slug === SLUG_CON_MATERIAL_PROPIO) {
    return <EntrenamientoVivobook15X1504 />;
  }

  const accent = ACCENT_BY_LINEA[referencia.linea] ?? "#22d3ee";

  return (
    <main data-linea={referencia.linea} className="bg-asus-dark">
      <Portada referencia={referencia} accent={accent} volverHref="/entrenamientos" />
      <IntroFranja nombre={referencia.nombre} accentVar={accent} />
      <ClienteIdeal
        clienteIdeal={referencia.clienteIdeal}
        leAlcanzaPara={referencia.leAlcanzaPara}
      />
      <FichaTecnica ficha={referencia.ficha} />
      <BloquesTecnologia referencia={referencia} />
      <LeAlcanzaNoEsPara
        leAlcanzaPara={referencia.leAlcanzaPara}
        noEsPara={referencia.noEsPara}
      />
      <GanchosVenta ganchos={referencia.ganchos} />
      <Objeciones objeciones={referencia.objeciones} />
      <CompararCon compararCon={referencia.compararCon} />
      <Cierre slug={referencia.slug} argumentoPrincipal={referencia.tagline} />
      <NotasLegales />
    </main>
  );
}
