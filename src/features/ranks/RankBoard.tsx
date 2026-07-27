import { RankIcon } from '@components/RankIcon';
import { formatPoints } from '@data/ranks';
import type { ClanRank } from '@data/types';

export interface RankBoardProps {
  title: string;
  description: string;
  ranks: ClanRank[];
}

/**
 * Tablón de misiones: tabla de rangos sobre pergamino.
 *
 * Solo dos columnas para que funcione sin scroll horizontal en móvil: el rango con su icono y
 * los requisitos como fichas (CP / EHP / EHB), con la condición especial debajo cuando aplica.
 */
export function RankBoard({ title, description, ranks }: RankBoardProps) {
  return (
    <div className="osrs-stone-panel h-full">
      <div className="h-full p-4 md:p-6">
        <h3 className="font-osrs-title text-osrs-gold-bright text-shadow-osrs border-osrs-gold-deep/40 border-b-[3px] pb-3 text-center text-xl font-bold tracking-wide md:text-2xl">
          {title}
        </h3>
        <p className="font-osrs-body text-osrs-parchment-dark mt-2 mb-4 text-center text-base md:text-xl">
          {description}
        </p>

        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{`${title}: ${description}`}</caption>
          <thead>
            <tr className="font-osrs-sans text-osrs-gold-text text-[0.80rem] tracking-widest uppercase">
              <th scope="col" className="px-1 pb-2">
                Rango
              </th>
              <th scope="col" className="px-1 pb-2 text-right">
                Requisitos
              </th>
            </tr>
          </thead>
          <tbody>
            {ranks.map((rank) => (
              <tr key={rank.id} className="osrs-rank-row">
                <th scope="row" className="px-1 py-3 align-middle font-normal">
                  <span className="flex items-center gap-2.5">
                    <RankIcon {...rank} rankName={rank.name} size={22} />
                    <span className="font-osrs-title text-osrs-text-light text-base font-bold md:text-lg">
                      {rank.name}
                    </span>
                  </span>
                </th>

                <td className="px-1 py-3 text-right align-middle">
                  <span className="flex flex-wrap justify-end gap-1.5">
                    {rank.requirements.map((requirement) => (
                      <span
                        key={requirement.label}
                        className="font-osrs-sans text-osrs-gold-bright border-osrs-gold-deep bg-osrs-ink rounded-sm border px-2 py-0.5 text-xs font-semibold whitespace-nowrap"
                      >
                        {formatPoints(requirement.value)} {requirement.label}
                      </span>
                    ))}
                  </span>

                  {rank.note && <p className="font-osrs-body text-osrs-parchment-base mt-1 italic">{rank.note}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RankBoard;
