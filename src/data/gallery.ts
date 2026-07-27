import type { GalleryItem } from './types';

/**
 * Galería de eventos.
 *
 * `thumb` apunta a la versión ligera (máx. 800px) y `full` a la de alta calidad que abre el
 * lightbox, ambas en `public/gallery/`. Al sustituir una imagen, actualizar también `width` /
 * `height` con las dimensiones reales del archivo `full`.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'event-01',
    title: 'Corporeal Beast',
    alt: 'Grupo del clan matando a Corporeal Beast',
    thumb: '/gallery/event-01-thumb.webp',
    full: '/gallery/event-01.webp',
    width: 1369,
    height: 1149,
  },
  {
    id: 'event-02',
    title: 'The Nightmare',
    alt: 'Equipo del clan en The Nightmare',
    thumb: '/gallery/event-02-thumb.webp',
    full: '/gallery/event-02.webp',
    width: 1536,
    height: 1024,
  },
  {
    id: 'event-03',
    title: 'Boss of the Week',
    alt: 'Podio del evento Boss of the Week',
    thumb: '/gallery/event-03-thumb.webp',
    full: '/gallery/event-03.webp',
    width: 1536,
    height: 1024,
  },
  {
    id: 'event-04',
    title: 'Skill of the Week',
    alt: 'Miembros del clan compitiendo en Skill of the Week',
    thumb: '/gallery/event-04-thumb.webp',
    full: '/gallery/event-04.webp',
    width: 1536,
    height: 1024,
  },
  {
    id: 'event-05',
    title: 'Zalcano',
    alt: 'Equipo del clan en Zalcano',
    thumb: '/gallery/event-05-thumb.webp',
    full: '/gallery/event-05.webp',
    width: 1536,
    height: 1024,
  },
  {
    id: 'event-06',
    title: 'Reunión del clan',
    alt: 'Reunión general del clan en el world 377',
    thumb: '/gallery/event-06-thumb.webp',
    full: '/gallery/event-06.webp',
    width: 1536,
    height: 1024,
  },
];
