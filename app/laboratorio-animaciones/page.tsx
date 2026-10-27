"use client";

import { useRef, useState, type ReactNode } from "react";
import { ANIMACIONES_META, type AnimacionId } from "@/components/animaciones/registry";
import { BarridoColor } from "@/components/animaciones/vivobook/BarridoColor";
import { BentoRebote } from "@/components/animaciones/vivobook/BentoRebote";
import { StickersCaen } from "@/components/animaciones/vivobook/StickersCaen";
import { Bisagra180, type Bisagra180Handle } from "@/components/animaciones/vivobook/Bisagra180";
import { AperturaBienvenida } from "@/components/animaciones/vivobook/AperturaBienvenida";
import { FichaDestacada } from "@/components/animaciones/vivobook/FichaDestacada";
import { GlitchRgb } from "@/components/animaciones/rog/GlitchRgb";
import { OlaRgbTeclado } from "@/components/animaciones/rog/OlaRgbTeclado";
import { MedidorHz } from "@/components/animaciones/rog/MedidorHz";
import { CorteDiagonal } from "@/components/animaciones/rog/CorteDiagonal";
import { TrackingCierra } from "@/components/animaciones/zenbook/TrackingCierra";
import { PerfilDelgado } from "@/components/animaciones/zenbook/PerfilDelgado";
import { DestelloMetalico } from "@/components/animaciones/zenbook/DestelloMetalico";
import { TelonParallax } from "@/components/animaciones/zenbook/TelonParallax";
import { FijacionObjetivo } from "@/components/animaciones/tuf/FijacionObjetivo";
import { SelloCertificacion } from "@/components/animaciones/tuf/SelloCertificacion";
import { PruebasResistencia } from "@/components/animaciones/tuf/PruebasResistencia";
import { PlacasBlindaje } from "@/components/animaciones/tuf/PlacasBlindaje";
import { Button } from "@/components/ui/Button";

const SAMPLE_BARRIDO_COLOR = {
  nombreProducto: "ASUS Vivobook 15",
  colores: [
    { id: "indigo", nombre: "Azul índigo", hex: "#3730a3" },
    { id: "coral", nombre: "Coral", hex: "#fb7185" },
    { id: "menta", nombre: "Verde menta", hex: "#34d399" },
    { id: "plata", nombre: "Plata", hex: "#cbd5e1" },
  ],
};

const SAMPLE_BENTO_REBOTE = {
  nombreProducto: "ASUS Vivobook 15",
  datos: [
    { id: "pantalla", etiqueta: "Pantalla", texto: "OLED 2.8K" },
    { id: "peso", etiqueta: "Peso", numero: 1.4, decimales: 1, sufijo: " kg" },
    { id: "wifi", etiqueta: "Conectividad", texto: "Wi-Fi 6E" },
    { id: "bateria", etiqueta: "Batería", numero: 70, sufijo: " Wh" },
    { id: "camara", etiqueta: "Cámara", texto: "Cámara FHD" },
    { id: "teclado", etiqueta: "Teclado", texto: "Teclado ErgoSense" },
  ],
};

const SAMPLE_BISAGRA_180 = {
  nombreProducto: "ASUS Vivobook 15",
};

const SAMPLE_STICKERS_CAEN = {
  nombreProducto: "ASUS Vivobook 15",
  stickers: [
    { id: "pantalla", texto: "Pantalla OLED" },
    { id: "peso", texto: "Solo 1.4 kg" },
    { id: "bateria", texto: "Batería para todo el día" },
  ],
};

const SAMPLE_APERTURA_BIENVENIDA = {
  nombreProducto: "ASUS Vivobook 15",
  clienteIdeal: "Quien quiere un portátil confiable para trabajo y estudio, con buen balance de precio y desempeño.",
  specDestacada: "15.6\" Full HD · 8 GB LPDDR5",
};

