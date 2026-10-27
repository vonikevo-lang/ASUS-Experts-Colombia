"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./EntrenamientoTufGamingF16F15.css";
import {
  LOADOUT_MAX,
  LOADOUT_TUF,
  MISIONES_TUF,
  PERFILES_TUF,
  PRUEBAS_MILITARES,
  MILGRID_TUF,
  HZ_INFO,
  MODOS_VENTILADOR,
  PUERTOS_F15,
  OBJECIONES_TUF,
  QUIZ_TUF,
  type PruebaMilitarId,
  type ModoVentiladorId,
} from "./tufGamingF16F15Data";

/**
 * Este archivo trae su propia hoja de estilos como CSS normal (no CSS
 * Modules: la regla de Turbopack del proyecto enruta todo *.css por el
 * loader de Tailwind, que no genera el mapa de clases que un .module.css
 * necesita — mismo hallazgo que en EntrenamientoVivobook15X1504.tsx y
 * EntrenamientoZenbookA14.tsx). `styles.algo` devuelve el nombre de clase
 * tal cual para que coincida con EntrenamientoTufGamingF16F15.css.
 */
const styles = new Proxy({} as Record<string, string>, {
  get: (_target, prop: string) => prop,
});

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ASSET_BASE = "/entrenamientos/tuf-gaming-f16-f15";
const LOGO_ASUS = `${ASSET_BASE}/asus-logo.png`;
const FOTO_DEVICE = `${ASSET_BASE}/tuf-gaming-device.webp`;

const BOOT_LINEAS = [
  { texto: "INICIANDO TUF_SYSTEM ...........", ok: false },
  { texto: "CHASIS MIL-STD-810H .........", ok: true },
  { texto: "GPU NVIDIA GEFORCE RTX ......", ok: true },
  { texto: "PANTALLA 144 HZ .............", ok: true },
];

const SECCIONES = [
  { id: "t1", numero: 1, nombre: "INICIO" },
  { id: "t-mis", numero: 2, nombre: "MISIONES" },
  { id: "t3", numero: 3, nombre: "PERFILES" },
  { id: "t4", numero: 4, nombre: "EQUIPO" },
  { id: "t5", numero: 5, nombre: "GRADO MILITAR" },
  { id: "t6", numero: 6, nombre: "144 HZ" },
  { id: "t7", numero: 7, nombre: "GRÁFICA" },
  { id: "t8", numero: 8, nombre: "PUERTOS" },
  { id: "t9", numero: 9, nombre: "CIERRE" },
];

interface EntrenamientoTufGamingF16F15Props {
  /** Qué referencia resalta el comparador en vivo al cargar la página. */
  referenciaInicial?: "f16" | "f15";
}

/**
 * "TUF Gaming · Entrenamiento": comparador en vivo entre dos referencias
 * (F16 Core 5 / RTX 3050 y F15 Core i7 / RTX 4060), consola de pruebas
 * MIL-STD-810H, comparación visual de 60 Hz contra 144 Hz, modos de
 * ventilador, puertos, objeciones y quiz de 6 preguntas con insignia.
 * Página de material de apoyo propio (ver lib/entrenamientoMaterialPropio.ts),
 * compartida por las dos referencias (cada una la abre resaltando la suya).
 */
