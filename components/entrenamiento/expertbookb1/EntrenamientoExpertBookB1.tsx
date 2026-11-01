"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./EntrenamientoExpertBookB1.css";
import {
  AGENDA_EXPERTBOOK_B1,
  CLIENTES_EXPERTBOOK_B1,
  DESPIECE_EXPERTBOOK_B1,
  FICHA_TABS_EXPERTBOOK_B1,
  AUDITORIA_EXPERTBOOK_B1,
  METRICAS_EXPERTBOOK_B1,
  SEGURIDAD_EXPERTBOOK_B1,
  WINDOWS_PRO_EXPERTBOOK_B1,
  PUERTOS_PRINCIPAL_EXPERTBOOK_B1,
  PUERTOS_SECUNDARIO_EXPERTBOOK_B1,
  OBJECIONES_EXPERTBOOK_B1,
  QUIZ_EXPERTBOOK_B1,
} from "./expertbookB1Data";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Este archivo trae su propia hoja de estilos como CSS normal (no CSS
 * Modules: la regla de Turbopack del proyecto enruta todo *.css por el
 * loader de Tailwind, que no genera el mapa de clases que un .module.css
 * necesita). `styles.algo` devuelve el nombre de clase tal cual para que
 * coincida con EntrenamientoExpertBookB1.css.
 */
const styles = new Proxy({} as Record<string, string>, {
  get: (_target, prop: string) => prop,
});

const ASSET_BASE = "/entrenamientos/expertbook-b1";
const LOGO_ASUS = `${ASSET_BASE}/expertbook-b1-asus-logo.png`;
const FOTO_HERO_BG = `${ASSET_BASE}/expertbook-b1-hero-bg.webp`;
const FOTO_HERO = `${ASSET_BASE}/expertbook-b1-hero.webp`;
const FOTO_BACK = `${ASSET_BASE}/expertbook-b1-back.webp`;
const FOTO_WINDOWS = `${ASSET_BASE}/expertbook-b1-windows-front.webp`;

const SEC_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const NOMBRES_SECCION: Record<number, string> = {
  1: "Inicio",
  2: "Agenda",
  3: "Clientes",
  4: "Despiece",
  5: "Ficha técnica",
  6: "Resistencia",
  7: "Seguridad",
  8: "Windows 11 Pro",
  9: "Conectividad",
  10: "Evaluación",
};

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

/**
 * "Entrenamiento ExpertBook B1": scroll-story de 10 secciones (hero, agenda,
 * a quién se lo vendes, despiece capa por capa, ficha técnica con pestañas,
 * medidas y resistencia con auditoría animada, seguridad por capas (anillos),
 * Windows 11 Pro interactivo, puertos/conectividad, y cierre con objeciones
 * en acordeón + evaluación de 10 preguntas), con revelado al hacer scroll,
 * barra de progreso y módulo actual en la barra superior.
 *
 * Fuente: diseño de Kaisen Design Studio
 * (D:\DESCARGAS\Entrenamiento_ExpertBook_B1.html, título "Entrenamiento
 * ExpertBook B1"), convertido 1:1 a React/CSS conservando estructura,
 * paleta (#ECEEF1 / #1E5FD9 / IBM Plex Sans + Mono), tipografías,
 * interacciones y los textos reales de ficha técnica, despiece, auditoría de
 * durabilidad, capas de seguridad, funciones de Windows 11 Pro, puertos,
 * objeciones y las 10 preguntas del quiz embebido (`var Q`). Mecánica de
 * revelado: scroll + rAF leyendo getBoundingClientRect de cada [data-sec]
 * (igual que el script original, no IntersectionObserver), con el mismo
 * umbral del 80% de la altura de ventana. Las 5 fotos venían como data: URI
 * incrustadas en el HTML original; se extrajeron a archivos reales en
 * public/entrenamientos/expertbook-b1/.
 */
