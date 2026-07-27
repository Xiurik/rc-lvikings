import type { GalleryItem } from './types';

/**
 * Galería de eventos.
 *
 * TODO: reemplazar los SVG de `public/gallery/` por las capturas reales. `thumb` puede apuntar a una
 * versión ligera y `full` a la de alta calidad que abre el lightbox; con una sola imagen, repetir la ruta.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'event-01',
    title: 'Chambers of Xeric',
    alt: 'Grupo del clan completando Chambers of Xeric',
    thumb: '/gallery/event-01.svg',
    full: '/gallery/event-01.svg',
  },
  {
    id: 'event-02',
    title: 'Theatre of Blood',
    alt: 'Equipo del clan en Theatre of Blood',
    thumb: '/gallery/event-02.svg',
    full: '/gallery/event-02.svg',
  },
  {
    id: 'event-03',
    title: 'Boss of the Week',
    alt: 'Podio del evento Boss of the Week',
    thumb: '/gallery/event-03.svg',
    full: '/gallery/event-03.svg',
  },
  {
    id: 'event-04',
    title: 'Skill of the Week',
    alt: 'Miembros del clan compitiendo en Skill of the Week',
    thumb: '/gallery/event-04.svg',
    full: '/gallery/event-04.svg',
  },
  {
    id: 'event-05',
    title: 'Inferno & Fire Cape',
    alt: 'Celebración de un Infernal Cape del clan',
    thumb: '/gallery/event-05.svg',
    full: '/gallery/event-05.svg',
  },
  {
    id: 'event-06',
    title: 'Reunión del clan',
    alt: 'Reunión general del clan en el world 377',
    thumb: '/gallery/event-06.svg',
    full: '/gallery/event-06.svg',
  },
];
