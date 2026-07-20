import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './App.css';

export function App() {
  const location = useLocation();
  const isSplashRoute = location.pathname === '/';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((val) => !val);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (isSplashRoute) {
    return <Outlet />;
  }

  return (
    <div className="app-shell-bg font-osrs-sans text-osrs-text-light relative isolate flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 bg-black/50"></div>

      <div className="sticky top-0 z-50 w-full">
        <nav className="osrs-stone-panel z-40 w-full rounded-none border-t-0 border-r-0 border-b-[3px] border-l-0">
          <div className="flex w-full items-center justify-between px-4 py-4 md:px-6">
            <Link
              to="/home"
              onClick={closeMobileMenu}
              className="font-osrs-title text-osrs-gold-text text-shadow-osrs cursor-pointer text-2xl font-bold md:text-3xl"
            >
              LVIKINGS
            </Link>

            {/* Desktop Menu */}
            <ul className="font-osrs-title hidden gap-14 text-xl font-semibold md:flex">
              <li>
                <Link to="/about" className="hover:text-osrs-gold-text transition-colors">
                  Quienes Somos
                </Link>
              </li>
              <li>
                <Link to="/info" className="hover:text-osrs-gold-text transition-colors">
                  Informacion del Clan
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-osrs-gold-text transition-colors">
                  Reglas
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="text-osrs-gold-text p-2 transition-colors hover:text-white md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop for closing menu on outside click */}
            <div
              className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            ></div>

            <div className="osrs-stone-panel absolute top-full left-0 z-40 w-full rounded-none! border-x-0 border-t-0 border-b-[3px] bg-[#252320] md:hidden">
              <ul className="font-osrs-title flex flex-col items-center gap-6 py-4 text-xl font-semibold shadow-lg">
                <li>
                  <Link
                    to="/about"
                    onClick={closeMobileMenu}
                    className="hover:text-osrs-gold-text block w-full py-2 text-center transition-colors"
                  >
                    Quienes Somos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/info"
                    onClick={closeMobileMenu}
                    className="hover:text-osrs-gold-text block w-full py-2 text-center transition-colors"
                  >
                    Informacion del Clan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rules"
                    onClick={closeMobileMenu}
                    className="hover:text-osrs-gold-text block w-full py-2 text-center transition-colors"
                  >
                    Reglas
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      <main className="relative flex grow flex-col items-center justify-center p-4 md:p-12">
        <Outlet />
      </main>

      <footer className="osrs-stone-panel relative mt-auto rounded-none border-t-[3px] border-r-0 border-b-0 border-l-0 py-4 text-center">
        <p className="font-osrs-title text-osrs-gold-text text-shadow-osrs mb-2 text-xl">Legendary Vikings</p>
        <p className="font-osrs-body text-osrs-text-light/80">
          © 2026. Forjado en la provincia de Gielinor.
          <br />
          <span>No afiliado oficialmente con Old School RuneScape ni Jagex Ltd.</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
