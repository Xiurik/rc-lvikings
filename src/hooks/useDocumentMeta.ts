import { useEffect } from 'react';

/**
 * Sincroniza el `<head>` con los metadatos de la ruta activa.
 *
 * No añade etiquetas nuevas si ya existen: las *sobrescribe*. Es la diferencia clave frente a
 * `react-helmet-async`, que gestiona su propio juego de etiquetas y deja intactas las que ya
 * venían en `index.html` — con lo que acabas con dos `<title>` y dos `og:title` y los bots
 * se quedan con el primero, que suele ser el estático.
 *
 * Este enfoque permite mantener el `index.html` completo (imprescindible: Discord, X y Facebook
 * no ejecutan JavaScript) y aun así cambiar los metadatos por ruta sin duplicarlos.
 */

export interface MetaEntry {
  /** `name` para metadatos estándar y Twitter Cards; `property` para Open Graph. */
  key: 'name' | 'property';
  value: string;
  content: string;
}

export interface DocumentMeta {
  title: string;
  canonical: string;
  meta: MetaEntry[];
  /** Idioma del documento; se refleja en `<html lang>`. */
  lang?: string;
  /** Bloques JSON-LD. Se serializan en un único `<script>` por clave. */
  jsonLd?: Record<string, Record<string, unknown>>;
}

function upsertMeta({ key, value, content }: MetaEntry): void {
  // Los valores son literales controlados (`og:title`, `description`, …): sin comillas ni
  // barras invertidas, así que dentro de un selector entrecomillado no requieren escape.
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(key, value);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function upsertJsonLd(id: string, data: Record<string, unknown>): void {
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

export function useDocumentMeta({ title, canonical, meta, lang = 'es', jsonLd }: DocumentMeta): void {
  // Serializado como dependencia: los objetos se recrean en cada render y romperían el efecto.
  const metaKey = JSON.stringify(meta);
  const jsonLdKey = JSON.stringify(jsonLd ?? null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = title;

    upsertLink('canonical', canonical);
    (JSON.parse(metaKey) as MetaEntry[]).forEach(upsertMeta);

    const blocks = JSON.parse(jsonLdKey) as DocumentMeta['jsonLd'];
    if (blocks) {
      Object.entries(blocks).forEach(([id, data]) => upsertJsonLd(id, data));
    }
  }, [title, canonical, lang, metaKey, jsonLdKey]);
}
