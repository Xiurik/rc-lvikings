# LVikings — Legendary Vikings

Sitio del clan **Legendary Vikings** de Old School RuneScape. Single Page Application con React 19,
TypeScript, Vite y Tailwind CSS v4, con estética inspirada en la interfaz del juego.

- Clan Chat: `LVIKINGS` · Home World: `377`
- [Discord](https://discord.gg/BWJDsA5ux2) · [X](https://x.com/LVikingsRS) ·
  [WiseOldMan](https://wiseoldman.net/groups/6999) · [RuneProfile](https://runeprofile.com/clan/LVikings)

## Scripts

| Comando          | Qué hace                                       |
| ---------------- | ---------------------------------------------- |
| `npm run dev`    | Servidor de desarrollo con HMR                 |
| `npm run build`  | `tsc -b` + build de producción en `dist/`      |
| `npm test`       | Vitest en modo run + ESLint                    |
| `npm run format` | Prettier + `eslint --fix` sobre `src/`         |

## Estructura

`public/` solo contiene lo que necesita una URL fija y predecible; todo lo que el código
referencia por import o por `url()` vive en `src/assets/` para que Vite lo hashee.

```
public/                 Copiado literal a dist/, sin procesar ni hashear
├─ favicon.ico
├─ og-cover.jpg         Portada de Open Graph / Twitter Card (1280×627)
├─ robots.txt           Indexación abierta + referencia al sitemap
├─ sitemap.xml          Una sola URL: los anclas no son páginas
├─ _redirects           Config de Netlify: debe existir con ese nombre exacto
├─ gallery/             Placeholders de la galería (reemplazables sin tocar código)
└─ icons/               Iconos de rango (ver public/icons/README.md)

src/
├─ App.tsx            Layout de la SPA: Navbar + secciones + Footer
├─ App.css            Fondo del shell (capas fixed para no romper el sticky)
├─ main.tsx           Bootstrap de React + BrowserRouter
├─ assets/
│  ├─ icons/          SVG importados desde TS (iconos de los trackers)
│  ├─ img/            Texturas OSRS: piedra, pergamino, paisaje
│  └─ styles/
│     ├─ global.css   Tema Tailwind v4 (@theme), utilidades y capa base
│     └─ osrs-components.css   Paneles, botones y marcos con relieve estilo OSRS
├─ components/        UI reutilizable y agnóstica de dominio
│  ├─ ImageModal.tsx        Lightbox de la galería
│  ├─ ParchmentScroll.tsx   Pergamino desplegado para textos largos
│  ├─ RankIcon.tsx          Icono de rango con cascada de respaldo
│  ├─ Section.tsx           Contenedor + ancla de cada sección
│  ├─ SectionHeading.tsx    Título de sección
│  ├─ Seo.tsx               Metadatos del <head> de la ruta (no renderiza nada)
│  └─ SocialIcons.tsx       SVG inline de Discord / X
├─ data/              Contenido y contratos (única fuente de verdad)
│  ├─ clan.ts         Datos generales y enlaces
│  ├─ content.ts      Textos largos (Quiénes Somos, Reglas)
│  ├─ gallery.ts      Imágenes de la galería
│  ├─ icons.ts        Resolución de rutas de iconos de rango
│  ├─ navigation.ts   Enlaces del navbar / orden de secciones
│  ├─ ranks.ts        Reglas de CP y requisitos de cada rango
│  ├─ seo.ts          Título, descripción, canonical, OG y handles sociales
│  ├─ staff.ts        Administración del clan
│  ├─ structuredData.ts  JSON-LD (Organization + WebSite + WebPage)
│  ├─ trackers.ts     WiseOldMan y RuneProfile
│  └─ types.ts        Interfaces del dominio
├─ features/          Una carpeta por sección de la página
│  ├─ about/          #quienes-somos
│  ├─ community/      #comunidad
│  ├─ gallery/        #galeria
│  ├─ home/           #inicio (Hero)
│  ├─ progress/       #progreso
│  ├─ ranks/          #rangos (RankBoard, CpRules)
│  ├─ rules/          #reglas
│  └─ staff/          #miembros (StaffCard)
├─ hooks/
│  ├─ useBodyScrollLock.ts  Bloquea el scroll con overlays abiertos
│  ├─ useDocumentMeta.ts    Sobrescribe las etiquetas del <head>
│  ├─ useHashScroll.ts      Salto inicial al hash de la URL
│  ├─ useScrollSpy.ts       Resalta el enlace de la sección visible
│  └─ useSmoothScroll.ts    Smooth scroll del navbar
├─ layout/
│  ├─ footer/         Footer
│  ├─ navbar/         Navbar sticky (desktop + menú móvil)
│  └─ splash/         Overlay de carga sobre la página
└─ routing/
   ├─ AppRoutes.tsx   Rutas y redirecciones heredadas
   └─ HomeRoute.tsx   Página única + splash encima
```

### Rutas

| Ruta                        | Resultado                                                    |
| --------------------------- | ------------------------------------------------------------ |
| `/`                         | La página única completa, con el splash como overlay encima   |
| `/home`                     | 301 a `/` (Netlify) — ruta heredada                            |
| `/about`, `/info`, `/rules` | 301 al hash equivalente de `/`                                 |
| cualquier otra              | Redirección a `/`                                              |

El splash **no** es una ruta: `HomeRoute` monta `App` y el overlay a la vez, así la raíz del
dominio tiene contenido indexable desde el primer paint. Ver la sección de SEO.

## SEO

Los bots sociales (Discord, X, Facebook, WhatsApp) no ejecutan JavaScript: solo leen el HTML
inicial. Por eso hay **dos** juegos de metadatos que deben mantenerse sincronizados:

| Dónde                                          | Para quién                                   |
| ---------------------------------------------- | -------------------------------------------- |
| `index.html` (estático)                        | Bots sociales y rastreadores sin renderizado  |
| [`src/data/seo.ts`](src/data/seo.ts) + `<Seo>`  | Google (renderiza JS) y la pestaña del navegador |

`Seo` no usa `react-helmet-async`: [`useDocumentMeta`](src/hooks/useDocumentMeta.ts) *sobrescribe*
las etiquetas que ya existen en `index.html` en lugar de añadir un segundo juego, que es lo que
provocaría `<title>` y `og:title` duplicados. Las pruebas de
[`Seo.test.tsx`](src/components/Seo.test.tsx) blindan esa invariante.

Archivos de indexación en `public/`: `robots.txt`, `sitemap.xml`, `og-cover.jpg` (1280×627) y
`_redirects` con los 301 de las rutas heredadas.

**Al publicar cambios de contenido:** actualizar `<lastmod>` en `public/sitemap.xml`.
**Al cambiar título o descripción:** tocarlos en `src/data/seo.ts` *y* en `index.html`.

## Tailwind CSS v4

No hay `tailwind.config.js`: la v4 es *CSS-first*. La paleta, tipografías y tokens viven en el bloque
`@theme` de [`src/assets/styles/global.css`](src/assets/styles/global.css), y desde ahí Tailwind genera
las utilidades (`bg-osrs-ink`, `text-osrs-gold-bright`, `font-osrs-title`, `h-osrs-navbar`, …).

## Contenido por reemplazar

1. **Iconos de rango** → guardar los PNG en `public/icons/` con los nombres de
   [`public/icons/README.md`](public/icons/README.md).
2. **Galería** → sustituir los SVG de `public/gallery/` y ajustar `src/data/gallery.ts`.
3. **Staff** → poner los RSN reales en `src/data/staff.ts`.
