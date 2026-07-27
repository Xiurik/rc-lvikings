import {
  OG_IMAGE,
  ROBOTS_INDEX,
  ROBOTS_NOINDEX,
  SITE_LANG,
  SITE_LOCALE,
  TWITTER_HANDLE,
  absoluteUrl,
  type PageSeo,
} from '@data/seo';
import { CLAN } from '@data/clan';
import { useDocumentMeta, type MetaEntry } from '@hooks/useDocumentMeta';

export interface SeoProps extends PageSeo {
  /** Bloques JSON-LD indexados por el `id` del `<script>` que los contiene. */
  jsonLd?: Record<string, Record<string, unknown>>;
  /** Sobrescribe la portada social para una página concreta (ruta absoluta del sitio). */
  imagePath?: string;
}

/**
 * Inyecta en el `<head>` el juego completo de metadatos de una ruta.
 *
 * No renderiza nada: todo el trabajo lo hace `useDocumentMeta` sobre las etiquetas que ya
 * existen en `index.html`. Basta con montarlo una vez por ruta indexable.
 */
export function Seo({
  title,
  description,
  canonicalPath,
  indexable = true,
  imagePath = OG_IMAGE.path,
  jsonLd,
}: SeoProps) {
  const canonical = absoluteUrl(canonicalPath);
  const image = absoluteUrl(imagePath);

  const meta: MetaEntry[] = [
    { key: 'name', value: 'description', content: description },
    { key: 'name', value: 'robots', content: indexable ? ROBOTS_INDEX : ROBOTS_NOINDEX },

    // Open Graph — Discord, Facebook, WhatsApp, Slack
    { key: 'property', value: 'og:type', content: 'website' },
    { key: 'property', value: 'og:site_name', content: CLAN.name },
    { key: 'property', value: 'og:locale', content: SITE_LOCALE },
    { key: 'property', value: 'og:url', content: canonical },
    { key: 'property', value: 'og:title', content: title },
    { key: 'property', value: 'og:description', content: description },
    { key: 'property', value: 'og:image', content: image },
    { key: 'property', value: 'og:image:secure_url', content: image },
    { key: 'property', value: 'og:image:type', content: 'image/jpeg' },
    { key: 'property', value: 'og:image:width', content: String(OG_IMAGE.width) },
    { key: 'property', value: 'og:image:height', content: String(OG_IMAGE.height) },
    { key: 'property', value: 'og:image:alt', content: OG_IMAGE.alt },

    // Twitter Cards — X usa `name`, no `property`
    { key: 'name', value: 'twitter:card', content: 'summary_large_image' },
    { key: 'name', value: 'twitter:site', content: TWITTER_HANDLE },
    { key: 'name', value: 'twitter:creator', content: TWITTER_HANDLE },
    { key: 'name', value: 'twitter:title', content: title },
    { key: 'name', value: 'twitter:description', content: description },
    { key: 'name', value: 'twitter:image', content: image },
    { key: 'name', value: 'twitter:image:alt', content: OG_IMAGE.alt },
  ];

  useDocumentMeta({ title, canonical, meta, lang: SITE_LANG, jsonLd });

  return null;
}

export default Seo;
