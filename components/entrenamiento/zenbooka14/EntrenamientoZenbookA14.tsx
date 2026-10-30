"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./EntrenamientoZenbookA14.css";
import {
  QUIZ_ZENBOOK_A14,
  PASOS_ZENBOOK_A14,
  PERFILES_ZENBOOK_A14,
  PROPIEDADES_MATERIAL_ZENBOOK_A14,
  TONOS_ZENBOOK_A14,
  SPECS_OLED_ZENBOOK_A14,
  FEATS_COPILOT_ZENBOOK_A14,
  PUERTOS_ZENBOOK_A14,
  OBJECIONES_ZENBOOK_A14,
} from "./zenbookA14Data";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Este archivo trae su propia hoja de estilos como CSS normal (no CSS
 * Modules: la regla de Turbopack del proyecto enruta todo *.css por el
 * loader de Tailwind, que no genera el mapa de clases que un .module.css
 * necesita — mismo hallazgo que en EntrenamientoVivobook15X1504.tsx).
 * `styles.algo` devuelve el nombre de clase tal cual para que coincida con
 * EntrenamientoZenbookA14.css.
 */
const styles = new Proxy({} as Record<string, string>, {
  get: (_target, prop: string) => prop,
});

const ASSET_BASE = "/entrenamientos/zenbook-a14";
const LOGO_ASUS = `${ASSET_BASE}/asus-logo.png`;
const FOTO_BACK = `${ASSET_BASE}/zenbook-a14-back.webp`;
const FOTO_FRONT = `${ASSET_BASE}/zenbook-a14-front.webp`;
const FOTO_PUERTOS = `${ASSET_BASE}/zenbook-a14-ports.webp`;

/** Orden real en el DOM (la sección "Por dentro" usa data-sec=11 pero está
 * ubicada entre Copilot+ y Batería): así se numeró en el diseño fuente, y el
 * cálculo de avance (measure()) depende de este orden real, no del numérico. */
const SEC_ORDEN_DOM = [1, 2, 3, 4, 5, 6, 7, 11, 8, 9, 10] as const;
const NOMBRES_SECCION = [
  "",
  "Inicio",
  "El plan",
  "Para quién es",
  "Ligereza",
  "Ceraluminum",
  "Lumina OLED",
  "Copilot+ PC",
  "Batería",
  "Puertos y cámara",
  "Cierra la venta",
  "Por dentro",
];
const DISPLAY_SECCION = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 8];

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

/**
 * "Entrenamiento Zenbook A14": scroll-story de 11 secciones (hero, mapa,
 * perfiles de cliente, ligereza, Ceraluminum, Lumina OLED, Copilot+ PC, por
 * dentro, batería, puertos, cierre con objeciones y quiz de 6 preguntas),
 * con revelado al hacer scroll, barra de progreso, selector de color del
 * chasis, comparador OLED/LCD con slider y quiz interactivo.
 *
 * Fuente: diseño de Kaisen Design Studio (Entrenamiento_Zenbook_A14.html),
 * convertido 1:1 a React/CSS conservando estructura, paleta, tipografías e
 * interacciones. Mecánica de revelado: scroll + rAF leyendo
 * getBoundingClientRect de cada [data-sec] (igual que el original, no
 * IntersectionObserver), con el mismo umbral del 80 % de la altura de
 * ventana. Las fotos del equipo venían como data: URI incrustadas en el
 * HTML original; se extrajeron a archivos reales en public/entrenamientos/
 * zenbook-a14/.
 */
