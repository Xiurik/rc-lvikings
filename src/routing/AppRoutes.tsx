import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { Splash } from '@layout/splash/Splash';

/**
 * Solo dos destinos reales: el splash de carga y la página única.
 *
 * Las rutas antiguas (`/about`, `/info`, `/rules`) se conservan como redirecciones al hash
 * equivalente para no romper enlaces ya compartidos.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Splash />} />
      <Route path="home" element={<App />} />

      <Route path="about" element={<Navigate to="/home#quienes-somos" replace />} />
      <Route path="info" element={<Navigate to="/home#comunidad" replace />} />
      <Route path="rules" element={<Navigate to="/home#reglas" replace />} />

      {/* Cualquier ruta desconocida vuelve al splash */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
