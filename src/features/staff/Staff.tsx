import { Section } from '@components/Section';
import { STAFF_GROUPS } from '@data/staff';
import { StaffCard } from './StaffCard';

/** Sección `#miembros`: retratos de la administración agrupados por rango. */
export function Staff() {
  return (
    <Section
      id="miembros"
      title="Miembros del Staff"
      subtitle="La administración que mantiene el orden, organiza los eventos y guía al clan."
    >
      <div className="flex flex-col gap-12">
        {STAFF_GROUPS.map((group) => {
          const isLeader = group.role === 'leader';

          return (
            <div key={group.role}>
              <div className="mb-6 flex flex-col items-center text-center">
                <h3 className="font-osrs-title text-osrs-gold-bright text-shadow-osrs text-2xl font-bold tracking-wide md:text-3xl">
                  {group.title}
                </h3>
                <p className="font-osrs-body text-osrs-text-light mt-1 text-base md:text-2xl">{group.description}</p>
              </div>

              <ul
                className={`grid gap-6 ${
                  isLeader ? 'mx-auto max-w-md grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {group.members.map((member) => (
                  <li key={member.id} className="h-full">
                    <StaffCard member={member} featured={isLeader} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default Staff;
