import { CLAN } from './clan';
import { HOME_SEO, OG_IMAGE, SITE_DESCRIPTION, SITE_LANG, SITE_URL, absoluteUrl } from './seo';

/**
 * Datos estructurados Schema.org en JSON-LD.
 *
 * Se emite un único `@graph` con tres nodos enlazados por `@id` en vez de tres bloques sueltos:
 * así Google entiende que la organización, el sitio y la página son la misma entidad y no
 * tres cosas distintas que casualmente comparten nombre.
 */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

/** Perfiles externos verificables del clan: `sameAs` es lo que conecta la entidad con sus redes. */
const SAME_AS = [CLAN.links.discord, CLAN.links.twitter, CLAN.links.wiseOldMan, CLAN.links.runeProfile];

export function buildSiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: CLAN.name,
        alternateName: [CLAN.shortName, `Clan Chat ${CLAN.clanChat}`],
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/apple-touch-icon.png'),
          width: 180,
          height: 180,
        },
        image: absoluteUrl(OG_IMAGE.path),
        knowsLanguage: SITE_LANG,
        knowsAbout: [
          {
            '@type': 'VideoGame',
            name: 'Old School RuneScape',
            alternateName: 'OSRS',
            url: 'https://oldschool.runescape.com/',
            publisher: { '@type': 'Organization', name: 'Jagex Ltd.' },
          },
        ],
        sameAs: SAME_AS,
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: CLAN.name,
        alternateName: CLAN.shortName,
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
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
        },
      },
    ],
  };
}
