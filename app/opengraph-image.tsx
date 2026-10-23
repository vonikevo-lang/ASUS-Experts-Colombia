import { ImageResponse } from "next/og";

export const alt = "ASUS Experts Colombia – Concepto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #006CE1 0%, #003A78 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1, display: "flex" }}>ASUS</div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 16, textAlign: "center", display: "flex" }}>
          Experts Colombia
        </div>
        <div style={{ fontSize: 28, marginTop: 24, color: "rgba(255,255,255,0.85)", display: "flex" }}>
          Entrena, compara y gana — concepto para asesores ASUS
        </div>
      </div>
    ),
    { ...size },
  );
}