const SAMPLE_FICHA_DESTACADA = {
  nombreProducto: "ASUS Vivobook S14 OLED",
  specs: [
    { id: "pantalla", etiqueta: "Pantalla", valor: "14\" OLED 2.8K · 120 Hz" },
    { id: "memoria", etiqueta: "Memoria", valor: "LPDDR5" },
    { id: "procesador", etiqueta: "Procesador", valor: "Snapdragon X con NPU" },
  ],
  clienteIdeal: "Quien busca un equipo más cuidado en diseño, liviano, con pantalla OLED y batería larga.",
};

const TITULOS_GLITCH_RGB = ["MODO TURBO", "REFRIGERACIÓN INTELIGENTE", "PANTALLA NEBULA"];

const SAMPLE_CORTE_DIAGONAL = {
  imagenSrc: "/products/rog-strix-g16-rtx5070ti.svg",
  imagenAlt: "ASUS ROG Strix G16",
  titulo: "ROG Strix G16",
};

const SAMPLE_TRACKING_CIERRA = {
  titulo: "Zenbook",
  subtitulo: "Elegancia que se lleva a cualquier parte",
};

const SAMPLE_PERFIL_DELGADO = {
  nombreProducto: "ASUS Zenbook 14",
  grosorCm: 1.1,
  pesoKg: 1.2,
};

const SAMPLE_DESTELLO_METALICO = {
  nombreAcabado: "Ponder Blue",
  material: "Aluminio cepillado",
};

const SAMPLE_TELON_PARALLAX = {
  imagenSrc: "/products/zenbook-a14.svg",
  imagenAlt: "ASUS Zenbook A14",
  lineas: ["Diseñado para", "quien trabaja", "en movimiento"],
};

const SAMPLE_FIJACION_OBJETIVO = {
  nombreProducto: "ASUS TUF Gaming A15",
  imagenSrc: "/products/tuf-gaming-16-rtx5060.svg",
  imagenAlt: "ASUS TUF Gaming A15",
  lineas: ["ESCANEANDO CHASIS... OK", "MIL-STD-810H: SUPERADO", "OBJETIVO: TUF GAMING A15"],
};

const SAMPLE_SELLO_CERTIFICACION = {
  nombreProducto: "ASUS TUF Gaming A15",
  caracteristicas: [
    { id: "cpu", texto: "AMD Ryzen 7 · 16 GB RAM" },
    { id: "pantalla", texto: "15.6\" FHD 144 Hz" },
    { id: "chasis", texto: "Chasis reforzado grado militar" },
  ],
};

const SAMPLE_PRUEBAS_RESISTENCIA = {
  pruebas: [
    { id: "caidas", nombre: "Caídas" },
    { id: "vibracion", nombre: "Vibración" },
    { id: "temperaturas", nombre: "Temperaturas extremas" },
    { id: "humedad", nombre: "Humedad" },
    { id: "altitud", nombre: "Altitud" },
  ],
};

const SAMPLE_PLACAS_BLINDAJE = {
  nombreProducto: "TUF GAMING A15",
};

function TarjetaAnimacion({
  id,
  children,
  etiquetaBoton = "Repetir",
  onAccion,
}: {
  id: AnimacionId;
  children: (repeticion: number) => ReactNode;
  /** Texto del botón; por defecto "Repetir" (remonta el componente). */
  etiquetaBoton?: string;
  /** Si se da, el botón llama esto en vez de remontar (ej. animaciones con scroll "pin"). */
  onAccion?: () => void;
}) {
  const [repeticion, setRepeticion] = useState(0);
  const meta = ANIMACIONES_META[id];

  return (
    <div className="rounded-card border border-border bg-white p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-base font-semibold text-asus-dark">{meta.nombre}</p>
          <p className="font-sans text-xs capitalize text-faint">{meta.linea}</p>
        </div>
        <Button
          variant="secondary"
          className="h-8 shrink-0 px-3 text-xs"
          onClick={onAccion ?? (() => setRepeticion((r) => r + 1))}
        >
          {etiquetaBoton}
        </Button>
      </div>
      {children(repeticion)}
    </div>
  );
}

