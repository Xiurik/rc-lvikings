import { ParchmentScroll } from '@components/ParchmentScroll';
import { SectionHeading } from '@components/SectionHeading';
import { CLAN_RULES, RULES_CLOSING, RULES_LEAD } from '@data/content';

/**
 * Bloque «Reglas del Clan» (`#reglas`).
 *
 * Igual que `About`, es enlazable por hash aunque no aparezca en el navbar.
 */
export function Rules() {
  return (
    <section id="reglas" aria-labelledby="reglas-title" className="osrs-section w-full px-4 py-14 md:py-20">
      <ParchmentScroll>
        <SectionHeading id="reglas-title" title="Reglas del Clan" tone="dark" />

        <p className="osrs-prose text-osrs-text-dark mb-6 text-center text-lg font-bold md:text-2xl">{RULES_LEAD}</p>

        <ol className="osrs-prose flex flex-col gap-3 text-left text-lg text-black md:text-xl">
          {CLAN_RULES.map((rule, index) => (
            <li key={rule.slice(0, 40)} className="flex gap-3">
              <span className="font-osrs-title text-osrs-crimson-banner shrink-0 font-bold">{index + 1}.</span>
              <span>{rule}</span>
            </li>
          ))}
        </ol>

        <p className="osrs-prose text-osrs-text-dark border-osrs-parchment-line/70 mt-6 border-t-2 pt-5 text-center text-lg font-bold md:text-xl">
          {RULES_CLOSING}
        </p>
      </ParchmentScroll>
    </section>
  );
}

export default Rules;
