import { rankIcon } from './icons';
import type { ClanRank, CpRule } from './types';

/** Formas de ganar Clan Points (CP). */
export const CP_RULES: CpRule[] = [
  {
    id: 'cp-initials',
    label: "Iniciales 'LV' en el RSN",
    points: '30 CP',
    detail: 'Pago único al adoptar el prefijo del clan en tu nombre.',
  },
  {
    id: 'cp-autologs',
    label: 'Autologs',
    points: '25 CP',
    detail: 'Por registrar tus propios drops y logros en el canal correspondiente.',
  },
  {
    id: 'cp-booster',
    label: 'Booster de Discord',
    points: '50 CP',
    detail: 'Mientras el boost al servidor se mantenga activo.',
  },
  {
    id: 'cp-events',
    label: 'Eventos del clan',
    points: '50 CP',
    detail: '+10 CP adicionales por cada Collection Log obtenido durante el evento.',
  },
  {
    id: 'cp-sotw-botw',
    label: 'Boss / Skill of the Week',
    points: '50 · 75 · 100 CP',
    detail: 'Según el podio (3.º · 2.º · 1.º). +10 CP por cada Collection Log obtenido.',
  },
];

/** Rangos especiales: se otorgan por hitos o por decisión del staff. */
export const SPECIAL_RANKS: ClanRank[] = [
  {
    id: 'completionist',
    name: 'Completionist',
    tier: 'special',
    requirements: [
      { label: 'CP', value: 15000 },
      { label: 'EHP', value: 2000 },
      { label: 'EHB', value: 1500 },
    ],
    ...rankIcon('Competitor'),
  },
  {
    id: 'master-pvmer',
    name: 'Master PvMer',
    tier: 'special',
    requirements: [
      { label: 'CP', value: 10000 },
      { label: 'EHB', value: 1500 },
    ],
    ...rankIcon('Slayer'),
  },
  {
    id: 'clan-hero',
    name: 'Clan Hero',
    tier: 'special',
    requirements: [{ label: 'CP', value: 7500 }],
    note: 'Selección del Staff.',
    ...rankIcon('Asgarnian'),
  },
  {
    id: 'discord-booster',
    name: 'Booster del Discord',
    tier: 'special',
    requirements: [],
    note: 'Temporal, mientras mantengas el boost al servidor.',
    ...rankIcon('Ignitor'),
  },
  {
    id: 'member-of-the-month',
    name: 'Miembro del Mes',
    tier: 'special',
    requirements: [],
    note: 'Para quien acumule más CP durante el mes.',
    ...rankIcon('Crusader'),
  },
];

/** Rangos generales: progresión por CP acumulados. Orden descendente (mayor requisito primero). */
export const GENERAL_RANKS: ClanRank[] = [
  {
    id: 'berserker',
    name: 'Berserker',
    tier: 'general',
    requirements: [{ label: 'CP', value: 4000 }],
    ...rankIcon('Templar'),
  },
  {
    id: 'jomsviking',
    name: 'Jomsviking',
    tier: 'general',
    requirements: [{ label: 'CP', value: 2700 }],
    ...rankIcon('Justiciar'),
  },
  {
    id: 'ulfhednar',
    name: 'Ulfhednar',
    tier: 'general',
    requirements: [{ label: 'CP', value: 2250 }],
    ...rankIcon('Sentry'),
  },
  { id: 'skald', name: 'Skald', tier: 'general', requirements: [{ label: 'CP', value: 1650 }], ...rankIcon('Fighter') },
  {
    id: 'chieftain',
    name: 'Chieftain',
    tier: 'general',
    requirements: [{ label: 'CP', value: 1200 }],
    ...rankIcon('Scourge'),
  },
  {
    id: 'huscarl',
    name: 'Huscarl',
    tier: 'general',
    requirements: [{ label: 'CP', value: 800 }],
    ...rankIcon('Bruiser'),
  },
  { id: 'jarl', name: 'Jarl', tier: 'general', requirements: [{ label: 'CP', value: 500 }], ...rankIcon('Brawler') },
  { id: 'thrall', name: 'Thrall', tier: 'general', requirements: [{ label: 'CP', value: 200 }], ...rankIcon('Goon') },
  {
    id: 'viking',
    name: 'Viking',
    tier: 'general',
    requirements: [],
    note: 'Rango inicial al entrar al clan.',
    ...rankIcon('Enforcer'),
  },
];

const NUMBER_FORMATTER = new Intl.NumberFormat('es-MX');

/** `4000` -> `4,000`. */
export function formatPoints(value: number): string {
  return NUMBER_FORMATTER.format(value);
}
