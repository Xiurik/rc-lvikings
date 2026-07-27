import type { ReactNode } from 'react';

export interface ParchmentScrollProps {
  children: ReactNode;
}

/**
 * Pergamino desplegado (top / center / bottom) usado por los bloques de texto largo.
 *
 * Los tres GIF de `public/assets/img/` se solapan en las costuras, así que el alto crece con el
 * contenido sin que se note el corte.
 */
export function ParchmentScroll({ children }: ParchmentScrollProps) {
  return (
    <div className="osrs-backdrop-wrap">
      <div className="osrs-backdrop-panel">
        <div className="osrs-backdrop-top" aria-hidden="true" />

        <div className="osrs-backdrop-center">
          <div className="osrs-backdrop-content">{children}</div>
        </div>

        <div className="osrs-backdrop-bottom" aria-hidden="true" />
      </div>
    </div>
  );
}

export default ParchmentScroll;
