/** Datos generales del clan. Única fuente de verdad para textos y enlaces globales. */
export const CLAN = {
  name: 'Legendary Vikings',
  shortName: 'LVikings',
  /** Clan Chat dentro de OSRS. */
  clanChat: 'LVIKINGS',
  homeWorld: '377',
  timezone: 'EST / Latinoamérica',
  links: {
    discord: 'https://discord.gg/BWJDsA5ux2',
    twitter: 'https://x.com/LVikingsRS',
    wiseOldMan: 'https://wiseoldman.net/groups/6999',
    runeProfile: 'https://runeprofile.com/clan/LVikings',
  },
} as const;

/** Atributos obligatorios para cualquier enlace que salga del sitio. */
export const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
