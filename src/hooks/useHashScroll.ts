import { useEffect } from 'react';

/**
 * Salta a la sección indicada en el hash de la URL (`/#rangos`).
 *
 * Mantiene compatibilidad con los enlaces antiguos por ruta (`/about`, `/info`, `/rules`),
 * que ahora redirigen a un hash de la página única.
 *
 * @param enabled Debe ser `false` mientras el splash mantiene el scroll del body bloqueado:
 *   con `overflow: hidden` el `scrollIntoView` no tiene efecto y el salto se perdería.
 */
export function useHashScroll(enabled = true): void {
  useEffect(() => {
    if (!enabled) return;

    const sectionId = window.location.hash.replace('#', '');
    if (!sectionId) return;

    // Un frame de espera para que las secciones ya estén en el DOM.
    const frame = requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });

    return () => cancelAnimationFrame(frame);
  }, [enabled]);
}
