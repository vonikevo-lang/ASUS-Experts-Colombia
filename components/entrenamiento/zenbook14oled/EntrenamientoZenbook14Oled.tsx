"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./EntrenamientoZenbook14Oled.css";
import { GUION_ZENBOOK_14_OLED, OBJECIONES_ZENBOOK_14_OLED, QUIZ_ZENBOOK_14_OLED } from "./zenbook14OledData";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Este archivo trae su propia hoja de estilos como CSS normal (no CSS
 * Modules: la regla de Turbopack del proyecto enruta todo *.css por el
 * loader de Tailwind, que no genera el mapa de clases que un .module.css
 * necesita). `styles.algo` devuelve el nombre de clase tal cual para que
 * coincida con EntrenamientoZenbook14Oled.css.
 */
const styles = new Proxy({} as Record<string, string>, {
  get: (_target, prop: string) => prop,
});

const ASSET_BASE = "/entrenamientos/zenbook-14-oled";
const LOGO_ASUS = `${ASSET_BASE}/logo.png`;
const FOTO_HERO = `${ASSET_BASE}/hero-front.webp`;
const FOTO_COMPARADOR = `${ASSET_BASE}/comparator-photo.webp`;
const FOTO_TAPA = `${ASSET_BASE}/lid.webp`;

const SECCIONES = [
  { id: "z1", nombre: "Portada" },
  { id: "z2", nombre: "La idea" },
  { id: "z3", nombre: "Qué es OLED" },
  { id: "z4", nombre: "Negro real" },
  { id: "z5", nombre: "Color de cine" },
  { id: "z6", nombre: "Cuidado visual" },
  { id: "z7", nombre: "Diseño" },
  { id: "z8", nombre: "Ficha técnica" },
  { id: "z9", nombre: "Guion de venta" },
  { id: "z10", nombre: "Objeciones" },
  { id: "z11", nombre: "Evaluación" },
] as const;

const AGENDA = [
  { modulo: 3, texto: "Qué es OLED" },
  { modulo: 4, texto: "Negro real" },
  { modulo: 5, texto: "Color de cine" },
  { modulo: 6, texto: "Cuidado visual" },
  { modulo: 7, texto: "Diseño" },
  { modulo: 8, texto: "Ficha técnica" },
  { modulo: 9, texto: "Guion de venta" },
  { modulo: 10, texto: "Objeciones" },
  { modulo: 11, texto: "Evaluación" },
] as const;

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatearMiles(n: number) {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Cuenta de 0 al valor objetivo con easing cúbico; instantáneo si `reduced`. */
function ContadorNumero({ objetivo, activar, reduced }: { objetivo: number; activar: boolean; reduced: boolean }) {
  const [valor, setValor] = useState(0);
  const disparadoRef = useRef(false);

  useEffect(() => {
    if (!activar || disparadoRef.current) return;
    disparadoRef.current = true;

    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValor(objetivo);
      return;
    }

    let t0 = 0;
    let raf = 0;
    function paso(t: number) {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 1600);
      const ease = 1 - Math.pow(1 - p, 3);
      setValor(Math.round(objetivo * ease));
      if (p < 1) raf = requestAnimationFrame(paso);
    }
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [activar, objetivo, reduced]);

  return <>{formatearMiles(valor)}</>;
}

/** Patrón de bits: la palabra "OLED" encendida en la cuadrícula de píxeles (24x14, offset fila 4 col 1). */
const PATRON_OLED = [
  "0110001000001111001110",
  "1001001000001000001001",
  "1001001000001110001001",
  "1001001000001000001001",
  "0110001111001111001110",
];
const COLORES_PIXEL = ["#ff3d7f", "#ff9a1f", "#ffe14a", "#3dff8f", "#19c3e6", "#3b6bff", "#a04dff"];
const PX_COLS = 24;
const PX_ROWS = 14;

function indicesBasePixelOled() {
  const base = new Set<number>();
  const colores = new Map<number, string>();
  PATRON_OLED.forEach((fila, ry) => {
    fila.split("").forEach((v, rx) => {
      if (v !== "1") return;
      const idx = (ry + 4) * PX_COLS + rx + 1;
      base.add(idx);
      colores.set(idx, COLORES_PIXEL[(Math.floor(rx / 6) * 2) % COLORES_PIXEL.length]);
    });
  });
  return { base, colores };
}

