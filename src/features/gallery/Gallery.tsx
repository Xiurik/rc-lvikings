import { useState } from 'react';
import { ImageModal } from '@components/ImageModal';
import { Section } from '@components/Section';
import { GALLERY_ITEMS } from '@data/gallery';

/**
 * Sección `#galeria`: cuadrícula responsiva con lightbox.
 *
 * El visor se controla con un único estado (`selectedIndex`); `null` significa cerrado.
 * Guardar el índice —y no la imagen— permite navegar con las flechas dentro del modal.
 */
export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const total = GALLERY_ITEMS.length;
  const selectedItem = selectedIndex === null ? null : (GALLERY_ITEMS[selectedIndex] ?? null);

  const step = (delta: number) =>
    setSelectedIndex((current) => (current === null ? null : (current + delta + total) % total));

  return (
    <Section
      id="galeria"
      title="Galería"
      subtitle="Momentos de nuestros eventos, raids y logros. Haz clic en cualquier imagen para verla en grande."
    >
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_ITEMS.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Ampliar imagen: ${item.title}`}
              className="osrs-wood-frame group block w-full cursor-pointer p-1.5 transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="relative block overflow-hidden bg-black/40">
                <img
                  src={item.thumb}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20" />
              </span>

              <span className="font-osrs-title text-osrs-gold-bright text-shadow-osrs group-hover:text-osrs-gold-text block px-1 pt-2 pb-0.5 text-center text-base transition-colors md:text-lg">
                {item.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <ImageModal
        item={selectedItem}
        onClose={() => setSelectedIndex(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        position={selectedIndex === null ? undefined : { index: selectedIndex, total }}
      />
    </Section>
  );
}

export default Gallery;
