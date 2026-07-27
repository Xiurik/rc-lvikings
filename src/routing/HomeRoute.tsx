import { useCallback, useState } from 'react';
import { App } from '../App';
import { useHashScroll } from '@hooks/useHashScroll';
import { Splash } from '@layout/splash/Splash';

/**
 * Ruta raíz: la página única con el splash encima.
 *
 * `App` se monta desde el primer render — es lo que hace que `https://www.lvikings.com/` tenga
 * contenido indexable — y el splash lo tapa mientras corre su animación. Durante ese rato el
 * contenido queda `inert` para que ni el teclado ni los lectores de pantalla lo alcancen a
 * través del overlay.
 */
export function HomeRoute() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const finishSplash = useCallback(() => setIsSplashDone(true), []);

  // El salto al hash espera al splash: mientras está abierto el scroll del body está bloqueado.
  useHashScroll(isSplashDone);

  return (
    <>
      <div inert={!isSplashDone}>
        <App />
      </div>

      {!isSplashDone && <Splash onFinish={finishSplash} />}
    </>
  );
}

export default HomeRoute;
