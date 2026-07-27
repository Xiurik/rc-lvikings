import { useEffect } from 'react';

/**
 * Al montar la SPA, salta a la sección indicada en el hash de la URL (`/home#rangos`).
 *
 * Mantiene compatibilidad con los enlaces antiguos por ruta (`/about`, `/info`, `/rules`),
 * que ahora redirigen a un hash de la página única.
 */
export function useHashScroll(): void {
  useEffect(() => {
    const sectionId = window.location.hash.replace('#', '');
    if (!sectionId) return;

    // Un frame de espera para que las secciones ya estén en el DOM.
    const frame = requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });

    return () => cancelAnimationFrame(frame);
  }, []);
}
