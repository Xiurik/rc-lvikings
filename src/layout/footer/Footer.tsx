import { CLAN, EXTERNAL_LINK_PROPS } from '@data/clan';
import { DiscordIcon, XIcon } from '@components/SocialIcons';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="osrs-stone-panel relative mt-auto rounded-none border-t-[3px] border-r-0 border-b-0 border-l-0 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div>
          <p className="font-osrs-title text-osrs-gold-text text-shadow-osrs text-2xl font-bold tracking-wide">
            {CLAN.name}
          </p>
          <p className="font-osrs-sans text-osrs-text-light/70 mt-1 text-sm tracking-widest uppercase">
            Clan Chat: {CLAN.clanChat} · World {CLAN.homeWorld}
          </p>
        </div>

        <ul className="flex items-center gap-4">
          <li>
            <a
              href={CLAN.links.discord}
              {...EXTERNAL_LINK_PROPS}
              aria-label="Discord de Legendary Vikings"
              className="text-osrs-text-light hover:text-osrs-gold-bright hover:border-osrs-gold-bright border-osrs-gold-deep/60 bg-osrs-ink inline-flex rounded-sm border-2 p-2 transition-colors"
            >
              <DiscordIcon />
            </a>
          </li>
          <li>
            <a
              href={CLAN.links.twitter}
              {...EXTERNAL_LINK_PROPS}
              aria-label="Cuenta de X de Legendary Vikings"
              className="text-osrs-text-light hover:text-osrs-gold-bright hover:border-osrs-gold-bright border-osrs-gold-deep/60 bg-osrs-ink inline-flex rounded-sm border-2 p-2 transition-colors"
            >
              <XIcon />
            </a>
          </li>
        </ul>

        <p className="font-osrs-body text-osrs-text-light/80 text-base">
          © {CURRENT_YEAR} {CLAN.name}. Forjado en la provincia de Gielinor.
          <br />
          <span className="text-osrs-text-light/60 text-sm">
            No afiliado oficialmente con Old School RuneScape ni Jagex Ltd.
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
