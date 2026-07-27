import { RankIcon } from '@components/RankIcon';
import { findRankIcon } from '@data/topPlayers';
import { formatPoints } from '@data/ranks';
import type { TopPlayer } from '@data/types';

export interface TopPlayerRowProps {
  player: TopPlayer;
}

/** Clases del medallón de posición: oro/plata/bronce para el podio, neutro para el resto. */
const MEDAL_CLASSES: Record<number, string> = {
  1: 'border-osrs-gold-bright text-osrs-gold-bright shadow-[0_0_8px_rgba(255,219,88,0.55)]',
  2: 'border-osrs-silver text-osrs-silver shadow-[0_0_6px_rgba(215,217,219,0.4)]',
  3: 'border-osrs-bronze text-osrs-bronze shadow-[0_0_6px_rgba(205,127,50,0.4)]',
};

const ROW_TINT: Record<number, string> = {
  1: 'bg-osrs-gold-bright/10',
  2: 'bg-osrs-silver/10',
  3: 'bg-osrs-bronze/10',
};

/** Fila del ranking: medallón de posición, RSN, badge de rango y chip de Clan Points. */
export function TopPlayerRow({ player }: TopPlayerRowProps) {
  const medalClasses = MEDAL_CLASSES[player.rank] ?? 'border-osrs-gold-deep/40 text-osrs-text-light';
  const rowTint = ROW_TINT[player.rank] ?? '';
  const rankIcon = findRankIcon(player.clanRank);

  return (
    <tr className={`osrs-rank-row ${rowTint}`}>
      <th scope="row" className="px-1 py-3 align-middle font-normal">
        <span className="flex items-center gap-3">
          <span
            className={`bg-osrs-ink font-osrs-title flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-lg font-bold ${medalClasses}`}
            aria-hidden="true"
          >
            {player.rank}
          </span>
          <span className="font-osrs-title text-osrs-text-light text-base font-bold md:text-lg">{player.username}</span>
        </span>
      </th>

      <td className="px-1 py-3 text-right align-middle">
        <span className="flex flex-wrap items-center justify-end gap-1.5">
          <span className="border-osrs-gold-deep bg-osrs-ink inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5">
            {rankIcon && <RankIcon {...rankIcon} rankName={player.clanRank} size={16} />}
            <span className="font-osrs-sans text-osrs-gold-bright text-xs font-semibold tracking-wide uppercase">
              {player.clanRank}
            </span>
          </span>

          <span className="font-osrs-sans text-osrs-gold-bright border-osrs-gold-deep bg-osrs-ink rounded-sm border px-2 py-0.5 text-xs font-semibold whitespace-nowrap">
            {formatPoints(player.clanPoints)} CP
          </span>
        </span>
      </td>
    </tr>
  );
}

export default TopPlayerRow;
