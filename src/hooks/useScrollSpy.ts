import { useEffect, useState } from 'react';

/**
 * Devuelve el id de la sección visible para resaltar el enlace activo del navbar.
 *
 * Usa `IntersectionObserver` con un rootMargin que descuenta la altura del navbar sticky,
 * de modo que una sección se considera activa cuando llega justo debajo del menú.
 */
export function useScrollSpy(sectionIds: string[], navbarHeight = 96): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: `-${navbarHeight}px 0px -55% 0px`,
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds, navbarHeight]);

  return activeId;
}
