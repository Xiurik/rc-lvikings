import { CLAN } from './clan';
import { BRAND_ALIASES, HOME_SEO, OG_IMAGE, SITE_DESCRIPTION, SITE_LANG, SITE_URL, absoluteUrl } from './seo';

/**
 * Datos estructurados Schema.org en JSON-LD.
 *
 * Se emite un único `@graph` con los nodos enlazados por `@id` en vez de bloques sueltos:
 * así Google entiende que la organización, el juego, el sitio y la página son la misma entidad
 * y no varias cosas distintas que casualmente comparten nombre.
 *
 * Lo que se declare aquí debe estar copiado literalmente en el `<script id="ld-site">` de
 * `index.html`: los rastreadores que no ejecutan JS solo leen aquel.
 */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;
const FAQ_ID = `${SITE_URL}/#faq`;

/** La entidad del juego vive fuera del sitio: se referencia por su URL oficial. */
const VIDEO_GAME_ID = 'https://oldschool.runescape.com/#videogame';

/** Perfiles externos verificables del clan: `sameAs` es lo que conecta la entidad con sus redes. */
const SAME_AS = [CLAN.links.discord, CLAN.links.twitter, CLAN.links.wiseOldMan, CLAN.links.runeProfile];

/** Regiones de las que provienen los miembros. Refuerza la relevancia geográfica de la entidad. */
const AREA_SERVED = ['Latinoamérica', 'México', 'Colombia', 'Chile', 'Argentina', 'Perú', 'España'];

/** Temas sobre los que la organización tiene experiencia demostrable dentro del juego. */
const TOPICS = [
  'PvM en Old School RuneScape',
  'Raids: Tombs of Amascut (ToA), Chambers of Xeric (CoX) y Theatre of Blood (ToB)',
  'Skilling y progresión de cuentas',
  'Boss of the Week y Skill of the Week',
  'Bingo y eventos de clan',
  'Collection Log, EHP y EHB',
];

/**
 * Preguntas frecuentes del clan.
 *
 * Cada respuesta se limita a información que ya está visible en la página (Clan Chat y home
 * world en `Hero` y `Community`, actividades en `About`, trackers en `Progress`). Google exige
 * que el contenido marcado como FAQ sea visible al usuario: marcar aquí datos que no aparecen
 * en ningún sitio sería motivo de acción manual.
 */
const FAQ_ENTRIES: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: `¿Cómo me uno al clan ${CLAN.shortName} de OSRS?`,
    answer:
      `Entra al Clan Chat ${CLAN.clanChat} dentro de Old School RuneScape o únete a nuestro servidor de ` +
      'Discord y solicita el ingreso a un Alto Rango. Es gratuito y abierto a jugadores hispanohablantes ' +
      'de cualquier nivel, tanto casuales como competitivos.',
  },
  {
    question: `¿En qué mundo y Clan Chat juega ${CLAN.name}?`,
    answer:
      `Nuestro home world es el ${CLAN.homeWorld} y el Clan Chat dentro del juego es ${CLAN.clanChat}. ` +
      `Los eventos se coordinan desde el Discord del clan en horario ${CLAN.timezone}.`,
  },
  {
    question: '¿Qué actividades organiza el clan?',
    answer:
      'Somos un clan PvM, social y skiller: raids (Tombs of Amascut, Chambers of Xeric y Theatre of Blood), ' +
      'bossing, skilling, bingos, Boss of the Week y Skill of the Week, además de sorteos y eventos ' +
      'semanales y mensuales. La participación siempre es opcional.',
  },
  {
    question: `¿${CLAN.name} es un clan hispano o latino?`,
    answer:
      `Sí. ${CLAN.name} (también escrito ${CLAN.shortName} o Latin Vikings) es una comunidad ` +
      'hispanohablante con miembros de México, Colombia, Chile, Argentina, Perú, España y el resto de ' +
      'Latinoamérica. Nació en RS3 y hoy tiene comunidad activa también en OSRS.',
  },
  {
    question: '¿Dónde puedo consultar el progreso del clan?',
    answer:
      'Seguimos EHP, EHB, récords y competiciones en Wise Old Man (grupo 6999) y los Collection Log de ' +
      'los miembros en RuneProfile.',
  },
];

export function buildSiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        // `sport` solo es válido en el dominio de `SportsOrganization`; el tipo múltiple mantiene
        // la entidad como organización genérica sin invalidar la propiedad.
        '@type': ['Organization', 'SportsOrganization'],
        '@id': ORGANIZATION_ID,
        name: CLAN.name,
        alternateName: [...BRAND_ALIASES],
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
        sport: 'Esports / Gaming',
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/apple-touch-icon.png'),
          width: 180,
          height: 180,
        },
        image: absoluteUrl(OG_IMAGE.path),
        knowsLanguage: SITE_LANG,
        areaServed: AREA_SERVED,
        knowsAbout: [{ '@id': VIDEO_GAME_ID }, ...TOPICS],
        sameAs: SAME_AS,
      },
      {
        '@type': 'VideoGame',
        '@id': VIDEO_GAME_ID,
        name: 'Old School RuneScape',
        alternateName: ['OSRS', 'Old School RS'],
        url: 'https://oldschool.runescape.com/',
        genre: ['MMORPG', 'Massively Multiplayer Online Role-Playing Game'],
        gamePlatform: ['PC', 'Android', 'iOS'],
        publisher: { '@type': 'Organization', name: 'Jagex Ltd.', url: 'https://www.jagex.com/' },
        sameAs: 'https://en.wikipedia.org/wiki/Old_School_RuneScape',
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: CLAN.name,
        alternateName: [...BRAND_ALIASES],
        description: SITE_DESCRIPTION,
        inLanguage: SITE_LANG,
        publisher: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'WebPage',
        '@id': WEBPAGE_ID,
        url: `${SITE_URL}/`,
        name: HOME_SEO.title,
        description: HOME_SEO.description,
        inLanguage: SITE_LANG,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
        mentions: { '@id': VIDEO_GAME_ID },
        hasPart: { '@id': FAQ_ID },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': FAQ_ID,
        url: `${SITE_URL}/`,
        inLanguage: SITE_LANG,
        isPartOf: { '@id': WEBPAGE_ID },
        about: { '@id': ORGANIZATION_ID },
        mainEntity: FAQ_ENTRIES.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };
}
