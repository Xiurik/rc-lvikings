import { useEffect, useRef } from 'react';
import type { GalleryItem } from '@data/types';
import { useBodyScrollLock } from '@hooks/useBodyScrollLock';

export interface ImageModalProps {
  /** `null` mantiene el lightbox cerrado. */
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  /** Posición actual dentro de la galería, para el contador «3 / 6». */
  position?: { index: number; total: number };
}

/**
 * Lightbox de la galería, con estado controlado desde el componente padre (`useState`).
 *
 * Cierra con la «X», con clic en el fondo y con `Escape`; navega con las flechas del teclado.
 * Mientras está abierto se bloquea el scroll del documento y el foco pasa al botón de cierre.
 */
export function ImageModal({ item, onClose, onPrev, onNext, position }: ImageModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useBodyScrollLock(item !== null);

  // Atajos de teclado
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev?.();
      if (event.key === 'ArrowRight') onNext?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onPrev, onNext]);

  // Mueve el foco al abrir y lo devuelve al cerrar
  useEffect(() => {
    if (!item) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    return () => lastFocusedRef.current?.focus();
  }, [item]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={(event) => {
        // Solo cierra si el clic fue en el overlay, no en la imagen ni en los controles
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Cerrar imagen"
        className="text-osrs-gold-bright hover:text-osrs-gold-text border-osrs-gold-deep bg-osrs-ink absolute top-4 right-4 z-10 cursor-pointer rounded-sm border-2 p-2 shadow-[2px_2px_4px_rgba(0,0,0,0.6)] transition-colors md:top-6 md:right-6"
      >
        <svg viewBox="0 0 24 24" className="size-6 md:size-7" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <figure className="osrs-wood-frame flex max-h-full w-full max-w-5xl flex-col p-2">
        <img
          src={item.full}
          alt={item.alt}
          width={item.width}
          height={item.height}
          // El lightbox solo existe tras un clic: la imagen es lo único que importa cargar ya.
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="max-h-[70vh] w-full bg-black/40 object-contain md:max-h-[75vh]"
        />

        <figcaption className="font-osrs-title text-osrs-gold-bright text-shadow-osrs flex items-center justify-between gap-4 px-2 pt-3 pb-1 text-base md:text-lg">
          <span className="truncate">{item.title}</span>
          {position && (
            <span className="font-osrs-sans text-osrs-text-light/70 shrink-0 text-sm">
              {position.index + 1} / {position.total}
            </span>
          )}
        </figcaption>
      </figure>

      {onPrev && (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Imagen anterior"
          className="text-osrs-gold-bright hover:text-osrs-gold-text border-osrs-gold-deep bg-osrs-ink/90 absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-sm border-2 p-2 transition-colors md:left-6"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {onNext && (
        <button
          type="button"
          onClick={onNext}
          aria-label="Imagen siguiente"
          className="text-osrs-gold-bright hover:text-osrs-gold-text border-osrs-gold-deep bg-osrs-ink/90 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-sm border-2 p-2 transition-colors md:right-6"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default ImageModal;
