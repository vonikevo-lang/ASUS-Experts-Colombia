import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.04em] text-muted">
        ASUS Experts Colombia — en construcción
      </p>
      <h1 className="font-display text-[32px] font-bold text-asus-blue">
        La landing llega en el Paso 3
      </h1>
      <Link href="/styleguide" className="font-sans text-sm text-asus-blue underline">
        Ver el styleguide
      </Link>
    </div>
  );
}
