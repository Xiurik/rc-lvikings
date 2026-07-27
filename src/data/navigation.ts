import type { NavItem, SectionId } from './types';

/** Enlaces del navbar. El orden define también el orden de las secciones en la página. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'miembros', label: 'Staff' },
  { id: 'top-jugadores', label: 'Top Players' },
  { id: 'rangos', label: 'Ranks' },
  { id: 'galeria', label: 'Galería' },
  { id: 'progreso', label: 'Progreso' },
  { id: 'comunidad', label: 'Comunidad' },
];

export const SECTION_IDS: SectionId[] = NAV_ITEMS.map((item) => item.id);
