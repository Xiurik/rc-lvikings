import { RankIcon } from '@components/RankIcon';
import type { StaffMember } from '@data/types';

export interface StaffCardProps {
  member: StaffMember;
  /** El líder se muestra con un retrato más grande. */
  featured?: boolean;
}

/** Iniciales del RSN para el retrato: `LV Ragnar` -> `LR`. */
function initialsOf(rsn: string): string {
  return rsn
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** Tarjeta de presentación estilo retrato rústico para la administración del clan. */
export function StaffCard({ member, featured = false }: StaffCardProps) {
  return (
    <article className="osrs-stone-panel h-full transition-transform duration-200 hover:-translate-y-1">
      <div className="flex h-full flex-col items-center gap-4 p-5 text-center">
        {/* Retrato */}
        <div
          className={`osrs-wood-frame bg-osrs-ink-deep flex items-center justify-center ${
            featured ? 'size-28 md:size-32' : 'size-24'
          }`}
        >
          <span
            className={`font-osrs-title text-osrs-gold-bright text-shadow-osrs font-bold ${
              featured ? 'text-4xl md:text-5xl' : 'text-3xl'
            }`}
            aria-hidden="true"
          >
            {initialsOf(member.rsn)}
          </span>
        </div>

        <div>
          <h4 className="font-osrs-title text-osrs-gold-text text-shadow-osrs text-xl font-bold md:text-2xl">
            {member.rsn}
          </h4>

          <p className="border-osrs-gold-deep bg-osrs-ink mt-2 inline-flex items-center gap-2 rounded-sm border px-3 py-1">
            <RankIcon {...member} rankName={member.rankLabel} size={20} />
            <span className="font-osrs-sans text-osrs-gold-bright text-xs font-semibold tracking-widest uppercase">
              {member.rankLabel}
            </span>
          </p>
        </div>

        <p className="font-osrs-body text-osrs-text-light mt-auto text-base leading-relaxed md:text-xl">
          {member.blurb}
        </p>
      </div>
    </article>
  );
}

export default StaffCard;
