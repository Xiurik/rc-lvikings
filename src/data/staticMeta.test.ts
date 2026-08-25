import { describe, expect, it } from 'vitest';
// `?raw` en vez de node:fs: `tsconfig.app.json` no carga los tipos de Node, y Vite ya resuelve
// el import como string tanto en el bundle como en Vitest.
import html from '../../index.html?raw';
import { HOME_SEO, OG_IMAGE, ROBOTS_INDEX, SITE_KEYWORDS_CONTENT, SITE_URL } from './seo';
import { buildSiteJsonLd } from './structuredData';

/**
 * `index.html` es lo único que ven los rastreadores que no ejecutan JavaScript (Bingbot en su
 * primer pase, Discord, X, WhatsApp, Slack). El cliente reescribe esas mismas etiquetas desde
 * `seo.ts`, así que si las dos fuentes se separan, bots y usuarios acaban viendo cosas distintas.
 *
 * Estas pruebas leen el HTML real del repositorio y lo comparan contra las constantes de TypeScript:
 * cualquier cambio en un lado que no se copie al otro rompe el suite.
 */

const document = new DOMParser().parseFromString(html, 'text/html');

const metaContent = (selector: string) => document.querySelector(selector)?.getAttribute('content');

describe('metadatos estáticos de index.html', () => {
  it('sirve el mismo título y descripción que HOME_SEO', () => {
    expect(document.querySelector('title')?.textContent).toBe(HOME_SEO.title);
    expect(metaContent('meta[name="description"]')).toBe(HOME_SEO.description);
    expect(metaContent('meta[name="robots"]')).toBe(ROBOTS_INDEX);
    expect(metaContent('meta[name="keywords"]')).toBe(SITE_KEYWORDS_CONTENT);
  });

  it('mantiene el título en 60 caracteres y la descripción por debajo del corte del snippet', () => {
    // Por encima de 60, Google reescribe el título; por encima de ~160, trunca la descripción.
    expect(HOME_SEO.title.length).toBeLessThanOrEqual(60);
    expect(HOME_SEO.description.length).toBeGreaterThanOrEqual(140);
    expect(HOME_SEO.description.length).toBeLessThanOrEqual(160);
  });

  it('declara canonical, hreflang e idioma coherentes', () => {
    expect(document.documentElement.getAttribute('lang')).toBe('es');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${SITE_URL}/`);
    expect(document.querySelector('link[hreflang="es"]')?.getAttribute('href')).toBe(`${SITE_URL}/`);
    expect(document.querySelector('link[hreflang="x-default"]')?.getAttribute('href')).toBe(`${SITE_URL}/`);
  });

  it('repite el título y la descripción en Open Graph y Twitter Cards', () => {
    const image = `${SITE_URL}${OG_IMAGE.path}`;

    expect(metaContent('meta[property="og:title"]')).toBe(HOME_SEO.title);
    expect(metaContent('meta[property="og:description"]')).toBe(HOME_SEO.description);
    expect(metaContent('meta[property="og:url"]')).toBe(`${SITE_URL}/`);
    expect(metaContent('meta[property="og:image"]')).toBe(image);
    expect(metaContent('meta[name="twitter:title"]')).toBe(HOME_SEO.title);
    expect(metaContent('meta[name="twitter:description"]')).toBe(HOME_SEO.description);
    expect(metaContent('meta[name="twitter:image"]')).toBe(image);
  });

  it('incrusta el mismo @graph que genera buildSiteJsonLd', () => {
    const script = document.getElementById('ld-site');

    // Comparación estructural, no textual: el HTML va indentado y el cliente serializa compacto.
    expect(JSON.parse(script?.textContent ?? '{}')).toEqual(buildSiteJsonLd());
  });
});
