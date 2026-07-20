import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './routing/AppRoutes';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );

describe('App', () => {
  it('should create the app', () => {
    const { container } = renderAt('/');
    expect(container).toBeTruthy();
  });

  it('should render only the splash on the root route', () => {
    renderAt('/');

    expect(screen.getByText('LEGENDARY VIKINGS')).toBeInTheDocument();
    expect(screen.getByText('Cargando Página...')).toBeInTheDocument();
    // El shell (navbar / footer) permanece oculto en la ruta raíz
    expect(screen.queryByText('LVIKINGS')).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('should render the shell (navbar and footer) outside the root route', () => {
    renderAt('/home');

    expect(screen.getByText('LVIKINGS')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Legendary Vikings')).toBeInTheDocument();
    expect(screen.getByText(/Bienvenido a/)).toBeInTheDocument();
  });

  it('should redirect unknown routes to the splash', () => {
    renderAt('/no-existe');

    expect(screen.getByText('LEGENDARY VIKINGS')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
