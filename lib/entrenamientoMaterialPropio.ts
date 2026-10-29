/**
 * Referencias con material de apoyo propio (scroll-story a la medida) en vez
 * de la cadena genérica (Portada + secciones). Cada una vive en su propia
 * carpeta de ruta estática (app/entrenamientos/<slug>/page.tsx) para que
 * Next.js le dé su propio chunk de JS/CSS — si compartieran la ruta [slug],
 * Turbopack junta el CSS sin alcance de ambas en un solo archivo y sus
 * clases genéricas (.hero, .card, etc.) chocan entre sí.
 */
export const SLUGS_CON_MATERIAL_PROPIO = new Set([
  "vivobook-15-x1504ma-bq919w",
  "zenbook-a14",
  "tuf-gaming-f16-fx607vjb-rtx3050",
  "tuf-gaming-f15-fx507vv-rtx4060",
  "zenbook-14-oled-ux3405ca",
  "rog-xbox-ally-x20-rc74xa",
]);
