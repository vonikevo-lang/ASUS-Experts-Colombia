"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./EntrenamientoRogXboxAllyX20.css";
import {
  PERFILES_ROG_ALLY,
  BUNDLE_ROG_ALLY,
  OBJECIONES_ROG_ALLY,
  TRIVIA_ROG_ALLY,
} from "./rogXboxAllyX20Data";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Este archivo trae su propia hoja de estilos como CSS normal (no CSS
 * Modules: la regla de Turbopack del proyecto enruta todo *.css por el
 * loader de Tailwind, que no genera el mapa de clases que un .module.css
 * necesita). `styles.algo` devuelve el nombre de clase tal cual para que
 * coincida con EntrenamientoRogXboxAllyX20.css.
 */
const styles = new Proxy({} as Record<string, string>, {
  get: (_target, prop: string) => prop,
});

const ASSET_BASE = "/entrenamientos/rog-xbox-ally-x20";
const LOGO_ASUS = `${ASSET_BASE}/logo.png`;
const FOTO_DEVICE = `${ASSET_BASE}/device.webp`;
const FOTO_SCREEN = `${ASSET_BASE}/screen.webp`;
const FOTO_CONTROLS = `${ASSET_BASE}/controls-detail.webp`;

interface SeccionRogAlly {
  id: string;
  nombre: string;
  logro?: string;
}

const SECCIONES: SeccionRogAlly[] = [
  { id: "a1", nombre: "INICIO" },
  { id: "a-menu", nombre: "MENÚ", logro: "Primer arranque" },
  { id: "a3", nombre: "QUIÉN LO COMPRA", logro: "Conoce a tu jugador" },
  { id: "a4", nombre: "POTENCIA", logro: "Potencia desbloqueada" },
  { id: "a5", nombre: "PANTALLA", logro: "Ojos de halcón" },
  { id: "a6", nombre: "CONTROLES", logro: "Manos de pro" },
  { id: "a7", nombre: "GAFAS XREAL", logro: "Pantalla gigante" },
  { id: "a8", nombre: "BUNDLE", logro: "Botín legendario" },
  { id: "a9", nombre: "JEFE FINAL", logro: "Llegaste al jefe final" },
];

const MENU_ITEMS = [
  { href: "a3", n: "03", t: "Quién lo compra", small: "Cuatro jugadores y qué decirle a cada uno" },
  { href: "a4", n: "04", t: "Potencia", small: "Ryzen AI Z2 Extreme, 24 GB y 1 TB" },
  { href: "a5", n: "05", t: "Pantalla Nebula HDR", small: "OLED de 7,4\", 120 Hz y 1400 nits" },
  { href: "a6", n: "06", t: "Controles", small: "Joysticks TMR, D-pad transformable y gatillos" },
  { href: "a7", n: "07", t: "Gafas ROG XREAL R1", small: "Una pantalla gigante donde estés" },
  { href: "a8", n: "08", t: "El bundle", small: "Qué trae la caja y cómo venderlo" },
  { href: "a9", n: "09", t: "Jefe final", small: "Objeciones y trivia" },
] as const;

interface CaracterTitulo {
  c: string;
  gold?: boolean;
}

const TITULO_CHARS: CaracterTitulo[] = [
  { c: "R" }, { c: "O" }, { c: "G" }, { c: " " },
  { c: "X" }, { c: "B" }, { c: "O" }, { c: "X" }, { c: " " },
  { c: "A", gold: true }, { c: "L", gold: true }, { c: "L", gold: true }, { c: "Y", gold: true }, { c: " ", gold: true },
  { c: "X", gold: true }, { c: "2", gold: true }, { c: "0", gold: true },
];

const ICONOS_PERFIL = [
  <svg key="pc" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
  </svg>,
  <svg key="xbox" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="m8 8 8 8" />
    <path d="m16 8-8 8" />
  </svg>,
  <svg key="cama" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10" />
    <path d="M3 14h18" />
    <path d="M3 18h18" />
  </svg>,
  <svg key="rog" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 15 8l6 .9-4.5 4.3 1 6.3L12 16.5 6.5 19.5l1-6.3L3 8.9 9 8z" />
  </svg>,
];

let toastSeq = 0;
interface ToastItem {
  id: number;
  texto: string;
}

interface ContadorProps {
  objetivo: number;
  activar: boolean;
  reduced: boolean;
  decimales?: number;
}

/** Cuenta de 0 al valor objetivo con easing cúbico; instantáneo si `reduced`. */
function ContadorNumero({ objetivo, activar, reduced, decimales = 0 }: ContadorProps) {
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
      setValor(objetivo * ease);
      if (p < 1) raf = requestAnimationFrame(paso);
    }
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [activar, objetivo, reduced]);

  return <>{decimales > 0 ? valor.toFixed(decimales) : Math.round(valor)}</>;
}

