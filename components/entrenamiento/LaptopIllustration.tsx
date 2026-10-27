interface LaptopIllustrationProps {
  accent: string;
  className?: string;
}

/**
 * Portátil dibujado en SVG, coloreado con el acento de la línea.
 * Se usa cuando la referencia no tiene fotografía real (diseño §1).
 */
export function LaptopIllustration({ accent, className }: LaptopIllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id="laptop-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="laptop-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      {/* pantalla */}
      <rect x="70" y="20" width="260" height="170" rx="10" fill="#10131c" stroke={accent} strokeWidth="2" />
      <rect x="82" y="32" width="236" height="146" rx="4" fill="url(#laptop-screen)" />
      <rect x="96" y="48" width="130" height="10" rx="3" fill={accent} opacity="0.8" />
      <rect x="96" y="68" width="190" height="6" rx="3" fill="#ffffff" opacity="0.35" />
      <rect x="96" y="82" width="160" height="6" rx="3" fill="#ffffff" opacity="0.25" />
      <circle cx="200" cy="130" r="26" fill="none" stroke={accent} strokeWidth="2" opacity="0.8" />
      <circle cx="200" cy="130" r="4" fill={accent} />
      {/* bisagra */}
      <rect x="60" y="190" width="280" height="8" rx="4" fill="#0b0d14" />
      {/* base / teclado */}
      <path d="M40 198 L360 198 L340 252 L60 252 Z" fill="url(#laptop-body)" stroke="#cfd6e4" strokeWidth="1.5" />
      <rect x="150" y="214" width="100" height="6" rx="3" fill="#b9c2d6" />
      {/* reflejo */}
      <g opacity="0.18" transform="translate(0 300) scale(1 -1)">
        <path d="M40 198 L360 198 L340 252 L60 252 Z" fill="#9aa7c7" />
      </g>
    </svg>
  );
}
