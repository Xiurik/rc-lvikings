import type { ReactNode } from 'react';
import { Section } from '@components/Section';
import { DiscordIcon, XIcon } from '@components/SocialIcons';
import { CLAN, EXTERNAL_LINK_PROPS } from '@data/clan';

interface SocialChannel {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: ReactNode;
}

const CHANNELS: SocialChannel[] = [
  {
    id: 'discord',
    title: 'Discord',
    description:
      'El centro de operaciones: eventos, sorteos, canales de PvM y skilling, y notificaciones de OSRS y RS3.',
    href: CLAN.links.discord,
    cta: 'Unirse al servidor',
    icon: <DiscordIcon className="size-8" />,
  },
  {
    id: 'twitter',
    title: 'X (Twitter)',
    description: 'Anuncios, resultados de eventos y los mejores drops del clan.',
    href: CLAN.links.twitter,
    cta: 'Seguir en X',
    icon: <XIcon className="size-8" />,
  },
];

/** Sección `#comunidad`: presencia social del clan. */
export function Community() {
  return (
    <Section
      id="comunidad"
      title="Comunidad"
      subtitle={`Encuéntranos dentro del juego en el Clan Chat ${CLAN.clanChat} (world ${CLAN.homeWorld}) o en nuestras redes.`}
    >
      <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {CHANNELS.map((channel) => (
          <li key={channel.id} className="h-full">
            <article className="osrs-stone-panel h-full">
              <div className="flex h-full flex-col items-center gap-4 p-6 text-center">
                <span className="text-osrs-gold-bright border-osrs-gold-deep bg-osrs-ink rounded-sm border-2 p-3 shadow-[inset_0_0_14px_rgba(0,0,0,0.7)]">
                  {channel.icon}
                </span>

                <div>
                  <h3 className="font-osrs-title text-osrs-gold-bright text-shadow-osrs text-xl font-bold md:text-2xl">
                    {channel.title}
                  </h3>
                </div>

                <p className="font-osrs-body text-osrs-text-light/85 text-base leading-relaxed md:text-lg">
                  {channel.description}
                </p>

                <a href={channel.href} {...EXTERNAL_LINK_PROPS} className="osrs-btn-red mt-auto w-full py-2.5 text-lg">
                  {channel.cta}
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Community;
