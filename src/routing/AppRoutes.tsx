import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { About } from '../features/about/About';
import { Home } from '../features/home/Home';
import { Info } from '../features/info/Info';
import { Rules } from '../features/rules/Rules';
import { Splash } from '../layout/splash/Splash';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Splash />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="info" element={<Info />} />
        <Route path="rules" element={<Rules />} />
        {/* Redirige cualquier ruta no encontrada al splash */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
