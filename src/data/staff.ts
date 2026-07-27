import { rankIcon } from './icons';
import type { StaffGroup } from './types';

/**
 * Administración del clan.
 *
 * La estructura ya es la definitiva: añadir o quitar miembros solo requiere editar
 * los arreglos `members`. Las fotos de perfil viven en `public/staff/`.
 */
export const STAFF_GROUPS: StaffGroup[] = [
  {
    role: 'leader',
    title: 'Fundador y Líder',
    description: 'Deputy Owner del clan y responsable final de las decisiones.',
    members: [
      {
        id: 'leader-founder',
        rsn: 'Reymi',
        role: 'leader',
        rankLabel: 'Fundador',
        blurb: 'Fundador del clan desde los inicios de RS3.',
        photo: '/staff/founder.webp',
        ...rankIcon('Deputy owner'),
      },
      {
        id: 'leader-1',
        rsn: 'LV IndicaThc',
        role: 'leader',
        rankLabel: 'Líder',
        blurb: 'Director general del clan, liderando el crecimiento y la visión futura.',
        photo: '/staff/lider.webp',
        ...rankIcon('Deputy owner'),
      },
    ],
  },
  {
    role: 'admin',
    title: 'Admins',
    description: 'Mantienen el orden en el Clan Chat y en Discord.',
    members: [
      {
        id: 'admin-1',
        rsn: 'Kami Mike | Te Tsu Kami',
        role: 'admin',
        rankLabel: 'Administrator',
        blurb: 'Moderación del Clan Chat y aplicación de las reglas.',
        photo: '/staff/admin-01.webp',
        ...rankIcon('Administrator'),
      },
      {
        id: 'admin-2',
        rsn: 'Darma',
        role: 'admin',
        rankLabel: 'Administrator',
        blurb: 'Gestión de Discord, roles y bienvenida a nuevos miembros.',
        photo: '/staff/admin-02.webp',
        ...rankIcon('Administrator'),
      },
    ],
  },
  {
    role: 'coordinator',
    title: 'Coordinadores',
    description: 'Organizan los eventos semanales y mensuales de PvM y Skills.',
    members: [
      {
        id: 'coordinator-1',
        rsn: 'LVRyuAotsuki',
        role: 'coordinator',
        rankLabel: 'Coordinator',
        blurb: 'Eventos de PvM: raids, bosses y aprendizaje grupal.',
        photo: '/staff/coordinador-01.webp',
        ...rankIcon('Coordinator'),
      },
      {
        id: 'coordinator-2',
        rsn: 'LV Juanca',
        role: 'coordinator',
        rankLabel: 'Coordinator',
        blurb: 'Skill of the Week y competencias de skilling.',
        photo: '/staff/coordinador-02.webp',
        ...rankIcon('Coordinator'),
      },
    ],
  },
];
