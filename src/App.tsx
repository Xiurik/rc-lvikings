import { Seo } from '@components/Seo';
import { HOME_SEO } from '@data/seo';
import { buildSiteJsonLd } from '@data/structuredData';
import { Footer } from '@layout/footer/Footer';
import { Navbar } from '@layout/navbar/Navbar';
import { About } from '@features/about/About';
import { Community } from '@features/community/Community';
import { Gallery } from '@features/gallery/Gallery';
import { Hero } from '@features/home/Hero';
import { Progress } from '@features/progress/Progress';
import { Ranks } from '@features/ranks/Ranks';
import { Rules } from '@features/rules/Rules';
import { Staff } from '@features/staff/Staff';
import './App.css';

/** Bloques JSON-LD del sitio, indexados por el `id` del `<script>` que los aloja en el `<head>`. */
const JSON_LD = { 'ld-site': buildSiteJsonLd() };

/**
 * Layout de la Single Page Application.
 *
 * Todas las secciones coexisten en esta única página; la navegación es smooth scroll gestionado
 * por el `Navbar`. El orden de los componentes es el orden visual y el del scroll spy.
 *
 * Jerarquía de encabezados: `<h1>` único en `Hero`, `<h2>` por sección (vía `SectionHeading`),
 * `<h3>` para los bloques internos y `<h4>` para las fichas de cada miembro.
 */
export function App() {
  return (
    <div className="app-shell-bg font-osrs-sans text-osrs-text-light relative isolate flex min-h-svh flex-col">
      <Seo {...HOME_SEO} jsonLd={JSON_LD} />

      <Navbar />

      <main className="relative flex grow flex-col items-center">
        <Hero />
        <About />
        <Staff />
        <Ranks />
        <Gallery />
        <Progress />
        <Rules />
        <Community />
      </main>

      <Footer />
    </div>
  );
}

export default App;
