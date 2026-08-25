import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { HOME_SEO, SITE_KEYWORDS_CONTENT, SITE_URL } from '@data/seo';
import { buildSiteJsonLd } from '@data/structuredData';
import { Seo } from './Seo';

/**
 * `index.html` sirve un juego completo de metadatos para los bots que no ejecutan JS.
 * Estas pruebas comprueban que `Seo` los *reescribe* en vez de añadir un segundo juego:
 * si se duplicaran, Google y los bots sociales se quedarían con el primero (el estático).
 */
function seedStaticHead() {
  document.head.innerHTML = `
    <title>Título estático de index.html</title>
    <meta name="description" content="Descripción estática" />
    <meta property="og:title" content="OG estático" />
    <link rel="canonical" href="https://www.lvikings.com/" />
    <script type="application/ld+json" id="ld-site">{"@context":"https://schema.org"}</script>
  `;
}

describe('Seo', () => {
  beforeEach(seedStaticHead);

  it('no duplica las etiquetas que ya existen en index.html', () => {
    render(<Seo {...HOME_SEO} jsonLd={{ 'ld-site': buildSiteJsonLd() }} />);

    expect(document.head.querySelectorAll('title')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[property="og:title"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1);
  });

  it('sobrescribe título, descripción y canonical con los de la ruta', () => {
    render(<Seo {...HOME_SEO} />);

    expect(document.title).toBe(HOME_SEO.title);
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute('content', HOME_SEO.description);
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', `${SITE_URL}/`);
    expect(document.documentElement.lang).toBe('es');
  });

  it('emite Open Graph y Twitter Cards con URLs absolutas', () => {
    render(<Seo {...HOME_SEO} />);

    const content = (selector: string) => document.head.querySelector(selector)?.getAttribute('content');

    expect(content('meta[property="og:type"]')).toBe('website');
    expect(content('meta[property="og:url"]')).toBe(`${SITE_URL}/`);
    expect(content('meta[property="og:image"]')).toBe(`${SITE_URL}/og-cover.jpg`);
    expect(content('meta[name="twitter:card"]')).toBe('summary_large_image');
    expect(content('meta[name="twitter:site"]')).toBe('@LVikingsRS');
    expect(content('meta[name="twitter:image"]')).toBe(`${SITE_URL}/og-cover.jpg`);
  });

  it('publica un JSON-LD válido con la organización y el sitio enlazados', () => {
    render(<Seo {...HOME_SEO} jsonLd={{ 'ld-site': buildSiteJsonLd() }} />);

    const script = document.getElementById('ld-site');
    const graph = JSON.parse(script?.textContent ?? '{}')['@graph'] as Array<Record<string, unknown>>;
    const nodeById = (id: string) => graph.find((node) => node['@id'] === id);

    expect(graph.map((node) => node['@type'])).toEqual([
      ['Organization', 'SportsOrganization'],
      'VideoGame',
      'WebSite',
      'WebPage',
      'FAQPage',
    ]);

    const organization = nodeById(`${SITE_URL}/#organization`);
    expect(organization?.['sameAs']).toContain('https://x.com/LVikingsRS');
    // Las variantes de marca son lo que conecta las búsquedas mal escritas con la entidad.
    expect(organization?.['alternateName']).toContain('Latin Vikings');
    expect(nodeById(`${SITE_URL}/#website`)?.['publisher']).toEqual({ '@id': `${SITE_URL}/#organization` });
  });

  it('enlaza la organización con la entidad del juego por @id en vez de duplicarla', () => {
    render(<Seo {...HOME_SEO} jsonLd={{ 'ld-site': buildSiteJsonLd() }} />);

    const graph = JSON.parse(document.getElementById('ld-site')?.textContent ?? '{}')['@graph'] as Array<
      Record<string, unknown>
    >;
    const gameId = 'https://oldschool.runescape.com/#videogame';
    const organization = graph.find((node) => node['@id'] === `${SITE_URL}/#organization`);

    expect(organization?.['knowsAbout']).toContainEqual({ '@id': gameId });
    expect(graph.find((node) => node['@id'] === gameId)?.['name']).toBe('Old School RuneScape');
  });

  it('estructura las preguntas frecuentes como FAQPage', () => {
    render(<Seo {...HOME_SEO} jsonLd={{ 'ld-site': buildSiteJsonLd() }} />);

    const graph = JSON.parse(document.getElementById('ld-site')?.textContent ?? '{}')['@graph'] as Array<
      Record<string, unknown>
    >;
    const faq = graph.find((node) => node['@type'] === 'FAQPage');
    const questions = faq?.['mainEntity'] as Array<Record<string, unknown>>;

    expect(questions.length).toBeGreaterThanOrEqual(3);
    questions.forEach((question) => {
      expect(question['@type']).toBe('Question');
      expect(question['name']).toBeTruthy();
      expect((question['acceptedAnswer'] as Record<string, unknown>)['text']).toBeTruthy();
    });
  });

  it('emite la meta keywords que Bing usa como señal de categorización', () => {
    render(<Seo {...HOME_SEO} />);

    expect(document.head.querySelector('meta[name="keywords"]')).toHaveAttribute('content', SITE_KEYWORDS_CONTENT);
  });

  it('marca noindex cuando la página no debe indexarse', () => {
    render(<Seo {...HOME_SEO} indexable={false} />);

    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  });
});
