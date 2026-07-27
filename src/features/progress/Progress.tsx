import { ExternalLinkIcon } from '@components/SocialIcons';
import { Section } from '@components/Section';
import { EXTERNAL_LINK_PROPS } from '@data/clan';
import { TRACKERS } from '@data/trackers';

/** Sección `#progreso`: accesos a los trackers externos del clan. */
export function Progress() {
  return (
    <Section
      id="progreso"
      title="Progreso del Clan"
      subtitle="Todo lo que cuenta para tu rango es público y verificable en estas dos herramientas."
    >
      <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {TRACKERS.map((tracker) => (
          <li key={tracker.id} className="h-full">
            <article className="osrs-stone-panel h-full">
              <div className="flex h-full flex-col items-center gap-4 p-6 text-center">
                <h3 className="font-osrs-title text-osrs-gold-bright text-shadow-osrs border-osrs-gold-deep/40 flex w-full items-center justify-center gap-3 border-b-[3px] pb-3 text-xl font-bold md:text-2xl">
                  {/* Decorativo: el nombre de la herramienta ya está en el texto */}
                  <img
                    src={tracker.icon}
                    alt=""
                    aria-hidden="true"
                    width={40}
                    height={40}
                    className="size-9 shrink-0 drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)] md:size-10"
                  />
                  {tracker.title}
                </h3>

                <p className="font-osrs-body text-osrs-text-light/85 text-base leading-relaxed md:text-xl">
                  {tracker.description}
                </p>

                <a
                  href={tracker.href}
                  {...EXTERNAL_LINK_PROPS}
                  className="osrs-btn-gold mt-auto inline-flex w-full items-center justify-center gap-2"
                >
                  {tracker.cta}
                  <ExternalLinkIcon />
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Progress;
