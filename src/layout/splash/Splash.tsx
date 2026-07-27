import { useEffect, useState } from 'react';
import { useBodyScrollLock } from '@hooks/useBodyScrollLock';

export interface SplashProps {
  /** Se dispara cuando la secuencia termina y el overlay ya no bloquea la página. */
  onFinish: () => void;
}

/**
 * Pantalla de carga estilo Jagex, como *overlay* sobre la página ya montada.
 *
 * Antes era una ruta propia (`/`) que navegaba a `/home` a los 6 s. Eso dejaba la raíz del
 * dominio sin contenido: los bots sociales no ejecutan JS y Googlebot rara vez espera timers
 * tan largos. Ahora la página completa se renderiza debajo desde el primer paint y esto solo
 * la tapa mientras dura la animación.
 */
export function Splash({ onFinish }: SplashProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Cargando Página...');
  const [transitionSpeed, setTransitionSpeed] = useState(500);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useBodyScrollLock(true);

  useEffect(() => {
    // Secuencia de carga simulando la conexión a los servidores de Jagex
    const timers = [
      setTimeout(() => {
        setLoadingProgress(25);
        setLoadingText('Conectando al servidor de actualizaciones...');
        setTransitionSpeed(800);
      }, 1000),

      setTimeout(() => {
        setLoadingProgress(50);
        setLoadingText('Cargando archivos de Old School RuneScape...');
        setTransitionSpeed(1200);
      }, 2400),

      setTimeout(() => {
        setLoadingProgress(75);
        setLoadingText('Preparando interfaces...');
        setTransitionSpeed(1200);
      }, 3800),

      setTimeout(() => {
        setLoadingProgress(100);
        setLoadingText('Bienvenido a Legendary Vikings.');
        setTransitionSpeed(1200);
      }, 4800),

      // Unos milisegundos extra para que el usuario lea el «Bienvenido» antes del fundido
      setTimeout(() => setIsFadingOut(true), 6000),
      setTimeout(onFinish, 6600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div
      // `role="status"` en lugar de un landmark: es un estado transitorio, no una página.
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden bg-black transition-opacity duration-500 ${
        isFadingOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="z-10 flex w-full max-w-2xl flex-col items-center px-6 text-center">
        {/* No es un <h1>: el único encabezado de nivel 1 de la página es el del Hero. */}
        <p className="font-osrs-title text-osrs-gold-text text-shadow-osrs mb-14 text-6xl font-bold tracking-widest drop-shadow-[0_0_15px_rgba(244,196,48,0.2)] md:text-7xl">
          LEGENDARY VIKINGS
        </p>

        <div
          role="progressbar"
          aria-valuenow={loadingProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso de carga"
          className="border-osrs-metal-light relative mb-5 h-12 w-full rounded-sm border-4 bg-[#1a1a1a] p-1 shadow-[0_0_20px_rgba(0,0,0,0.9)]"
        >
          <div
            className="bg-osrs-crimson-banner h-full transition-all ease-out"
            style={{ width: `${loadingProgress}%`, transitionDuration: `${transitionSpeed}ms` }}
          ></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-osrs-sans text-osrs-text-light text-shadow-osrs text-base font-bold md:text-lg">
              {loadingProgress}%
            </span>
          </div>
        </div>

        <p className="font-osrs-sans text-osrs-gold-text text-shadow-osrs min-h-8 text-lg font-semibold tracking-widest md:text-xl">
          {loadingText}
        </p>
      </div>
    </div>
  );
}

export default Splash;
