import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Programa",
    links: [
      { label: "Cómo funciona", href: "#programa" },
      { label: "Comparador", href: "/comparador" },
      { label: "Recomendador", href: "/recomendador" },
      { label: "Ranking", href: "/app/ranking" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Preguntas frecuentes", href: "#" },
      { label: "Contacto", href: "#" },
      { label: "Soporte técnico", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos de uso", href: "#" },
      { label: "Privacidad", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-asus-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-base font-semibold uppercase">ASUS Experts</p>
          <p className="font-sans text-sm text-white/60 mt-2">Colombia</p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.04em] text-white/50 mb-4">
              {col.title}
            </p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-sans text-sm text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 sm:px-6 py-5 font-sans text-xs text-white/50">
          Concepto – propuesta para ASUS Colombia. Desarrollado por Kaisen Design Studio.
        </p>
      </div>
    </footer>
  );
}
