import { Section } from '@components/Section';
import { GENERAL_RANKS, SPECIAL_RANKS } from '@data/ranks';
import { CpRules } from './CpRules';
import { RankBoard } from './RankBoard';

/** Sección `#rangos`: sistema de puntos (CP) y requisitos de cada rango. */
export function Ranks() {
  return (
    <Section
      id="rangos"
      title="Rangos y Puntos de Clan"
      subtitle="Cada rango se gana con Clan Points (CP) y, en los rangos especiales, también con EHP y EHB verificados en WiseOldMan."
    >
      <div className="flex flex-col gap-8">
        <CpRules />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <RankBoard title="Rangos Especiales" description="Hitos y reconocimientos del clan." ranks={SPECIAL_RANKS} />
          <RankBoard title="Rangos Generales" description="Progresión por CP acumulados." ranks={GENERAL_RANKS} />
        </div>

        <p className="font-osrs-body text-osrs-parchment-dark text-center text-sm md:text-2xl">
          EHP = Efficient Hours Played · EHB = Efficient Hours Bossed. Ambos se toman del grupo del clan en WiseOldMan.
        </p>
      </div>
    </Section>
  );
}

export default Ranks;
