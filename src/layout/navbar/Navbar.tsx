import { useState } from 'react';
import { CLAN } from '@data/clan';
import { NAV_ITEMS, SECTION_IDS } from '@data/navigation';
import { useMusicMuted } from '@hooks/useBackgroundMusic';
import { useBodyScrollLock } from '@hooks/useBodyScrollLock';
import { useScrollSpy } from '@hooks/useScrollSpy';
import { useSmoothScroll } from '@hooks/useSmoothScroll';
import soundOffIcon from '@icons/sound-off.svg';
import soundOnIcon from '@icons/sound-on.svg';

/**
 * Barra de menú sticky con aspecto de piedra.
 *
 * Los enlaces no navegan: hacen smooth scroll a la sección correspondiente de la página única.
 * El enlace de la sección visible se marca con `aria-current` (el subrayado dorado lo pinta CSS).
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);
  const scrollToSection = useSmoothScroll();
  const { isMuted, toggleMuted } = useMusicMuted();

  useBodyScrollLock(isMobileMenuOpen);

  const goTo = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    // `<header>` como landmark de banner del sitio; el `<nav>` interior es la navegación.
    <header className="sticky top-0 z-50 w-full">
      <nav
        aria-label="Navegación principal"
        className="osrs-stone-panel z-40 w-full rounded-none border-t-0 border-r-0 border-b-[3px] border-l-0"
      >
        <div className="h-osrs-navbar mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-6">
          <button
            type="button"
            onClick={() => goTo('inicio')}
            className="font-osrs-title text-osrs-gold-text text-shadow-osrs hover:text-osrs-gold-bright cursor-pointer text-2xl font-bold tracking-wide transition-colors md:text-3xl"
          >
            {CLAN.shortName.toUpperCase()}
          </button>

          {/* Menú de escritorio */}
          <ul className="hidden items-center gap-8 text-lg md:flex lg:gap-10 lg:text-xl">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goTo(item.id)}
                  aria-current={activeSection === item.id}
                  className="osrs-nav-link"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Controles del extremo derecho */}
          <div className="flex items-center gap-1">
            {/* Interruptor de la música de fondo */}
            <button
              type="button"
              onClick={toggleMuted}
              aria-pressed={!isMuted}
              aria-label={isMuted ? 'Activar la música' : 'Silenciar la música'}
              title={isMuted ? 'Activar la música' : 'Silenciar la música'}
              className="cursor-pointer p-1 transition-all duration-150 hover:brightness-125 active:translate-x-px active:translate-y-px"
            >
              <img
                src={isMuted ? soundOffIcon : soundOnIcon}
                alt=""
                aria-hidden="true"
                width={48}
                height={48}
                decoding="async"
                className="size-12"
              />
            </button>

            {/* Botón hamburguesa */}
            <button
              type="button"
              className="text-osrs-gold-text cursor-pointer p-2 transition-colors hover:text-white md:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            id="mobile-menu"
            className="osrs-stone-panel absolute top-full left-0 z-40 w-full rounded-none! border-x-0 border-t-0 border-b-[3px] md:hidden"
          >
            <ul className="flex flex-col items-stretch py-2 text-lg">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => goTo(item.id)}
                    aria-current={activeSection === item.id}
                    className="osrs-nav-link w-full py-3 text-center"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
