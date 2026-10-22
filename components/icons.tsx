import type { SVGProps } from "react";

const common: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconClock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

export function IconStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <path d="M12 3.5l2.6 5.4 5.9.7-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.7z" />
    </svg>
  );
}

export function IconGift(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <rect x="3" y="9" width="18" height="12" rx="1.5" />
      <path d="M3 13h18" />
      <path d="M12 9v12" />
      <path d="M12 9C9.5 9 8 7.5 8 6a2 2 0 0 1 4 0 2 2 0 0 1 4 0c0 1.5-1.5 3-4 3z" />
    </svg>
  );
}

export function IconBook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v16h5.5a2.5 2.5 0 0 1 2.5 2.5z" />
    </svg>
  );
}

export function IconCompare(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <path d="M8 4v16" />
      <path d="M16 4v16" />
      <path d="M4 9h4" />
      <path d="M4 15h4" />
      <path d="M16 7h4" />
      <path d="M16 13h4" />
      <path d="M16 19h4" />
    </svg>
  );
}

export function IconGamepad(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <rect x="2.5" y="7" width="19" height="11" rx="5" />
      <path d="M7 10v4" />
      <path d="M5 12h4" />
      <circle cx="16" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="13" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTrophy(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4z" />
      <path d="M8 5H5a3 3 0 0 0 3 4" />
      <path d="M16 5h3a3 3 0 0 1-3 4" />
      <path d="M12 13v3" />
      <path d="M9 20h6" />
      <path d="M10 16h4l.5 4h-5z" />
    </svg>
  );
}

export function IconHome(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9.5a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1V10" />
    </svg>
  );
}

export function IconBriefcase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <rect x="3" y="7.5" width="18" height="12" rx="1.5" />
      <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
      <path d="M11 12.5h2v1.8h-2z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPalette(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <path d="M12 3.5a8.5 8 0 1 0 0 16c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-.9.7-1.6 1.6-1.6h1.6c2 0 3.5-1.6 3.5-3.5 0-3.8-3.8-6.9-7.5-6.9z" />
      <circle cx="8.3" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="7.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.3" cy="9" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBattery(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <rect x="2.5" y="8" width="16" height="8" rx="1.5" />
      <path d="M21 10.5v3" />
      <path d="M5.5 10.5h6v3h-6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconWeight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="7" r="3" />
      <path d="M8.3 9.5h7.4L18 20H6z" />
    </svg>
  );
}

export function IconTag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <path d="M11.5 3.5H5a1.5 1.5 0 0 0-1.5 1.5v6.5a1.5 1.5 0 0 0 .44 1.06l9 9a1.5 1.5 0 0 0 2.12 0l6.5-6.5a1.5 1.5 0 0 0 0-2.12l-9-9a1.5 1.5 0 0 0-1.06-.44z" />
      <circle cx="7.8" cy="7.8" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconDisplay(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
      <path d="M8 20.5h8" />
      <path d="M12 17v3.5" />
    </svg>
  );
}

export function IconBolt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <path d="M13 2.5 4.5 14h6l-1.5 7.5L19 10h-6z" />
    </svg>
  );
}

export function IconArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  );
}
