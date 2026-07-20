import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Splash() {
  const navigate = useNavigate();

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Cargando Página...');
  const [transitionSpeed, setTransitionSpeed] = useState(500);

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

      // Redirección al home page una vez completada la barra
      setTimeout(() => {
        navigate('/home');
      }, 6000), // Unos milisegundos extra para que el usuario lea el "Bienvenido"
    ];

    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-black">
      <div className="z-10 flex w-full max-w-2xl flex-col items-center px-6 text-center">
        <h1 className="font-osrs-title text-osrs-gold-text text-shadow-osrs mb-14 text-6xl font-bold tracking-widest drop-shadow-[0_0_15px_rgba(244,196,48,0.2)] md:text-7xl">
          LEGENDARY VIKINGS
        </h1>

        <div className="border-osrs-metal-light relative mb-5 h-12 w-full rounded-sm border-4 bg-[#1a1a1a] p-1 shadow-[0_0_20px_rgba(0,0,0,0.9)]">
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
