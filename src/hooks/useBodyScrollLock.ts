import { useEffect } from 'react';

/** Congela el scroll del documento mientras un overlay (lightbox / menú móvil) está abierto. */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
