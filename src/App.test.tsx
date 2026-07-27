import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { NAV_ITEMS } from '@data/navigation';
import { AppRoutes } from './routing/AppRoutes';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );

describe('AppRoutes', () => {
  it('should render only the splash on the root route', () => {
    renderAt('/');

    expect(screen.getByText('LEGENDARY VIKINGS')).toBeInTheDocument();
    expect(screen.getByText('Cargando Página...')).toBeInTheDocument();
    // El shell (navbar / footer) permanece oculto en la ruta raíz
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('should redirect unknown routes to the splash', () => {
    renderAt('/no-existe');

    expect(screen.getByText('LEGENDARY VIKINGS')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});

describe('Single page app', () => {
  it('should render the shell with navbar and footer', () => {
    renderAt('/home');

    const nav = screen.getByRole('navigation', { name: 'Navegación principal' });
    expect(nav).toBeInTheDocument();
    expect(within(nav).getByRole('button', { name: 'LVIKINGS' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should expose one navbar entry per section', () => {
    renderAt('/home');

    const nav = screen.getByRole('navigation', { name: 'Navegación principal' });

    NAV_ITEMS.forEach((item) => {
      expect(within(nav).getByRole('button', { name: item.label })).toBeInTheDocument();
      // Cada enlace del menú tiene su sección correspondiente en el DOM
      expect(document.getElementById(item.id)).not.toBeNull();
    });
  });

  it('should render every section of the single page', () => {
    renderAt('/home');

    expect(screen.getByRole('heading', { level: 1, name: /Legendary\s+Vikings/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Miembros del Staff' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rangos y Puntos de Clan' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Galería' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Progreso del Clan' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Comunidad' })).toBeInTheDocument();
    // Contenido heredado, fuera del navbar pero presente en la página
    expect(screen.getByRole('heading', { name: 'Quiénes Somos' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Reglas del Clan' })).toBeInTheDocument();
  });

  it('should point the Discord CTA at the clan invite', () => {
    renderAt('/home');

    const cta = screen.getByRole('link', { name: /Únete a nuestro Discord/ });
    expect(cta).toHaveAttribute('href', 'https://discord.gg/BWJDsA5ux2');
    expect(cta).toHaveAttribute('target', '_blank');
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
