import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomeRoute } from './HomeRoute';

/**
 * La razón de ser de `HomeRoute`: la raíz del dominio debe tener contenido en el DOM desde el
 * primer render. Si el splash volviera a ser una ruta previa, estas pruebas fallarían — que es
 * exactamente lo que se quiere detectar.
 */
describe('HomeRoute', () => {
  it('renderiza la página completa bajo el splash, sin esperar a la animación', () => {
    const { container } = render(<HomeRoute />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Las nueve secciones ancladas de la página única ya están en el DOM.
    expect(container.querySelectorAll('main > section')).toHaveLength(9);
  });

  it('mantiene un único <h1> y los <h2> de cada sección principal', () => {
    const { container } = render(<HomeRoute />);

    const h1s = container.querySelectorAll('h1');
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Legendary Vikings');

    const h2s = [...container.querySelectorAll('h2')].map((heading) => heading.textContent);
    expect(h2s).toEqual([
      'Quiénes Somos',
      'Miembros del Staff',
      'Nuestros TOP Jugadores',
      'Rangos y Puntos de Clan',
      'Galería',
      'Progreso del Clan',
      'Reglas del Clan',
      'Comunidad',
    ]);
  });

  it('bloquea la interacción con la página mientras el splash está visible', () => {
    const { container } = render(<HomeRoute />);

    expect(container.querySelector('[inert]')).toBeInTheDocument();
  });
});