export function EntrenamientoRogXboxAllyX20() {
  const reduced = useReducedMotion();
  const secRefs = useRef<Array<HTMLElement | null>>([]);
  const [secEnVista, setSecEnVista] = useState<Set<string>>(new Set());
  const [seccionActual, setSeccionActual] = useState<(typeof SECCIONES)[number]>(SECCIONES[0]);
  const [progreso, setProgreso] = useState(0);
  const [fase, setFase] = useState(0);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const logrosMostradosRef = useRef<Set<string>>(new Set());

  function mostrarLogro(texto: string) {
    if (logrosMostradosRef.current.has(texto)) return;
    logrosMostradosRef.current.add(texto);
    const id = toastSeq++;
    setToasts((prev) => {
      const next = [...prev, { id, texto }];
      return next.length > 2 ? next.slice(next.length - 2) : next;
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3300);
  }

  // Arranque tipo consola: fases por tiempo, no por scroll.
  useEffect(() => {
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFase(3);
      return;
    }
    const t1 = setTimeout(() => setFase(1), 120);
    const t2 = setTimeout(() => setFase(2), 1100);
    const t3 = setTimeout(() => setFase(3), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduced]);

  // Scroll: revelado, logros, barra de avance y "nivel" actual.
  useEffect(() => {
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSecEnVista(new Set(SECCIONES.map((s) => s.id)));
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
        if (r.top < vh * 0.78) {
          const id = SECCIONES[i].id;
          setSecEnVista((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            return next;
          });
          const logro = SECCIONES[i].logro;
          if (logro) mostrarLogro(logro);
        }
        if (r.top < vh * 0.45) actual = SECCIONES[i];
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

  // Joystick TMR: manipulación directa del DOM para que siga al dedo a 60fps.
  const stickRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLSpanElement>(null);
  const readRef = useRef<HTMLParagraphElement>(null);
  const dragRef = useRef(false);

  function moverStick(clientX: number, clientY: number) {
    const stick = stickRef.current;
    const cap = capRef.current;
    const read = readRef.current;
    if (!stick || !cap || !read) return;
    const r = stick.getBoundingClientRect();
    const cx2 = r.left + r.width / 2;
    const cy2 = r.top + r.height / 2;
    let dx = clientX - cx2;
    let dy = clientY - cy2;
    const max = r.width / 2 - 38;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d > max) {
      dx = (dx / d) * max;
      dy = (dy / d) * max;
    }
    cap.style.transform = `translate(${dx}px,${dy}px)`;
    read.textContent = `X ${(dx / max).toFixed(2)} · Y ${(-dy / max).toFixed(2)}`;
  }

  function onStickPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragRef.current = true;
    stickRef.current?.classList.add(styles.stickDrag);
    try {
      stickRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // algunos navegadores no soportan setPointerCapture en touch; se ignora.
    }
    moverStick(e.clientX, e.clientY);
  }
  function onStickPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (dragRef.current) moverStick(e.clientX, e.clientY);
  }
  function soltarStick() {
    if (!dragRef.current) return;
    dragRef.current = false;
    stickRef.current?.classList.remove(styles.stickDrag);
    if (capRef.current) capRef.current.style.transform = "";
    if (readRef.current) readRef.current.textContent = "X 0.00 · Y 0.00 · CENTRADO SIN DRIFT";
  }

  // D-pad transformable: 4 u 8 direcciones.
  const [dpadModo, setDpadModo] = useState<4 | 8>(4);

  // Gatillo Hall Effect: mantener presionado llena la barra.
  const trigCardRef = useRef<HTMLDivElement>(null);
  const tfillRef = useRef<HTMLElement>(null);
  const tvalRef = useRef<HTMLSpanElement>(null);
  const trigValorRef = useRef(0);
  const trigDirRef = useRef(0);
  const trigTickRef = useRef(0);

  function trigLoop() {
    trigValorRef.current = Math.max(0, Math.min(100, trigValorRef.current + trigDirRef.current * 4));
    const v = trigValorRef.current;
    if (tfillRef.current) tfillRef.current.style.width = `${v}%`;
    if (tvalRef.current) tvalRef.current.textContent = `Presión ${Math.round(v)} %`;
    if (v >= 100 && trigDirRef.current > 0 && !trigCardRef.current?.classList.contains(styles.buzz)) {
      trigCardRef.current?.classList.add(styles.buzz);
      setTimeout(() => trigCardRef.current?.classList.remove(styles.buzz), 500);
    }
    if ((trigDirRef.current > 0 && v < 100) || (trigDirRef.current < 0 && v > 0)) {
      trigTickRef.current = requestAnimationFrame(trigLoop);
    } else {
      trigTickRef.current = 0;
    }
  }
  function presionarTrigger(dir: number) {
    trigDirRef.current = dir;
    if (!trigTickRef.current) trigTickRef.current = requestAnimationFrame(trigLoop);
  }

  // Trivia: puntos, combo y rango.
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const primerIntentoRef = useRef<Record<number, number>>({});
  const [combo, setCombo] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const ganadaRef = useRef(false);

  function rango(p: number) {
    return p >= 1500 ? "Leyenda" : p >= 800 ? "Pro" : p >= 300 ? "Jugador" : "Novato";
  }

  function responder(i: number, j: number) {
    if (primerIntentoRef.current[i] === undefined) {
      primerIntentoRef.current[i] = j;
      if (j === TRIVIA_ROG_ALLY[i].correcta) {
        setCombo((c) => {
          const nuevo = c + 1;
          setPuntos((p) => p + 100 * nuevo);
          if (nuevo === 3) mostrarLogro("Combo x3");
          if (nuevo === 5) mostrarLogro("Racha imparable");
          return nuevo;
        });
      } else {
        setCombo(0);
      }
    }
    setRespuestas((prev) => ({ ...prev, [i]: j }));
  }

  function reiniciarTrivia() {
    setRespuestas({});
    primerIntentoRef.current = {};
    setCombo(0);
    setPuntos(0);
    ganadaRef.current = false;
  }

  const aciertos = TRIVIA_ROG_ALLY.reduce((acc, q, i) => acc + (respuestas[i] === q.correcta ? 1 : 0), 0);
  const trivaCompleta = Object.keys(respuestas).length === TRIVIA_ROG_ALLY.length;
  const ganada = trivaCompleta && aciertos === TRIVIA_ROG_ALLY.length;

  useEffect(() => {
    if (ganada && !ganadaRef.current) {
      ganadaRef.current = true;
      mostrarLogro("Leyenda ROG Ally");
    }
  }, [ganada]);

  const potenciaActiva = secEnVista.has("a4");
  const pantallaActiva = secEnVista.has("a5");
  const xrealActiva = secEnVista.has("a7");
  const bundleActiva = secEnVista.has("a8");

  return (
    <div className={styles.ax} data-label="ROG Xbox Ally X20 · Plan de entrenamiento">
      <header className={styles.top}>
        <div className={styles.topIn}>
          <Image src={LOGO_ASUS} alt="ASUS" width={90} height={16} />
          <span className={styles.ed}>ROG Xbox Ally X20 · Edición 20 años</span>
          <span className={styles.sp} />
          <span className={styles.xp} aria-live="polite">
            NIVEL {String(SECCIONES.findIndex((s) => s.id === seccionActual.id) + 1).padStart(2, "0")} ·{" "}
            {seccionActual.nombre}
          </span>
          <a className={styles.st} href="#a-menu">
            Menú
          </a>
        </div>
        <div
          className={styles.pbar}
          role="progressbar"
          aria-label="Avance del recorrido"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progreso}
          style={{ width: `${progreso}%` }}
        />
      </header>

      {/* 01 HERO */}
      <section
        ref={(el) => { secRefs.current[0] = el; }}
        className={cx(styles.sec, styles.hero, fase >= 1 && styles.p1, fase >= 2 && styles.p2, fase >= 3 && styles.p3)}
        id="a1"
        aria-labelledby="ah1"
      >
        <span className={styles.dust} aria-hidden="true" />
        <span className={styles.halo} aria-hidden="true" />
        <div className={styles.wrap}>
          <div className={styles.ttl}>
            <p className={styles.k}>20 AÑOS DE ROG · CONSOLA PORTÁTIL</p>
            <h1 className={styles.h1} id="ah1" aria-label="ROG Xbox Ally X20">
              {TITULO_CHARS.map((item, i) => (
                <span
                  key={i}
                  className={cx(styles.ch, item.gold && styles.gold)}
                  style={{ transitionDelay: `${(i * 0.05).toFixed(2)}s` }}
                  aria-hidden="true"
                >
                  {item.c === " " ? " " : item.c}
                </span>
              ))}
            </h1>
          </div>
          <div className={styles.dev}>
            <div className={styles.devImg}>
              <Image
                src={FOTO_DEVICE}
                alt="Consola portátil ROG Xbox Ally X20 negra translúcida con detalles dorados y anillos de luz en los joysticks"
                fill
                sizes="(max-width: 860px) 96vw, 860px"
                style={{ objectFit: "contain" }}
              />
              <span className={styles.ring} style={{ left: "16%", top: "16%" }} aria-hidden="true" />
              <span className={styles.ring} style={{ left: "88%", top: "36.5%" }} aria-hidden="true" />
            </div>
          </div>
          <div className={styles.chips}>
            <span className={styles.chip}>
              <b>7,4&quot;</b> OLED 120 Hz
            </span>
            <span className={styles.chip}>
              <b>Ryzen AI</b> Z2 Extreme
            </span>
            <span className={styles.chip}>
              <b>24 GB</b> RAM
            </span>
            <span className={styles.chip}>
              <b>1 TB</b> SSD
            </span>
            <span className={styles.chip}>
              <b>+</b> Gafas XREAL + Case
            </span>
          </div>
          <div className={styles.start}>
            <a href="#a-menu">
              <span className={styles.btnG}>A</span>Presiona start
            </a>
            <small>Entrenamiento de venta · Referencia RC74XA</small>
          </div>
        </div>
      </section>

      {/* 02 MENÚ */}
      <section
        ref={(el) => { secRefs.current[1] = el; }}
        className={cx(styles.sec, secEnVista.has("a-menu") && styles.in)}
        id="a-menu"
        aria-labelledby="ah2"
      >
        <div className={styles.wrap}>
          <p className={cx(styles.eye, styles.up)}>
            <span className={styles.btnG}>02</span>Menú principal
          </p>
          <h2 className={cx(styles.h2, styles.up, styles.u1)} id="ah2">
            Elige tu <em>nivel.</em>
          </h2>
          <p className={cx(styles.time, styles.up, styles.u2)}>12 minutos · trivia de 10 preguntas al final</p>
          <nav className={cx(styles.menu, styles.up, styles.u3)} aria-label="Niveles del entrenamiento">
            {MENU_ITEMS.map((m) => (
              <a key={m.href} className={styles.mi} href={`#${m.href}`}>
                <span className={styles.n}>{m.n}</span>
                <span className={styles.t}>
                  {m.t}
                  <small>{m.small}</small>
                </span>
                <span className={styles.a}>
                  <i>A</i>Seleccionar
                </span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* 03 PERFILES */}
      <section ref={(el) => { secRefs.current[2] = el; }} className={cx(styles.sec, secEnVista.has("a3") && styles.in)} id="a3" aria-labelledby="ah3">
        <div className={styles.wrap}>
          <p className={cx(styles.eye, styles.up)}>
            <span className={styles.btnG}>03</span>Quién lo compra
          </p>
          <h2 className={cx(styles.h2, styles.up, styles.u1)} id="ah3">
            Cuatro jugadores, <em>una consola.</em>
          </h2>
          <div className={styles.g4}>
            {PERFILES_ROG_ALLY.map((p, i) => (
              <article key={p.id} className={cx(styles.pf, styles.card, styles.up, styles[`u${i + 1}`])}>
                <span className={styles.ic} aria-hidden="true">
                  {ICONOS_PERFIL[i]}
                </span>
                <h3>{p.titulo}</h3>
                <p className="c">{p.texto}</p>
                <p className={styles.say}>
                  <b>Dile</b>&ldquo;{p.dile}&rdquo;
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 POTENCIA */}
      <section ref={(el) => { secRefs.current[3] = el; }} className={cx(styles.sec, potenciaActiva && styles.in)} id="a4" aria-labelledby="ah4">
        <div className={styles.wrap}>
          <p className={cx(styles.eye, styles.up)}>
            <span className={styles.btnG}>04</span>Potencia
          </p>
          <h2 className={cx(styles.h2, styles.up, styles.u1)} id="ah4">
            Un PC gamer <em>en tus manos.</em>
          </h2>
          <div className={styles.pw}>
            <div className={cx(styles.pc, styles.card, styles.up, styles.u1)}>
              <span className={styles.k}>Procesador</span>
              <p className={styles.big}>
                <ContadorNumero objetivo={8} activar={potenciaActiva} reduced={reduced} />
                <small>núcleos</small>
              </p>
              <div className={styles.hp} aria-hidden="true">
                {Array.from({ length: 16 }, (_, i) => (
                  <i key={i} style={{ animationDelay: `${0.4 + i * 0.05}s` }} />
                ))}
              </div>
              <p>
                <b style={{ color: "#F3EFE6" }}>AMD Ryzen AI Z2 Extreme:</b> 8 núcleos, 16 hilos y hasta 5,0 GHz, con NPU de
                hasta 50 TOPS para funciones de IA.
              </p>
            </div>
            <div className={cx(styles.pc, styles.card, styles.up, styles.u2)}>
              <span className={styles.k}>Memoria</span>
              <p className={styles.big}>
                <ContadorNumero objetivo={24} activar={potenciaActiva} reduced={reduced} />
                <small>GB</small>
              </p>
              <div className={styles.hp} aria-hidden="true">
                {Array.from({ length: 16 }, (_, i) => (
                  <i key={i} style={{ animationDelay: `${0.55 + i * 0.05}s` }} />
                ))}
              </div>
              <p>
                <b style={{ color: "#F3EFE6" }}>LPDDR5X de doble canal:</b> memoria rápida compartida con la gráfica. Viene
                soldada, no se amplía.
              </p>
            </div>
            <div className={cx(styles.pc, styles.card, styles.up, styles.u3)}>
              <span className={styles.k}>Almacenamiento</span>
              <p className={styles.big}>
                1<small>TB</small>
              </p>
              <div className={styles.hp} aria-hidden="true">
                {Array.from({ length: 16 }, (_, i) => (
                  <i key={i} style={{ animationDelay: `${0.7 + i * 0.05}s` }} />
                ))}
              </div>
              <p>
                <b style={{ color: "#F3EFE6" }}>SSD PCIe 4.0 M.2 2280</b> y lector microSD Express para sumar espacio y llevar
                más juegos.
              </p>
            </div>
          </div>
          <p className={cx(styles.note, styles.up, styles.u3)}>
            Las especificaciones corresponden a la referencia RC74XA de la ficha oficial de ROG. Confirma el código exacto en
            la caja.
          </p>
        </div>
      </section>

      {/* 05 PANTALLA */}
      <section ref={(el) => { secRefs.current[4] = el; }} className={cx(styles.sec, styles.oled, pantallaActiva && styles.in)} id="a5" aria-labelledby="ah5">
        <div className={styles.wrap}>
          <p className={cx(styles.eye, styles.up)}>
            <span className={styles.btnG}>05</span>Pantalla ROG Nebula HDR
          </p>
          <h2 className={cx(styles.h2, styles.up, styles.u1)} id="ah5">
            OLED que <em>se enciende.</em>
          </h2>
          <p className={cx(styles.lead, styles.up, styles.u2)}>
            Mira cómo la pantalla pasa de apagada a todo su brillo: así se siente el HDR de 1400 nits frente a una pantalla
            común.
          </p>
          <div className={cx(styles.scr, styles.up, styles.u2)}>
            <Image
              src={FOTO_SCREEN}
              alt="ROG Xbox Ally X20 de frente con un juego de carreras en la pantalla OLED"
              width={1200}
              height={750}
              style={{ width: "100%", height: "auto" }}
            />
            <span className={styles.flare} aria-hidden="true" />
            <span className={styles.r1} aria-hidden="true" />
            <span className={styles.r2} aria-hidden="true" />
          </div>
          <div className={styles.ns}>
            <div className={cx(styles.nsc, styles.card, styles.up, styles.u1)}>
              <div className={styles.v}>
                7,4<small>&quot;</small>
              </div>
              <div className={styles.k}>OLED Full HD 1920 × 1080, más grande gracias al bisel superior más delgado</div>
            </div>
            <div className={cx(styles.nsc, styles.card, styles.up, styles.u2)}>
              <div className={styles.v}>
                <ContadorNumero objetivo={1400} activar={pantallaActiva} reduced={reduced} />
                <small>nits</small>
              </div>
              <div className={styles.k}>Brillo máximo en HDR (600 en SDR), con Dolby Vision</div>
            </div>
            <div className={cx(styles.nsc, styles.card, styles.up, styles.u3)}>
              <div className={styles.v}>
                <ContadorNumero objetivo={120} activar={pantallaActiva} reduced={reduced} />
                <small>Hz</small>
              </div>
              <div className={styles.k}>Fluidez con FreeSync Premium Pro y respuesta de 0,2 ms</div>
            </div>
            <div className={cx(styles.nsc, styles.card, styles.up, styles.u4)}>
              <div className={styles.v}>
                100<small>% DCI-P3</small>
              </div>
              <div className={styles.k}>Colores de cine, validados Pantone, con Gorilla Glass y antirreflejo</div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 CONTROLES */}
      <section ref={(el) => { secRefs.current[5] = el; }} className={cx(styles.sec, secEnVista.has("a6") && styles.in)} id="a6" aria-labelledby="ah6">
        <div className={styles.wrap}>
          <p className={cx(styles.eye, styles.up)}>
            <span className={styles.btnG}>06</span>Controles
          </p>
          <h2 className={cx(styles.h2, styles.up, styles.u1)} id="ah6">
            Pruébalo <em>con el dedo.</em>
          </h2>
          <p className={cx(styles.lead, styles.up, styles.u2)}>
            Mueve el joystick, cambia el D-pad y presiona el gatillo. Es lo mismo que el cliente siente con la consola en la
            mano.
          </p>
          <div className={styles.ctl}>
            <div className={cx(styles.cc, styles.card, styles.up, styles.u1)}>
              <span className={styles.k}>Joysticks TMR</span>
              <div
                ref={stickRef}
                className={styles.stick}
                role="img"
                aria-label="Joystick interactivo: arrástralo y suéltalo, vuelve al centro exacto"
                onPointerDown={onStickPointerDown}
                onPointerMove={onStickPointerMove}
                onPointerUp={soltarStick}
                onPointerCancel={soltarStick}
              >
                <span ref={capRef} className={styles.cap} />
              </div>
              <p ref={readRef} className={styles.read} aria-live="polite">
                X 0.00 · Y 0.00 · CENTRADO
              </p>
              <p>Sensores TMR que evitan el &quot;drift&quot;: el joystick no se mueve solo con el tiempo. Anillos de luz Aura RGB.</p>
            </div>
            <div className={cx(styles.cc, styles.card, styles.up, styles.u2)}>
              <span className={styles.k}>D-pad transformable</span>
              <div className={cx(styles.dpad, dpadModo === 8 && styles.dpadE8)} aria-hidden="true">
                {[0, 90, 180, 270].map((deg) => (
                  <span key={deg} className={styles.arm} style={{ transform: `rotate(${deg}deg)` }} />
                ))}
                {[45, 135, 225, 315].map((deg) => (
                  <span
                    key={deg}
                    className={cx(styles.arm, styles.armD)}
                    style={{ "--r": `${deg}deg` } as React.CSSProperties}
                  />
                ))}
                <span className={styles.hub} />
              </div>
              <div className={styles.tog} role="group" aria-label="Modo del D-pad">
                <button type="button" className={cx(dpadModo === 4 && "on")} aria-pressed={dpadModo === 4} onClick={() => setDpadModo(4)}>
                  4 direcciones
                </button>
                <button type="button" className={cx(dpadModo === 8 && "on")} aria-pressed={dpadModo === 8} onClick={() => setDpadModo(8)}>
                  8 direcciones
                </button>
              </div>
              <p>Se cambia de 4 a 8 direcciones para diagonales precisas en juegos de pelea y plataformas.</p>
            </div>
            <div ref={trigCardRef} className={cx(styles.cc, styles.card, styles.up, styles.u3)}>
              <span className={styles.k}>Gatillos Hall Effect</span>
              <div className={styles.trig}>
                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    presionarTrigger(1);
                  }}
                  onPointerUp={() => presionarTrigger(-1)}
                  onPointerLeave={() => presionarTrigger(-1)}
                  onPointerCancel={() => presionarTrigger(-1)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      presionarTrigger(1);
                    }
                  }}
                  onKeyUp={() => presionarTrigger(-1)}
                >
                  Mantén presionado · RT
                </button>
                <div className={styles.tbar} aria-hidden="true">
                  <i ref={tfillRef} />
                </div>
                <span ref={tvalRef} className={styles.tval} aria-live="polite">
                  Presión 0 %
                </span>
              </div>
              <p>
                Gatillos analógicos con sensor magnético y vibración en los gatillos (Impulse Triggers), más vibración HD y
                giroscopio.
              </p>
            </div>
          </div>
          <div className={cx(styles.dimg, styles.up, styles.u2)}>
            <Image
              src={FOTO_CONTROLS}
              alt="Detalle del D-pad transformable y el joystick con anillo dorado de la ROG Xbox Ally X20"
              width={1200}
              height={700}
              style={{ width: "100%", height: "auto" }}
            />
            <span>D-pad transformable</span>
          </div>
        </div>
      </section>

      {/* 07 XREAL */}
      <section ref={(el) => { secRefs.current[6] = el; }} className={cx(styles.sec, xrealActiva && styles.in)} id="a7" aria-labelledby="ah7">
        <div className={styles.wrap}>
          <p className={cx(styles.eye, styles.up)}>
            <span className={styles.btnG}>07</span>Gafas ROG XREAL R1
          </p>
          <h2 className={cx(styles.h2, styles.up, styles.u1)} id="ah7">
            De 7,4&quot; a <em>171&quot; virtuales.</em>
          </h2>
          <div className={styles.xr}>
            <div
              className={cx(styles.room, styles.up, styles.u1)}
              role="img"
              aria-label="Ilustración: la pantalla crece hasta una pantalla virtual de 171 pulgadas"
            >
              <span className={styles.floor} aria-hidden="true" />
              <div className={styles.vscr}>
                <Image src={FOTO_SCREEN} alt="" fill sizes="80vw" style={{ objectFit: "cover" }} />
              </div>
              <p className={styles.vlbl}>
                <ContadorNumero objetivo={171} activar={xrealActiva} reduced={reduced} />
                <small>pulgadas virtuales</small>
              </p>
            </div>
            <div className={styles.xl}>
              <div className={cx(styles.xi, styles.card, styles.up, styles.u1)}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 10h20" />
                  <rect x="2" y="10" width="8" height="6" rx="2" />
                  <rect x="14" y="10" width="8" height="6" rx="2" />
                  <path d="M10 12h4" />
                </svg>
                <div>
                  <b>Micro-OLED a 240 Hz</b>
                  <span>Pantalla virtual de hasta 171&quot; vista a 4 metros</span>
                </div>
              </div>
              <div className={cx(styles.xi, styles.card, styles.up, styles.u2)}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2v6" />
                  <path d="M8 8h8l-1 6H9z" />
                  <path d="M12 14v8" />
                </svg>
                <div>
                  <b>Un solo cable USB-C</b>
                  <span>Se conectan directo a la consola, sin cajas extra</span>
                </div>
              </div>
              <div className={cx(styles.xi, styles.card, styles.up, styles.u3)}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3" />
                  <path d="M12 19v3" />
                  <path d="M2 12h3" />
                  <path d="M19 12h3" />
                </svg>
                <div>
                  <b>Modo ancla</b>
                  <span>La pantalla se queda fija en el aire aunque muevas la cabeza</span>
                </div>
              </div>
            </div>
          </div>
          <p className={cx(styles.note, styles.up, styles.u2)}>
            Ilustración de referencia. No son gafas de realidad virtual: muestran una pantalla gigante flotando frente a ti.
          </p>
        </div>
      </section>

      {/* 08 BUNDLE */}
      <section ref={(el) => { secRefs.current[7] = el; }} className={cx(styles.sec, bundleActiva && styles.in)} id="a8" aria-labelledby="ah8">
        <div className={styles.wrap}>
          <p className={cx(styles.eye, styles.up)}>
            <span className={styles.btnG}>08</span>El bundle
          </p>
          <h2 className={cx(styles.h2, styles.up, styles.u1)} id="ah8">
            Botín <em>legendario.</em>
          </h2>
          <p className={cx(styles.lead, styles.up, styles.u2)}>
            Lo que el cliente se lleva en la caja. Véndelo como un combo completo para jugar en cualquier lugar.
          </p>
          <div className={styles.loot}>
            {BUNDLE_ROG_ALLY.map((item, i) => (
              <div key={item.id} className={cx(styles.lt, styles.card)}>
                <span className={styles.rar}>{item.rareza}</span>
                <span className={styles.ico} aria-hidden="true">
                  {i === 0 && (
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="10" rx="5" />
                      <circle cx="7" cy="12" r="1.5" />
                      <circle cx="17" cy="12" r="1.5" />
                      <rect x="9.5" y="9" width="5" height="6" rx="1" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 10h20" />
                      <rect x="2" y="10" width="8" height="6" rx="2" />
                      <rect x="14" y="10" width="8" height="6" rx="2" />
                      <path d="M10 12h4" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="6" width="18" height="14" rx="2" />
                      <path d="M9 6V4h6v2" />
                      <path d="M3 12h18" />
                    </svg>
                  )}
                </span>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </div>
            ))}
          </div>
          <div className={styles.kit}>
            <div className={cx(styles.nsc, styles.card, styles.up, styles.u1)}>
              <div className={styles.v}>
                <ContadorNumero objetivo={80} activar={bundleActiva} reduced={reduced} />
                <small>Wh</small>
              </div>
              <div className={styles.k}>Batería de 4 celdas, cargador USB-C de 68 W</div>
            </div>
            <div className={cx(styles.nsc, styles.card, styles.up, styles.u2)}>
              <div className={styles.v}>
                756<small>g</small>
              </div>
              <div className={styles.k}>Peso de la consola</div>
            </div>
            <div className={cx(styles.nsc, styles.card, styles.up, styles.u3)}>
              <div className={styles.v}>
                USB4<small>+ USB-C</small>
              </div>
              <div className={styles.k}>Monitor, dock o carga por cualquiera de los dos puertos</div>
            </div>
            <div className={cx(styles.nsc, styles.card, styles.up, styles.u4)}>
              <div className={styles.v}>
                6E<small>Wi-Fi</small>
              </div>
              <div className={styles.k}>Wi-Fi 6E y Bluetooth 5.4 para jugar en la nube y conectar audífonos</div>
            </div>
          </div>
          <p className={styles.note}>
            El contenido exacto del bundle (accesorios, meses de Game Pass, cargador) puede variar según el país y la tienda:
            confírmalo en la caja antes de prometerlo.
          </p>
        </div>
      </section>

      {/* 09 JEFE FINAL */}
      <section ref={(el) => { secRefs.current[8] = el; }} className={cx(styles.sec, secEnVista.has("a9") && styles.in)} id="a9" aria-labelledby="ah9">
        <div className={styles.wrap}>
          <p className={cx(styles.eye, styles.up)}>
            <span className={styles.btnG}>09</span>Jefe final
          </p>
          <h2 className={cx(styles.h2, styles.up, styles.u1)} id="ah9">
            Objeciones. <em>Contraataque.</em>
          </h2>
          <div className={cx(styles.acc, styles.up, styles.u2)}>
            {OBJECIONES_ROG_ALLY.map((o) => (
              <details key={o.dice}>
                <summary>
                  &ldquo;{o.dice}&rdquo;
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </summary>
                <p className={styles.ans}>
                  <b>{o.responde.split(".")[0]}.</b>
                  {o.responde.slice(o.responde.split(".")[0].length + 1)}
                </p>
              </details>
            ))}
          </div>

          <div className={styles.trh} id="a-trivia">
            <h3>Trivia del jugador</h3>
            <div className={styles.hudq}>
              <span className={styles.hq}>
                Puntos<b>{puntos}</b>
              </span>
              <span className={cx(styles.hq, styles.combo, combo >= 3 && styles.hot)}>
                Combo<b>x{combo}</b>
              </span>
              <span className={styles.hq}>
                Rango<b>{rango(puntos)}</b>
              </span>
            </div>
          </div>
          <div className={styles.qs}>
            {TRIVIA_ROG_ALLY.map((q, i) => {
              const elegido = respuestas[i];
              const respondida = elegido !== undefined;
              return (
                <div key={q.pregunta} className={styles.q}>
                  <span className={styles.qn}>PREGUNTA {String(i + 1).padStart(2, "0")}</span>
                  <p className={styles.qt}>{q.pregunta}</p>
                  <div className={styles.opts} role="group" aria-label={q.pregunta}>
                    {q.opciones.map((op, j) => (
                      <button
                        key={op}
                        type="button"
                        className={cx(styles.opt, respondida && j === q.correcta && styles.ok, respondida && j === elegido && elegido !== q.correcta && styles.bad)}
                        aria-pressed={respondida && j === elegido}
                        onClick={() => responder(i, j)}
                      >
                        <i aria-hidden="true">{["A", "B", "X"][j]}</i>
                        <span>{op}</span>
                      </button>
                    ))}
                  </div>
                  <p className={styles.fb}>
                    {!respondida ? "Elige una respuesta." : (elegido === q.correcta ? "Correcto. " : "No es esa. ") + q.explicacion}
                  </p>
                </div>
              );
            })}
          </div>
          <div className={styles.qb}>
            <button type="button" className={styles.btn} onClick={reiniciarTrivia}>
              Reiniciar trivia
            </button>
            <a className={cx(styles.btn, styles.solid)} href="#a-menu">
              Volver al menú
            </a>
          </div>
          <div className={cx(styles.badge, ganada && styles.won)}>
            <span className={styles.md} aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
              </svg>
            </span>
            <div>
              <b>Leyenda ROG Ally</b>
              <span>{ganada ? `Insignia desbloqueada · ${puntos} puntos` : `${aciertos} de ${TRIVIA_ROG_ALLY.length} correctas · responde las 10 bien para desbloquearla`}</span>
            </div>
          </div>
          <p className={styles.foot}>
            Concepto de Kaisen Design Studio para entrenamiento de asesores. No es un sitio oficial de ASUS, ROG ni Xbox.
            Datos de la ficha oficial de la ROG Xbox Ally X20 (RC74XA); el contenido del bundle puede variar por país.
            Confírmalo con la ficha técnica y la caja.
          </p>
        </div>
      </section>

      <div className={styles.toasts} aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={cx(styles.toast, styles.on)}>
            <span className={styles.tr} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
              </svg>
            </span>
            <div>
              <b>LOGRO DESBLOQUEADO</b>
              <span>{t.texto}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
