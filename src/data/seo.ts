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

/** 154 caracteres: dentro del corte de ~160 con el que Google y Bing renderizan el snippet. */
export const SITE_DESCRIPTION =
  `${CLAN.name} (${CLAN.shortName}): clan hispano de Old School RuneScape. PvM, raids, skilling y eventos. ` +
  `Únete al Clan Chat ${CLAN.clanChat} en el world ${CLAN.homeWorld} y Discord.`;

/**
 * Variantes de marca por las que se busca al clan, incluidos los errores de escritura habituales.
 *
 * Alimentan el `alternateName` del JSON-LD y la meta `keywords`: son el mismo conjunto de
 * señales, así que se declaran una sola vez para que no se desincronicen.
 */
export const BRAND_ALIASES = [
  CLAN.shortName,
  'Latin Vikings',
  'lvkings',
  `Clan Chat ${CLAN.clanChat}`,
  `${CLAN.name} OSRS`,
] as const;

/**
 * Términos para `<meta name="keywords">`.
 *
 * Google la ignora desde 2009, pero Bingbot la sigue usando como señal secundaria de
 * categorización temática. Se mantiene corta y descriptiva del contenido real de la página:
 * una lista inflada con términos que no aparecen en el documento cuenta como spam para Bing.
 */
export const SITE_KEYWORDS = [
  'lvikings',
  'legendary vikings',
  'latin vikings',
  'lvkings',
  'clan lvikings',
  'lvikings osrs',
  'clan hispano osrs',
  'clan latino old school runescape',
  'clan osrs español',
  'comunidad latina osrs',
  'clan osrs latam',
  'old school runescape',
  'osrs',
  'world 377 osrs',
  'clan chat lvikings',
  'pvm osrs',
  'raids osrs',
  'tombs of amascut',
  'chambers of xeric',
  'theatre of blood',
  'skilling osrs',
  'bingo osrs',
  'discord clan osrs hispano',
  'wise old man legendary vikings',
  'runeprofile lvikings',
] as const;

/** La meta `keywords` es una lista separada por comas: se serializa una vez y se reutiliza. */
export const SITE_KEYWORDS_CONTENT = SITE_KEYWORDS.join(', ');

/**
 * Metadatos de la página única.
 *
 * La SPA tiene una sola URL indexable: los anclas (`#rangos`, `#galeria`, …) son fragmentos,
 * y Google los ignora como URLs independientes.
 *
 * El sufijo `(Latin Vikings)` del título deja 59 caracteres —por debajo del corte de 60— y
 * cubre la variante de marca más buscada sin desplazar la keyword principal.
 */
export const HOME_SEO: PageSeo = {
  title: `${CLAN.shortName} | Clan Hispano de OSRS · World ${CLAN.homeWorld} (Latin Vikings)`,
  description: SITE_DESCRIPTION,
  canonicalPath: '/',
  indexable: true,
};

/** Directiva `robots` para páginas indexables, con los límites de snippet abiertos al máximo. */
export const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
export const ROBOTS_NOINDEX = 'noindex, follow';
