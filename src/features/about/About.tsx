import { ParchmentScroll } from '@components/ParchmentScroll';
import { SectionHeading } from '@components/SectionHeading';
import { ABOUT_LEAD, ABOUT_PARAGRAPHS } from '@data/content';

/**
 * Bloque «Quiénes Somos» (`#quienes-somos`).
 *
 * No está en el navbar (que solo lista las seis secciones principales), pero sigue siendo
 * enlazable por hash y se recorre al hacer scroll justo después del hero.
 */
export function About() {
  return (
    <section
      id="quienes-somos"
      aria-labelledby="quienes-somos-title"
      className="osrs-section w-full px-4 py-14 md:py-20"
    >
      <ParchmentScroll>
        <SectionHeading id="quienes-somos-title" title="Quiénes Somos" tone="dark" />

        <p className="font-osrs-title text-osrs-crimson-banner mb-6 text-center text-xl font-bold md:text-3xl">
          {ABOUT_LEAD}
        </p>

        <div className="osrs-prose flex flex-col gap-4 text-left text-lg font-bold text-black md:text-xl">
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </ParchmentScroll>
    </section>
  );
}

export default About;
