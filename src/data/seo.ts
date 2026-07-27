import { CLAN } from './clan';

/**
 * Constantes de indexación y social sharing. Única fuente de verdad para el `<head>`.
 *
 * Lo que se declara aquí debe coincidir con lo que hay escrito estáticamente en `index.html`:
 * los bots de Discord, X y Facebook NO ejecutan JavaScript, así que solo leen ese HTML inicial.
 * El componente `Seo` reescribe estas mismas etiquetas en cliente para Google (que sí renderiza)
 * y para que la pestaña del navegador muestre el título correcto al cambiar de ruta.
 */

/** Origen canónico, sin barra final: las rutas se concatenan contra él. */
export const SITE_URL = 'https://www.lvikings.com';

/** Handle de X sin URL: las Twitter Cards exigen el formato `@usuario`. */
export const TWITTER_HANDLE = '@LVikingsRS';

/** `og:locale` en formato IETF con guion bajo, no el `lang` del documento. */
export const SITE_LOCALE = 'es_ES';

/** Idioma del documento (`<html lang>` y `inLanguage` del JSON-LD). */
export const SITE_LANG = 'es';

/**
 * Portada para Open Graph / Twitter Card.
 *
 * Debe ser JPG o PNG: ni Discord ni X renderizan SVG. Las dimensiones se declaran porque
 * permiten a los bots reservar el espacio de la preview antes de descargar el archivo.
 */
export const OG_IMAGE = {
  path: '/og-cover.jpg',
  width: 1280,
  height: 627,
  alt: `Estandarte de ${CLAN.name}, clan hispano de Old School RuneScape`,
} as const;

/** Resuelve una ruta absoluta del sitio contra el origen canónico. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export interface PageSeo {
  /** ≤ 60 caracteres: por encima de eso Google reescribe el título en los resultados. */
  title: string;
  /** 120-160 caracteres. No es factor de ranking, pero sí de CTR. */
  description: string;
  /** Ruta absoluta desde la raíz (`/`, `/rangos`, …) que se resuelve contra `SITE_URL`. */
  canonicalPath: string;
  /** `false` para páginas sin valor en el índice (estados intermedios, previews). */
  indexable?: boolean;
}

export const SITE_DESCRIPTION =
  `${CLAN.name} (${CLAN.shortName}) es un clan hispano de Old School RuneScape: PvM, raids, skilling y eventos ` +
  `semanales. Únete al Clan Chat ${CLAN.clanChat} en el world ${CLAN.homeWorld} y a nuestro Discord.`;

/**
 * Metadatos de la página única.
 *
 * La SPA tiene una sola URL indexable: los anclas (`#rangos`, `#galeria`, …) son fragmentos,
 * y Google los ignora como URLs independientes.
 */
export const HOME_SEO: PageSeo = {
  title: `${CLAN.shortName} | Clan Hispano de OSRS · World ${CLAN.homeWorld}`,
  description: SITE_DESCRIPTION,
  canonicalPath: '/',
  indexable: true,
};

/** Directiva `robots` para páginas indexables, con los límites de snippet abiertos al máximo. */
export const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
export const ROBOTS_NOINDEX = 'noindex, follow';
