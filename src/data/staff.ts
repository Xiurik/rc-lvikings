import { rankIcon } from './icons';
import type { StaffGroup } from './types';

/**
 * Administración del clan.
 *
 * TODO: reemplazar los RSN y los `blurb` por los reales. La estructura ya es la definitiva:
 * añadir o quitar miembros solo requiere editar los arreglos `members`.
 */
export const STAFF_GROUPS: StaffGroup[] = [
  {
    role: 'leader',
    title: 'Líder',
    description: 'Deputy Owner del clan y responsable final de las decisiones.',
    members: [
      {
        id: 'leader-1',
        rsn: 'LV Ragnar',
        role: 'leader',
        rankLabel: 'Deputy Owner',
        blurb: 'Fundador del clan. Coordina la dirección general y las alianzas.',
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
        rsn: 'LV Bjorn',
        role: 'admin',
        rankLabel: 'Administrator',
        blurb: 'Moderación del Clan Chat y aplicación de las reglas.',
        ...rankIcon('Administrator'),
      },
      {
        id: 'admin-2',
        rsn: 'LV Freya',
        role: 'admin',
        rankLabel: 'Administrator',
        blurb: 'Gestión de Discord, roles y bienvenida a nuevos miembros.',
        ...rankIcon('Administrator'),
      },
      {
        id: 'admin-3',
        rsn: 'LV Ivar',
        role: 'admin',
        rankLabel: 'Administrator',
        blurb: 'Control de puntos de clan (CP) y ascensos de rango.',
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
        rsn: 'LV Sigrun',
        role: 'coordinator',
        rankLabel: 'Coordinator',
        blurb: 'Eventos de PvM: raids, bosses y aprendizaje grupal.',
        ...rankIcon('Coordinator'),
      },
      {
        id: 'coordinator-2',
        rsn: 'LV Halfdan',
        role: 'coordinator',
        rankLabel: 'Coordinator',
        blurb: 'Skill of the Week y competencias de skilling.',
        ...rankIcon('Coordinator'),
      },
      {
        id: 'coordinator-3',
        rsn: 'LV Astrid',
        role: 'coordinator',
        rankLabel: 'Coordinator',
        blurb: 'Boss of the Week, sorteos y votaciones del clan.',
        ...rankIcon('Coordinator'),
      },
    ],
  },
];