export function EntrenamientoZenbook14Oled() {
  const reduced = useReducedMotion();

  const secRefs = useRef<Array<HTMLElement | null>>([]);
  const [secEnVista, setSecEnVista] = useState<Set<string>>(new Set());
  const [agendaHecha, setAgendaHecha] = useState<Set<number>>(new Set());
  const [progreso, setProgreso] = useState(0);
  const [seccionActual, setSeccionActual] = useState<(typeof SECCIONES)[number]>(SECCIONES[0]);

  const [heroOn, setHeroOn] = useState(reduced);
  const [heroGo, setHeroGo] = useState(reduced);
  const cellRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const [modoPantalla, setModoPantalla] = useState<"oled" | "lcd">("oled");
  const { base: pixelesBase, colores: coloresBase } = useMemo(() => indicesBasePixelOled(), []);
  const pxRef = useRef<HTMLDivElement>(null);
  const pxTimersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const [cmpX, setCmpX] = useState(50);
  const cmpSweptRef = useRef(false);

  const [beatActivo, setBeatActivo] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const guionRafRef = useRef(0);
  const guionInicioRef = useRef(0);
  const [guionProgreso, setGuionProgreso] = useState(0);

  const [objAbiertas, setObjAbiertas] = useState<Set<number>>(new Set());

  const [respuestas, setRespuestas] = useState<Record<number, number>>({});

  // Hero: encendido de la pantalla píxel a píxel al montar.
  useEffect(() => {
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHeroGo(true);
      setHeroOn(true);
      return;
    }
    const t1 = setTimeout(() => setHeroGo(true), 120);
    const t2 = setTimeout(() => setHeroOn(true), 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  useEffect(() => {
    if (!heroOn || reduced) return;
    cellRefs.current.forEach((el, k) => {
      if (!el) return;
      const x = k % 16;
      const y = Math.floor(k / 16);
      const d = Math.hypot(x - 7.5, (y - 4.5) * 1.6);
      el.style.transitionDelay = `${(0.9 + d * 0.07 + Math.random() * 0.35).toFixed(2)}s`;
    });
  }, [heroOn, reduced]);

  function barrerComparador() {
    let t0 = 0;
    let raf = 0;
    function paso(t: number) {
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / 2200);
      const v = 50 + Math.sin(k * Math.PI * 2) * 32 * (1 - k);
      setCmpX(v);
      if (k < 1) raf = requestAnimationFrame(paso);
    }
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }

  // Scroll: revelado por sección, módulo actual, barra de avance, agenda cumplida.
  useEffect(() => {
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSecEnVista(new Set(SECCIONES.map((s) => s.id)));
      setAgendaHecha(new Set(AGENDA.map((a) => a.modulo)));
      setSeccionActual(SECCIONES[SECCIONES.length - 1]);
      setProgreso(100);
      return;
    }

    let raf = 0;
    function medir() {
      raf = 0;
      const vh = window.innerHeight;
      const nodos = secRefs.current.filter((el): el is HTMLElement => el !== null);
      if (nodos.length === 0) return;

      let actual: (typeof SECCIONES)[number] = SECCIONES[0];
      nodos.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.8) {
          const id = SECCIONES[i].id;
          setSecEnVista((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            return next;
          });
          if (id === "z4" && !cmpSweptRef.current && !reduced) {
            cmpSweptRef.current = true;
            setTimeout(() => barrerComparador(), 900);
          }
        }
        if (r.top < vh * 0.45) actual = SECCIONES[i];
        const numero = i + 1;
        if (r.bottom < vh * 0.5) {
          setAgendaHecha((prev) => (prev.has(numero) ? prev : new Set(prev).add(numero)));
        }
      });
      setSeccionActual(actual);

      const primero = nodos[0].getBoundingClientRect().top;
      const ultimo = nodos[nodos.length - 1].getBoundingClientRect().bottom;
      const recorrido = ultimo - primero - vh;
      const pct = recorrido > 0 ? Math.max(0, Math.min(100, Math.round((-primero / recorrido) * 100))) : 0;
      setProgreso(pct);
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(medir);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t1 = setTimeout(medir, 60);
    const t2 = setTimeout(medir, 700);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  function iluminarPixel(idx: number) {
    const el = pxRef.current?.children[idx] as HTMLElement | undefined;
    if (!el || pixelesBase.has(idx)) return;
    el.style.setProperty("--c", COLORES_PIXEL[Math.floor(Math.random() * COLORES_PIXEL.length)]);
    el.classList.add(styles.lit);
    clearTimeout(pxTimersRef.current[idx]);
    pxTimersRef.current[idx] = setTimeout(() => el.classList.remove(styles.lit), 900);
  }

  function manejarPunteroPixeles(ev: React.PointerEvent<HTMLDivElement>) {
    const el = document.elementFromPoint(ev.clientX, ev.clientY);
    if (!el || el.parentElement !== pxRef.current) return;
    const idx = Array.prototype.indexOf.call(pxRef.current!.children, el);
    iluminarPixel(idx);
  }

  // Guion de venta: reproducción automática de 60 s.
  useEffect(() => {
    if (!reproduciendo) return;
    guionInicioRef.current = 0;
    function tick(t: number) {
      if (!guionInicioRef.current) guionInicioRef.current = t;
      const s = (t - guionInicioRef.current) / 1000;
      const idx = s < 10 ? 0 : s < 25 ? 1 : s < 35 ? 2 : s < 45 ? 3 : 4;
      setGuionProgreso(Math.min(100, (s / 60) * 100));
      setBeatActivo(idx);
      if (s >= 60) {
        setReproduciendo(false);
        return;
      }
      guionRafRef.current = requestAnimationFrame(tick);
    }
    guionRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(guionRafRef.current);
  }, [reproduciendo]);

  function alternarObjecion(i: number) {
    setObjAbiertas((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function responder(preguntaIdx: number, opcionIdx: number) {
    setRespuestas((prev) => ({ ...prev, [preguntaIdx]: opcionIdx }));
  }

  const puntaje = QUIZ_ZENBOOK_14_OLED.reduce(
    (acc, q, i) => acc + (respuestas[i] === q.correcta ? 1 : 0),
    0,
  );
  const respondidas = Object.keys(respuestas).length;
  const gano = puntaje === QUIZ_ZENBOOK_14_OLED.length;

  const pxClase = modoPantalla === "lcd" ? cx(styles.px, styles.lcd) : styles.px;

  return (
    <div className={styles.z14}>
      <header className={styles.top}>
        <div className={styles.wrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_ASUS} alt="ASUS" />
          <span className={styles.t}>Zenbook 14 OLED · UX3405CA</span>
          <span className={cx(styles.mod, styles.mono)}>
            Módulo {pad2(SECCIONES.findIndex((s) => s.id === seccionActual.id) + 1)} · {seccionActual.nombre}
          </span>
        </div>
        <div className={styles.pbw}>
          <div
            className={styles.pb}
            role="progressbar"
            aria-label="Avance del entrenamiento"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progreso}
            style={{ width: `${progreso}%` }}
          />
        </div>
      </header>

      {/* 01 Portada */}
      <section
        ref={(el) => {
          secRefs.current[0] = el;
        }}
        className={cx(styles.sec, styles.hero, heroGo && styles.go, heroOn && styles.on)}
        id="z1"
      >
        <div className={styles.wrap}>
          <div className={cx(styles.kick, styles.mono)}>
            <i />
            ASUS Expert · Línea Consumo · Zenbook
            <i />
          </div>
          <h1>
            Zenbook 14 <span className={styles.grad}>OLED</span>
          </h1>
          <p className={styles.sub}>
            Entrenamiento de la referencia UX3405CA · Intel Core Ultra 7 · 16 GB · SSD 512 GB · Táctil · Ponder Blue
          </p>
          <div className={styles.dev}>
            <div className={styles.glow} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FOTO_HERO} alt="ASUS Zenbook 14 OLED de frente, pantalla encendida" />
            <div className={styles.scr} aria-hidden="true">
              {Array.from({ length: 160 }, (_, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    cellRefs.current[i] = el;
                  }}
                />
              ))}
            </div>
          </div>
          <div className={styles.hstats}>
            <div className={styles.hs}>
              <b>
                100<small>%</small>
              </b>
              <span>DCI-P3</span>
            </div>
            <div className={styles.hs}>
              <b>
                1.000.000<small>:1</small>
              </b>
              <span>Contraste</span>
            </div>
            <div className={styles.hs}>
              <b>
                0,2<small>ms</small>
              </b>
              <span>Respuesta</span>
            </div>
            <div className={styles.hs}>
              <b>
                1,2<small>kg</small>
              </b>
              <span>Peso</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 La idea */}
      <section
        ref={(el) => {
          secRefs.current[1] = el;
        }}
        className={cx(styles.sec, secEnVista.has("z2") && styles.in)}
        id="z2"
      >
        <div className={styles.wrap}>
          <div className={cx(styles.kick, styles.mono, styles.rv)}>
            <i />
            Módulo 02 · La idea en una frase
          </div>
          <h2 className={cx(styles.rv, styles.d1)}>
            Este portátil no se vende por la ficha. <span className={styles.grad}>Se vende con la pantalla encendida.</span>
          </h2>
          <p className={cx(styles.lead, styles.rv, styles.d2)}>
            Tu trabajo es que el cliente vea la diferencia en 30 segundos: negros que no brillan, colores de cine y una
            pantalla que cuida los ojos. Todo lo demás (procesador, peso, batería) cierra la venta.
          </p>
          <div className={cx(styles.agenda, styles.rv, styles.d3)}>
            {AGENDA.map((a) => (
              <div key={a.modulo} className={cx(styles.ag, agendaHecha.has(a.modulo) && styles.done)}>
                <span className={styles.mono}>{pad2(a.modulo)}</span>
                {a.texto}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 Qué es OLED */}
      <section
        ref={(el) => {
          secRefs.current[2] = el;
        }}
        className={cx(styles.sec, secEnVista.has("z3") && styles.in)}
        id="z3"
      >
        <div className={cx(styles.wrap, styles.two)}>
          <div>
            <div className={cx(styles.kick, styles.mono, styles.rv)}>
              <i />
              Módulo 03 · Qué es OLED
            </div>
            <h2 className={cx(styles.rv, styles.d1)}>Cada píxel es su propia luz.</h2>
            <p className={cx(styles.lead, styles.rv, styles.d2)}>
              Una pantalla LCD tiene una lámpara detrás que siempre está encendida; los píxeles solo tapan esa luz. En
              OLED no hay lámpara: cada píxel se enciende o se apaga por sí solo.
            </p>
            <div className={cx(styles.pts, styles.rv, styles.d3)}>
              <div className={styles.pt}>
                <span className={styles.mono}>01</span>
                <p>
                  <b>Negro real:</b> un píxel negro está apagado, no &quot;tapado&quot;.
                </p>
              </div>
              <div className={styles.pt}>
                <span className={styles.mono}>02</span>
                <p>
                  <b>Contraste infinito en la práctica:</b> 1.000.000:1.
                </p>
              </div>
              <div className={styles.pt}>
                <span className={styles.mono}>03</span>
                <p>
                  <b>Más delgado y liviano:</b> sin capa de retroiluminación.
                </p>
              </div>
            </div>
            <div className={cx(styles.dile, styles.rv, styles.d3)}>
              <b>DILE</b>
              <p>
                &quot;En esta pantalla cada punto tiene su propia luz. Cuando la imagen es negra, el punto se apaga. Por
                eso el negro se ve negro de verdad.&quot;
              </p>
            </div>
          </div>
          <div className={cx(styles.pxwrap, styles.rv, styles.d2)}>
            <div className={styles.pxtog} role="group" aria-label="Tipo de pantalla">
              <button
                type="button"
                className={modoPantalla === "lcd" ? styles.on : undefined}
                aria-pressed={modoPantalla === "lcd"}
                onClick={() => setModoPantalla("lcd")}
              >
                Pantalla LCD
              </button>
              <button
                type="button"
                className={modoPantalla === "oled" ? styles.on : undefined}
                aria-pressed={modoPantalla === "oled"}
                onClick={() => setModoPantalla("oled")}
              >
                Pantalla OLED
              </button>
            </div>
            <div
              ref={pxRef}
              className={pxClase}
              onPointerMove={manejarPunteroPixeles}
              role="img"
              aria-label="Cuadrícula de píxeles comparando LCD y OLED"
            >
              {Array.from({ length: PX_COLS * PX_ROWS }, (_, i) => (
                <i
                  key={i}
                  className={pixelesBase.has(i) ? cx(styles.lit, styles.base) : undefined}
                  style={pixelesBase.has(i) ? ({ "--c": coloresBase.get(i) } as React.CSSProperties) : undefined}
                />
              ))}
            </div>
            <p className={styles.pxcap}>
              {modoPantalla === "lcd"
                ? "LCD: la lámpara de atrás siempre está encendida. Los “negros” quedan grises y la luz se escapa por los bordes."
                : "OLED: los píxeles apagados son negro puro. Pasa el cursor o el dedo para encender píxeles uno a uno."}
            </p>
          </div>
        </div>
      </section>

      {/* 04 Negro real */}
      <section
        ref={(el) => {
          secRefs.current[3] = el;
        }}
        className={cx(styles.sec, secEnVista.has("z4") && styles.in)}
        id="z4"
      >
        <div className={styles.wrap}>
          <div className={cx(styles.kick, styles.mono, styles.rv)}>
            <i />
            Módulo 04 · Negro real
          </div>
          <h2 className={cx(styles.rv, styles.d1)}>
            Arrastra y compara. <span className={styles.grad}>La diferencia está en las sombras.</span>
          </h2>
          <p className={cx(styles.lead, styles.rv, styles.d2)}>
            Mira el fondo negro: en LCD se ve grisáceo porque la lámpara de atrás se escapa. En OLED el fondo desaparece
            y los colores saltan.
          </p>
          <div className={cx(styles.cmp, styles.rv, styles.d2)} style={{ "--x": `${cmpX}%` } as React.CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FOTO_COMPARADOR} alt="Especias de colores sobre fondo negro, como se ve en OLED" />
            <div className={styles.lcdv} style={{ position: "absolute", inset: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FOTO_COMPARADOR} alt="" />
            </div>
            <span className={cx(styles.lab, styles.l1, styles.mono)}>LCD típica</span>
            <span className={cx(styles.lab, styles.l2, styles.mono)}>Zenbook OLED</span>
            <div className={styles.hd}>
              <b>⇆</b>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={cmpX}
              onChange={(e) => setCmpX(Number(e.target.value))}
              aria-label="Comparar LCD y OLED"
            />
          </div>
          <p className={styles.cmpnote}>Simulación ilustrativa para el entrenamiento. En tienda, haz la prueba real con un video oscuro.</p>
          <div className={styles.bignum}>
            <div className={cx(styles.bn, styles.rv)}>
              <b>
                <ContadorNumero objetivo={1000000} activar={secEnVista.has("z4")} reduced={reduced} />
              </b>
              <span>:1 de contraste</span>
            </div>
            <div className={cx(styles.bn, styles.rv, styles.d1)}>
              <b>
                0,2<small>ms</small>
              </b>
              <span>tiempo de respuesta: movimiento sin estelas</span>
            </div>
            <div className={cx(styles.bn, styles.rv, styles.d2)}>
              <b>16:10</b>
              <span>más alto que 16:9: más líneas de documento</span>
            </div>
          </div>
          <div className={cx(styles.dile, styles.rv, styles.d3)}>
            <b>DILE</b>
            <p>
              &quot;Le voy a poner un video oscuro. ¿Ve que el negro no se ve gris? Eso es OLED. En una pantalla normal
              esa parte brillaría.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* 05 Color de cine */}
      <section
        ref={(el) => {
          secRefs.current[4] = el;
        }}
        className={cx(styles.sec, secEnVista.has("z5") && styles.in)}
        id="z5"
      >
        <div className={cx(styles.wrap, styles.two)}>
          <div>
            <div className={cx(styles.kick, styles.mono, styles.rv)}>
              <i />
              Módulo 05 · Color de cine
            </div>
            <h2 className={cx(styles.rv, styles.d1)}>El mismo color que se usa en el cine.</h2>
            <p className={cx(styles.lead, styles.rv, styles.d2)}>
              DCI-P3 es el estándar de color de la industria cinematográfica. Es más amplio que sRGB, el estándar de la
              mayoría de pantallas de oficina. Esta pantalla cubre el 100%.
            </p>
            <div className={styles.bignum}>
              <div className={cx(styles.bn, styles.rv)}>
                <b>
                  <ContadorNumero objetivo={100} activar={secEnVista.has("z5")} reduced={reduced} />
                  <small>%</small>
                </b>
                <span>de DCI-P3</span>
              </div>
              <div className={cx(styles.bn, styles.rv, styles.d1)}>
                <b>
                  1.070<small>millones</small>
                </b>
                <span>de colores (10 bits)</span>
              </div>
            </div>
            <div className={cx(styles.pant, styles.rv, styles.d2)}>
              <div className={styles.sq}>✓</div>
              <p>
                <b>Pantone Validated</b> en la línea ASUS Lumina OLED: los colores se ven como el diseñador los creó.
                Confírmalo en el adhesivo del equipo exhibido.
              </p>
            </div>
            <div className={cx(styles.dile, styles.rv, styles.d3)}>
              <b>DILE</b>
              <p>
                &quot;Si edita fotos o ve series, aquí ve el color como es. Cubre el 100% del estándar de cine, 1.070
                millones de colores.&quot;
              </p>
            </div>
          </div>
          <div className={cx(styles.gam, styles.rv, styles.d2)}>
            <svg viewBox="0 0 460 460" role="img" aria-label="Diagrama de color: DCI-P3 cubre más área que sRGB">
              <defs>
                <clipPath id="zhs">
                  <polygon points="127.0,437.6 112.0,426.0 102.1,412.8 85.7,377.6 74.3,345.7 62.7,301.4 51.8,246.0 44.1,187.0 42.0,132.2 47.0,87.4 59.5,58.4 77.2,48.1 97.1,51.7 117.4,61.2 136.4,72.6 154.8,85.5 172.9,99.6 190.8,114.6 208.7,130.3 226.5,146.5 244.3,162.9 262.1,179.3 279.4,195.5 296.2,211.3 312.4,226.4 327.6,240.6 341.4,253.6 353.5,264.9 364.1,274.8 372.9,283.0 380.1,289.7 407.4,315.3" />
                </clipPath>
                <filter id="zbl" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="38" />
                </filter>
              </defs>
              {[393, 299, 205, 111, 17].map((y, i) => (
                <g key={y}>
                  <line x1={40} y1={y} x2={440} y2={y} stroke="rgba(147,160,184,.12)" />
                  <text x={30} y={y + 4} fill="#5E6A82" fontSize={11} textAnchor="end" fontFamily="DM Mono, monospace">
                    0.{[1, 3, 5, 7, 9][i]}
                  </text>
                </g>
              ))}
              <line x1={40} y1={440} x2={440} y2={440} stroke="rgba(147,160,184,.4)" />
              <line x1={40} y1={440} x2={40} y2={10} stroke="rgba(147,160,184,.4)" />
              <g className={styles.horse} clipPath="url(#zhs)">
                <rect x={0} y={0} width={460} height={460} fill="#3dff8f" />
                <g filter="url(#zbl)">
                  <circle cx={75} cy={88} r={120} fill="#00ff6a" />
                  <circle cx={65} cy={276} r={90} fill="#00e5ff" />
                  <circle cx={115} cy={426} r={110} fill="#3b2bff" />
                  <circle cx={380} cy={308} r={120} fill="#ff1d3d" />
                  <circle cx={265} cy={393} r={90} fill="#d01dff" />
                  <circle cx={275} cy={205} r={90} fill="#ffe14a" />
                  <circle cx={195} cy={285} r={70} fill="#ffffff" />
                </g>
              </g>
              <polygon className={styles.tri} points="360.0,284.9 190.0,158.0 115.0,411.8" stroke="#1b2333" />
              <polygon
                className={cx(styles.tri, styles.p3)}
                points="380.0,289.6 172.5,115.7 115.0,411.8"
                stroke="#fff"
              />
              <text x={391} y={281} fill="#fff" fontSize={13} fontFamily="DM Mono, monospace">
                DCI-P3
              </text>
            </svg>
            <div className={styles.gl}>
              <span>
                <i style={{ background: "#fff" }} />
                DCI-P3 (esta pantalla)
              </span>
              <span>
                <i style={{ background: "#1b2333", boxShadow: "0 0 0 1px #5E6A82" }} />
                sRGB (pantalla común)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 06 Cuidado visual */}
      <section
        ref={(el) => {
          secRefs.current[5] = el;
        }}
        className={cx(styles.sec, secEnVista.has("z6") && styles.in)}
        id="z6"
      >
        <div className={styles.wrap}>
          <div className={cx(styles.kick, styles.mono, styles.rv)}>
            <i />
            Módulo 06 · Cuidado visual
          </div>
          <h2 className={cx(styles.rv, styles.d1)}>
            <span className={styles.grad}>70% menos</span> luz azul perjudicial. Sin pintar la pantalla de amarillo.
          </h2>
          <p className={cx(styles.lead, styles.rv, styles.d2)}>
            Los filtros tradicionales tiñen la imagen. En ASUS OLED la reducción se hace desde el hardware: baja la luz
            azul dañina y el color sigue siendo preciso.
          </p>
          <div className={styles.eye}>
            <div className={cx(styles.panel, styles.spec, styles.rv)}>
              <h3>Espectro de la pantalla</h3>
              <p className={styles.s}>El pico azul dañino baja; el resto del color se mantiene.</p>
              <svg viewBox="0 0 400 210" role="img" aria-label="Espectro de luz con el pico azul reducido">
                <defs>
                  <linearGradient id="zbg" x1="0" x2="1">
                    <stop offset="0" stopColor="#4b3bff" />
                    <stop offset="1" stopColor="#19c3e6" />
                  </linearGradient>
                  <linearGradient id="zrg" x1="0" x2="1">
                    <stop offset="0" stopColor="#19c3e6" />
                    <stop offset=".35" stopColor="#3dff8f" />
                    <stop offset=".65" stopColor="#ffe14a" />
                    <stop offset="1" stopColor="#ff3d7f" />
                  </linearGradient>
                </defs>
                <path d="M40 200 C 70 200 80 20 100 20 C 120 20 130 200 160 200 Z" fill="url(#zbg)" opacity={0.18} />
                <path className={styles.bp} d="M40 200 C 70 200 80 20 100 20 C 120 20 130 200 160 200 Z" fill="url(#zbg)" />
                <path
                  d="M120 200 C 160 200 175 105 215 95 C 255 88 265 140 295 125 C 325 108 335 200 380 200 Z"
                  fill="url(#zrg)"
                  opacity={0.9}
                />
                <line x1={0} y1={200} x2={400} y2={200} stroke="rgba(147,160,184,.3)" />
                <text x={100} y={12} fill="#93A0B8" fontSize={11} textAnchor="middle" fontFamily="DM Mono, monospace">
                  AZUL
                </text>
              </svg>
              <div className={styles.pct}>
                <ContadorNumero objetivo={70} activar={secEnVista.has("z6")} reduced={reduced} />
                <small>%</small>
              </div>
              <p className={styles.s} style={{ margin: "4px 0 0" }}>
                menos luz azul perjudicial
              </p>
            </div>
            <div className={cx(styles.panel, styles.rv, styles.d1)}>
              <h3>Por qué importa</h3>
              <p className={styles.s}>
                Supervivencia de células de la retina (conos) tras 24 h de exposición, en laboratorio.
              </p>
              <div className={styles.bars}>
                <div className={styles.bar}>
                  <i style={{ "--h": "100%", background: "linear-gradient(#5b5f68,#3a3d44)" } as React.CSSProperties} />
                  <span>100%</span>
                </div>
                <div className={styles.bar}>
                  <i style={{ "--h": "100%", background: "linear-gradient(#d3123f,#6e0d23)" } as React.CSSProperties} />
                  <span>100%</span>
                </div>
                <div className={styles.bar}>
                  <i style={{ "--h": "100%", background: "linear-gradient(#22b35e,#0f5a31)" } as React.CSSProperties} />
                  <span>100%</span>
                </div>
                <div className={cx(styles.bar, styles.bl)}>
                  <b>-80%</b>
                  <i style={{ "--h": "20%", background: "linear-gradient(#2a7fc0,#11406a)" } as React.CSSProperties} />
                  <span>20%</span>
                </div>
              </div>
              <div className={styles.bl2}>
                <span>Antes</span>
                <span>Luz roja</span>
                <span>Luz verde</span>
                <span style={{ color: "var(--cy)" }}>Luz azul</span>
              </div>
              <p className={styles.note}>
                Estudio con células de ratón, Universidad Farmacéutica de Gifu (Japón), citado por ASUS. Úsalo para
                explicar, no como afirmación médica.
              </p>
            </div>
          </div>
          <div className={cx(styles.certs, styles.rv)}>
            <div className={styles.cert2}>
              <i />
              TÜV Rheinland · luz azul baja
            </div>
            <div className={styles.cert2}>
              <i />
              TÜV Rheinland · libre de parpadeo
            </div>
            <div className={styles.cert2}>
              <i />
              SGS Eye Care Display
            </div>
          </div>
          <div className={cx(styles.dile, styles.rv)}>
            <b>DILE</b>
            <p>
              &quot;Si pasa muchas horas frente al computador, esta pantalla emite 70% menos luz azul dañina, certificada
              por TÜV Rheinland, y sin volver la imagen amarilla.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* 07 Diseño */}
      <section
        ref={(el) => {
          secRefs.current[6] = el;
        }}
        className={cx(styles.sec, secEnVista.has("z7") && styles.in)}
        id="z7"
      >
        <div className={cx(styles.wrap, styles.two)}>
          <div className={cx(styles.lid, styles.rv)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FOTO_TAPA} alt="Tapa del Zenbook 14 en Ponder Blue con el monograma de líneas" />
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
              <line x1={580.8} y1={1.3} x2={216.6} y2={996} pathLength={1} />
              <line x1={747.4} y1={1.3} x2={998.7} y2={689.7} pathLength={1} />
              <line x1={955.5} y1={579.5} x2={452.9} y2={996} pathLength={1} />
              <line x1={660.4} y1={824.5} x2={866.2} y2={996} pathLength={1} />
            </svg>
          </div>
          <div>
            <div className={cx(styles.kick, styles.mono, styles.rv)}>
              <i />
              Módulo 07 · Diseño
            </div>
            <h2 className={cx(styles.rv, styles.d1)}>Ponder Blue y el monograma Zenbook.</h2>
            <p className={cx(styles.lead, styles.rv, styles.d2)}>
              Las líneas de la tapa son la firma de Zenbook. Liviano para llevar todos los días y probado con la norma
              militar MIL-STD-810H.
            </p>
            <div className={cx(styles.dgrid, styles.rv, styles.d2)}>
              <div className={styles.dc}>
                <b>1,2 kg</b>
                <span>para cargarlo todo el día</span>
              </div>
              <div className={styles.dc}>
                <b>14,9 mm</b>
                <span>de grosor</span>
              </div>
              <div className={styles.dc}>
                <b>810H</b>
                <span>MIL-STD: golpes, vibración, temperatura</span>
              </div>
              <div className={styles.dc}>
                <b>Táctil</b>
                <span>toca, haz zoom y firma en la pantalla</span>
              </div>
            </div>
            <div className={cx(styles.sw, styles.rv, styles.d3)}>
              <i />
              Color: Ponder Blue (azul profundo)
            </div>
            <div className={cx(styles.dile, styles.rv, styles.d3)}>
              <b>DILE</b>
              <p>&quot;Pesa 1,2 kilos y pasó pruebas de resistencia con norma militar. Es para llevarlo a todas partes sin miedo.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 Ficha técnica */}
      <section
        ref={(el) => {
          secRefs.current[7] = el;
        }}
        className={cx(styles.sec, secEnVista.has("z8") && styles.in)}
        id="z8"
      >
        <div className={styles.wrap}>
          <div className={cx(styles.kick, styles.mono, styles.rv)}>
            <i />
            Módulo 08 · Ficha técnica
          </div>
          <h2 className={cx(styles.rv, styles.d1)}>Lo que hay detrás de la pantalla.</h2>
          <div className={styles.fic}>
            <div className={cx(styles.fc, styles.w2, styles.rv)}>
              <span className={styles.mono}>Procesador e IA</span>
              <h3>Intel Core Ultra 7 255H</h3>
              <p>16 núcleos y 16 hilos, hasta 5,1 GHz, 24 MB de caché. Incluye NPU Intel AI Boost y gráficos Intel Arc 140T.</p>
              <div className={styles.tops}>
                <div>
                  <i style={{ "--h": "11px", background: "#3E4C70" } as React.CSSProperties} />
                  <span>NPU · 13</span>
                </div>
                <div>
                  <i style={{ "--h": "62px", background: "#2a8fb0" } as React.CSSProperties} />
                  <span>GPU · 74</span>
                </div>
                <div>
                  <i style={{ "--h": "84px", background: "linear-gradient(#19c3e6,#7a8cff)" } as React.CSSProperties} />
                  <span>Total · 96 TOPS</span>
                </div>
              </div>
            </div>
            <div className={cx(styles.fc, styles.rv, styles.d1)}>
              <span className={styles.mono}>Pantalla</span>
              <h3>14&quot; OLED táctil</h3>
              <ul>
                <li>
                  Resolución<b>WUXGA 1920×1200</b>
                </li>
                <li>
                  Formato<b>16:10</b>
                </li>
                <li>
                  Color<b>100% DCI-P3</b>
                </li>
                <li>
                  Respuesta<b>0,2 ms</b>
                </li>
                <li>
                  Brillo<b>400 nits</b>
                </li>
              </ul>
            </div>
            <div className={cx(styles.fc, styles.rv)}>
              <span className={styles.mono}>Memoria</span>
              <h3>16 GB LPDDR5X</h3>
              <p>Doble canal, integrada a la board: rápida y eficiente. No se amplía.</p>
            </div>
            <div className={cx(styles.fc, styles.rv, styles.d1)}>
              <span className={styles.mono}>Almacenamiento</span>
              <h3>SSD 512 GB</h3>
              <p>M.2 NVMe PCIe 4.0. Arranca Windows y abre programas en segundos.</p>
            </div>
            <div className={cx(styles.fc, styles.rv, styles.d2)}>
              <span className={styles.mono}>Batería</span>
              <h3>75 Wh</h3>
              <p>Carga por USB-C con adaptador de 65 W.</p>
            </div>
            <div className={cx(styles.fc, styles.rv)}>
              <span className={styles.mono}>Puertos</span>
              <h3>Sin adaptadores</h3>
              <ul>
                <li>
                  Thunderbolt 4 (40 Gbps)<b>×2</b>
                </li>
                <li>
                  USB-A 3.2 Gen 1<b>×1</b>
                </li>
                <li>
                  HDMI 2.1<b>×1</b>
                </li>
                <li>
                  Audio 3,5 mm<b>×1</b>
                </li>
              </ul>
            </div>
            <div className={cx(styles.fc, styles.rv, styles.d1)}>
              <span className={styles.mono}>Conectividad</span>
              <h3>Wi-Fi 7</h3>
              <p>Bluetooth 5.4. Cámara FHD con infrarrojo para Windows Hello (entra con la cara).</p>
            </div>
            <div className={cx(styles.fc, styles.rv, styles.d2)}>
              <span className={styles.mono}>Sistema</span>
              <h3>Windows 11 Home</h3>
              <p>Con Copilot y MyASUS para cuidar la batería y la pantalla OLED.</p>
            </div>
          </div>
          <div className={cx(styles.dile, styles.rv)}>
            <b>DILE</b>
            <p>&quot;Por dentro tiene un Intel Core Ultra 7 con hasta 96 TOPS de IA, 16 GB de memoria y Wi-Fi 7. Es rápido hoy y le va a durar varios años.&quot;</p>
          </div>
        </div>
      </section>

      {/* 09 Guion de venta */}
      <section
        ref={(el) => {
          secRefs.current[8] = el;
        }}
        className={cx(styles.sec, secEnVista.has("z9") && styles.in)}
        id="z9"
      >
        <div className={styles.wrap}>
          <div className={cx(styles.kick, styles.mono, styles.rv)}>
            <i />
            Módulo 09 · Guion de venta
          </div>
          <h2 className={cx(styles.rv, styles.d1)}>Tu speech de 60 segundos.</h2>
          <p className={cx(styles.lead, styles.rv, styles.d2)}>
            Cinco pasos. Practícalo con el botón: el guion avanza solo, al ritmo de una conversación real.
          </p>
          <div className={cx(styles.sp, styles.rv, styles.d2)}>
            <div className={styles.beats} role="tablist" aria-label="Pasos del guion">
              {GUION_ZENBOOK_14_OLED.map((b, i) => (
                <button
                  key={b.titulo}
                  type="button"
                  role="tab"
                  aria-selected={beatActivo === i}
                  className={cx(styles.beat, beatActivo === i && styles.on)}
                  onClick={() => {
                    setReproduciendo(false);
                    setGuionProgreso(0);
                    setBeatActivo(i);
                  }}
                >
                  <span className={styles.mono}>{pad2(i + 1)}</span>
                  <span>
                    {b.titulo}
                    <br />
                    <small style={{ opacity: 0.6 }}>{b.tiempo}</small>
                  </span>
                </button>
              ))}
            </div>
            <div className={styles.stage} aria-live="polite">
              <div className={styles.tm} style={{ width: `${guionProgreso}%` }} />
              <div key={beatActivo} className={styles.sw2}>
                <span className={styles.mono}>
                  Paso {pad2(beatActivo + 1)} · {GUION_ZENBOOK_14_OLED[beatActivo].tiempo}
                </span>
                <h3>{GUION_ZENBOOK_14_OLED[beatActivo].subtitulo}</h3>
                <p className={styles.quote}>{GUION_ZENBOOK_14_OLED[beatActivo].cita}</p>
                <p className={styles.act}>
                  <b>Acción:</b> {GUION_ZENBOOK_14_OLED[beatActivo].accion}
                </p>
              </div>
              <div className={styles.ctl}>
                <button
                  type="button"
                  className={cx(styles.btn, styles.pri)}
                  onClick={() => {
                    if (reproduciendo) {
                      setReproduciendo(false);
                      return;
                    }
                    setGuionProgreso(0);
                    setBeatActivo(0);
                    setReproduciendo(true);
                  }}
                >
                  {reproduciendo ? "■ Detener" : "▶ Practicar 60 s"}
                </button>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => {
                    setReproduciendo(false);
                    setGuionProgreso(0);
                    setBeatActivo((cur) => (cur + 1) % GUION_ZENBOOK_14_OLED.length);
                  }}
                >
                  Siguiente paso
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Objeciones */}
      <section
        ref={(el) => {
          secRefs.current[9] = el;
        }}
        className={cx(styles.sec, secEnVista.has("z10") && styles.in)}
        id="z10"
      >
        <div className={styles.wrap}>
          <div className={cx(styles.kick, styles.mono, styles.rv)}>
            <i />
            Módulo 10 · Objeciones
          </div>
          <h2 className={cx(styles.rv, styles.d1)}>Lo que te van a preguntar.</h2>
          <div className={styles.obj}>
            {OBJECIONES_ZENBOOK_14_OLED.map((o, i) => (
              <div key={o.dice} className={cx(styles.ob, objAbiertas.has(i) && styles.open, styles.rv, i % 2 ? styles.d1 : undefined)}>
                <button type="button" aria-expanded={objAbiertas.has(i)} onClick={() => alternarObjecion(i)}>
                  <span>{o.dice}</span>
                  <i>+</i>
                </button>
                <div className={styles.an}>
                  <p dangerouslySetInnerHTML={{ __html: o.responde }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 Evaluación */}
      <section
        ref={(el) => {
          secRefs.current[10] = el;
        }}
        className={cx(styles.sec, secEnVista.has("z11") && styles.in)}
        id="z11"
      >
        <div className={styles.wrap}>
          <div className={cx(styles.kick, styles.mono, styles.rv)}>
            <i />
            Módulo 11 · Evaluación
          </div>
          <h2 className={cx(styles.rv, styles.d1)}>Demuestra que eres Experto OLED.</h2>
          <p className={cx(styles.lead, styles.rv, styles.d2)}>10 preguntas. Con 10 de 10 se enciende tu insignia.</p>
          <div className={styles.ev}>
            <div className={styles.qs}>
              {QUIZ_ZENBOOK_14_OLED.map((q, i) => {
                const a = respuestas[i];
                const dicho = a !== undefined;
                return (
                  <div key={q.pregunta} className={styles.q}>
                    <span className={cx(styles.qn, styles.mono)}>
                      Pregunta {pad2(i + 1)} / {QUIZ_ZENBOOK_14_OLED.length}
                    </span>
                    <p className={styles.qt}>{q.pregunta}</p>
                    <div className={styles.opts} role="group" aria-label={q.pregunta}>
                      {q.opciones.map((op, j) => (
                        <button
                          key={op}
                          type="button"
                          className={cx(
                            styles.ans2,
                            dicho && j === q.correcta && styles.ok,
                            dicho && j === a && a !== q.correcta && styles.bad,
                          )}
                          aria-pressed={dicho && j === a}
                          onClick={() => responder(i, j)}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                    <p className={styles.fb}>{!dicho ? "Elige una respuesta." : `${a === q.correcta ? "Correcto. " : "Incorrecto. "}${q.explicacion}`}</p>
                  </div>
                );
              })}
            </div>
            <aside className={styles.side}>
              <div className={cx(styles.badge, gano && styles.won)}>
                <div>
                  <small>ASUS EXPERT</small>
                  <b>Experto</b>
                  <em>OLED</em>
                  <small>ZENBOOK 14</small>
                </div>
              </div>
              <div className={styles.sc}>
                {puntaje} / {QUIZ_ZENBOOK_14_OLED.length} correctas
              </div>
              <div className={styles.evbw}>
                <div className={styles.evb} style={{ width: `${(respondidas / QUIZ_ZENBOOK_14_OLED.length) * 100}%` }} />
              </div>
              <p className={styles.csub}>
                {gano ? `Insignia Experto OLED obtenida · ${QUIZ_ZENBOOK_14_OLED.length} de ${QUIZ_ZENBOOK_14_OLED.length}` : "Aprueba con 10 de 10 para obtener la insignia"}
              </p>
              <button type="button" className={styles.btn} style={{ marginTop: 18 }} onClick={() => setRespuestas({})}>
                Reiniciar
              </button>
            </aside>
          </div>
        </div>
      </section>

      <footer>
        <div className={styles.wrap}>
          ASUS Expert · Entrenamiento Zenbook 14 OLED UX3405CA. Especificaciones según ASUS para la familia UX3405CA;
          confirma la etiqueta del equipo en exhibición.
        </div>
      </footer>
    </div>
  );
}
