import { Navigate, Route, Routes } from 'react-router-dom';
import { useBackgroundMusic } from '@hooks/useBackgroundMusic';
import { HomeRoute } from './HomeRoute';

/**
 * Un solo destino real: la página única en la raíz del dominio.
 *
 * `/home` y las rutas antiguas (`/about`, `/info`, `/rules`) se conservan como redirecciones
 * para no romper enlaces ya compartidos. En producción las resuelve Netlify con un 301 real
 * (`public/_redirects`); estas rutas son la red de seguridad para navegación cliente y para
 * `npm run dev`, donde `_redirects` no interviene.
 */
export function AppRoutes() {
  // Vive por encima de las rutas para que el tema siga sonando entre navegaciones.
  useBackgroundMusic();

  return (
    <Routes>
      <Route index element={<HomeRoute />} />

      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="about" element={<Navigate to="/#quienes-somos" replace />} />
      <Route path="info" element={<Navigate to="/#comunidad" replace />} />
      <Route path="rules" element={<Navigate to="/#reglas" replace />} />

      {/* Cualquier ruta desconocida vuelve a la página única */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