export function EntrenamientoExpertBookB1() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const auditStartedRef = useRef(false);
  const auditTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const [heroGo, setHeroGo] = useState(false);
  const [rev, setRev] = useState<Record<number, boolean>>({});
  const [doneAgenda, setDoneAgenda] = useState<Record<number, boolean>>({});
  const [curSec, setCurSec] = useState(1);
  const [pct, setPct] = useState(0);

  const [layer, setLayer] = useState<string | null>(null);
  const [tab, setTab] = useState("p1");
  const [ring, setRing] = useState<string | null>(null);
  const [auditChecked, setAuditChecked] = useState<boolean[]>(
    AUDITORIA_EXPERTBOOK_B1.map(() => false),
  );
  const [winActivados, setWinActivados] = useState<Set<number>>(() => new Set([0]));
  const [winSeleccionado, setWinSeleccionado] = useState(0);

  const [qa, setQa] = useState<Record<number, number>>({});

  const runAudit = useCallback(() => {
    AUDITORIA_EXPERTBOOK_B1.forEach((_item, i) => {
      const t = setTimeout(
        () => {
          setAuditChecked((prev) => {
            if (prev[i]) return prev;
            const next = [...prev];
            next[i] = true;
            return next;
          });
        },
        reduced ? 0 : 600 + i * 450,
      );
      auditTimersRef.current.push(t);
    });
  }, [reduced]);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const vh = window.innerHeight || 900;
    const secs = Array.from(root.querySelectorAll<HTMLElement>("[data-sec]"));
    if (secs.length === 0) return;

    let cur = 1;
    const recien: number[] = [];
    const doneNow: number[] = [];
    secs.forEach((s) => {
      const i = Number(s.dataset.sec);
      const r = s.getBoundingClientRect();
      if (r.top < vh * 0.8) {
        recien.push(i);
        if (i === 6 && !auditStartedRef.current) {
          auditStartedRef.current = true;
          runAudit();
        }
      }
      if (r.top < vh * 0.45) cur = i;
      if (r.bottom < vh * 0.5) doneNow.push(i);
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
    setDoneAgenda((prev) => {
      let changed = false;
      const next = { ...prev };
      doneNow.forEach((i) => {
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
  }, [runAudit]);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    if (reduced) {
      const fullRev: Record<number, boolean> = {};
      SEC_IDS.forEach((i) => {
        fullRev[i] = true;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRev(fullRev);
      setHeroGo(true);
      if (!auditStartedRef.current) {
        auditStartedRef.current = true;
        runAudit();
      }
    } else {
      timers.push(setTimeout(() => setHeroGo(true), 120));
    }

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
    timers.push(setTimeout(onScroll, 700));

    const auditTimers = auditTimersRef.current;
    return () => {
      timers.forEach(clearTimeout);
      auditTimers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const inCls = (id: number) => (rev[id] ? styles.in : "");

  function pickLayer(l: string) {
    setLayer(l);
  }
  function pickRing(n: string) {
    setRing(n);
  }
  function elegirFuncionWindows(i: number) {
    setWinActivados((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });
    setWinSeleccionado(i);
  }

  function answer(qIndex: number, optIndex: number) {
    setQa((prev) => ({ ...prev, [qIndex]: optIndex }));
  }
  function resetQuiz() {
    setQa({});
  }

  const score = QUIZ_EXPERTBOOK_B1.reduce((acc, q, i) => acc + (qa[i] === q.correcta ? 1 : 0), 0);
  const respondidas = Object.keys(qa).length;
  const won = score === QUIZ_EXPERTBOOK_B1.length;
  const auditVerificadas = auditChecked.filter(Boolean).length;
  const winActivo = WINDOWS_PRO_EXPERTBOOK_B1[winSeleccionado];

  return (
    <div ref={rootRef} className={cx(styles.page, styles.eb)} data-label="ExpertBook B1 · Plan de entrenamiento corporativo">
      <header className={styles.top}>
        <div className={styles.topIn}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_ASUS} alt="ASUS" />
          <span className={styles.seg}>Segmento corporativo · ExpertBook</span>
          <span className={styles.sp} />
          <span className={styles.mod} aria-live="polite">
            Módulo {pad2(curSec)} · {NOMBRES_SECCION[curSec]}
          </span>
          <a className={styles.go} href="#e-ag">
            Ver agenda
          </a>
        </div>
        <div
          className={styles.pb}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-label="Avance de la capacitación"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        />
      </header>

      {/* 01 HERO */}
      <section className={cx(styles.sec, styles.hero, heroGo && styles.go)} id="e1" data-sec={1} data-name="Inicio" aria-labelledby="eh1">
        <div className={styles.hbg} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FOTO_HERO_BG} alt="" />
        </div>
        <div className={styles.wrap}>
          <div className={styles.hcopy}>
            <p className={styles.k}>ASUS ExpertBook · Línea corporativa</p>
            <h1 className={styles.h1} id="eh1">
              <span className={styles.ln}>
                <span>ExpertBook</span>
              </span>
              <span className={styles.ln}>
                <span>B1 · 14&quot;</span>
              </span>
            </h1>
            <p className={styles.lead}>
              El portátil de trabajo para empresas: Windows 11 Pro, seguridad por capas y durabilidad de grado
              militar, a un precio de flota.
            </p>
            <div className={styles.chips}>
              <span className={styles.chip}>Intel Core 5 120U</span>
              <span className={styles.chip}>16 GB DDR5</span>
              <span className={styles.chip}>SSD 512 GB</span>
              <span className={styles.chip}>MIL-STD-810H</span>
            </div>
            <p className={styles.ref}>Referencia: B1403CVA · color gris plata</p>
          </div>
          <div className={styles.hx}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FOTO_HERO}
              alt="Dos ExpertBook B1 color gris plata cruzados en forma de X, uno de espaldas y otro abierto con la pantalla encendida"
            />
            <span className={styles.prism} aria-hidden="true" />
            <span className={styles.hshadow} aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 02 AGENDA */}
      <section className={cx(styles.sec, inCls(2))} id="e-ag" data-sec={2} data-name="Agenda" aria-labelledby="eh2">
        <div className={styles.wrap}>
          <p className={cx(styles.tag, styles.rv)}>
            <b>02</b>Orden del día
          </p>
          <h2 className={cx(styles.h2, styles.rv, styles.r1)} id="eh2">
            Capacitación corporativa. <span>Ocho módulos.</span>
          </h2>
          <p className={cx(styles.lead, styles.rv, styles.r2)}>
            Cada módulo se marca como completado a medida que avanzas. Duración aproximada: 15 minutos, con
            evaluación técnica de 10 preguntas.
          </p>
          <nav className={cx(styles.agenda, styles.rv, styles.r3)} aria-label="Módulos de la capacitación">
            {AGENDA_EXPERTBOOK_B1.map((item) => (
              <a className={cx(styles.ag, doneAgenda[Number(item.numero)] && styles.done)} href={item.href} key={item.href}>
                <span className={styles.t}>{item.tiempo}</span>
                <span className={styles.n}>{item.numero}</span>
                <span className={styles.x}>
                  {item.titulo}
                  <small>{item.subtitulo}</small>
                </span>
                <span className={styles.m}>{item.duracion}</span>
                <span className={styles.c} aria-hidden="true">
                  ✓
                </span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* 03 CLIENTES */}
      <section className={cx(styles.sec, inCls(3))} id="e3" data-sec={3} data-name="Clientes" aria-labelledby="eh3">
        <div className={styles.wrap}>
          <p className={cx(styles.tag, styles.rv)}>
            <b>03</b>A quién se lo vendes
          </p>
          <h2 className={cx(styles.h2, styles.rv, styles.r1)} id="eh3">
            El cliente corporativo <span>no compra un portátil: compra tranquilidad.</span>
          </h2>
          <div className={styles.g4}>
            {CLIENTES_EXPERTBOOK_B1.map((cliente, i) => (
              <article className={cx(styles.cl, styles.card, styles.rv, styles[`r${i + 1}`])} key={cliente.id}>
                <span className={styles.ic} aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {cliente.id === "pyme" && (
                      <>
                        <rect x="3" y="7" width="18" height="13" rx="2" />
                        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </>
                    )}
                    {cliente.id === "ti" && (
                      <>
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8" />
                        <path d="M12 17v4" />
                        <path d="M7 8h4" />
                        <path d="M7 11h7" />
                      </>
                    )}
                    {cliente.id === "independiente" && (
                      <>
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21a8 8 0 0 1 16 0" />
                      </>
                    )}
                    {cliente.id === "gobierno" && (
                      <>
                        <path d="M22 10 12 5 2 10l10 5 10-5z" />
                        <path d="M6 12v5c3 2 9 2 12 0v-5" />
                      </>
                    )}
                  </svg>
                </span>
                <h3>{cliente.titulo}</h3>
                <p className="c">{cliente.copy}</p>
                <p className={styles.say}>
                  <b>Dile</b>
                  &ldquo;{cliente.dile}&rdquo;
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 DESPIECE */}
      <section className={cx(styles.sec, inCls(4))} id="e4" data-sec={4} data-name="Despiece" aria-labelledby="eh4">
        <div className={styles.wrap}>
          <p className={cx(styles.tag, styles.rv)}>
            <b>04</b>Despiece del equipo
          </p>
          <h2 className={cx(styles.h2, styles.rv, styles.r1)} id="eh4">
            Ábrelo capa por capa. <span>Toca cada una.</span>
          </h2>
          <div className={styles.xpl}>
            <div className={cx(styles.stage, styles.rv, styles.r1)} aria-hidden="true">
              <div className={styles.iso} id="iso">
                <div className={cx(styles.pl, styles.c1, layer === "1" && styles.on)} style={{ "--i": 0 } as React.CSSProperties} data-l="1" />
                <div className={cx(styles.pl, styles.c4, layer === "2" && styles.on)} style={{ "--i": 1 } as React.CSSProperties} data-l="2" />
                <div className={cx(styles.pl, styles.c3, layer === "3" && styles.on)} style={{ "--i": 2 } as React.CSSProperties} data-l="3">
                  <span className={styles.ram} />
                  <span className={styles.chip3} />
                  <span className={styles.ssd} />
                </div>
                <div className={cx(styles.pl, styles.c2, layer === "4" && styles.on)} style={{ "--i": 3 } as React.CSSProperties} data-l="4">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className={cx(styles.pl, styles.c5, layer === "5" && styles.on)} style={{ "--i": 4 } as React.CSSProperties} data-l="5" />
              </div>
            </div>
            <div className={cx(styles.legend, styles.rv, styles.r2)} role="list">
              {DESPIECE_EXPERTBOOK_B1.map((capa) => (
                <button
                  type="button"
                  className={cx(styles.lg, layer === capa.l && styles.on)}
                  data-l={capa.l}
                  role="listitem"
                  key={capa.l}
                  onClick={() => pickLayer(capa.l)}
                  onMouseEnter={() => pickLayer(capa.l)}
                >
                  <span className={styles.nn}>{capa.numero}</span>
                  <span>
                    <b>{capa.titulo}</b>
                    <span>{capa.copy}</span>
                    <span className={styles.mono}>{capa.mono}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 FICHA */}
      <section className={cx(styles.sec, inCls(5))} id="e5" data-sec={5} data-name="Ficha técnica" aria-labelledby="eh5">
        <div className={styles.wrap}>
          <p className={cx(styles.tag, styles.rv)}>
            <b>05</b>Ficha técnica desglosada
          </p>
          <h2 className={cx(styles.h2, styles.rv, styles.r1)} id="eh5">
            Cada dato, <span>y lo que significa para el cliente.</span>
          </h2>
          <div className={cx(styles.tabs, styles.rv, styles.r2)} role="tablist" aria-label="Categorías de la ficha">
            {FICHA_TABS_EXPERTBOOK_B1.map((t) => (
              <button
                type="button"
                className={cx(styles.tb, tab === t.id && styles.on)}
                role="tab"
                aria-selected={tab === t.id}
                key={t.id}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className={cx(styles.sheet, styles.card, styles.rv, styles.r3)}>
            {FICHA_TABS_EXPERTBOOK_B1.map((t) => (
              <div className={cx(styles.pane, tab === t.id && styles.on)} id={t.id} role="tabpanel" key={t.id}>
                {t.rows.map((row) => (
                  <div className={styles.row} key={row.k2}>
                    <span className={styles.k2}>{row.k2}</span>
                    <span className={styles.v}>{row.v}</span>
                    <span className={styles.w}>{row.w}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 MEDIDAS Y RESISTENCIA */}
      <section className={cx(styles.sec, inCls(6))} id="e6" data-sec={6} data-name="Resistencia" aria-labelledby="eh6">
        <div className={styles.wrap}>
          <p className={cx(styles.tag, styles.rv)}>
            <b>06</b>Medidas y resistencia
          </p>
          <h2 className={cx(styles.h2, styles.rv, styles.r1)} id="eh6">
            Hecho para la oficina real. <span>Con pruebas militares.</span>
          </h2>
          <div className={cx(styles.plan, styles.rv, styles.r2)}>
            <div className={styles.pimg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FOTO_BACK} alt="ExpertBook B1 visto desde atrás, color gris, con el logo ASUS ExpertBook en la tapa" />
              <span className={cx(styles.dim, styles.w)} aria-hidden="true" />
              <span className={cx(styles.dl, styles.w)}>32,45 cm</span>
              <span className={cx(styles.dim, styles.h)} aria-hidden="true" />
              <span className={cx(styles.dl, styles.h)}>21,44 cm</span>
              <span className={styles.pdot} style={{ left: "37.4%", top: "91.9%" }}>
                <span>USB-A</span>
              </span>
              <span className={cx(styles.pdot, styles.k2d)} style={{ left: "46.9%", top: "92.5%" }}>
                <span>Kensington Nano</span>
              </span>
            </div>
          </div>
          <div className={styles.mets}>
            {METRICAS_EXPERTBOOK_B1.map((met, i) => (
              <div className={cx(styles.met, styles.card, styles.rv, styles[`r${i + 1}`])} key={met.copy}>
                <div className={styles.v}>
                  {met.valor}
                  <small>{met.unidad}</small>
                </div>
                <div className={styles.k3}>{met.copy}</div>
              </div>
            ))}
          </div>
          <div className={styles.aud}>
            <div className={cx(styles.chk, styles.card, styles.rv, styles.r2)}>
              <h3>Auditoría de durabilidad</h3>
              <div className={styles.cl2}>
                {AUDITORIA_EXPERTBOOK_B1.map((texto, i) => (
                  <div className={cx(styles.ci, auditChecked[i] && styles.ok)} key={texto}>
                    <span className={styles.bx} aria-hidden="true">
                      ✓
                    </span>
                    <span>{texto}</span>
                    <span className={styles.st}>{auditChecked[i] ? "VERIFICADO" : "PENDIENTE"}</span>
                  </div>
                ))}
              </div>
              <div className={styles.meter} aria-hidden="true">
                <i style={{ width: `${Math.round((auditVerificadas / AUDITORIA_EXPERTBOOK_B1.length) * 100)}%` }} />
              </div>
            </div>
            <div className={cx(styles.mil, styles.rv, styles.r3)}>
              <p className={styles.big}>
                MIL-STD-810H
                <small>NORMA DE DURABILIDAD DEL DEPARTAMENTO DE DEFENSA DE EE. UU.</small>
              </p>
              <p>
                ASUS somete la línea ExpertBook a pruebas basadas en esta norma para resistir el uso diario de
                oficina: traslados, golpes y cambios de ambiente.
              </p>
              <p>Dilo bien: el equipo es más resistente, no indestructible, y la norma no reemplaza la garantía.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 SEGURIDAD */}
      <section className={cx(styles.sec, inCls(7))} id="e7" data-sec={7} data-name="Seguridad" aria-labelledby="eh7">
        <div className={styles.wrap}>
          <p className={cx(styles.tag, styles.rv)}>
            <b>07</b>Seguridad por capas
          </p>
          <h2 className={cx(styles.h2, styles.rv, styles.r1)} id="eh7">
            Cuatro capas <span>entre la información y el riesgo.</span>
          </h2>
          <div className={styles.sec4}>
            <div className={cx(styles.rings, styles.rv, styles.r1)} aria-hidden="true">
              <span className={cx(styles.rg, styles.r4, ring === "4" && styles.on)}>
                <span>FÍSICA</span>
              </span>
              <span className={cx(styles.rg, styles.r3, ring === "3" && styles.on)}>
                <span>SISTEMA</span>
              </span>
              <span className={cx(styles.rg, styles.r2, ring === "2" && styles.on)}>
                <span>FIRMWARE</span>
              </span>
              <span className={cx(styles.rg, styles.r1, ring === "1" && styles.on)}>
                <span>HARDWARE</span>
              </span>
              <span className={styles.lock}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </span>
            </div>
            <div className={styles.layers}>
              {SEGURIDAD_EXPERTBOOK_B1.map((capa, i) => (
                <button
                  type="button"
                  className={cx(styles.ly, styles.card, styles.rv, styles[`r${i + 1}`], ring === capa.ring && styles.on)}
                  data-ring={capa.ring}
                  key={capa.ring}
                  onClick={() => pickRing(capa.ring)}
                  onMouseEnter={() => pickRing(capa.ring)}
                >
                  <span className={styles.li} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {capa.ring === "1" && (
                        <>
                          <rect x="5" y="5" width="14" height="14" rx="2" />
                          <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
                        </>
                      )}
                      {capa.ring === "2" && (
                        <>
                          <path d="M4 4h16v16H4z" />
                          <path d="M8 9h8M8 13h5" />
                        </>
                      )}
                      {capa.ring === "3" && (
                        <>
                          <rect x="3" y="3" width="8" height="8" rx="1" />
                          <rect x="13" y="3" width="8" height="8" rx="1" />
                          <rect x="3" y="13" width="8" height="8" rx="1" />
                          <rect x="13" y="13" width="8" height="8" rx="1" />
                        </>
                      )}
                      {capa.ring === "4" && (
                        <>
                          <circle cx="12" cy="12" r="3" />
                          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                          <path d="M3 3l18 18" />
                        </>
                      )}
                    </svg>
                  </span>
                  <span>
                    <b>{capa.titulo}</b>
                    <span>{capa.copy}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 08 WINDOWS PRO */}
      <section className={cx(styles.sec, inCls(8))} id="e8" data-sec={8} data-name="Windows 11 Pro" aria-labelledby="eh8">
        <div className={styles.wrap}>
          <p className={cx(styles.tag, styles.rv)}>
            <b>08</b>Windows 11 Pro
          </p>
          <h2 className={cx(styles.h2, styles.rv, styles.r1)} id="eh8">
            Lo que la empresa puede hacer <span>y en Home no.</span>
          </h2>
          <p className={cx(styles.lead, styles.rv, styles.r2)}>
            Activa cada función y mira qué le permite al cliente. Así explicas por qué Pro vale la diferencia.
          </p>
          <div className={styles.win}>
            <div className={cx(styles.panel, styles.card, styles.rv, styles.r2)}>
              <div className={styles.ph}>
                <i aria-hidden="true" />
                Configuración · Funciones Pro
              </div>
              {WINDOWS_PRO_EXPERTBOOK_B1.map((opcion, i) => (
                <button
                  type="button"
                  className={cx(styles.opt, winActivados.has(i) && styles.act, winSeleccionado === i && styles.sel)}
                  data-w={i}
                  key={opcion.listLabel}
                  onClick={() => elegirFuncionWindows(i)}
                >
                  <span>
                    <b>{opcion.listLabel}</b>
                    <span>{opcion.listSub}</span>
                  </span>
                  <span className={styles.sw} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className={cx(styles.wd, styles.card, styles.rv, styles.r3)} aria-live="polite">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.wimg} src={FOTO_WINDOWS} alt="ExpertBook B1 abierto de frente con el fondo de pantalla de Windows 11" />
              <span className={styles.kk}>Función Pro {winSeleccionado + 1} de {WINDOWS_PRO_EXPERTBOOK_B1.length}</span>
              <h3>{winActivo.titulo}</h3>
              <p>{winActivo.descripcion}</p>
              <p className={styles.ex}>
                <b>Ejemplo para el cliente</b>
                <span>{winActivo.ejemplo}</span>
              </p>
            </div>
          </div>
          <p className={styles.note}>
            Algunas funciones (como Hyper-V o Windows Sandbox) deben activarse en la configuración de Windows. Si la
            unidad trae Windows 11 Home, se puede actualizar a Pro con una licencia.
          </p>
        </div>
      </section>

      {/* 09 PUERTOS */}
      <section className={cx(styles.sec, inCls(9))} id="e9" data-sec={9} data-name="Conectividad" aria-labelledby="eh9">
        <div className={styles.wrap}>
          <p className={cx(styles.tag, styles.rv)}>
            <b>09</b>Puertos y conectividad
          </p>
          <h2 className={cx(styles.h2, styles.rv, styles.r1)} id="eh9">
            Llega a la sala de juntas <span>sin adaptadores.</span>
          </h2>
          <div className={styles.ports}>
            <div className={cx(styles.prt, styles.card, styles.rv, styles.r1)}>
              {PUERTOS_PRINCIPAL_EXPERTBOOK_B1.map((puerto, i) => (
                <div className={styles.pr} key={puerto.titulo}>
                  <svg width="46" height="24" viewBox="0 0 66 34" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin={i === 4 ? undefined : "round"} aria-hidden="true">
                    {i === 0 && (
                      <>
                        <rect x="7" y="6" width="52" height="22" rx="11" />
                        <rect x="15" y="13" width="36" height="8" rx="4" />
                      </>
                    )}
                    {i === 1 && (
                      <>
                        <rect x="3" y="4" width="60" height="26" rx="4" />
                        <rect x="9" y="9" width="48" height="8" rx="2" />
                      </>
                    )}
                    {i === 2 && (
                      <>
                        <rect x="12" y="3" width="42" height="28" rx="2" />
                        <path d="M24 31v-8h18v8" />
                        <path d="M26 11h2M32 11h2M38 11h2" />
                      </>
                    )}
                    {i === 3 && (
                      <>
                        <path d="M3 4h60v16l-8 10H11L3 20z" />
                        <rect x="10" y="10" width="46" height="7" rx="2" />
                      </>
                    )}
                    {i === 4 && (
                      <>
                        <circle cx="33" cy="17" r="13" />
                        <circle cx="33" cy="17" r="6" />
                      </>
                    )}
                  </svg>
                  <div>
                    <b>{puerto.titulo}</b>
                    <span>{puerto.copy}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={cx(styles.prt, styles.card, styles.rv, styles.r2)}>
              {PUERTOS_SECUNDARIO_EXPERTBOOK_B1.map((puerto, i) => (
                <div className={styles.pr} key={puerto.titulo}>
                  <svg width="46" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {i === 0 && (
                      <>
                        <path d="M2 9a15 15 0 0 1 20 0" />
                        <path d="M5.5 12.5a10 10 0 0 1 13 0" />
                        <path d="M9 16a5 5 0 0 1 6 0" />
                        <path d="M12 19.5h.01" />
                      </>
                    )}
                    {i === 1 && <path d="m7 7 10 10-5 5V2l5 5L7 17" />}
                    {i === 2 && (
                      <>
                        <rect x="2" y="6" width="14" height="12" rx="2" />
                        <path d="m16 10 6-3v10l-6-3" />
                      </>
                    )}
                    {i === 3 && (
                      <>
                        <rect x="9" y="2" width="6" height="12" rx="3" />
                        <path d="M5 10a7 7 0 0 0 14 0" />
                        <path d="M12 17v4" />
                      </>
                    )}
                  </svg>
                  <div>
                    <b>{puerto.titulo}</b>
                    <span>{puerto.copy}</span>
                  </div>
                </div>
              ))}
              <p className={styles.say}>
                <b>Dile</b>
                &ldquo;Conectas el cable de red, el proyector y el mouse sin comprar adaptadores, y con un dock
                USB-C dejas el puesto de trabajo listo con un solo cable.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 EVALUACIÓN */}
      <section className={cx(styles.sec, inCls(10))} id="e10" data-sec={10} data-name="Evaluación" aria-labelledby="eh10">
        <div className={styles.wrap}>
          <p className={cx(styles.tag, styles.rv)}>
            <b>10</b>Objeciones y evaluación
          </p>
          <h2 className={cx(styles.h2, styles.rv, styles.r1)} id="eh10">
            Responde como experto. <span>Luego, demuéstralo.</span>
          </h2>
          <div className={cx(styles.acc, styles.rv, styles.r2)}>
            {OBJECIONES_EXPERTBOOK_B1.map((obj) => (
              <details key={obj.id}>
                <summary>
                  &ldquo;{obj.pregunta}&rdquo;
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
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

          <div className={styles.evh}>
            <h3>Evaluación técnica</h3>
            <span className={styles.sc} aria-live="polite">
              {score} / {QUIZ_EXPERTBOOK_B1.length} correctas
            </span>
          </div>
          <div className={styles.evbar} aria-hidden="true">
            <i style={{ width: `${(respondidas / QUIZ_EXPERTBOOK_B1.length) * 100}%` }} />
          </div>
          <div className={styles.qs}>
            {QUIZ_EXPERTBOOK_B1.map((q, qi) => {
              const elegida = qa[qi];
              const respondida = elegida !== undefined;
              return (
                <div className={cx(styles.q, styles.card)} key={q.pregunta}>
                  <span className={styles.qn}>
                    PREGUNTA {pad2(qi + 1)} / {QUIZ_EXPERTBOOK_B1.length}
                  </span>
                  <p className={styles.qt}>{q.pregunta}</p>
                  <div className={styles.opts} role="group" aria-label={q.pregunta}>
                    {q.opciones.map((opcion, oi) => (
                      <button
                        type="button"
                        key={opcion}
                        className={cx(
                          styles.ans2,
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
                    {!respondida ? "Elige una respuesta." : `${elegida === q.correcta ? "Correcto. " : "Incorrecto. "}${q.explicacion}`}
                  </p>
                </div>
              );
            })}
          </div>
          <div className={styles.qb}>
            <button type="button" className={styles.btn} onClick={resetQuiz}>
              Reiniciar evaluación
            </button>
            <a className={cx(styles.btn, styles.solid)} href="#e-ag">
              Volver a la agenda
            </a>
          </div>
          <div className={cx(styles.cert, won && styles.won)}>
            <span className={styles.seal} aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="9" r="6" />
                <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
                <path d="m9.5 9 2 2 3-3" />
              </svg>
            </span>
            <div>
              <b>Asesor Corporativo ASUS · ExpertBook</b>
              <span>{won ? "Certificado obtenido · 10 de 10" : "Aprueba con 10 de 10 para obtener el certificado"}</span>
            </div>
          </div>
          <p className={styles.foot}>
            Concepto de Kaisen Design Studio para entrenamiento de asesores. No es un sitio oficial de ASUS. Datos de
            la ficha oficial del ExpertBook B1 (B1403CVA, Intel Core 5 120U); la configuración exacta (RAM, disco,
            sistema operativo) puede variar según la tienda. Confírmala con la etiqueta del equipo.
          </p>
        </div>
      </section>
    </div>
  );
}
