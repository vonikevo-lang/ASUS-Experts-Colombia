"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./EntrenamientoVivobook15X1504.css";
import { QUIZ_X1504, HOOKS_X1504, RAM_PROGRAMAS_X1504 } from "./quizData";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Este archivo trae su propia hoja de estilos como CSS normal (no CSS
 * Modules: la regla de Turbopack del proyecto enruta todo *.css por el
 * loader de Tailwind, que no genera el mapa de clases que un .module.css
 * necesita). Las clases del diseño original ya son bastante específicas
 * (camelCase, distinto del kebab-case del resto del sitio) y esta ruta no
 * comparte layout con ninguna otra página, así que no hace falta un prefijo
 * de alcance: `styles.algo` solo necesita devolver el nombre de clase tal
 * cual para que coincida con EntrenamientoVivobook15X1504.css.
 */
const styles = new Proxy({} as Record<string, string>, {
  get: (_target, prop: string) => prop,
});

const ASSET_BASE = "/entrenamientos/vivobook-15-x1504";
const FOTO_HERO = `${ASSET_BASE}/vivobook-frente.webp`;
const FOTO_TECLADO = `${ASSET_BASE}/vivobook-teclado-arriba.webp`;
const FOTO_180 = `${ASSET_BASE}/vivobook-180-plano.webp`;
const LOGO_ASUS = `${ASSET_BASE}/asus-logo-blanco-800.png`;

const SEC_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 91];

/**
 * "Entrenamiento Vivobook 15 X1504MA-BQ919W": scroll-story de 14 secciones
 * (hero, mapa, perfiles de cliente, referencia, procesador, IA, RAM, SSD,
 * diseño, MyASUS, garantía, ganchos/objeciones, quiz con insignia), con
 * revelado al hacer scroll, timeline con nodos, barra de progreso y varios
 * widgets interactivos (RAM, Battery Care, flip cards, acordeón, quiz).
 *
 * Fuente: diseño de Kaisen Design Studio (vivobook15-entrenamiento.zip),
 * convertido 1:1 a React/CSS Modules conservando estructura, paleta,
 * tipografías e interacciones. Mecánica de revelado: igual al original
 * (scroll + rAF, no IntersectionObserver), para que el umbral del 85 %/50 %
 * y el nodo al 62 % se comporten exactamente igual.
 */
