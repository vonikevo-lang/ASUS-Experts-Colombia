# ASUS Experts Colombia — Plataforma de entrenamiento para asesores retail

> Brief del proyecto. Claude Code lee este archivo al iniciar cada sesión.
> Proyecto: concepto/propuesta de Kaisen Design Studio para ASUS Colombia.
> NO es un sitio oficial de ASUS hasta que la marca lo apruebe.

---

## 1. Qué estamos construyendo

Una plataforma web de entrenamiento de producto para asesores de venta en tiendas
retail de Colombia (Alkosto y otras cadenas), inspirada en Intel Retail Edge, con
la identidad visual del sitio oficial de ASUS Colombia (asus.com/co).

Objetivo de negocio: que el asesor conozca el portafolio ASUS, sepa explicarlo al
cliente en lenguaje simple y lo recomiende más. La marca mide el avance.

### Usuarios
- **Asesor de tienda**: entra desde el celular, en el piso de venta, con wifi
  lento. Necesita respuestas rápidas: "¿qué le recomiendo a este cliente?".
- **Equipo de la marca (ASUS)**: ve el avance de asesores y tiendas.

### Alcance del demo (fase 1)
1. Landing pública animada (vende el programa).
2. Comparador de productos con "Modo técnico / Modo cliente".
3. Recomendador por perfil de cliente.
4. Un módulo de entrenamiento completo + quiz.
5. Ranking y badges (datos simulados).
6. Dashboard de la marca (datos simulados).

Todo con **datos de ejemplo en JSON**. Sin backend real, sin registro real y sin
pedir contraseñas reales en esta fase. El login es una simulación visual.

---

## 2. Stack técnico

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** con los tokens de la sección 4 en `tailwind.config` y en CSS
  variables en `globals.css`
- **Motion** (Framer Motion) para transiciones, tabs, listas que se reordenan y
  microinteracciones
- **GSAP + ScrollTrigger** solo para animaciones de scroll complejas en la landing
- **lottie-react** para animaciones exportadas desde After Effects (Bodymovin)
- **next/font** para cargar Saira y Roboto (sin bloquear el render)
- Datos en `/data/*.json`; tipos en `/types`
- Despliegue: Vercel

### Estructura de carpetas
```
/app
  /(public)/page.tsx            → landing
  /(public)/comparador/page.tsx → comparador público (vista previa)
  /app/layout.tsx               → layout de la plataforma (asesor)
  /app/inicio/page.tsx          → dashboard del asesor
  /app/modulos/[slug]/page.tsx  → módulo de entrenamiento
  /app/quiz/[slug]/page.tsx     → quiz
  /app/ranking/page.tsx
  /app/recomendador/page.tsx
  /marca/page.tsx               → dashboard de la marca
/components
  /ui        → Button, Card, Badge, Tabs, Chip, ProgressBar, Counter...
  /landing   → Hero, Pillars, Stats, ComparatorPreview, Testimonials, CTA
  /product   → ProductCard, SpecList, CompareBar, ModeToggle
  /game      → QuizQuestion, BadgeUnlock, RankingList, PointsPill
/data
  products.json, modules.json, quizzes.json, profiles.json, ranking.json, stores.json
/public
  /brand  → logo ASUS oficial (SVG) — NO recrear el logo con fuentes
  /lottie → animaciones .json
  /products → imágenes de producto
```

---

## 3. Referencia visual: asus.com/co

Imitar el **estilo** del sitio oficial de ASUS Colombia (no copiar su código ni
sus imágenes sin permiso):

- **Fondo predominantemente blanco**, limpio, con mucho aire. Secciones
  destacadas en azul oscuro.
- **Hero tipo carrusel de banners a ancho completo**: imagen de producto grande,
  nombre del producto, frase corta y **dos botones: uno primario y uno
  secundario** (en ASUS: "Comprar" + "Ver más"). En nuestro caso:
  "Empezar entrenamiento" + "Ver comparador".
- **Tarjetas de producto** con: imagen, chip con tamaño de pantalla (14", 16"),
  nombre del modelo, código de referencia en gris pequeño, **lista de 4–6
  especificaciones en viñetas**, y dos acciones ("Entrenarme" / "Comparar").
- **Navegación por perfil de uso**, como ASUS: Hogar, Trabajo, Creadores,
  Estudiantes, Gamers. Úsalo en el recomendador.
- **Franja de beneficios con íconos** (ASUS la usa para envío, WhatsApp, pago
  seguro). Nosotros: "5 min por módulo", "Desde tu celular", "Gana puntos",
  "Premios cada mes".
- **Sub-marcas con color propio**: ROG (rojo) y TUF (amarillo) son mundos
  aparte del ASUS azul corporativo. Solo aparecen como etiquetas o acentos.
- **Footer grande en columnas**, fondo oscuro.

Tono: tecnológico, corporativo, confiable. Línea ASUS principal (Zenbook,
Vivobook), **no** la estética gamer de ROG.

---

## 4. Design tokens (provisionales)

