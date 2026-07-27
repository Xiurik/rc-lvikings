import { CLAN, EXTERNAL_LINK_PROPS } from '@data/clan';
import { DiscordIcon } from '@components/SocialIcons';
import { useSmoothScroll } from '@hooks/useSmoothScroll';

const FACTS = [
  { label: 'Clan Chat', value: CLAN.clanChat },
  { label: 'Home World', value: CLAN.homeWorld },
  { label: 'Zona horaria', value: CLAN.timezone },
];

/** Encabezado de alto impacto: primera sección de la SPA (`#inicio`). */
export function Hero() {
  const scrollToSection = useSmoothScroll();

  return (
    <section
      id="inicio"
      aria-labelledby="inicio-title"
      className="osrs-section flex min-h-[calc(100svh-var(--spacing-osrs-navbar))] w-full items-center justify-center px-4 py-12"
    >
      <div className="osrs-stone-panel mx-auto w-full max-w-4xl">
        <div className="flex flex-col items-center gap-6 px-5 py-10 text-center md:px-10 md:py-14">
          <p className="font-osrs-sans text-osrs-text-light text-lg font-semibold tracking-[0.3em] uppercase md:text-lg">
            Clan latino de Old School RuneScape
          </p>

          <h1
            id="inicio-title"
            className="font-osrs-title text-osrs-gold-text text-shadow-osrs text-4xl leading-tight font-bold tracking-wide md:text-6xl"
          >
            {/* Dos <span> en bloque en lugar de <br />: el salto es visual y el nombre accesible
                sigue leyéndose como «Legendary Vikings». */}
            <span className="block">Legendary</span> <span className="block">Vikings</span>
          </h1>

          <p className="font-osrs-body text-osrs-text-light max-w-2xl text-lg leading-relaxed md:text-2xl">
            Somos un clan PvM, social y skiller. Grandes incursiones nos esperan: prepara tu equipo y únete a la
            hermandad.
          </p>

          <dl className="flex flex-wrap items-stretch justify-center gap-3 md:gap-4">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="border-osrs-gold-deep bg-osrs-ink min-w-36 rounded-sm border-2 px-4 py-2 shadow-[inset_0_0_12px_rgba(0,0,0,0.7)]"
              >
                <dt className="font-osrs-sans text-osrs-text-light/70 text-[0.65rem] tracking-widest uppercase">
                  {fact.label}
                </dt>
                <dd className="font-osrs-title text-osrs-gold-bright text-shadow-osrs text-lg font-bold md:text-xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center">
            <a
              href={CLAN.links.discord}
              {...EXTERNAL_LINK_PROPS}
              className="osrs-btn-red flex w-full items-center justify-center gap-3 py-3 text-lg sm:w-auto md:text-2xl"
            >
              <DiscordIcon className="size-6 md:size-7" />
              Únete a nuestro Discord
            </a>

            <button
              type="button"
              onClick={() => scrollToSection('rangos')}
              className="osrs-btn-gold w-full py-3 sm:w-auto md:text-xl"
            >
              Ver rangos y CP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