export function EntrenamientoTufGamingF16F15({ referenciaInicial = "f15" }: EntrenamientoTufGamingF16F15Props) {
  const reduced = useReducedMotion();
  const raizRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const secRefs = useRef<Array<HTMLElement | null>>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const [heroFase, setHeroFase] = useState<0 | 1 | 2>(reduced ? 2 : 0);
  const [bootOn, setBootOn] = useState<boolean[]>(() => BOOT_LINEAS.map(() => reduced));
  const [secEnVista, setSecEnVista] = useState<Set<string>>(new Set());
  const [progreso, setProgreso] = useState(0);
  const [seccionActual, setSeccionActual] = useState(SECCIONES[0]);

  const [refActiva, setRefActiva] = useState<"f16" | "f15">(referenciaInicial);

  const [pruebaActiva, setPruebaActiva] = useState<PruebaMilitarId | null>(null);
  const [pruebasPasadas, setPruebasPasadas] = useState<Set<PruebaMilitarId>>(new Set());
  const [stampOn, setStampOn] = useState(false);
  const [modoTexto, setModoTexto] = useState("ZONA DE PRUEBAS");
  const [logLineas, setLogLineas] = useState<{ texto: string; tono?: "ok" | "w" }[]>([
    { texto: "> Esperando orden..." },
  ]);
  const pruebasBusyRef = useRef(false);
  const militarDisparadoRef = useRef(false);

  const [hzKey, setHzKey] = useState(0);
  const hzDisparadoRef = useRef(false);

  const [modoVentilador, setModoVentilador] = useState<ModoVentiladorId>("perf");

  const [respuestas, setRespuestas] = useState<Record<number, number>>({});

  // Hero: secuencia de arranque (tipeo línea por línea, luego glitch del título).
  useEffect(() => {
    if (reduced) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINEAS.forEach((_linea, i) => {
      timers.push(
        setTimeout(() => {
          setBootOn((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 150 + i * 420),
      );
    });
    timers.push(setTimeout(() => setHeroFase(1), 1500));
    timers.push(setTimeout(() => setHeroFase(2), 2500));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  function agregarLog(texto: string, tono?: "ok" | "w") {
    setLogLineas((prev) => [...prev, { texto, tono }].slice(-5));
  }

  function correrPrueba(id: PruebaMilitarId, alTerminar?: () => void) {
    const prueba = PRUEBAS_MILITARES[id];
    setStampOn(false);
    setPruebaActiva(id);
    setModoTexto(`PRUEBA: ${prueba.etiqueta}`);
    agregarLog(`> Ejecutando prueba de ${prueba.etiqueta.toLowerCase()}...`, "w");
    setTimeout(
      () => {
        setPruebasPasadas((prev) => new Set(prev).add(id));
        setStampOn(true);
        agregarLog(`> ${prueba.etiqueta}: superada`, "ok");
        if (alTerminar) setTimeout(alTerminar, 500);
      },
      reduced ? 50 : prueba.duracion,
    );
  }

  function correrTodas() {
    if (pruebasBusyRef.current) return;
    pruebasBusyRef.current = true;
    const orden: PruebaMilitarId[] = ["drop", "vib", "hum", "temp"];
    setLogLineas([]);
    agregarLog("> Secuencia MIL-STD-810H iniciada");
    let i = 0;
    const siguiente = () => {
      if (i >= orden.length) {
        pruebasBusyRef.current = false;
        setModoTexto("TODAS LAS PRUEBAS SUPERADAS");
        agregarLog("> Equipo listo para el campo de batalla", "ok");
        return;
      }
      correrPrueba(orden[i++], siguiente);
    };
    siguiente();
  }

  function manejarClicPrueba(id: PruebaMilitarId) {
    if (pruebasBusyRef.current) return;
    pruebasBusyRef.current = true;
    correrPrueba(id, () => {
      pruebasBusyRef.current = false;
    });
  }

  function reproducirHz() {
    setHzKey((k) => k + 1);
  }

  // Scroll: revelar secciones, barra de avance, contador, disparo de pruebas/Hz.
  useEffect(() => {
    if (reduced) {
      // Estado final único tras el montaje: con reduced-motion no hay reveal por scroll.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSecEnVista(new Set(SECCIONES.map((s) => s.id)));
      if (!militarDisparadoRef.current) {
        militarDisparadoRef.current = true;
        correrTodas();
      }
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

      let actual = SECCIONES[0];
      nodos.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.8) {
          setSecEnVista((prev) => {
            if (prev.has(SECCIONES[i].id)) return prev;
            const next = new Set(prev);
            next.add(SECCIONES[i].id);
            return next;
          });
          if (SECCIONES[i].id === "t5" && !militarDisparadoRef.current) {
            militarDisparadoRef.current = true;
            setTimeout(correrTodas, 900);
          }
          if (SECCIONES[i].id === "t6" && !hzDisparadoRef.current) {
            hzDisparadoRef.current = true;
            reproducirHz();
          }
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
      clearTimeout(t1);
      clearTimeout(t2);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const loadout = LOADOUT_TUF[refActiva];
  const puntaje = QUIZ_TUF.reduce((acc, q, i) => acc + (respuestas[i] === q.correcta ? 1 : 0), 0);
  const gano = Object.keys(respuestas).length === QUIZ_TUF.length && puntaje === QUIZ_TUF.length;

  return (
    <div ref={raizRef} className={styles.tp} data-label="TUF Gaming · Plan de entrenamiento">
      <header className={styles.hud}>
        <div className={styles.hudIn}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_ASUS} alt="ASUS" />
          <span className={styles.tag}>TUF Gaming · Entrenamiento</span>
          <span className={styles.sp} />
          <span className={styles.cnt} aria-live="polite">
            {String(seccionActual.numero).padStart(2, "0")} / {seccionActual.nombre}
          </span>
          <a className={styles.go} href="#t-mis">
            Ver misiones
          </a>
        </div>
        <div
          className={styles.bar}
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
        ref={(el) => {
          heroRef.current = el;
          secRefs.current[0] = el;
        }}
        className={cx(styles.sec, styles.hero, heroFase >= 1 && styles.go, heroFase >= 2 && styles.go2)}
        id="t1"
        aria-labelledby="th1"
      >
        <div className={styles.wrap}>
          <div>
            <div className={styles.boot} aria-hidden="true">
              {BOOT_LINEAS.map((linea, i) => (
                <span key={linea.texto} className={cx(bootOn[i] && styles.on)}>
                  &gt; {linea.texto} {linea.ok && <i>OK</i>}
                </span>
              ))}
            </div>
            <h1 className={styles.h1} id="th1" data-t="TUF GAMING">
              TUF GAMING
              <small>ENTRENAMIENTO</small>
            </h1>
            <p className={styles.lead}>
              Dos referencias, una misma armadura. Aprende a mostrar el TUF Gaming con Core 5 y con Core i7, y a explicar por qué aguanta lo que otros no.
            </p>
            <div className={styles.refs}>
              <div className={cx(styles.ref, styles.a)}>
                <b>F16 · CORE 5</b>
                <span>FX607VJB · RTX 3050 · 16&quot;</span>
              </div>
              <div className={cx(styles.ref, styles.c)}>
                <b>F15 · CORE i7</b>
                <span>FX507VV · RTX 4060 · 15,6&quot;</span>
              </div>
            </div>
          </div>
          <div className={styles.frame}>
            <span className={cx(styles.br, styles.tl)} />
            <span className={cx(styles.br, styles.tr)} />
            <span className={cx(styles.br, styles.bl)} />
            <span className={cx(styles.br, styles.bR)} />
            <div className={styles.lap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FOTO_DEVICE} alt="TUF Gaming abierto de frente, con el teclado iluminado" />
              <span className={styles.under} />
              <span className={styles.kbl} aria-hidden="true" />
              <span className={styles.scan} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* 02 MISIONES */}
      <section
        ref={(el) => {
          secRefs.current[1] = el;
        }}
        className={cx(styles.sec, secEnVista.has("t-mis") && styles.in)}
        id="t-mis"
        aria-labelledby="th2"
      >
        <div className={styles.wrap}>
          <p className={cx(styles.lbl, styles.rv)}>
            <b>02</b>Mapa de misiones
          </p>
          <h2 className={cx(styles.h2, styles.slam)} id="th2">
            Cuatro misiones. <em>Un cliente ganado.</em>
          </h2>
          <p className={cx(styles.lead, styles.rv, styles.d1)}>
            Unos 12 minutos. Al final, un quiz de 6 preguntas desbloquea la insignia de Operador TUF.
          </p>
          <div className={styles.ms}>
            {MISIONES_TUF.map((mision, i) => (
              <div key={mision.titulo} className={cx(styles.m, styles.rv, styles[`d${i + 1}`])} style={{ "--mc": mision.color } as React.CSSProperties}>
                <div className={styles.mt}>
                  <span>{mision.numero}</span>
                  <span>{mision.etiqueta}</span>
                </div>
                <h3>{mision.titulo}</h3>
                {mision.links.map((link) => (
                  <a key={link.href} href={link.href}>
                    <i>{link.numero}</i>
                    {link.texto}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className={cx(styles.xp, styles.rv, styles.d4)}>
            <span className={styles.t}>PROGRESO</span>
            <span className={styles.track}>
              <i style={{ width: `${progreso}%` }} />
            </span>
            <span className={styles.t}>{progreso} %</span>
          </div>
        </div>
      </section>

      {/* 03 PERFILES */}
      <section
        ref={(el) => {
          secRefs.current[2] = el;
        }}
        className={cx(styles.sec, secEnVista.has("t3") && styles.in)}
        id="t3"
        aria-labelledby="th3"
      >
        <div className={styles.wrap}>
          <p className={cx(styles.lbl, styles.rv)}>
            <b>03</b>Recon
          </p>
          <h2 className={cx(styles.h2, styles.slam)} id="th3">
            Cuatro jugadores <em>que vas a ver en piso.</em>
          </h2>
          <div className={styles.g4}>
            {PERFILES_TUF.map((perfil, i) => (
              <article key={perfil.titulo} className={cx(styles.pf, styles.rv, styles[`d${i + 1}`])}>
                <span className={styles.ic} aria-hidden="true">
                  <IconoPerfil indice={i} />
                </span>
                <h3>{perfil.titulo}</h3>
                <p className={styles.c}>{perfil.texto}</p>
                <p className={styles.say}>
                  <b>Dile</b>&quot;{perfil.dile}&quot;
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 EQUIPO (loadout) */}
      <section
        ref={(el) => {
          secRefs.current[3] = el;
        }}
        className={cx(styles.sec, secEnVista.has("t4") && styles.in)}
        id="t4"
        aria-labelledby="th4"
      >
        <div className={cx(styles.wrap, styles.loadwrap, refActiva === "f16" && styles.a)}>
          <p className={cx(styles.lbl, styles.rv)}>
            <b>04</b>Elige el equipo
          </p>
          <h2 className={cx(styles.h2, styles.slam)} id="th4">
            Core 5 o Core i7. <em>Compara en vivo.</em>
          </h2>
          <p className={cx(styles.lead, styles.rv, styles.d1)}>
            Toca una referencia y mira cómo cambian las barras y la ficha. Así le explicas al cliente qué gana subiendo de nivel.
          </p>
          <div className={cx(styles.pick, styles.rv, styles.d2)} role="group" aria-label="Referencia a comparar">
            <button
              type="button"
              className={cx(styles.lo, refActiva === "f16" && styles.on)}
              style={{ "--lc": "#FFB020" } as React.CSSProperties}
              onClick={() => setRefActiva("f16")}
              aria-pressed={refActiva === "f16"}
            >
              <span className={styles.k}>NIVEL 1 · ENTRADA</span>
              <b>TUF F16 · Core 5</b>
              <span>FX607VJB · RTX 3050</span>
            </button>
            <button
              type="button"
              className={cx(styles.lo, refActiva === "f15" && styles.on)}
              style={{ "--lc": "#2FD3F0" } as React.CSSProperties}
              onClick={() => setRefActiva("f15")}
              aria-pressed={refActiva === "f15"}
            >
              <span className={styles.k}>NIVEL 2 · RENDIMIENTO</span>
              <b>TUF F15 · Core i7</b>
              <span>FX507VV · RTX 4060</span>
            </button>
          </div>
          <div className={cx(styles.stats, styles.rv, styles.d3)}>
            <div className={styles.st} aria-live="polite">
              <FilaStat etiqueta="Núcleos" valor={loadout.cores} max={LOADOUT_MAX.cores} />
              <FilaStat etiqueta="Hilos" valor={loadout.thr} max={LOADOUT_MAX.thr} />
              <FilaStat etiqueta="Memoria GPU" valor={loadout.vram} max={LOADOUT_MAX.vram} />
              <FilaStat etiqueta="Batería" valor={loadout.bat} max={LOADOUT_MAX.bat} />
              <FilaStat etiqueta="Refresco" valor={loadout.hz} max={LOADOUT_MAX.hz} />
            </div>
            <div className={styles.st}>
              <div className={styles.spec} key={refActiva}>
                <FilaSpec etiqueta="Referencia" valor={loadout.ref} />
                <FilaSpec etiqueta="Procesador" valor={loadout.cpu} />
                <FilaSpec etiqueta="Gráfica" valor={loadout.gpu} />
                <FilaSpec etiqueta="RAM" valor={loadout.ram} />
                <FilaSpec etiqueta="Almacenamiento" valor={loadout.ssd} />
                <FilaSpec etiqueta="Pantalla" valor={loadout.scr} />
                <FilaSpec etiqueta="Batería y peso" valor={loadout.bw} />
                <FilaSpec etiqueta="Extra" valor={loadout.ext} />
              </div>
            </div>
          </div>
          <p className={styles.note}>
            La RAM y el disco cambian según la tienda (por ejemplo, 8 o 16 GB en el F16; 512 GB o 1 TB en el F15). Confirma la etiqueta del equipo que tienes en exhibición.
          </p>
        </div>
      </section>

      {/* 05 MILITAR */}
      <section
        ref={(el) => {
          secRefs.current[4] = el;
        }}
        className={cx(styles.sec, secEnVista.has("t5") && styles.in)}
        id="t5"
        aria-labelledby="th5"
      >
        <div className={styles.wrap}>
          <p className={cx(styles.lbl, styles.rv)}>
            <b>05</b>Durabilidad
          </p>
          <h2 className={cx(styles.h2, styles.slam)} id="th5">
            Grado militar <em>MIL-STD-810H.</em>
          </h2>
          <p className={cx(styles.lead, styles.rv, styles.d1)}>
            La línea TUF se prueba bajo la norma de durabilidad del Departamento de Defensa de EE. UU. Corre las pruebas y mira qué aguanta.
          </p>
          <div className={styles.mil}>
            <div className={cx(styles.console, styles.rv, styles.d2)}>
              <h3>Consola de pruebas</h3>
              {(Object.keys(PRUEBAS_MILITARES) as PruebaMilitarId[]).map((id) => {
                const pasada = pruebasPasadas.has(id);
                const corriendo = pruebaActiva === id && !pasada;
                return (
                  <button
                    key={id}
                    type="button"
                    className={cx(styles.tb, corriendo && styles.run, pasada && styles.pass)}
                    onClick={() => manejarClicPrueba(id)}
                  >
                    <IconoPrueba id={id} />
                    <span>{PRUEBAS_MILITARES[id].etiqueta.charAt(0) + PRUEBAS_MILITARES[id].etiqueta.slice(1).toLowerCase()}</span>
                    <span className={styles.s}>{pasada ? "SUPERADA" : corriendo ? "EN CURSO" : "LISTO"}</span>
                  </button>
                );
              })}
              <button type="button" className={styles.runall} onClick={correrTodas}>
                Ejecutar todas las pruebas
              </button>
              <div ref={logRef} className={styles.log} aria-live="polite">
                {logLineas.map((linea, i) => (
                  <span key={i} className={linea.tono && styles[linea.tono]}>
                    {linea.texto}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={cx(styles.stage, styles.rv, styles.d3, pruebaActiva ? styles[`t${pruebaActiva.charAt(0).toUpperCase()}${pruebaActiva.slice(1)}`] : undefined)}
              role="img"
              aria-label="Simulación ilustrativa de las pruebas de durabilidad sobre el portátil"
            >
              <span className={styles.mode}>{modoTexto}</span>
              <span className={cx(styles.stamp, stampOn && styles.on)}>SUPERADA</span>
              <span className={cx(styles.fx, styles.rain)} />
              <span className={cx(styles.fx, styles.therm)} />
              <div className={styles.dev}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FOTO_DEVICE} alt="TUF Gaming en la zona de pruebas" />
              </div>
              <span className={styles.floor} />
              <span className={styles.gauge} aria-hidden="true">
                <i />
              </span>
            </div>
          </div>
          <div className={styles.milgrid}>
            {MILGRID_TUF.map((item, i) => (
              <div key={item.titulo} className={cx(styles.mg, styles.rv, styles[`d${i + 1}`])}>
                <b>{item.titulo}</b>
                {item.texto}
              </div>
            ))}
          </div>
          <p className={styles.note}>
            Animación ilustrativa. MIL-STD-810H es una norma de pruebas de durabilidad: hace al equipo más resistente, pero no indestructible, y no reemplaza la garantía. No le prometas al cliente que sobrevive a cualquier golpe.
          </p>
        </div>
      </section>

      {/* 06 144 HZ */}
      <section
        ref={(el) => {
          secRefs.current[5] = el;
        }}
        className={cx(styles.sec, secEnVista.has("t6") && styles.in)}
        id="t6"
        aria-labelledby="th6"
      >
        <div className={styles.wrap}>
          <p className={cx(styles.lbl, styles.rv)}>
            <b>06</b>Pantalla
          </p>
          <h2 className={cx(styles.h2, styles.slam)} id="th6">
            144 Hz. <em>Mira la diferencia.</em>
          </h2>
          <p className={cx(styles.lead, styles.rv, styles.d1)}>
            Una pantalla normal muestra 60 imágenes por segundo; la del TUF muestra 144. El movimiento se ve más fluido y el jugador reacciona antes.
          </p>
          <div key={hzKey} className={cx(styles.hz, styles.rv, styles.d2, hzKey > 0 && styles.play)}>
            <div className={cx(styles.lane, styles.s)} role="img" aria-label="Ejemplo de movimiento a 60 Hz, a saltos">
              <span className={styles.lt}>
                <b>60 HZ</b> · pantalla común
              </span>
              <span className={styles.puck} />
            </div>
            <div className={cx(styles.lane, styles.f)} role="img" aria-label="Ejemplo de movimiento a 144 Hz, fluido">
              <span className={styles.lt}>
                <b>144 HZ</b> · TUF Gaming
              </span>
              <span className={styles.puck} />
            </div>
            <button type="button" className={styles.replay} onClick={reproducirHz}>
              Repetir comparación
            </button>
          </div>
          <div className={styles.hzs}>
            {HZ_INFO.map((item, i) => (
              <div key={item.titulo} className={cx(styles.mg, styles.rv, styles[`d${i + 2}`])}>
                <b>{item.titulo}</b>
                {item.texto}
              </div>
            ))}
          </div>
          <p className={styles.note}>La comparación es una simulación para explicar el concepto.</p>
        </div>
      </section>

      {/* 07 GPU */}
      <section
        ref={(el) => {
          secRefs.current[6] = el;
        }}
        className={cx(styles.sec, secEnVista.has("t7") && styles.in)}
        id="t7"
        aria-labelledby="th7"
      >
        <div className={styles.wrap}>
          <p className={cx(styles.lbl, styles.rv)}>
            <b>07</b>Gráfica y enfriamiento
          </p>
          <h2 className={cx(styles.h2, styles.slam)} id="th7">
            Potencia que <em>no se calienta.</em>
          </h2>
          <div className={styles.gpu}>
            <div className={cx(styles.gc, styles.rv, styles.d1)}>
              <span className={styles.tagl}>NVIDIA GEFORCE RTX</span>
              <h3>RTX 3050 o RTX 4060</h3>
              <p>
                <b style={{ color: "#E9ECEF" }}>RTX 3050 (F16):</b> eSports y juegos actuales en calidad media, con DLSS para ganar FPS.
              </p>
              <p>
                <b style={{ color: "#E9ECEF" }}>RTX 4060 (F15):</b> juegos actuales en calidad alta, con DLSS 3 y generación de cuadros, y hasta 140 W de potencia.
              </p>
              <span className={styles.tagl} style={{ marginTop: 8 }}>
                MUX SWITCH · F15
              </span>
              <div className={styles.mux} aria-label="Con MUX Switch la gráfica envía la imagen directo a la pantalla">
                <span className={styles.hl}>RTX 4060</span>
                <i />
                <span className={styles.hl}>PANTALLA</span>
              </div>
              <p>Con el MUX Switch la gráfica le manda la imagen directo a la pantalla, sin pasar por el procesador: más FPS en los juegos.</p>
            </div>
            <div className={cx(styles.gc, styles.rv, styles.d2)}>
              <span className={styles.tagl}>ARMOURY CRATE</span>
              <h3>Modos de rendimiento</h3>
              <div className={styles.fans} aria-hidden="true">
                <span className={styles.fan} style={{ "--sp": MODOS_VENTILADOR[modoVentilador].velocidad } as React.CSSProperties}>
                  <IconoVentilador />
                </span>
                <span className={styles.fan} style={{ "--sp": MODOS_VENTILADOR[modoVentilador].velocidad } as React.CSSProperties}>
                  <IconoVentilador />
                </span>
              </div>
              <div className={styles.modes} role="group" aria-label="Modo de rendimiento">
                {(Object.keys(MODOS_VENTILADOR) as ModoVentiladorId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={cx(styles.md, modoVentilador === id && styles.on)}
                    aria-pressed={modoVentilador === id}
                    onClick={() => setModoVentilador(id)}
                  >
                    {id === "sil" ? "Silencioso" : id === "perf" ? "Rendimiento" : "Turbo"}
                  </button>
                ))}
              </div>
              <p className={styles.mdesc} aria-live="polite">
                {MODOS_VENTILADOR[modoVentilador].desc}
              </p>
              <p>Con la app Armoury Crate el cliente elige cuánta potencia y cuánto ruido quiere. Dos ventiladores sacan el calor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 PUERTOS Y TECLADO */}
      <section
        ref={(el) => {
          secRefs.current[7] = el;
        }}
        className={cx(styles.sec, secEnVista.has("t8") && styles.in)}
        id="t8"
        aria-labelledby="th8"
      >
        <div className={styles.wrap}>
          <p className={cx(styles.lbl, styles.rv)}>
            <b>08</b>Puertos, teclado y audio
          </p>
          <h2 className={cx(styles.h2, styles.slam)} id="th8">
            Todo conectado. <em>Sin adaptadores.</em>
          </h2>
          <div className={styles.ports}>
            <div className={cx(styles.gc, styles.rv, styles.d1)}>
              <span className={styles.tagl}>PUERTOS · TUF F15 (FX507VV)</span>
              <div className={styles.pl}>
                {PUERTOS_F15.map((puerto) => (
                  <div key={puerto.titulo} className={styles.pr}>
                    <IconoPuerto />
                    <div>
                      <b>{puerto.titulo}</b>
                      <span>{puerto.texto}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.note}>El F16 trae HDMI 2.1, USB-C, USB-A, RJ45 y jack de audio; confirma las cantidades en su ficha.</p>
            </div>
            <div className={cx(styles.gc, styles.rv, styles.d2)}>
              <span className={styles.tagl}>TECLADO RGB · AUDIO</span>
              <div className={styles.kbd} aria-hidden="true">
                {Array.from({ length: 23 }, (_, i) => (
                  <i
                    key={i}
                    className={cx(i === 12 && styles.w, i === 13 && styles.sp)}
                    style={secEnVista.has("t8") ? { animationDelay: `${0.05 + (i % 12) * 0.05}s` } : undefined}
                  />
                ))}
              </div>
              <h3 style={{ marginTop: 8 }}>Teclado RGB</h3>
              <p>Retroiluminado RGB de una zona, con teclado numérico en el F15. El cliente elige el color desde Armoury Crate.</p>
              <h3>Audio</h3>
              <p>En el F15: Dolby Atmos, certificación Hi-Res para audífonos y micrófono con cancelación de ruido por IA.</p>
              <p className={styles.say}>
                <b>Dile</b>&quot;Cambia el color del teclado con un clic, y en llamadas o streams el micrófono quita el ruido de fondo.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 09 CIERRE */}
      <section
        ref={(el) => {
          secRefs.current[8] = el;
        }}
        className={cx(styles.sec, secEnVista.has("t9") && styles.in)}
        id="t9"
        aria-labelledby="th9"
      >
        <div className={styles.wrap}>
          <p className={cx(styles.lbl, styles.rv)}>
            <b>09</b>Cierra la venta
          </p>
          <h2 className={cx(styles.h2, styles.slam)} id="th9">
            Objeciones. <em>Respuestas.</em>
          </h2>
          <div className={cx(styles.acc, styles.rv, styles.d1)}>
            {OBJECIONES_TUF.map((obj) => (
              <details key={obj.pregunta}>
                <summary>
                  &quot;{obj.pregunta}&quot;
                  <IconoMas />
                </summary>
                <p className={styles.ans}>
                  <b>{obj.respuestaTitulo}</b> {obj.respuesta}
                </p>
              </details>
            ))}
          </div>

          <div className={styles.qhead}>
            <h3>Quiz de operador</h3>
            <span className={styles.score} aria-live="polite">
              {puntaje} de {QUIZ_TUF.length} correctas
            </span>
          </div>
          <div className={styles.qs}>
            {QUIZ_TUF.map((pregunta, qi) => {
              const elegida = respuestas[qi];
              const respondida = elegida !== undefined;
              return (
                <div key={pregunta.pregunta} className={cx(styles.q, styles.rv)}>
                  <span className={styles.qn}>PREGUNTA {String(qi + 1).padStart(2, "0")}</span>
                  <p className={styles.qt}>{pregunta.pregunta}</p>
                  <div className={styles.opts} role="group" aria-label={pregunta.pregunta}>
                    {pregunta.opciones.map((opcion, oi) => (
                      <button
                        key={opcion}
                        type="button"
                        className={cx(styles.opt, respondida && oi === pregunta.correcta && styles.ok, respondida && oi === elegida && elegida !== pregunta.correcta && styles.bad)}
                        aria-pressed={respondida && oi === elegida}
                        onClick={() => setRespuestas((prev) => ({ ...prev, [qi]: oi }))}
                      >
                        {opcion}
                      </button>
                    ))}
                  </div>
                  <p className={styles.fb}>
                    {!respondida ? "Elige una respuesta." : `${elegida === pregunta.correcta ? "Correcto. " : "No es esa. "}${pregunta.explicacion}`}
                  </p>
                </div>
              );
            })}
          </div>
          <div className={styles.qb}>
            <button type="button" className={styles.btn} onClick={() => setRespuestas({})}>
              Reiniciar quiz
            </button>
            <a className={cx(styles.btn, styles.solid)} href="#t-mis">
              Volver a misiones
            </a>
          </div>
          <div className={cx(styles.badge, gano && styles.won)}>
            <span className={styles.md2} aria-hidden="true">
              <IconoInsignia />
            </span>
            <div>
              <b>Operador TUF certificado</b>
              <span>{gano ? "Insignia desbloqueada. Listo para el piso." : "Responde las 6 bien para desbloquearla"}</span>
            </div>
          </div>
          <p className={styles.foot}>
            Concepto de Kaisen Design Studio para entrenamiento de asesores. No es un sitio oficial de ASUS. Referencias en retail colombiano: TUF Gaming F16 FX607VJB (Intel Core 5 210H, RTX 3050) y TUF Gaming F15 FX507VV (Intel Core i7-13620H, RTX 4060). La RAM y el disco cambian según la tienda; confirma con la ficha técnica vigente.
          </p>
        </div>
      </section>
    </div>
  );
}

function FilaStat({ etiqueta, valor, max }: { etiqueta: string; valor: [number, string]; max: number }) {
  const encendidos = Math.round((valor[0] / max) * 10);
  return (
    <div className={styles.stat}>
      <span className={styles.n}>{etiqueta}</span>
      <span className={styles.seg}>
        {Array.from({ length: 10 }, (_, i) => (
          <i key={i} className={cx(i < encendidos && styles.f)} />
        ))}
      </span>
      <span className={styles.v}>{valor[1]}</span>
    </div>
  );
}

function FilaSpec({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className={styles.flash}>
      <span>{etiqueta}</span>
      <span>{valor}</span>
    </div>
  );
}

function IconoPerfil({ indice }: { indice: number }) {
  const paths = [
    <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="M12 1v4" /><path d="M12 19v4" /><path d="M1 12h4" /><path d="M19 12h4" /></svg>,
    <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V8l7-5 7 5v13" /><path d="M9 21v-6h6v6" /></svg>,
    <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="14" height="12" rx="2" /><path d="m16 10 6-3v10l-6-3" /></svg>,
    <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h4" /><path d="M8 10v4" /><circle cx="15" cy="11" r="1" /><circle cx="17" cy="13" r="1" /><rect x="2" y="6" width="20" height="12" rx="6" /></svg>,
  ];
  return paths[indice] ?? null;
}

function IconoPrueba({ id }: { id: PruebaMilitarId }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (id === "drop") return <svg {...common}><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M4 21h16" /></svg>;
  if (id === "vib") return <svg {...common}><path d="M2 12h3l2-5 3 10 3-14 3 12 2-3h4" /></svg>;
  if (id === "hum") return <svg {...common}><path d="M12 2s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12z" /></svg>;
  return <svg {...common}><path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z" /></svg>;
}

function IconoVentilador() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1.6" />
      <path d="M12 10.4c0-3 1-5.6 3.8-6.2 1.2 2.8-.6 5.2-3.8 6.2z" />
      <path d="M13.4 12.9c2.6 1.5 4.3 3.6 3.4 6.4-2.9-.4-3.9-3.1-3.4-6.4z" />
      <path d="M10.6 12.9c-2.6 1.5-5.3 1.6-7-.6 2-2 4.8-1.4 7 .6z" />
    </svg>
  );
}

function IconoPuerto() {
  return (
    <svg width="44" height="24" viewBox="0 0 66 34" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="6" width="52" height="22" rx="11" />
      <rect x="15" y="13" width="36" height="8" rx="4" />
    </svg>
  );
}

function IconoMas() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function IconoInsignia() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
