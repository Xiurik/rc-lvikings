import type { ReactNode } from 'react';
import { SectionHeading } from './SectionHeading';

export interface SectionProps {
  /** Debe coincidir con el `SectionId` del navbar: es el destino del smooth scroll. */
  id: string;
  title: string;
  subtitle?: string;
  tone?: 'light' | 'dark';
  children: ReactNode;
  className?: string;
}

/**
 * Contenedor estándar de cada bloque de la SPA.
 *
 * Centraliza el `id` del ancla, el `scroll-margin` del navbar sticky (clase `osrs-section`),
 * el ancho máximo y la relación `aria-labelledby` entre la sección y su título.
 */
export function Section({ id, title, subtitle, tone = 'light', children, className = '' }: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className={`osrs-section w-full px-4 py-14 md:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading id={headingId} title={title} subtitle={subtitle} tone={tone} />
        {children}
      </div>
    </section>
  );
}

export default Section;