export function EntrenamientoZenbookA14() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const [phase, setPhase] = useState(0);
  const [rev, setRev] = useState<Record<number, boolean>>({});
  const [curSec, setCurSec] = useState(1);
  const [pct, setPct] = useState(0);
  const [tone, setTone] = useState<keyof typeof TONOS_ZENBOOK_A14>("gray");
  const [oledVal, setOledVal] = useState(50);
  const [qa, setQa] = useState<Record<number, number>>({});
  const oledBoxRef = useRef<HTMLDivElement>(null);

  function moverComparadorOled(clientX: number) {
    const box = oledBoxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setOledVal(Math.min(95, Math.max(5, Math.round(pct))));
  }

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const vh = window.innerHeight || 900;
    const secs = Array.from(root.querySelectorAll<HTMLElement>("[data-sec]"));
    if (secs.length === 0) return;

    let cur = 1;
    const recien: number[] = [];
    secs.forEach((s) => {
      const i = Number(s.dataset.sec);
      const r = s.getBoundingClientRect();
      if (r.top < vh * 0.8) recien.push(i);
      if (r.top < vh * 0.45) cur = i;
    });

    setRev((prev) => {
      let changed = false;
      const next = { ...prev };
      recien.forEach((i) => {
        if (!next[i]) {
          next[i] = true;
          changed = true;
        }
      });
      return changed ? next : prev;
    });
    setCurSec((prev) => (prev === cur ? prev : cur));

    const first = secs[0].getBoundingClientRect().top;
    const last = secs[secs.length - 1].getBoundingClientRect().bottom;
    const total = last - first - vh;
    const nextPct = total > 0 ? Math.max(0, Math.min(100, Math.round((-first / total) * 100))) : 0;
    setPct((prev) => (prev === nextPct ? prev : nextPct));
  }, []);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    if (reduced) {
      const fullRev: Record<number, boolean> = {};
      SEC_ORDEN_DOM.forEach((i) => {
        fullRev[i] = true;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRev(fullRev);
      setPhase(3);
      return;
    }

    [
      [150, 1],
      [1900, 2],
      [2500, 3],
    ].forEach(([delay, p]) => {
      timers.push(setTimeout(() => setPhase(p), delay));
    });

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        measure();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    timers.push(setTimeout(onScroll, 60));
    timers.push(setTimeout(onScroll, 600));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const heroPhaseClass = Array.from({ length: phase }, (_, i) => styles[`p${i + 1}`]).join(" ");
  const inCls = (id: number) => (rev[id] ? styles.in : "");

  const toneVars = TONOS_ZENBOOK_A14[tone];

  function answer(qIndex: number, optIndex: number) {
    setQa((prev) => ({ ...prev, [qIndex]: optIndex }));
  }
  function resetQuiz() {
    setQa({});
  }
  const score = QUIZ_ZENBOOK_A14.reduce((acc, q, i) => acc + (qa[i] === q.correcta ? 1 : 0), 0);
  const won = score === QUIZ_ZENBOOK_A14.length;

  return (
    <div
      ref={rootRef}
      className={cx(styles.page, styles.zp)}
      style={
        {
          "--tone": toneVars.tone,
          "--tone-l": toneVars.toneL,
          "--tone-ink": toneVars.toneInk,
        } as React.CSSProperties
      }
      data-label="Zenbook A14 · Plan de entrenamiento"
    >
      <header className={styles.bar}>
        <div className={styles.barIn}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_ASUS} alt="ASUS" />
          <span className={styles.ttl}>Entrenamiento · Zenbook A14</span>
          <span className={styles.sp} />
          <a className={styles.go} href="#z-mapa">
            Ver el plan
          </a>
        </div>
        <div
          className={styles.prog}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-label="Avance del recorrido"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        />
      </header>
      <div className={styles.idx} aria-live="polite">
        <b>{pad2(DISPLAY_SECCION[curSec])}</b>
        {NOMBRES_SECCION[curSec]}
      </div>

      {/* 01 HERO */}
      <section className={cx(styles.sec, styles.hero, heroPhaseClass)} data-sec={1} aria-labelledby="z1">
        <div className={styles.wrap}>
          <div>
            <p className={cx(styles.kick, styles.hfade)}>ASUS Zenbook A14 · UX3407 · Copilot+ PC</p>
            <h1 className={styles.h1} id="z1">
              Zenbook
              <b>A14</b>
            </h1>
            <p className={cx(styles.lead, styles.hfade, styles.hd1)}>
              Menos de 1 kg, chasis de Ceraluminum y batería para todo el día. El portátil que el cliente siente
              liviano antes de que le digas el peso.
            </p>
            <div className={cx(styles.chips, styles.hfade, styles.hd2)}>
              <span className={styles.chip}>14&quot; Lumina OLED</span>
              <span className={styles.chip}>Snapdragon X X1-26-100</span>
              <span className={styles.chip}>NPU 45 TOPS</span>
              <span className={styles.chip}>16 GB · 1 TB</span>
              <span className={styles.chip}>70 Wh</span>
            </div>
            <span className={cx(styles.ref, styles.hfade, styles.hd3)}>Referencia en Colombia: UX3407QA-QD232W</span>
          </div>
          <div className={styles.turn}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.tBack}
              src={FOTO_BACK}
              alt="Zenbook A14 color Iceland Gray visto desde atrás, con la tapa abierta"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.tFront}
              src={FOTO_FRONT}
              alt="Zenbook A14 abierto de frente, con el fondo de pantalla de Windows 11"
            />
            <span className={styles.floor} aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 02 MAPA */}
      <section className={cx(styles.sec, inCls(2))} id="z-mapa" data-sec={2} aria-labelledby="z2">
        <div className={styles.wrap}>
          <p className={styles.num}>02 — EL PLAN</p>
          <h2 className={styles.h2} id="z2">
            <span className={styles.wipe}>
              <span>Nueve paradas.</span>
            </span>
            <span className={cx(styles.wipe, styles.w2)}>
              <span>
                <b>Un cliente convencido.</b>
              </span>
            </span>
          </h2>
          <p className={cx(styles.time, styles.fade, styles.f1)}>
            12 minutos aprox. · termina con un quiz de 6 preguntas
          </p>
          <nav className={cx(styles.steps, styles.fade, styles.f2)} aria-label="Paradas del entrenamiento">
            {PASOS_ZENBOOK_A14.map((paso) => (
              <a className={styles.step} href={paso.href} key={paso.href}>
                <span className={styles.n}>{paso.numero}</span>
                <span className={styles.b}>{paso.bloque}</span>
                <span className={styles.t}>{paso.titulo}</span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* 03 PERFILES */}
      <section className={cx(styles.sec, inCls(3))} id="z3" data-sec={3} aria-labelledby="z3t">
        <div className={styles.wrap}>
          <p className={styles.num}>03 — PARA QUIÉN ES</p>
          <h2 className={styles.h2} id="z3t">
            <span className={styles.wipe}>
              <span>Cuatro clientes que</span>
            </span>
            <span className={cx(styles.wipe, styles.w2)}>
              <span>
                <b>lo van a cargar todos los días.</b>
              </span>
            </span>
          </h2>
          <div className={styles.g4}>
            {PERFILES_ZENBOOK_A14.map((perfil, i) => (
              <article className={cx(styles.card, styles.fade, styles[`f${i + 1}`])} key={perfil.id}>
                <span className={styles.ic} aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </span>
                <h3>{perfil.titulo}</h3>
                <p className="c">{perfil.copy}</p>
                <p className={styles.say}>
                  <b>Dile</b>
                  &ldquo;{perfil.dile}&rdquo;
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 LIGEREZA */}
      <section className={cx(styles.sec, inCls(4))} id="z4" data-sec={4} aria-labelledby="z4t">
        <div className={styles.wrap}>
          <p className={styles.num}>04 — LIGEREZA</p>
          <h2 className={styles.h2} id="z4t">
            <span className={styles.wipe}>
              <span>Menos de</span>
            </span>
            <span className={cx(styles.wipe, styles.w2)}>
              <span>
                <b>un kilo.</b>
              </span>
            </span>
          </h2>
          <div className={styles.light}>
            <div className={cx(styles.fade, styles.f1)}>
              <p className={styles.big} aria-label="Aproximadamente 0,98 kilogramos">
                0,<span className={styles.kg} />
                <small>kg</small>
              </p>
              <p className={styles.lead}>978 gramos: un poco menos que una botella de agua de un litro.</p>
              <p className={styles.say} style={{ marginTop: 28, maxWidth: 520 }}>
                <b>El gesto</b>
                Ciérralo y pásaselo al cliente con una mano. No le digas el peso primero: deja que lo sienta y luego
                lo confirmas.
              </p>
            </div>
            <div
              className={cx(styles.seesaw, styles.fade, styles.f2)}
              role="img"
              aria-label="Balanza en equilibrio: el Zenbook A14 de un lado y una botella de agua de un litro del otro"
            >
              <span className={styles.beam} />
              <span className={styles.fulcrum} />
              <div className={cx(styles.pan, styles.l)}>
                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="16" y="8" width="88" height="56" rx="4" />
                  <path d="M4 70h112l-6 6H10z" />
                </svg>
                Zenbook A14
                <br />
                978 g
              </div>
              <div className={cx(styles.pan, styles.r)}>
                <svg width="60" height="110" viewBox="0 0 60 110" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 4h16v12c8 4 14 10 14 20v64a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V36c0-10 6-16 14-20z" />
                  <path d="M8 54h44" />
                </svg>
                1 litro de agua
                <br />≈ 1 kg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 MATERIAL */}
      <section className={cx(styles.sec, inCls(5))} id="z5" data-sec={5} aria-labelledby="z5t">
        <div className={styles.wrap}>
          <p className={styles.num}>05 — CERALUMINUM</p>
          <h2 className={styles.h2} id="z5t">
            <span className={styles.wipe}>
              <span>Cerámica y aluminio.</span>
            </span>
            <span className={cx(styles.wipe, styles.w2)}>
              <span>
                <b>Se siente distinto.</b>
              </span>
            </span>
          </h2>
          <div className={styles.mat}>
            <div
              className={cx(styles.tile, styles.fade, styles.f1)}
              role="img"
              aria-label="Muestra del acabado Ceraluminum en el color seleccionado"
            >
              <svg className={styles.print} width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                <path d="M12 11c0 3-1 6-3 8" />
                <path d="M8 6a7 7 0 0 1 11 5c0 2 0 4-.5 6" />
                <path d="M5 9a7 7 0 0 0-.5 3c0 2-.5 3-1.5 4" />
                <path d="M12 7a4 4 0 0 1 4 4c0 3-.5 5-1.5 7" />
                <path d="M8 11a4 4 0 0 1 .5-2" />
              </svg>
              <p className={styles.lbl}>
                <small>Acabado</small>
                {toneVars.nombre}
              </p>
            </div>
            <div className={cx(styles.fade, styles.f2)}>
              <div className={styles.props}>
                {PROPIEDADES_MATERIAL_ZENBOOK_A14.map((prop) => (
                  <div className={styles.prop} key={prop.id}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" />
                    </svg>
                    <div>
                      <h3>{prop.titulo}</h3>
                      <p>{prop.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.note} style={{ marginTop: 24 }}>
                Prueba los colores: todo el material cambia de tono.
              </p>
              <div className={styles.tones} role="group" aria-label="Color del equipo">
                {(Object.keys(TONOS_ZENBOOK_A14) as Array<keyof typeof TONOS_ZENBOOK_A14>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={cx(styles.tone, tone === key && styles.on)}
                    aria-pressed={tone === key}
                    onClick={() => setTone(key)}
                  >
                    <i style={{ background: TONOS_ZENBOOK_A14[key].tone }} />
                    {TONOS_ZENBOOK_A14[key].nombre}
                  </button>
                ))}
              </div>
              <p className={styles.note}>
                La referencia UX3407QA-QD232W viene en Iceland Gray. El Zabriskie Beige existe en otras referencias
                del Zenbook A14.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 OLED */}
      <section className={cx(styles.sec, styles.dark, inCls(6))} id="z6" data-sec={6} aria-labelledby="z6t">
        <div className={styles.wrap}>
          <p className={styles.num}>06 — LUMINA OLED</p>
          <h2 className={styles.h2} id="z6t">
            <span className={styles.wipe}>
              <span>El negro se ve negro.</span>
            </span>
            <span className={cx(styles.wipe, styles.w2)}>
              <span>
                <b>Desliza y compara.</b>
              </span>
            </span>
          </h2>
          <p className={cx(styles.lead, styles.fade, styles.f1)}>
            En una pantalla OLED cada punto se apaga solo; por eso el negro es puro y los colores resaltan. En una
            LCD típica la luz de fondo nunca se apaga del todo.
          </p>
          <div
            ref={oledBoxRef}
            className={cx(styles.oled, styles.fade, styles.f2)}
            role="img"
            aria-label="Comparación ilustrativa entre negro de pantalla OLED y de pantalla LCD. Arrastra para comparar."
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              moverComparadorOled(e.clientX);
            }}
            onPointerMove={(e) => {
              if (e.buttons !== 1) return;
              moverComparadorOled(e.clientX);
            }}
          >
            <div className={cx(styles.layer, styles.lcd)} />
            <div className={cx(styles.layer, styles.ol)} style={{ clipPath: `inset(0 ${100 - oledVal}% 0 0)` }} />
            <span className={styles.handle} style={{ left: `${oledVal}%` }} />
            <span className={cx(styles.tag, styles.l)}>OLED</span>
            <span className={cx(styles.tag, styles.r)}>LCD típica</span>
          </div>
          <div className={cx(styles.slider, styles.fade, styles.f2)}>
            <label htmlFor="oledr">Mover la comparación</label>
            <input
              id="oledr"
              type="range"
              min={5}
              max={95}
              value={oledVal}
              onChange={(e) => setOledVal(Number(e.target.value))}
            />
          </div>
          <div className={cx(styles.specs, styles.fade, styles.f3)}>
            {SPECS_OLED_ZENBOOK_A14.map((spec) => (
              <div className={styles.spec} key={spec.id}>
                <div className={styles.v}>{spec.valor}</div>
                <div className={styles.k}>{spec.copy}</div>
              </div>
            ))}
          </div>
          <p className={styles.note}>
            Ilustración de referencia, no es una captura de la pantalla real. Muestra el efecto en el equipo de
            exhibición con una imagen oscura.
          </p>
        </div>
      </section>

      {/* 07 COPILOT+ */}
      <section className={cx(styles.sec, inCls(7))} id="z7" data-sec={7} aria-labelledby="z7t">
        <div className={styles.wrap}>
          <p className={styles.num}>07 — COPILOT+ PC</p>
          <h2 className={styles.h2} id="z7t">
            <span className={styles.wipe}>
              <span>IA en el equipo,</span>
            </span>
            <span className={cx(styles.wipe, styles.w2)}>
              <span>
                <b>no solo en la nube.</b>
              </span>
            </span>
          </h2>
          <div className={styles.ai}>
            <div className={cx(styles.tops, styles.fade, styles.f1)}>
              <p className={styles.kick}>NPU Qualcomm Hexagon</p>
              <p className={styles.big} aria-label="45 TOPS">
                <span className={styles.tp} />
                <small>TOPS</small>
              </p>
              <p className={styles.lead} style={{ marginTop: 0 }}>
                Snapdragon X X1-26-100: 8 núcleos hasta 2,97 GHz y una NPU de 45 TOPS. Para ser Copilot+ PC se
                necesitan 40 o más.
              </p>
              <div
                className={styles.meter}
                role="img"
                aria-label="Escala de 0 a 80 TOPS, con la línea de Copilot+ PC en 40 y este equipo en 45"
              >
                <i />
                <span className={styles.thr}>
                  <span>Copilot+ desde 40</span>
                </span>
                <div className={styles.ticks}>
                  <span>0</span>
                  <span>20</span>
                  <span>40</span>
                  <span>60</span>
                  <span>80</span>
                </div>
              </div>
            </div>
            <div className={cx(styles.fade, styles.f2)}>
              <div className={styles.feats}>
                {FEATS_COPILOT_ZENBOOK_A14.map((feat) => (
                  <div className={styles.feat} key={feat.id}>
                    <h3>{feat.titulo}</h3>
                    <p>{feat.copy}</p>
                  </div>
                ))}
              </div>
              <div className={styles.arm}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <p>
                  <strong>Pregúntale qué programas usa.</strong> El Snapdragon funciona diferente a Intel o AMD:
                  Office, navegadores, Teams, Zoom y la mayoría de apps corren sin problema, pero algunos programas
                  antiguos, drivers especiales o juegos con anti-trampa pueden no funcionar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 POR DENTRO (data-sec=11, entre Copilot+ y Batería) */}
      <section className={cx(styles.sec, inCls(11))} id="z11" data-sec={11} aria-labelledby="z11t">
        <div className={styles.wrap}>
          <p className={styles.num}>08 — POR DENTRO</p>
          <h2 className={styles.h2} id="z11t">
            <span className={styles.wipe}>
              <span>Lo que no se ve</span>
            </span>
            <span className={cx(styles.wipe, styles.w2)}>
              <span>
                <b>y sí se nota.</b>
              </span>
            </span>
          </h2>
          <p className={cx(styles.lead, styles.fade, styles.f1)}>
            Memoria, disco y conexiones de la referencia UX3407QA-QD232W, con lo que significa cada cosa para el
            cliente.
          </p>
          <div className={styles.inside}>
            <article className={cx(styles.tech, styles.wide, styles.fade, styles.f1)}>
              <div className={styles.tk}>Memoria RAM</div>
              <p className={styles.tv}>
                16 GB <span>LPDDR5X</span>
              </p>
              <div className={styles.mem} aria-hidden="true">
                {Array.from({ length: 8 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
              <p className={styles.td}>
                Memoria de alta velocidad y bajo consumo, soldada a la placa: no se puede ampliar. Alcanza para
                Office, navegador con muchas pestañas y videollamadas al mismo tiempo.
              </p>
              <p className={styles.say}>
                <b>Dile</b>
                &ldquo;Trae 16 GB de memoria LPDDR5X, de las más rápidas en portátiles. No se amplía, por eso ASUS ya
                la pone en la medida justa.&rdquo;
              </p>
            </article>
            <article className={cx(styles.tech, styles.wide, styles.fade, styles.f2)}>
              <div className={styles.tk}>Almacenamiento</div>
              <p className={styles.tv}>
                1 TB <span>SSD NVMe PCIe 4.0</span>
              </p>
              <div className={styles.disk} aria-hidden="true">
                <i />
              </div>
              <p className={styles.td}>
                Disco sólido M.2 de 1 TB: Windows prende rápido y caben miles de fotos, videos y trabajos. Va en una
                ranura M.2 2280, así que se puede cambiar por uno más grande.
              </p>
              <p className={styles.say}>
                <b>Dile</b>
                &ldquo;Un tera para guardar todo sin depender de la nube, y abre programas en segundos.&rdquo;
              </p>
            </article>
            <article className={cx(styles.tech, styles.fade, styles.f1)}>
              <span className={styles.ti} aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path className={styles.w3} d="M2 9a15 15 0 0 1 20 0" />
                  <path className={styles.w2} d="M5.5 12.5a10 10 0 0 1 13 0" />
                  <path className={styles.w1} d="M9 16a5 5 0 0 1 6 0" />
                  <path d="M12 19.5h.01" />
                </svg>
              </span>
              <div className={styles.tk}>Conectividad</div>
              <p className={cx(styles.tv, styles.sm)}>Wi-Fi 6E · Bluetooth 5.3</p>
              <p className={styles.td}>Wi-Fi 6E tri-banda usa la banda de 6 GHz: menos interferencia en lugares con muchas redes.</p>
            </article>
            <article className={cx(styles.tech, styles.fade, styles.f2)}>
              <span className={styles.ti} aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0" />
                  <path d="M12 17v4" />
                </svg>
              </span>
              <div className={styles.tk}>Audio</div>
              <p className={cx(styles.tv, styles.sm)}>Smart Amp · micrófonos en arreglo</p>
              <p className={styles.td}>Parlantes con amplificador inteligente y micrófonos que captan bien la voz en las llamadas.</p>
            </article>
            <article className={cx(styles.tech, styles.fade, styles.f3)}>
              <span className={styles.ti} aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <div className={styles.tk}>Seguridad</div>
              <p className={cx(styles.tv, styles.sm)}>Windows Hello IR · Microsoft Pluton</p>
              <p className={styles.td}>Entra con la cara y el chip de seguridad Pluton protege las credenciales del equipo.</p>
            </article>
            <article className={cx(styles.tech, styles.fade, styles.f4)}>
              <span className={styles.ti} aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="8" height="8" rx="1" />
                  <rect x="13" y="3" width="8" height="8" rx="1" />
                  <rect x="3" y="13" width="8" height="8" rx="1" />
                  <rect x="13" y="13" width="8" height="8" rx="1" />
                </svg>
              </span>
              <div className={styles.tk}>Sistema y gráficos</div>
              <p className={cx(styles.tv, styles.sm)}>Windows 11 Home · Adreno</p>
              <p className={styles.td}>Gráficos Qualcomm Adreno integrados: video en alta calidad y edición liviana.</p>
            </article>
          </div>
        </div>
      </section>

      {/* 09 BATERÍA (data-sec=8) */}
      <section className={cx(styles.sec, inCls(8))} id="z8" data-sec={8} aria-labelledby="z8t">
        <div className={styles.wrap}>
          <p className={styles.num}>09 — BATERÍA</p>
          <h2 className={styles.h2} id="z8t">
            <span className={styles.wipe}>
              <span>Sal sin el cargador.</span>
            </span>
            <span className={cx(styles.wipe, styles.w2)}>
              <span>
                <b>Vuelve con batería.</b>
              </span>
            </span>
          </h2>
          <div className={styles.batt}>
            <div className={cx(styles.ring, styles.fade, styles.f1)} role="img" aria-label="Hasta 32 horas de reproducción de video">
              <svg width="300" height="300" viewBox="0 0 300 300" aria-hidden="true">
                <circle className={styles.bg} cx="150" cy="150" r="140" />
                <circle className={styles.fg} cx="150" cy="150" r="140" />
              </svg>
              <div className={styles.c} aria-hidden="true">
                <span className={styles.hr} />
                <span>
                  horas de video
                  <br />
                  según pruebas de ASUS
                </span>
              </div>
            </div>
            <div className={cx(styles.bfacts, styles.fade, styles.f2)}>
              <div className={styles.bf}>
                <div className={styles.v}>70 Wh</div>
                <div className={styles.k}>Batería grande para un equipo de menos de un kilo</div>
              </div>
              <div className={styles.bf}>
                <div className={styles.v}>0 dB</div>
                <div className={styles.k}>Modo Whisper: en tareas livianas trabaja en silencio</div>
              </div>
              <div className={styles.bf}>
                <div className={styles.v}>USB-C</div>
                <div className={styles.k}>Carga por USB-C con cargador de 65 W</div>
              </div>
            </div>
          </div>
          <p className={styles.note}>
            Las horas de batería son de pruebas de ASUS reproduciendo video; en uso real varían según el brillo, las
            apps y la configuración. Confirma la cifra de tu referencia.
          </p>
        </div>
      </section>

      {/* 10 PUERTOS (data-sec=9) */}
      <section className={cx(styles.sec, inCls(9))} id="z9" data-sec={9} aria-labelledby="z9t">
        <div className={styles.wrap}>
          <p className={styles.num}>10 — PUERTOS Y CÁMARA</p>
          <h2 className={styles.h2} id="z9t">
            <span className={styles.wipe}>
              <span>Delgado, pero</span>
            </span>
            <span className={cx(styles.wipe, styles.w2)}>
              <span>
                <b>sin adaptadores.</b>
              </span>
            </span>
          </h2>
          <div className={styles.ports}>
            <div className={cx(styles.pimg, styles.fade, styles.f1)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FOTO_PUERTOS} alt="Lado derecho del Zenbook A14 con HDMI, dos USB-C y jack de audio" />
              <span className={cx(styles.dot, styles.d1)} style={{ left: "65%", top: "93%" }} />
              <span className={cx(styles.dot, styles.d2)} style={{ left: "70%", top: "92%" }} />
              <span className={cx(styles.dot, styles.d3)} style={{ left: "72.5%", top: "91%" }} />
              <span className={cx(styles.dot, styles.d4)} style={{ left: "76%", top: "89%" }} />
            </div>
            <div className={cx(styles.fade, styles.f2)}>
              <div className={styles.plist}>
                {PUERTOS_ZENBOOK_A14.map((puerto) => (
                  <div className={styles.pl} key={puerto.id}>
                    <svg width="48" height="26" viewBox="0 0 66 34" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="7" y="6" width="52" height="22" rx="11" />
                    </svg>
                    <div>
                      <b>{puerto.titulo}</b>
                      <span>{puerto.copy}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.ir}>
                <span className={styles.eye} aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <p>
                  <strong>Cámara IR con Windows Hello.</strong> El cliente entra con la cara, sin escribir
                  contraseña. Configúralo en el equipo de exhibición para mostrarlo.
                </p>
              </div>
              <p className={styles.note}>No trae lector de tarjetas SD: si el cliente usa cámara de fotos, ofrécele un lector USB-C.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11 CIERRE (data-sec=10) */}
      <section className={cx(styles.sec, inCls(10))} id="z10" data-sec={10} aria-labelledby="z10t">
        <div className={styles.wrap}>
          <p className={styles.num}>11 — CIERRA LA VENTA</p>
          <h2 className={styles.h2} id="z10t">
            <span className={styles.wipe}>
              <span>Lo que te van a preguntar</span>
            </span>
            <span className={cx(styles.wipe, styles.w2)}>
              <span>
                <b>y cómo responder.</b>
              </span>
            </span>
          </h2>
          <div className={cx(styles.acc, styles.fade, styles.f1)}>
            {OBJECIONES_ZENBOOK_A14.map((obj) => (
              <details key={obj.id}>
                <summary>
                  &ldquo;{obj.pregunta}&rdquo;
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </summary>
                <p className={styles.ans}>
                  <b>{obj.respuestaFuerte}</b> {obj.respuesta}
                </p>
              </details>
            ))}
          </div>

          <div className={styles.qhead} id="z-quiz">
            <h3>Quiz rápido</h3>
            <span className={styles.score} aria-live="polite">
              {score} de {QUIZ_ZENBOOK_A14.length} correctas
            </span>
          </div>
          <div className={styles.qs}>
            {QUIZ_ZENBOOK_A14.map((q, qi) => {
              const elegida = qa[qi];
              const respondida = elegida !== undefined;
              return (
                <div className={styles.q} key={q.pregunta}>
                  <span className={styles.qn}>Pregunta {qi + 1}</span>
                  <p className={styles.qt}>{q.pregunta}</p>
                  <div className={styles.opts} role="group" aria-label={q.pregunta}>
                    {q.opciones.map((opcion, oi) => (
                      <button
                        key={opcion}
                        type="button"
                        className={cx(
                          styles.opt,
                          respondida && oi === q.correcta && styles.ok,
                          respondida && oi === elegida && elegida !== q.correcta && styles.bad,
                        )}
                        aria-pressed={respondida && oi === elegida}
                        onClick={() => answer(qi, oi)}
                      >
                        {opcion}
                      </button>
                    ))}
                  </div>
                  <p className={styles.fb}>
                    {!respondida
                      ? "Elige una respuesta."
                      : `${elegida === q.correcta ? "Correcto. " : "No es esa. "}${q.feedback}`}
                  </p>
                </div>
              );
            })}
          </div>
          <div className={styles.qbtns}>
            <button type="button" className={styles.btn} onClick={resetQuiz}>
              Reiniciar quiz
            </button>
            <a className={cx(styles.btn, styles.solid)} href="#z-mapa">
              Volver al plan
            </a>
          </div>
          <div className={cx(styles.badge, won && styles.won, styles.fade, styles.f2)}>
            <span className={styles.md} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="9" r="6" />
                <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
              </svg>
            </span>
            <div>
              <b>Experto Zenbook A14</b>
              <span aria-live="polite">{won ? "Insignia desbloqueada." : "Responde las 6 bien para desbloquearla"}</span>
            </div>
          </div>
          <p className={styles.foot}>
            Concepto de Kaisen Design Studio para entrenamiento de asesores. No es un sitio oficial de ASUS. Datos de
            la referencia UX3407QA-QD232W (Snapdragon X X1-26-100, 16 GB, 1 TB, OLED WUXGA). Otras versiones del
            Zenbook A14 cambian procesador, peso y pantalla; confírmalas con la ficha técnica vigente.
          </p>
        </div>
      </section>
    </div>
  );
}
