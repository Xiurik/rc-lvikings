import { useCallback } from 'react';

/** Respeta `prefers-reduced-motion` para no marear a quien lo tenga activado. */
function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * Desplazamiento suave hacia una sección de la SPA.
 *
 * El offset del navbar sticky se resuelve con `scroll-margin-top` en CSS (clase `osrs-section`),
 * así que aquí basta con `scrollIntoView`. El hash se actualiza con `replaceState` para poder
 * compartir enlaces profundos sin ensuciar el historial con cada clic del menú.
 */
export function useSmoothScroll() {
  return useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });

    window.history.replaceState(null, '', `#${sectionId}`);
  }, []);
}