export default function LaboratorioAnimacionesPage() {
  const ids = Object.keys(ANIMACIONES_META) as AnimacionId[];
  const pendientes = ids.filter((id) => !ANIMACIONES_META[id].construida);
  const bisagraRef = useRef<Bisagra180Handle>(null);

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-asus-dark">Laboratorio de animaciones</h1>
        <p className="mt-1 font-sans text-sm text-muted">
          Vista interna para probar cada animación del sistema por separado. El botón
          &quot;Repetir&quot; remonta el componente para volver a disparar su entrada.
        </p>
      </div>

      <TarjetaAnimacion id="vivobook-barrido-color">
        {(repeticion) => <BarridoColor key={repeticion} {...SAMPLE_BARRIDO_COLOR} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="vivobook-bento-rebote">
        {(repeticion) => <BentoRebote key={repeticion} {...SAMPLE_BENTO_REBOTE} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="vivobook-stickers-caen">
        {(repeticion) => <StickersCaen key={repeticion} {...SAMPLE_STICKERS_CAEN} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion
        id="vivobook-bisagra-180"
        etiquetaBoton="Reiniciar"
        onAccion={() => bisagraRef.current?.reiniciar()}
      >
        {() => <Bisagra180 ref={bisagraRef} {...SAMPLE_BISAGRA_180} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="vivobook-apertura-bienvenida">
        {(repeticion) => <AperturaBienvenida key={repeticion} {...SAMPLE_APERTURA_BIENVENIDA} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="vivobook-ficha-destacada">
        {(repeticion) => <FichaDestacada key={repeticion} {...SAMPLE_FICHA_DESTACADA} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="rog-glitch-rgb">
        {(repeticion) => (
          <GlitchRgb key={repeticion} texto={TITULOS_GLITCH_RGB[repeticion % TITULOS_GLITCH_RGB.length]} />
        )}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="rog-ola-rgb-teclado">
        {(repeticion) => <OlaRgbTeclado key={repeticion} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="rog-medidor-hz">
        {(repeticion) => <MedidorHz key={repeticion} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="rog-corte-diagonal">
        {(repeticion) => <CorteDiagonal key={repeticion} {...SAMPLE_CORTE_DIAGONAL} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="zenbook-tracking-cierra">
        {(repeticion) => <TrackingCierra key={repeticion} {...SAMPLE_TRACKING_CIERRA} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="zenbook-perfil-delgado">
        {(repeticion) => <PerfilDelgado key={repeticion} {...SAMPLE_PERFIL_DELGADO} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="zenbook-destello-metalico">
        {(repeticion) => <DestelloMetalico key={repeticion} {...SAMPLE_DESTELLO_METALICO} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="zenbook-telon-parallax">
        {(repeticion) => <TelonParallax key={repeticion} {...SAMPLE_TELON_PARALLAX} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="tuf-fijacion-objetivo">
        {(repeticion) => <FijacionObjetivo key={repeticion} {...SAMPLE_FIJACION_OBJETIVO} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="tuf-sello-certificacion">
        {(repeticion) => <SelloCertificacion key={repeticion} {...SAMPLE_SELLO_CERTIFICACION} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="tuf-pruebas-resistencia">
        {(repeticion) => <PruebasResistencia key={repeticion} {...SAMPLE_PRUEBAS_RESISTENCIA} />}
      </TarjetaAnimacion>

      <TarjetaAnimacion id="tuf-placas-blindaje">
        {(repeticion) => <PlacasBlindaje key={repeticion} {...SAMPLE_PLACAS_BLINDAJE} />}
      </TarjetaAnimacion>

      {pendientes.length > 0 && (
        <div className="rounded-card border border-dashed border-border p-6">
          <p className="mb-3 font-display text-sm font-semibold text-asus-dark">
            Próximamente ({pendientes.length})
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
            {pendientes.map((id) => (
              <li key={id} className="font-sans text-xs text-muted">
                <span className="capitalize text-faint">{ANIMACIONES_META[id].linea}</span> ·{" "}
                {ANIMACIONES_META[id].nombre}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Espacio de cola: las animaciones con scroll "pin" (ej. Bisagra 180°) necesitan
          contenido real después para poder liberar el pin por completo. */}
      <div aria-hidden="true" className="h-[70vh]" />
    </main>
  );
}
