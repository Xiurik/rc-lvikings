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

```
public/
├─ assets/img/        Texturas OSRS (piedra, pergamino, paisaje)
├─ gallery/           Placeholders de la galería (reemplazables por capturas reales)
└─ icons/             Iconos de rango (ver public/icons/README.md)

src/
├─ App.tsx            Layout de la SPA: Navbar + secciones + Footer
├─ App.css            Fondo del shell (capas fixed para no romper el sticky)
├─ main.tsx           Bootstrap de React + BrowserRouter
├─ assets/styles/
│  ├─ global.css      Tema Tailwind v4 (@theme), utilidades y capa base
│  └─ osrs-components.css   Paneles, botones y marcos con relieve estilo OSRS
├─ components/        UI reutilizable y agnóstica de dominio
│  ├─ ImageModal.tsx        Lightbox de la galería
│  ├─ ParchmentScroll.tsx   Pergamino desplegado para textos largos
│  ├─ RankIcon.tsx          Icono de rango con cascada de respaldo
│  ├─ Section.tsx           Contenedor + ancla de cada sección
│  ├─ SectionHeading.tsx    Título de sección
│  └─ SocialIcons.tsx       SVG inline de Discord / X
├─ data/              Contenido y contratos (única fuente de verdad)
│  ├─ clan.ts         Datos generales y enlaces
│  ├─ content.ts      Textos largos (Quiénes Somos, Reglas)
│  ├─ gallery.ts      Imágenes de la galería
│  ├─ icons.ts        Resolución de rutas de iconos de rango
│  ├─ navigation.ts   Enlaces del navbar / orden de secciones
│  ├─ ranks.ts        Reglas de CP y requisitos de cada rango
│  ├─ staff.ts        Administración del clan
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
│  ├─ useHashScroll.ts      Salto inicial al hash de la URL
│  ├─ useScrollSpy.ts       Resalta el enlace de la sección visible
│  └─ useSmoothScroll.ts    Smooth scroll del navbar
├─ layout/
│  ├─ footer/         Footer
│  ├─ navbar/         Navbar sticky (desktop + menú móvil)
│  └─ splash/         Pantalla de carga de la ruta `/`
└─ routing/AppRoutes.tsx
```

### Rutas

| Ruta                       | Resultado                          |
| -------------------------- | ---------------------------------- |
| `/`                        | Splash de carga, redirige a `/home` |
| `/home`                    | La página única completa            |
| `/about`, `/info`, `/rules` | Redirección al hash equivalente    |
| cualquier otra             | Redirección a `/`                   |

## Tailwind CSS v4

No hay `tailwind.config.js`: la v4 es *CSS-first*. La paleta, tipografías y tokens viven en el bloque
`@theme` de [`src/assets/styles/global.css`](src/assets/styles/global.css), y desde ahí Tailwind genera
las utilidades (`bg-osrs-ink`, `text-osrs-gold-bright`, `font-osrs-title`, `h-osrs-navbar`, …).

## Contenido por reemplazar

1. **Iconos de rango** → guardar los PNG en `public/icons/` con los nombres de
   [`public/icons/README.md`](public/icons/README.md).
2. **Galería** → sustituir los SVG de `public/gallery/` y ajustar `src/data/gallery.ts`.
3. **Staff** → poner los RSN reales en `src/data/staff.ts`.
