import { useState } from 'react';
import type { RankIconSource } from '@data/types';

export interface RankIconProps extends RankIconSource {
  /** Nombre del rango: se usa para el texto alternativo y para el medallón de respaldo. */
  rankName: string;
  /** Lado del icono en píxeles. Los iconos de clan de OSRS son de 20px. */
  size?: number;
}

/** Cascada de orígenes: png local -> placeholder de la wiki -> medallón con la inicial. */
type IconStage = 'local' | 'wiki' | 'fallback';

/**
 * Icono de rango con degradación progresiva.
 *
 * Mientras `public/icons/<rango>.png` no exista, se muestra el icono de la wiki de OSRS.
 * Si tampoco está disponible (sin red, hotlink bloqueado), se dibuja un medallón con la inicial
 * del rango, de modo que la tabla nunca queda con imágenes rotas.
 */
export function RankIcon({ iconName, icon, iconFallback, rankName, size = 24 }: RankIconProps) {
  // El estado se asocia al `icon` que falló: si el componente se reutiliza con otro rango,
  // la cascada se reinicia sin necesidad de un efecto que sincronice el estado.
  const [failure, setFailure] = useState<{ src: string; stage: IconStage }>({ src: icon, stage: 'local' });
  const stage: IconStage = failure.src === icon ? failure.stage : 'local';

  const handleError = () => setFailure({ src: icon, stage: stage === 'local' && iconFallback ? 'wiki' : 'fallback' });

  const boxStyle = { width: size, height: size };

  if (stage === 'fallback') {
    return (
      <span
        className="osrs-icon-fallback shrink-0"
        style={boxStyle}
        role="img"
        aria-label={`Icono del rango ${rankName}`}
        title={iconName}
      >
        {rankName.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={stage === 'local' ? icon : iconFallback}
      alt={`Icono del rango ${rankName}`}
      title={iconName}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      onError={handleError}
      className="image-pixelated shrink-0 object-contain drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]"
      style={boxStyle}
    />
  );
}

export default RankIcon;