export function EntrenamientoVivobook15X1504() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);

  const [phase, setPhase] = useState(0);
  const [rev, setRev] = useState<Record<number, boolean>>({});
  const [lit, setLit] = useState<Record<number, boolean>>({});
  const [fill, setFill] = useState(0);
  const [pct, setPct] = useState(0);

  const [ram, setRam] = useState<8 | 16 | 32>(8);
  const [swapN, setSwapN] = useState(0);
  const [batt, setBatt] = useState<100 | 80 | 60>(100);
  const [qa, setQa] = useState<Record<number, number>>({});
  const [fl, setFl] = useState<Record<number, boolean>>({});

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const vh = window.innerHeight || 900;
    const tr = track.getBoundingClientRect();
    const nextFill = Math.round(Math.max(0, Math.min(tr.height, vh * 0.62 - tr.top)));

    setRev((prev) => {
      let changed = false;
      const next = { ...prev };
      track.querySelectorAll<HTMLElement>("[data-sec]").forEach((el) => {
        const i = Number(el.getAttribute("data-sec"));
        if (!next[i] && el.getBoundingClientRect().top < vh * (i === 91 ? 0.5 : 0.85)) {
          next[i] = true;
          changed = true;
        }
      });
      return changed ? next : prev;
    });

    const nextLit: Record<number, boolean> = {};
    track.querySelectorAll<HTMLElement>("[data-node]").forEach((el) => {
      const i = Number(el.getAttribute("data-node"));
      const r = el.getBoundingClientRect();
      if (r.top + r.height / 2 < vh * 0.62) nextLit[i] = true;
    });

    setLit((prev) => {
      const prevKey = Object.keys(prev).join(",");
      const nextKey = Object.keys(nextLit).join(",");
      return prevKey === nextKey ? prev : nextLit;
    });
    setFill(nextFill);
    setPct(tr.height ? Math.min(100, Math.round((nextFill / tr.height) * 100)) : 0);
  }, []);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    if (reduced) {
      const fullRev: Record<number, boolean> = {};
      SEC_IDS.forEach((i) => {
        fullRev[i] = true;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRev(fullRev);
      setPhase(4);
    } else {
      [
        [120, 1],
        [1500, 2],
        [2500, 3],
        [3000, 4],
      ].forEach(([delay, p]) => {
        timers.push(setTimeout(() => setPhase(p), delay));
      });
    }

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        measure();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", onScroll);
    timers.push(setTimeout(onScroll, 60));
    timers.push(setTimeout(onScroll, 600));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const heroPhaseClass = Array.from({ length: phase }, (_, i) => styles[`p${i + 1}`]).join(" ");
  const inCls = (id: number) => (rev[id] ? styles.in : "");
  const nodeCls = (id: number) => cx(styles.node, lit[id] && styles.nodeOn);

  function pickRam(v: 8 | 16 | 32) {
    if (ram !== v) {
      setRam(v);
      setSwapN((n) => n + 1);
    }
  }

  const ramTier = ram === 32 ? 3 : ram === 16 ? 2 : 1;
  const ramCount = RAM_PROGRAMAS_X1504.filter((p) => p.nivel <= ramTier).length;

  const battDesc =
    batt === 100
      ? "Para quien lo usa fuera de casa todo el día y necesita toda la autonomía."
      : batt === 80
        ? "Equilibrado: cuida la batería si lo usas conectado buena parte del día."
        : "Máxima vida útil: ideal si el equipo pasa casi siempre enchufado.";
  const battColor = batt === 100 ? "#22B35E" : batt === 80 ? "#FFC21A" : "#FF7A1A";

  const score = QUIZ_X1504.reduce((acc, q, i) => acc + (qa[i] === q.correcta ? 1 : 0), 0);
  const won = score === QUIZ_X1504.length;

  return (
    <div className={cx(styles.page, styles.pg)} data-label="Vivobook 15 · Plan de entrenamiento">
      <header className={styles.topbar}>
        <div className={styles.topbarIn}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.logo} src={LOGO_ASUS} alt="ASUS" />
          <div className={styles.progWrap}>
            <div className={styles.progLabel}>
              Paso 1 de 3 <span>· Material de apoyo · llevas {pct} %</span>
            </div>
            <div
              className={styles.progBar}
              role="progressbar"
              aria-label="Avance del material de apoyo"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
            >
              <i style={{ width: `${Math.max(2, pct)}%` }} />
            </div>
          </div>
          <a className={cx(styles.btn, styles.btnPrimary)} href="#mapa">
            Ver el plan
          </a>
        </div>
      </header>

      <main className={styles.track} data-track="1" ref={trackRef}>
        <div className={styles.line} aria-hidden="true">
          <div className={styles.lineFill} style={{ height: `${fill}px` }} />
        </div>

        {/* 1 HERO */}
        <section className={cx(styles.sec, styles.hero, inCls(1), heroPhaseClass)} data-sec="1" aria-labelledby="t1">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(1)} data-node="1" aria-hidden="true">
                1
              </div>
            </div>
            <div className={styles.content} style={{ gap: 0 }}>
              <div className={styles.stage}>
                <svg className={styles.ribbons} viewBox="0 0 1100 560" aria-hidden="true">
                  <path d="M70 -10 L550 520 L1030 -10" stroke="#6B46E0" />
                  <path d="M110 -10 L550 476 L990 -10" stroke="#1F6FEB" />
                  <path d="M150 -10 L550 432 L950 -10" stroke="#22B35E" />
                  <path d="M190 -10 L550 388 L910 -10" stroke="#FFC21A" />
                  <path d="M230 -10 L550 344 L870 -10" stroke="#FF7A1A" />
                  <path d="M270 -10 L550 300 L830 -10" stroke="#D92D20" />
                </svg>
                <div className={styles.halo} aria-hidden="true" />
                <div className={styles.lap}>
                  <div className={styles.lapFloat}>
                    <div className={styles.shadow} aria-hidden="true" />
                    <div className={styles.lapFlat}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={FOTO_180} alt="ASUS Vivobook 15 abierto a 180 grados, totalmente plano" />
                    </div>
                    <div className={styles.lapFront}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className={styles.lapImg}
                        src={FOTO_HERO}
                        alt="ASUS Vivobook 15 abierto de frente, color Quiet Blue, con el fondo de pantalla Vivobook"
                      />
                      <div className={styles.shine} aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.heroCopy}>
                <p className={cx(styles.heroRef, styles.hRv)}>ASUS Vivobook 15 · X1504MA-BQ919W</p>
                <h1 className={cx(styles.h1, styles.hRv, styles.hd1)} id="t1">
                  Vivobook 15.<span>La generación nueva de Intel, con IA, para todos los días.</span>
                </h1>
                <div className={cx(styles.chips, styles.hRv, styles.hd2)}>
                  <span className={cx(styles.chip, styles.cRed)}>15,6&quot;</span>
                  <span className={cx(styles.chip, styles.cOrange)}>Core 5 Serie 3</span>
                  <span className={cx(styles.chip, styles.cYellow)}>NPU 15 TOPS</span>
                  <span className={cx(styles.chip, styles.cGreen)}>8 GB DDR5</span>
                  <span className={cx(styles.chip, styles.cBlue)}>SSD 512 GB</span>
                </div>
                <a className={cx(styles.cue, styles.hRv, styles.hd3)} href="#mapa">
                  Desliza para ver el plan
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 5v14" />
                    <path d="m6 13 6 6 6-6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2 MAPA DEL PLAN */}
        <section className={cx(styles.sec, styles.mapsec, styles.cBlue, inCls(2))} id="mapa" data-sec="2" aria-labelledby="t2">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(2)} data-node="2" aria-hidden="true">
                2
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <p className={cx(styles.kicker, styles.rv)}>Plan de entrenamiento</p>
                <h2 className={cx(styles.h2, styles.rv, styles.d1)} id="t2">
                  Tu ruta en 4 bloques.
                </h2>
                <p className={cx(styles.lead, styles.rv, styles.d2)}>
                  Cada estación es una parada del recorrido. Tócala para saltar directo a ella.
                </p>
                <p className={cx(styles.rv, styles.d3)}>
                  <span className={styles.time}>Tiempo estimado: 12–15 minutos · Termina con un quiz de 6 preguntas</span>
                </p>
              </div>
              <div className={styles.map}>
                <div className={cx(styles.lane, styles.l1, styles.cRed)}>
                  <div className={styles.laneH}>
                    <span className={styles.ln}>Bloque A</span>
                    <h3>Conoce al cliente</h3>
                  </div>
                  <div className={styles.laneB}>
                    <a className={cx(styles.st, styles.cRed)} href="#s3">
                      <span className={styles.stN}>3</span>Perfiles de cliente
                    </a>
                  </div>
                  <span className={styles.conn} aria-hidden="true" />
                </div>
                <div className={cx(styles.lane, styles.l2, styles.cOrange)}>
                  <div className={styles.laneH}>
                    <span className={styles.ln}>Bloque B</span>
                    <h3>Lee el equipo</h3>
                  </div>
                  <div className={styles.laneB}>
                    <a className={cx(styles.st, styles.cOrange)} href="#s4">
                      <span className={styles.stN}>4</span>La referencia
                    </a>
                    <a className={cx(styles.st, styles.cYellow)} href="#s5">
                      <span className={styles.stN}>5</span>El procesador
                    </a>
                    <a className={cx(styles.st, styles.cGreen)} href="#s6">
                      <span className={styles.stN}>6</span>IA y TOPS
                    </a>
                    <a className={cx(styles.st, styles.cBlue)} href="#s7">
                      <span className={styles.stN}>7</span>Memoria RAM
                    </a>
                    <a className={cx(styles.st, styles.cViolet)} href="#s8">
                      <span className={styles.stN}>8</span>Almacenamiento
                    </a>
                  </div>
                  <span className={styles.conn} aria-hidden="true" />
                </div>
                <div className={cx(styles.lane, styles.l3, styles.cGreen)}>
                  <div className={styles.laneH}>
                    <span className={styles.ln}>Bloque C</span>
                    <h3>Demuéstralo en piso</h3>
                  </div>
                  <div className={styles.laneB}>
                    <a className={cx(styles.st, styles.cRed)} href="#s9">
                      <span className={styles.stN}>9</span>Diseño y puertos
                    </a>
                    <a className={cx(styles.st, styles.cOrange)} href="#s10">
                      <span className={styles.stN}>10</span>Battery Care
                    </a>
                    <a className={cx(styles.st, styles.cBlue)} href="#s11">
                      <span className={styles.stN}>11</span>IA y MyASUS
                    </a>
                    <a className={cx(styles.st, styles.cYellow)} href="#s12">
                      <span className={styles.stN}>12</span>Garantía
                    </a>
                  </div>
                  <span className={styles.conn} aria-hidden="true" />
                </div>
                <div className={cx(styles.lane, styles.l4, styles.cViolet)}>
                  <div className={styles.laneH}>
                    <span className={styles.ln}>Bloque D</span>
                    <h3>Cierra la venta</h3>
                  </div>
                  <div className={styles.laneB}>
                    <a className={cx(styles.st, styles.cGreen)} href="#s13">
                      <span className={styles.stN}>13</span>Ganchos y objeciones
                    </a>
                    <a className={cx(styles.st, styles.cViolet)} href="#cierre">
                      <span className={styles.stN}>14</span>Insignia y quiz
                    </a>
                  </div>
                </div>
              </div>
              <div className={cx(styles.steps, styles.rv, styles.d3)} aria-label="Las 3 etapas del entrenamiento">
                <div className={cx(styles.stp, styles.stpNow)}>
                  <b>1</b>Material de apoyo<em>Estás aquí</em>
                </div>
                <svg className={styles.arrow} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
                <div className={styles.stp}>
                  <b>2</b>Historias de cliente
                </div>
                <svg className={styles.arrow} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
                <div className={styles.stp}>
                  <b>3</b>Quiz e insignia
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 PERFILES */}
        <section className={cx(styles.sec, styles.soft, styles.cRed, inCls(3))} id="s3" data-sec="3" aria-labelledby="t3">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(3)} data-node="3" aria-hidden="true">
                3
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <p className={cx(styles.kicker, styles.rv)}>¿Para quién es?</p>
                <h2 className={cx(styles.h2, styles.rv, styles.d1)} id="t3">
                  Cuatro clientes que vas a ver en piso.
                </h2>
                <p className={cx(styles.lead, styles.rv, styles.d2)}>
                  Identifica quién tienes al frente y usa la frase que le habla a lo que necesita.
                </p>
              </div>
              <div className={styles.g4}>
                <article className={cx(styles.card, styles.rv, styles.d2, styles.cRed)}>
                  <div className={styles.illu} role="img" aria-label="Ilustración: birrete de estudiante">
                    <svg width="64" height="64" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 18 24 9l21 9-21 9z" />
                      <path d="M12 22v9c0 3 5.5 6 12 6s12-3 12-6v-9" />
                      <path d="M45 18v11" />
                    </svg>
                  </div>
                  <h3>El estudiante</h3>
                  <p className={styles.ctx}>Colegio o universidad. Tareas, trabajos en grupo y clases virtuales.</p>
                  <p className={styles.say}>
                    <b>Dile</b>&#8220;Prende rápido, aguanta tu jornada de clases y trae IA de la generación nueva: te sirve todo el semestre.&#8221;
                  </p>
                </article>
                <article className={cx(styles.card, styles.rv, styles.d3, styles.cOrange)}>
                  <div className={styles.illu} role="img" aria-label="Ilustración: casa familiar">
                    <svg width="64" height="64" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 22 24 8l18 14" />
                      <path d="M11 19v20h26V19" />
                      <path d="M20 39v-9h8v9" />
                    </svg>
                  </div>
                  <h3>La familia</h3>
                  <p className={styles.ctx}>Un solo equipo para todos en la casa: tareas, trámites, series.</p>
                  <p className={styles.say}>
                    <b>Dile</b>&#8220;Pantalla de 15,6&quot;, teclado cómodo y 512 GB para que cada uno guarde lo suyo. Uno solo les alcanza a todos.&#8221;
                  </p>
                </article>
                <article className={cx(styles.card, styles.rv, styles.d4, styles.cBlue)}>
                  <div className={styles.illu} role="img" aria-label="Ilustración: diadema de videollamada">
                    <svg width="64" height="64" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M10 28v-4a14 14 0 0 1 28 0v4" />
                      <path d="M8 28h5v10H8z" />
                      <path d="M35 28h5v10h-5z" />
                      <path d="M40 38c0 3-4 5-10 5h-3" />
                    </svg>
                  </div>
                  <h3>El que trabaja desde casa</h3>
                  <p className={styles.ctx}>Videollamadas todo el día, Office y correo abiertos a la vez.</p>
                  <p className={styles.say}>
                    <b>Dile</b>&#8220;La IA le baja el ruido de la casa a tus videollamadas, y la cámara tiene tapa para tu privacidad.&#8221;
                  </p>
                </article>
                <article className={cx(styles.card, styles.rv, styles.d5, styles.cViolet)}>
                  <div className={styles.illu} role="img" aria-label="Ilustración: etiqueta de precio">
                    <svg width="64" height="64" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 7h17l18 18-17 17L7 24z" />
                      <circle cx="16" cy="16" r="3" />
                    </svg>
                  </div>
                  <h3>El que compara precios</h3>
                  <p className={styles.ctx}>Quiere tecnología nueva sin pagar por lo que no va a usar.</p>
                  <p className={styles.say}>
                    <b>Dile</b>&#8220;Es procesador de generación 2026 con chip de IA. Estás comprando lo nuevo, no lo que ya va de salida.&#8221;
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* 4 REFERENCIA */}
        <section className={cx(styles.sec, styles.cOrange, inCls(4))} id="s4" data-sec="4" aria-labelledby="t4">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(4)} data-node="4" aria-hidden="true">
                4
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <p className={cx(styles.kicker, styles.rv)}>Cómo leer la referencia</p>
                <h2 className={cx(styles.h2, styles.rv, styles.d1)} id="t4">
                  Cada letra te dice algo del equipo.
                </h2>
              </div>
              <div className={cx(styles.refrow, styles.rv, styles.d2)} aria-label="Referencia Vivobook 15 X1504MA-BQ919W desglosada">
                <div className={cx(styles.part, styles.fam, styles.k1)}>
                  <span className={styles.pt}>Vivobook</span>
                  <span className={styles.pl}>
                    <b>Familia</b>Línea de uso diario
                  </span>
                </div>
                <div className={cx(styles.part, styles.fam, styles.k2)}>
                  <span className={styles.pt}>15</span>
                  <span className={styles.pl}>
                    <b>Pantalla</b>15,6 pulgadas
                  </span>
                </div>
                <div className={cx(styles.part, styles.k3)}>
                  <span className={styles.pt}>X1504</span>
                  <span className={styles.pl}>
                    <b>Chasis</b>El cuerpo del equipo
                  </span>
                </div>
                <div className={cx(styles.part, styles.hl, styles.k4)}>
                  <span className={styles.pt}>MA</span>
                  <span className={styles.pl}>
                    <b>Procesador</b>Intel Core Serie 3
                  </span>
                </div>
                <div className={cx(styles.part, styles.k5)}>
                  <span className={styles.pt}>-BQ919W</span>
                  <span className={styles.pl}>
                    <b>Configuración</b>La versión exacta. W = Windows
                  </span>
                </div>
              </div>
              <div className={cx(styles.note, styles.rv, styles.d4)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <p>
                  <strong>Ojo:</strong> el X1504VA se ve igual por fuera, pero trae el procesador anterior sin IA. Revisa siempre
                  las dos letras después de X1504.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5 PROCESADOR */}
        <section className={cx(styles.sec, styles.soft, styles.cYellow, inCls(5))} id="s5" data-sec="5" aria-labelledby="t5">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(5)} data-node="5" aria-hidden="true">
                5
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <p className={cx(styles.kicker, styles.rv)}>El procesador</p>
                <h2 className={cx(styles.h2, styles.rv, styles.d1)} id="t5">
                  Intel Core 5 315: qué quiere decir cada número.
                </h2>
              </div>
              <div className={styles.cpu}>
                <div>
                  <div className={cx(styles.namebar, styles.rv, styles.d2)}>
                    <div className={cx(styles.nb, styles.nbBrand)}>
                      <span className={styles.t}>Intel</span>
                    </div>
                    <div className={styles.nb}>
                      <span className={styles.t}>Core 5</span>
                      <span className={styles.l}>Gama media: el punto justo de precio y rendimiento</span>
                    </div>
                    <div className={cx(styles.nb, styles.nbGen)}>
                      <span className={styles.t}>3</span>
                      <span className={styles.l}>Serie 3, generación 2026</span>
                    </div>
                    <div className={styles.nb}>
                      <span className={styles.t}>15</span>
                      <span className={styles.l}>Número de modelo</span>
                    </div>
                  </div>
                  <div className={styles.specs}>
                    <div className={cx(styles.spec, styles.rv, styles.d3, styles.cRed)}>
                      <div className={styles.v}>hasta 4,4 GHz</div>
                      <div className={styles.k}>Velocidad máxima</div>
                    </div>
                    <div className={cx(styles.spec, styles.rv, styles.d4, styles.cOrange)}>
                      <div className={styles.v}>6 MB</div>
                      <div className={styles.k}>Memoria caché</div>
                    </div>
                    <div className={cx(styles.spec, styles.rv, styles.d5, styles.cGreen)}>
                      <div className={styles.v}>6 núcleos</div>
                      <div className={styles.k}>2 de rendimiento + 4 de bajo consumo</div>
                    </div>
                    <div className={cx(styles.spec, styles.rv, styles.d6, styles.cBlue)}>
                      <div className={styles.v}>NPU 15 TOPS</div>
                      <div className={styles.k}>Chip dedicado para IA</div>
                    </div>
                  </div>
                </div>
                <div className={cx(styles.die, styles.rv, styles.d3)} role="img" aria-label="Diagrama: 2 núcleos de rendimiento y 4 núcleos de bajo consumo">
                  <div className={styles.dieH}>
                    <span>Así trabaja por dentro</span>
                    <span>6 núcleos</span>
                  </div>
                  <div className={styles.cores} aria-hidden="true">
                    <div className={cx(styles.core, styles.coreP, styles.c1)}>Rendimiento</div>
                    <div className={cx(styles.core, styles.coreP, styles.c2)}>Rendimiento</div>
                    <div className={cx(styles.core, styles.coreE, styles.c3)}>Bajo consumo</div>
                    <div className={cx(styles.core, styles.coreE, styles.c4)}>Bajo consumo</div>
                    <div className={cx(styles.core, styles.coreE, styles.c5)}>Bajo consumo</div>
                    <div className={cx(styles.core, styles.coreE, styles.c6)}>Bajo consumo</div>
                  </div>
                  <div className={styles.legend}>
                    <span>
                      <i style={{ background: "#FF7A1A" }} />
                      Lo pesado: abrir programas, exportar
                    </span>
                    <span>
                      <i style={{ background: "#5FA0F5" }} />
                      Lo diario: navegar, escribir, ahorrar batería
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 IA */}
        <section className={cx(styles.sec, styles.cGreen, inCls(6))} id="s6" data-sec="6" aria-labelledby="t6">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(6)} data-node="6" aria-hidden="true">
                6
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <p className={cx(styles.kicker, styles.rv)}>Inteligencia artificial</p>
                <h2 className={cx(styles.h2, styles.rv, styles.d1)} id="t6">
                  ¿Trae IA? Sí, pero no es Copilot+.
                </h2>
                <p className={cx(styles.lead, styles.rv, styles.d2)}>
                  La potencia de IA se mide en TOPS. Este equipo tiene NPU de 15 TOPS; la gama Copilot+ PC arranca en 40.
                </p>
              </div>
              <div
                className={cx(styles.scale, styles.rv, styles.d3)}
                role="img"
                aria-label="Escala de TOPS: este equipo 15, Copilot+ PC desde 40, Snapdragon X 45, Ryzen AI 50"
              >
                <div className={styles.scaleTrack} aria-hidden="true">
                  <div className={styles.scaleFill} />
                  <div className={styles.scaleCop} />
                  <div className={styles.dash} />
                  <span className={styles.dashL}>Copilot+ PC desde aquí · 40</span>
                  <div className={styles.comp} style={{ left: "75%" }}>
                    <i />
                    <span>
                      <b>45</b>Snapdragon X
                    </span>
                  </div>
                  <div className={styles.comp} style={{ left: "83.33%" }}>
                    <i />
                    <span>
                      <b>50</b>Ryzen AI
                    </span>
                  </div>
                  <div className={styles.mark}>
                    <span className={styles.markPill}>Este equipo · 15</span>
                    <span className={styles.markStem} />
                    <span className={styles.markDot} />
                  </div>
                  <span className={styles.tick} style={{ left: "0%" }}>
                    0
                  </span>
                  <span className={styles.tick} style={{ left: "16.66%" }}>
                    10
                  </span>
                  <span className={styles.tick} style={{ left: "33.33%" }}>
                    20
                  </span>
                  <span className={styles.tick} style={{ left: "50%" }}>
                    30
                  </span>
                  <span className={styles.tick} style={{ left: "100%" }}>
                    60 TOPS
                  </span>
                </div>
              </div>
              <div className={cx(styles.errs, styles.rv, styles.d4)}>
                <h3>Errores comunes en piso</h3>
                <div className={styles.errGrid}>
                  <div className={cx(styles.err, styles.errNo)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                    <p>
                      <b>No digas</b>&#8220;Es un Copilot+ PC.&#8221;
                    </p>
                  </div>
                  <div className={cx(styles.err, styles.errNo)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                    <p>
                      <b>Tampoco digas</b>&#8220;No trae IA.&#8221;
                    </p>
                  </div>
                  <div className={cx(styles.err, styles.errSi)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <p>
                      <b>Mejor di</b>&#8220;Trae su propio chip de IA de 15 TOPS. Los Copilot+ empiezan en 40.&#8221;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7 RAM */}
        <section className={cx(styles.sec, styles.soft, styles.cBlue, inCls(7))} id="s7" data-sec="7" aria-labelledby="t7">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(7)} data-node="7" aria-hidden="true">
                7
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <p className={cx(styles.kicker, styles.rv)}>Memoria RAM</p>
                <h2 className={cx(styles.h2, styles.rv, styles.d1)} id="t7">
                  ¿Qué abre con 8 GB?
                </h2>
                <p className={cx(styles.lead, styles.rv, styles.d2)}>Elige una capacidad y mira qué programas abre con comodidad.</p>
              </div>
              <div className={styles.ram}>
                <div className={cx(styles.rv, styles.d2)}>
                  <div className={styles.segs} role="group" aria-label="Capacidad de RAM">
                    <button type="button" className={cx(styles.seg, ram === 8 && styles.segOn)} aria-pressed={ram === 8} onClick={() => pickRam(8)}>
                      8 GB
                    </button>
                    <button type="button" className={cx(styles.seg, ram === 16 && styles.segOn)} aria-pressed={ram === 16} onClick={() => pickRam(16)}>
                      16 GB
                    </button>
                    <button type="button" className={cx(styles.seg, ram === 32 && styles.segOn)} aria-pressed={ram === 32} onClick={() => pickRam(32)}>
                      32 GB
                    </button>
                  </div>
                  <div className={styles.slot}>
                    <div className={styles.slotH}>Memoria ampliable</div>
                    <div className={styles.slotBay} role="img" aria-label={`Memoria de ${ram} GB DDR5`}>
                      <div className={cx(styles.ramMod, swapN > 0 && (swapN % 2 ? styles.swapA : styles.swapB))} aria-hidden="true">
                        <span className={styles.lbl}>{ram} GB DDR5</span>
                        <span className={styles.chipr} />
                        <span className={styles.chipr} />
                        <span className={styles.chipr} />
                        <span className={styles.chipr} />
                        <span className={styles.pins} />
                      </div>
                    </div>
                    <p className={styles.slotT}>Esta línea admite más memoria. Confirma en la ficha cuánto acepta tu referencia.</p>
                  </div>
                </div>
                <div className={cx(styles.rv, styles.d3)}>
                  <div className={styles.progsH}>
                    <h3 aria-live="polite">
                      Con {ram} GB: {ramCount} de {RAM_PROGRAMAS_X1504.length} programas
                    </h3>
                    <span className={styles.tiny}>Usos orientativos</span>
                  </div>
                  <div className={styles.progs}>
                    {RAM_PROGRAMAS_X1504.map((p) => {
                      const on = p.nivel <= ramTier;
                      return (
                        <div key={p.nombre} className={cx(styles.pr, on && styles.prOn)}>
                          <span className={styles.n}>{p.nombre}</span>
                          <span className={styles.t}>{on ? "Abre con comodidad" : `Desde ${p.nivel === 2 ? "16" : "32"} GB`}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8 SSD */}
        <section className={cx(styles.sec, styles.cViolet, inCls(8))} id="s8" data-sec="8" aria-labelledby="t8">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(8)} data-node="8" aria-hidden="true">
                8
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <p className={cx(styles.kicker, styles.rv)}>Almacenamiento</p>
                <h2 className={cx(styles.h2, styles.rv, styles.d1)} id="t8">
                  SSD de 512 GB.
                </h2>
              </div>
              <div className={cx(styles.ssd, styles.rv, styles.d2)} role="img" aria-label="Comparación de capacidad: 256 GB, 512 GB en este equipo, 1 TB">
                <div className={styles.cap}>
                  <span className={styles.k}>256 GB</span>
                  <span className={styles.bar}>
                    <i className={inCls(8) && styles.w1} />
                  </span>
                </div>
                <div className={cx(styles.cap, styles.capHl)}>
                  <span className={styles.k}>512 GB</span>
                  <span className={styles.bar}>
                    <i className={inCls(8) && styles.w2} />
                    <span className={styles.tag}>Este equipo</span>
                  </span>
                </div>
                <div className={styles.cap}>
                  <span className={styles.k}>1 TB</span>
                  <span className={styles.bar}>
                    <i className={inCls(8) && styles.w3} />
                  </span>
                </div>
              </div>
              <p className={cx(styles.bigquote, styles.rv, styles.d3)}>
                <span className={inCls(8) ? styles.bigquoteSpan : undefined}>&#8220;Prende en segundos y caben tus trabajos, fotos y programas.&#8221;</span>
              </p>
            </div>
          </div>
        </section>

        {/* 9 DISEÑO */}
        <section className={cx(styles.sec, styles.soft, styles.cRed, inCls(9))} id="s9" data-sec="9" aria-labelledby="t9">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(9)} data-node="9" aria-hidden="true">
                9
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <p className={cx(styles.kicker, styles.rv)}>Diseño</p>
                <h2 className={cx(styles.h2, styles.rv, styles.d1)} id="t9">
                  Lo que muestras en piso.
                </h2>
                <p className={cx(styles.lead, styles.rv, styles.d2)}>Cuatro partes para mostrar con el equipo de exhibición en la mano.</p>
              </div>
              <div className={styles.dz}>
                <div className={cx(styles.photo, styles.rv, styles.d2, rev[91] && styles.lit)} data-sec="91">
                  <svg className={styles.rib} viewBox="0 0 1100 560" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M70 -10 L550 520 L1030 -10" stroke="#6B46E0" strokeWidth="26" fill="none" />
                    <path d="M140 -10 L550 440 L960 -10" stroke="#1F6FEB" strokeWidth="26" fill="none" />
                    <path d="M210 -10 L550 360 L890 -10" stroke="#FFC21A" strokeWidth="26" fill="none" />
                    <path d="M280 -10 L550 280 L820 -10" stroke="#D92D20" strokeWidth="26" fill="none" />
                  </svg>
                  <div className={styles.pwrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={styles.lapImg}
                      src={FOTO_TECLADO}
                      alt="Vivobook 15 visto desde arriba: teclado completo con teclado numérico, touchpad y pantalla"
                    />
                    <div className={styles.sglow} aria-hidden="true" />
                    <div className={styles.kglow} aria-hidden="true" />
                  </div>
                </div>
                <div className={styles.parts4}>
                  <article className={cx(styles.pc, styles.rv, styles.d1, styles.cYellow)}>
                    <span className={styles.tag}>Teclado</span>
                    <h3>ErgoSense con numérico</h3>
                    <p>Teclas cómodas con recorrido de 1,4 mm y teclado numérico completo a la derecha.</p>
                    <p className={styles.say2}>
                      <b>Dile</b>&#8220;Escribe algo aquí. Y si haces cuentas o usas Excel, tienes el teclado numérico al lado.&#8221;
                    </p>
                    <div className={styles.mini} aria-hidden="true">
                      <div className={styles.kb}>
                        {Array.from({ length: 30 }, (_, i) => (
                          <i key={i} />
                        ))}
                      </div>
                    </div>
                  </article>
                  <article className={cx(styles.pc, styles.rv, styles.d2, styles.cBlue)}>
                    <span className={styles.tag}>Chasis</span>
                    <h3>Color Quiet Blue</h3>
                    <p>Azul oscuro sobrio que se ve bien en la universidad, la casa o la oficina. Pásaselo al cliente para que lo sienta.</p>
                    <p className={styles.say2}>
                      <b>Dile</b>&#8220;Tócalo: se siente firme, y el color no es el gris de siempre.&#8221;
                    </p>
                    <div className={styles.mini} aria-hidden="true">
                      <div className={styles.chas}>
                        <i />
                        <span>
                          Quiet Blue
                          <small>Azul oscuro sobrio</small>
                        </span>
                      </div>
                    </div>
                  </article>
                  <article className={cx(styles.pc, styles.rv, styles.d3, styles.cViolet)}>
                    <span className={styles.tag}>Pantalla</span>
                    <h3>15,6 pulgadas</h3>
                    <p>Espacio para dos ventanas lado a lado. Arriba, la cámara tiene tapa de privacidad física.</p>
                    <p className={styles.say2}>
                      <b>Dile</b>&#8220;Pon el Word a un lado y el navegador al otro: aquí te caben los dos.&#8221;
                    </p>
                    <div className={styles.mini} aria-hidden="true">
                      <div className={styles.scr}>
                        <em />
                        <i />
                        <i />
                      </div>
                    </div>
                  </article>
                  <article className={cx(styles.pc, styles.rv, styles.d4, styles.cRed)}>
                    <span className={styles.tag}>Bisagra</span>
                    <h3>Abre a 180°</h3>
                    <p>La pantalla baja hasta quedar plana: ideal para mostrar algo a quien está al otro lado de la mesa.</p>
                    <p className={styles.say2}>
                      <b>Dile</b>&#8220;Mira, lo abro del todo para que veas lo mismo que yo.&#8221;
                    </p>
                    <div className={styles.mini} aria-hidden="true">
                      <div className={styles.flatpic}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={FOTO_180} alt="" />
                        <span>ABIERTO A 180°</span>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              <div className={styles.ports}>
                <div className={cx(styles.portsH, styles.rv)}>
                  <h3>Puertos</h3>
                  <span className={styles.tiny}>Recórrelos con el cliente y conéctale algo que use a diario.</span>
                </div>
                <div className={styles.pgrid}>
                  <div className={cx(styles.port, styles.rv, styles.d1, styles.cRed)}>
                    <svg width="72" height="40" viewBox="0 0 66 34" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="60" height="26" rx="4" />
                      <rect x="9" y="9" width="48" height="8" rx="2" />
                      <path d="M14 22h38" strokeDasharray="6 4" />
                    </svg>
                    <b>1 × USB 2.0</b>
                    <span>Mouse, teclado o memoria USB.</span>
                  </div>
                  <div className={cx(styles.port, styles.rv, styles.d2, styles.cOrange)}>
                    <svg width="72" height="40" viewBox="0 0 66 34" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="60" height="26" rx="4" />
                      <rect x="9" y="9" width="48" height="8" rx="2" />
                      <path d="M14 22h38" strokeDasharray="6 4" />
                    </svg>
                    <b>2 × USB 3.2 Gen 1</b>
                    <span>Hasta 5 Gbps: discos externos y memorias rápidas.</span>
                  </div>
                  <div className={cx(styles.port, styles.rv, styles.d3, styles.cYellow)}>
                    <svg width="72" height="40" viewBox="0 0 66 34" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="7" y="6" width="52" height="22" rx="11" />
                      <rect x="15" y="13" width="36" height="8" rx="4" />
                      <path d="M20 17h26" strokeDasharray="4 3" />
                    </svg>
                    <b>1 × USB-C 3.2 Gen 1</b>
                    <span>Se conecta por cualquier lado. Hasta 5 Gbps.</span>
                  </div>
                  <div className={cx(styles.port, styles.rv, styles.d4, styles.cGreen)}>
                    <svg width="72" height="40" viewBox="0 0 66 34" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 4h60v16l-8 10H11L3 20z" />
                      <rect x="10" y="10" width="46" height="7" rx="2" />
                    </svg>
                    <b>1 × HDMI 1.4</b>
                    <span>Al televisor o a un monitor para ver en grande.</span>
                  </div>
                  <div className={cx(styles.port, styles.rv, styles.d5, styles.cBlue)}>
                    <svg width="72" height="40" viewBox="0 0 66 34" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                      <circle cx="33" cy="17" r="13" />
                      <circle cx="33" cy="17" r="7" />
                    </svg>
                    <b>Audio combo jack</b>
                    <span>Audífonos con micrófono en un solo conector.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10 MYASUS (Battery Care) */}
        <section className={cx(styles.sec, styles.cOrange, inCls(10))} id="s10" data-sec="10" aria-labelledby="t10">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(10)} data-node="10" aria-hidden="true">
                10
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <p className={cx(styles.kicker, styles.rv)}>MyASUS</p>
                <h2 className={cx(styles.h2, styles.rv, styles.d1)} id="t10">
                  La app que cuida el equipo.
                </h2>
                <p className={cx(styles.lead, styles.rv, styles.d2)}>
                  Muéstrale al cliente Battery Care: elige hasta dónde carga la batería para que dure más años.
                </p>
              </div>
              <div className={cx(styles.app, styles.rv, styles.d2)}>
                <div className={styles.appTop}>
                  <b>MyASUS · Battery Care</b>
                  <span>Ilustración de referencia, no es captura oficial</span>
                </div>
                <div className={styles.appBody}>
                  <div>
                    <h3>Modo de carga</h3>
                    <div className={styles.modes} role="group" aria-label="Modos de Battery Care">
                      <button type="button" className={cx(styles.mode, batt === 100 && styles.modeOn)} aria-pressed={batt === 100} onClick={() => setBatt(100)}>
                        <span>Carga completa</span>
                        <b>100 %</b>
                      </button>
                      <button type="button" className={cx(styles.mode, batt === 80 && styles.modeOn)} aria-pressed={batt === 80} onClick={() => setBatt(80)}>
                        <span>Equilibrado</span>
                        <b>80 %</b>
                      </button>
                      <button type="button" className={cx(styles.mode, batt === 60 && styles.modeOn)} aria-pressed={batt === 60} onClick={() => setBatt(60)}>
                        <span>Máxima vida útil</span>
                        <b>60 %</b>
                      </button>
                    </div>
                  </div>
                  <div className={styles.battWrap}>
                    <div className={styles.batt} role="img" aria-label={`Batería cargada al ${batt} por ciento`}>
                      <div className={styles.battFill} style={{ width: `${batt}%`, background: battColor }} />
                    </div>
                    <div className={styles.battPct} aria-live="polite">
                      {batt} %
                    </div>
                    <p className={styles.battDesc}>{battDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11 IA + MYASUS */}
        <section className={cx(styles.sec, styles.soft, styles.cBlue, inCls(11))} id="s11" data-sec="11" aria-labelledby="t-ia">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(11)} data-node="11" aria-hidden="true">
                11
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <p className={cx(styles.kicker, styles.rv)}>IA en el día a día</p>
                <h2 className={cx(styles.h2, styles.rv, styles.d1)} id="t-ia">
                  ¿Para qué sirve un PC con IA?
                </h2>
                <p className={cx(styles.lead, styles.rv, styles.d2)}>
                  El Vivobook 15 trae un chip dedicado a la inteligencia artificial: la NPU. Esto es lo que significa para el cliente.
                </p>
              </div>
              <div className={styles.aiflow}>
                <div className={cx(styles.topsBox, styles.rv, styles.d2)}>
                  <span className={styles.topsN}>
                    15<small>TOPS</small>
                  </span>
                  <p>
                    <strong>TOPS = billones de operaciones por segundo.</strong> Es la medida de qué tan rápido el chip de IA hace su
                    trabajo.
                  </p>
                  <div className={styles.chipsrow} role="img" aria-label="Tres cerebros: la CPU para lo general, la GPU para la imagen y la NPU para la IA">
                    <div className={styles.pu}>
                      <b>CPU</b>Lo general: Windows y programas
                    </div>
                    <div className={styles.pu}>
                      <b>GPU</b>La imagen: video y pantalla
                    </div>
                    <div className={cx(styles.pu, styles.puNpu)}>
                      <b>NPU</b>La IA, sin gastar de más
                    </div>
                  </div>
                </div>
                <div className={styles.uses}>
                  <div className={cx(styles.use, styles.rv, styles.d3, styles.cRed)}>
                    <div className={styles.ic} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="2" width="6" height="12" rx="3" />
                        <path d="M5 10a7 7 0 0 0 14 0" />
                        <path d="M12 17v4" />
                        <path d="M2 9v2" />
                        <path d="M22 9v2" />
                      </svg>
                    </div>
                    <div>
                      <h3>Videollamadas más claras</h3>
                      <p>La IA separa la voz del ruido de la casa: la licuadora, el perro o la calle.</p>
                    </div>
                  </div>
                  <div className={cx(styles.use, styles.rv, styles.d4, styles.cGreen)}>
                    <div className={styles.ic} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="17" height="10" rx="2" />
                        <path d="M22 11v2" />
                        <path d="M6 10v4" />
                        <path d="M10 10v4" />
                      </svg>
                    </div>
                    <div>
                      <h3>Rinde la batería en tareas de IA</h3>
                      <p>Cuando una app usa la NPU, el procesador no se esfuerza de más y la batería dura.</p>
                    </div>
                  </div>
                  <div className={cx(styles.use, styles.rv, styles.d5, styles.cViolet)}>
                    <div className={styles.ic} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
                        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
                      </svg>
                    </div>
                    <div>
                      <h3>Listo para las apps nuevas</h3>
                      <p>Cada vez más apps traen funciones de IA, y este equipo tiene con qué correrlas. Lo que aproveche depende de cada app.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx(styles.honest, styles.rv, styles.d3)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <p>
                  <strong>Sé claro con el cliente:</strong> Copilot de Windows funciona porque va por internet. Las funciones exclusivas de
                  los Copilot+ PC piden 40 TOPS o más.
                </p>
              </div>
              <div className={cx(styles.myaH, styles.rv)}>
                <p className={styles.kicker}>MyASUS</p>
                <h3>Las herramientas que ya vienen en el equipo.</h3>
                <p>MyASUS da acceso a las aplicaciones de ASUS para mantener el sistema, actualizar el software, optimizar el rendimiento y pedir soporte posventa.</p>
              </div>
              <div className={styles.mya}>
                <div className={cx(styles.mf, styles.mfWide, styles.rv, styles.d1, styles.cBlue)}>
                  <div className={styles.mi} aria-hidden="true">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <path d="M7 9h10" />
                      <path d="M7 15h10" />
                      <circle cx="10" cy="9" r="1.6" />
                      <circle cx="14" cy="15" r="1.6" />
                    </svg>
                  </div>
                  <h4>MyASUS</h4>
                  <p>El centro de control del equipo: actualizaciones, soporte, registro y garantía en un solo lugar.</p>
                </div>
                <div className={cx(styles.mf, styles.rv, styles.d2, styles.cGreen)}>
                  <div className={styles.mi} aria-hidden="true">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 9a15 15 0 0 1 20 0" />
                      <path d="M5.5 12.5a10 10 0 0 1 13 0" />
                      <path d="M9 16a5 5 0 0 1 6 0" />
                      <path d="M12 19.5h.01" />
                    </svg>
                  </div>
                  <h4>WiFi SmartConnect</h4>
                  <p>Se conecta a la mejor red WiFi disponible.</p>
                </div>
                <div className={cx(styles.mf, styles.rv, styles.d3, styles.cRed)}>
                  <div className={styles.mi} aria-hidden="true">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="2" width="6" height="12" rx="3" />
                      <path d="M5 10a7 7 0 0 0 14 0" />
                      <path d="M12 17v4" />
                      <path d="M2 8v4" />
                      <path d="M22 8v4" />
                    </svg>
                  </div>
                  <h4>Cancelación de ruido con IA</h4>
                  <p>Limpia el ruido de fondo en tus videollamadas.</p>
                </div>
                <div className={cx(styles.mf, styles.rv, styles.d1, styles.cOrange)}>
                  <div className={styles.mi} aria-hidden="true">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="12" height="9" rx="1.5" />
                      <path d="M1 18h14" />
                      <rect x="17" y="5" width="5" height="12" rx="1.2" />
                      <path d="M8 2h8l-2-1.5" />
                      <path d="M16 22H8l2 1.5" />
                    </svg>
                  </div>
                  <h4>Transferencia de archivos</h4>
                  <p>Pasa fotos y archivos entre el celular y el PC.</p>
                </div>
                <div className={cx(styles.mf, styles.rv, styles.d2, styles.cYellow)}>
                  <div className={styles.mi} aria-hidden="true">
                    <svg className={styles.spin} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="1.5" />
                      <path d="M12 10.5c0-3 1-5 3.5-5.5 1 2.5-.5 4.5-3.5 5.5z" />
                      <path d="M13.3 12.8c2.6 1.5 3.8 3.4 3 5.8-2.6-.4-3.4-2.8-3-5.8z" />
                      <path d="M10.7 12.8c-2.6 1.5-4.9 1.4-6.3-.7 2-1.8 4.4-1.1 6.3.7z" />
                    </svg>
                  </div>
                  <h4>Perfil de ventiladores</h4>
                  <p>Elige entre silencio o más rendimiento.</p>
                </div>
                <div className={cx(styles.mf, styles.rv, styles.d3, styles.cViolet)}>
                  <div className={styles.mi} aria-hidden="true">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="5" />
                      <circle cx="8.5" cy="14.5" r="5" />
                      <circle cx="15.5" cy="14.5" r="5" />
                    </svg>
                  </div>
                  <h4>Perfil de color de pantalla</h4>
                  <p>Ajusta los colores de la pantalla a tu gusto.</p>
                </div>
                <div className={cx(styles.mf, styles.rv, styles.d4, styles.cGreen)}>
                  <div className={styles.mi} aria-hidden="true">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="10.5" cy="10.5" r="7.5" />
                      <path d="M21 21l-5.2-5.2" />
                      <path d="M5.5 10.5h2.5l1.5-3 2 6 1.5-3h1.5" />
                    </svg>
                  </div>
                  <h4>Diagnóstico con un clic</h4>
                  <p>Revisa el equipo y encuentra fallas sin llevarlo al servicio técnico.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12 GARANTÍA */}
        <section className={cx(styles.sec, styles.cYellow, inCls(12))} id="s12" data-sec="12" aria-labelledby="t11">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(12)} data-node="12" aria-hidden="true">
                12
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.war}>
                <div className={cx(styles.sealw, styles.rv)}>
                  <span className={styles.ring} aria-hidden="true" />
                  <div className={styles.seal} role="img" aria-label="Sello: 2 años de garantía de fábrica">
                    <span className={styles.n} aria-hidden="true">
                      2
                    </span>
                    <span className={styles.a} aria-hidden="true">
                      años
                    </span>
                    <span className={styles.s} aria-hidden="true">
                      Garantía de fábrica
                    </span>
                  </div>
                </div>
                <div className={styles.head} style={{ maxWidth: 560 }}>
                  <p className={cx(styles.kicker, styles.rv, styles.d1)}>Garantía</p>
                  <h2 className={cx(styles.h2, styles.rv, styles.d2)} id="t11">
                    2 años de garantía de fábrica.
                  </h2>
                  <p className={cx(styles.lead, styles.rv, styles.d3)}>Dale tranquilidad al cliente: es una compra respaldada directamente por la marca.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 13 GANCHOS Y OBJECIONES */}
        <section className={cx(styles.sec, styles.soft, styles.cGreen, inCls(13))} id="s13" data-sec="13" aria-labelledby="t12">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={nodeCls(13)} data-node="13" aria-hidden="true">
                13
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <p className={cx(styles.kicker, styles.rv)}>Ganchos y objeciones</p>
                <h2 className={cx(styles.h2, styles.rv, styles.d1)} id="t12">
                  Lo que dices para abrir y para cerrar.
                </h2>
                <p className={cx(styles.lead, styles.rv, styles.d2)}>Toca cada tarjeta para ver el gancho.</p>
              </div>
              <div className={styles.g4}>
                {HOOKS_X1504.map((h, i) => (
                  <div key={h.who} className={cx(styles.rv, styles.d3)} style={{ "--hc": h.color } as React.CSSProperties}>
                    <button
                      type="button"
                      className={cx(styles.flip, fl[i] && styles.flipOn)}
                      aria-pressed={!!fl[i]}
                      onClick={() => setFl((prev) => ({ ...prev, [i]: !prev[i] }))}
                    >
                      <span className={styles.flipIn}>
                        <span className={cx(styles.face, styles.faceF)}>
                          <span className={styles.who}>{h.who}</span>
                          <span className={styles.hint}>
                            Ver gancho
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M21 12a9 9 0 1 1-3-6.7" />
                              <path d="M21 4v5h-5" />
                            </svg>
                          </span>
                        </span>
                        <span className={cx(styles.face, styles.faceB)}>
                          <span className={styles.gq}>{h.q}</span>
                          <span className={styles.hint}>Voltear</span>
                        </span>
                      </span>
                    </button>
                  </div>
                ))}
              </div>
              <h3 className={cx(styles.subh, styles.rv)}>Objeciones</h3>
              <div className={cx(styles.acc, styles.rv, styles.d1)}>
                <details>
                  <summary>
                    &#8220;¿Tiene IA?&#8221;
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </summary>
                  <p className={styles.ans}>
                    <b>Sí.</b> Trae su propio chip de IA (NPU de 15 TOPS). No es de la gama Copilot+, que empieza en 40 TOPS.
                  </p>
                </details>
                <details>
                  <summary>
                    &#8220;¿8 GB no es poquito?&#8221;
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </summary>
                  <p className={styles.ans}>
                    <b>Para estudio y oficina va bien.</b> Y si más adelante necesitas más, la memoria se puede ampliar.
                  </p>
                </details>
                <details>
                  <summary>
                    &#8220;El otro dice 5,0 GHz&#8221;
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </summary>
                  <p className={styles.ans}>
                    <b>Los GHz no lo dicen todo.</b> Este es de generación nueva y trae chip de IA; compara la generación, no solo la velocidad.
                  </p>
                </details>
                <details>
                  <summary>
                    &#8220;¿Sirve para juegos?&#8221;
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </summary>
                  <p className={styles.ans}>
                    <b>Juegos livianos, sí</b> (Minecraft, Roblox). Para juegos pesados, muéstrale la línea TUF.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* 13 CIERRE: nodo final */}
        <div className={styles.closeTop} data-sec="14" id="cierre">
          <div className={styles.inner}>
            <div className={styles.nodecol}>
              <div className={cx(styles.bignode, lit[14] && styles.bignodeOn)} data-node="14" role="img" aria-label="Recorrido completado">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>
            <div />
          </div>
        </div>
      </main>

      <section className={cx(styles.close, inCls(14))} aria-labelledby="t13">
        <svg className={styles.closeRib} viewBox="0 0 1100 560" aria-hidden="true">
          <path d="M70 -10 L550 520 L1030 -10" stroke="#6B46E0" strokeWidth="22" fill="none" />
          <path d="M120 -10 L550 465 L980 -10" stroke="#1F6FEB" strokeWidth="22" fill="none" />
          <path d="M170 -10 L550 410 L930 -10" stroke="#22B35E" strokeWidth="22" fill="none" />
          <path d="M220 -10 L550 355 L880 -10" stroke="#FFC21A" strokeWidth="22" fill="none" />
          <path d="M270 -10 L550 300 L830 -10" stroke="#FF7A1A" strokeWidth="22" fill="none" />
          <path d="M320 -10 L550 245 L780 -10" stroke="#D92D20" strokeWidth="22" fill="none" />
        </svg>
        <div className={styles.inner}>
          <div />
          <div className={styles.closeC}>
            <h2 className={styles.rv} id="t13">
              Listo. <span>Ahora, a entrenar.</span>
            </h2>
            <p className={cx(styles.rv, styles.d1)}>Ya conoces el Vivobook 15 de punta a punta. Responde el quiz: con 6 de 6 desbloqueas la insignia.</p>
            <div className={cx(styles.quiz, styles.rv, styles.d2)} id="quiz">
              <div className={styles.quizH}>
                <h3>Quiz rápido</h3>
                <span className={styles.score} aria-live="polite">
                  {score} de {QUIZ_X1504.length} correctas
                </span>
              </div>
              <div className={styles.qs}>
                {QUIZ_X1504.map((q, i) => {
                  const chosen = qa[i];
                  const done = chosen !== undefined;
                  return (
                    <div key={q.pregunta} className={styles.q}>
                      <span className={styles.qn}>Pregunta {i + 1}</span>
                      <p className={styles.qt}>{q.pregunta}</p>
                      <div className={styles.opts} role="group" aria-label={q.pregunta}>
                        {q.opciones.map((label, j) => (
                          <button
                            key={label}
                            type="button"
                            className={cx(
                              styles.opt,
                              done && j === q.correcta && styles.optOk,
                              done && j === chosen && chosen !== q.correcta && styles.optBad,
                            )}
                            aria-pressed={done && j === chosen}
                            onClick={() => setQa((prev) => ({ ...prev, [i]: j }))}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <p className={styles.fb}>{!done ? "Elige una respuesta." : (chosen === q.correcta ? "Correcto. " : "No es esa. ") + q.explicacion}</p>
                    </div>
                  );
                })}
              </div>
              <div className={styles.btns}>
                <button type="button" className={cx(styles.btn, styles.btnGhost)} onClick={() => setQa({})}>
                  Reiniciar quiz
                </button>
                <a className={cx(styles.btn, styles.btnLight)} href="#mapa">
                  Volver al mapa
                </a>
              </div>
            </div>
            <div className={cx(styles.badge, styles.rv, styles.d3, !won && styles.badgeLocked)}>
              <div className={styles.medal} aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="9" r="6" />
                  <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
                </svg>
              </div>
              <div>
                <b>Experto Vivobook 15</b>
                <span aria-live="polite">{won ? "Insignia desbloqueada. Ya puedes con el piso." : "Responde las 6 bien para desbloquearla"}</span>
              </div>
            </div>
            <p className={styles.foot}>
              Concepto de Kaisen Design Studio para entrenamiento de asesores. No es un sitio oficial de ASUS. Especificaciones de referencia; confírmalas con la ficha técnica vigente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
