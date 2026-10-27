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
import { SLUGS_CON_MATERIAL_PROPIO } from "@/lib/entrenamientoMaterialPropio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  // Las referencias con material propio (ver lib/entrenamientoMaterialPropio.ts) tienen su
  // propia carpeta de ruta estática (app/entrenamientos/<slug>/page.tsx) para que Next.js les
  // dé su propio chunk de JS/CSS: si esta ruta [slug] también las generara, Turbopack junta el
  // CSS sin alcance de ambas páginas a la medida en un solo archivo y sus clases genéricas
  // (.hero, .card, etc.) chocan entre sí sin importar cuál se esté mostrando.
  return referencias.filter((r) => !SLUGS_CON_MATERIAL_PROPIO.has(r.slug)).map((r) => ({ slug: r.slug }));
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
  // Estas dos ya tienen su propia ruta estática (ver nota en generateStaticParams); si alguien
  // entra aquí con ese slug igual (ej. en dev sin build estático), no muestres la cadena
  // genérica por error.
  if (SLUGS_CON_MATERIAL_PROPIO.has(referencia.slug)) notFound();

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