> Valores tomados de fuentes públicas de terceros. Se reemplazan por los
> oficiales cuando ASUS entregue su kit de marca. Usar SIEMPRE las variables,
> nunca hex sueltos en los componentes.

### Colores
```css
:root {
  /* ASUS corporativo */
  --asus-blue:        #006CE1; /* principal: logo, botón primario, acentos */
  --asus-blue-deep:   #003A78; /* fondos oscuros: hero, secciones, footer */
  --asus-blue-accent: #0073E6; /* links, hover, estados activos */
  --asus-blue-hover:  #005BB8; /* hover del botón primario */
  --asus-blue-soft:   #EEF3F8; /* fondos de sección suaves */
  --asus-silver:      #CCCCCC; /* bordes, divisores */
  --asus-dark:        #181818; /* texto principal */
  --text-soft:        #5A5A5A; /* texto secundario */
  --text-faint:       #8A8A8A; /* códigos de referencia, notas */
  --bg:               #FFFFFF;
  --border:           #E2E8EF;

  /* Líneas de producto (solo chips, etiquetas y comparador) */
  --line-zenbook: #3B3A36;
  --line-vivobook: #006CE1;
  --line-proart:  #1A1A1A;
  --line-rog:     #CD0000;
  --line-tuf:     #FFD700;

  /* Estados y gamificación */
  --success: #2D8659;
  --warning: #F5A623;
  --danger:  #D63838;
  --gold:    #F5A623; /* puntos, primer lugar */

  /* Sombras (azuladas, suaves) */
  --shadow-card: 0 4px 16px rgba(0, 32, 77, 0.08);
  --shadow-elev: 0 12px 32px rgba(0, 32, 77, 0.12);

  /* Radios */
  --radius-btn:  4px;
  --radius-card: 8px;
  --radius-chip: 999px;
}
```

Gradiente opcional para hero: `linear-gradient(135deg, #006CE1 0%, #003A78 100%)`.

### Tipografía
El logo de ASUS es una rotulación propia: **no existe como fuente**. Se usa el
SVG oficial. Para textos, sustitutos de Google Fonts:

| Uso | Fuente | Peso | Tamaño desktop / móvil |
|---|---|---|---|
| Display (hero) | Saira | 700 | 64px / 36px, mayúsculas, tracking -0.01em |
| H1 | Saira | 700 | 40px / 28px |
| H2 | Saira | 600 | 32px / 24px |
| H3 | Saira | 600 | 22px / 18px |
| Cuerpo | Roboto | 400 | 16px / 16px, line-height 1.6 |
| Botones | Roboto | 500 | 15px, mayúsculas, tracking 0.04em |
| Specs / códigos | Roboto Mono | 400 | 12px |

### Componentes base
- **Botón primario**: fondo `--asus-blue`, texto blanco, radio 4px, alto 44px
  (mínimo táctil), hover `--asus-blue-hover`.
- **Botón secundario**: borde 1px `--asus-blue`, texto `--asus-blue`, fondo
  transparente; sobre fondo oscuro, borde y texto blancos.
- **Tarjeta**: fondo blanco, borde `--border`, radio 8px, `--shadow-card`; en
  hover sube 4px y pasa a `--shadow-elev`.
- **Chip de línea**: píldora pequeña con el color de la línea de producto.

---

## 5. Reglas de animación

- Duraciones: microinteracciones 150–200 ms; entradas de sección 500–700 ms;
  easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- Scroll reveal: fade + translateY(24px → 0), una sola vez por elemento,
  escalonado 80 ms entre hijos.
- Contadores: de 0 al valor en 1.2 s al entrar en pantalla.
- Animar solo `transform` y `opacity` (rendimiento en celulares).
- **Respetar `prefers-reduced-motion`**: sin desplazamientos, solo fades cortos.
- Ninguna animación bloquea el contenido ni retrasa la lectura.
- Lottie: cargar de forma diferida (lazy), pausar fuera de pantalla.

---

## 6. Reglas de contenido

- Idioma: **español de Colombia**, tuteo, frases cortas.
- Cada especificación técnica tiene su traducción "para el cliente"
  (ej.: "NPU hasta 45 TOPS" → "Hace tareas de IA, como mejorar tus videollamadas,
  sin gastar batería").
- **Solo datos oficiales de asus.com/co**. Cualquier dato no confirmado se marca
  en el JSON con `"verificar": true` y se muestra con un ícono discreto en modo
  desarrollo.
- Comparar **modelos ASUS entre sí**. Nada de comparativas contra otras marcas
  hasta que ASUS las apruebe (la publicidad comparativa debe ser objetiva y
  verificable).
- Footer con la nota: "Concepto – propuesta para ASUS Colombia. Desarrollado por
  Kaisen Design Studio."

---

## 7. Calidad

- Mobile-first: diseñar primero a 375 px; sin scroll horizontal.
- Accesibilidad: contraste AA, foco visible, textos alternativos, botones ≥44 px.
- Rendimiento: Lighthouse móvil ≥ 90; imágenes con `next/image` en WebP/AVIF.
- Componentes pequeños y reutilizables; nada de hex sueltos.
