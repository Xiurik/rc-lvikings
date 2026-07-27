import type { RankIconSource } from './types';

/**
 * Construye las dos rutas de un icono de rango a partir del nombre del icono de clan en OSRS.
 *
 * - `icon`: ruta local definitiva. Para activarla basta guardar el png en `public/icons/`
 *   respetando el slug (ej. `Templar` -> `public/icons/templar.png`).
 * - `iconFallback`: placeholder temporal de la wiki de OSRS, usado mientras el png local no exista.
 *
 * Si ninguna de las dos carga, `RankIcon` degrada a un medallón con la inicial del rango.
 */
export function rankIcon(iconName: string): RankIconSource {
  const slug = iconName.toLowerCase().replace(/[\s_]+/g, '-');
  const wikiFile = `Clan_icon_-_${iconName.replace(/[\s-]+/g, '_')}.png`;

  return {
    iconName,
    icon: `/icons/${slug}.png`,
    iconFallback: `https://oldschool.runescape.wiki/images/${wikiFile}`,
  };
}
