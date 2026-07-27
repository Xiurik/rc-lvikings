import { CLAN } from './clan';
import type { TrackerLink } from './types';

/** Herramientas externas donde se sigue el progreso del clan. */
export const TRACKERS: TrackerLink[] = [
  {
    id: 'wise-old-man',
    title: 'WiseOldMan',
    description:
      'Ranking del clan, ganancias de XP, EHP y EHB. Aquí se validan los requisitos numéricos de cada rango.',
    href: CLAN.links.wiseOldMan,
    cta: 'Ver Clan',
  },
  {
    id: 'runeprofile',
    title: 'RuneProfile',
    description: 'Collection Logs, quest points y logros de cada integrante en un solo panel del clan.',
    href: CLAN.links.runeProfile,
    cta: 'Ver Clan',
  },
];
