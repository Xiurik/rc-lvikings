import { CP_RULES } from '@data/ranks';

/** Tablón con las formas de ganar Clan Points. */
export function CpRules() {
  return (
    <div className="osrs-stone-panel">
      <div className="p-5 md:p-7">
        <h3 className="font-osrs-title text-osrs-gold-bright text-shadow-osrs text-center text-xl font-bold tracking-wide md:text-2xl">
          ¿Cómo se ganan los CP?
        </h3>
        <p className="font-osrs-body text-osrs-text-light mt-1 mb-6 text-center text-base md:text-xl">
          Los Clan Points determinan tu rango. Se acumulan participando en la vida del clan.
        </p>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CP_RULES.map((rule) => (
            <li
              key={rule.id}
              className="border-osrs-gold-deep/70 bg-osrs-ink/95 flex flex-col gap-2 rounded-sm border-2 p-4 shadow-[inset_0_0_14px_rgba(0,0,0,0.7)]"
            >
              <span className="font-osrs-title text-osrs-gold-bright text-shadow-osrs text-lg font-bold">
                {rule.points}
              </span>
              <span className="font-osrs-sans text-osrs-text-light text-sm font-semibold tracking-wide">
                {rule.label}
              </span>
              {rule.detail && (
                <span className="font-osrs-body text-osrs-text-light/80 text-sm leading-snug">{rule.detail}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CpRules;
