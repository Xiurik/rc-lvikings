/** Contratos de datos del clan. Todo lo que se renderiza en la SPA se tipa aquí. */

/** Ids de las secciones navegables (coinciden con los `id` del DOM y con el hash de la URL). */
export type SectionId = 'inicio' | 'miembros' | 'rangos' | 'galeria' | 'progreso' | 'comunidad';

export interface NavItem {
  id: SectionId;
  label: string;
}

/** Icono de rango OSRS: primero se intenta el archivo local, luego el placeholder de la wiki. */
export interface RankIconSource {
  /** Nombre del icono de clan en OSRS (ej. `Templar`). */
  iconName: string;
  /** Ruta local definitiva — el usuario solo debe guardar el png en `public/icons/`. */
  icon: string;
  /** Placeholder temporal servido por la wiki de OSRS. */
  iconFallback: string;
}

export type StaffRole = 'leader' | 'admin' | 'coordinator';

export interface StaffMember extends RankIconSource {
  id: string;
  /** RuneScape name. */
  rsn: string;
  role: StaffRole;
  /** Rango tal como aparece en el clan chat (ej. `Deputy Owner`). */
  rankLabel: string;
  /** Una línea de presentación. */
  blurb: string;
}

export interface StaffGroup {
  role: StaffRole;
  title: string;
  description: string;
  members: StaffMember[];
}

export type RankTier = 'special' | 'general';

export interface RankRequirement {
  label: 'CP' | 'EHP' | 'EHB';
  value: number;
}

export interface ClanRank extends RankIconSource {
  id: string;
  name: string;
  tier: RankTier;
  requirements: RankRequirement[];
  /** Condición no numérica (ej. «Selección del Staff»). */
  note?: string;
}

export interface CpRule {
  id: string;
  label: string;
  /** Puntos en texto porque algunas reglas son escalonadas (50 / 75 / 100). */
  points: string;
  detail?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  /** Descripción accesible de la imagen. */
  alt: string;
  thumb: string;
  /** Versión en alta calidad que abre el lightbox. */
  full: string;
  /** Dimensiones intrínsecas del archivo. Sin ellas el navegador no puede reservar el hueco y el CLS se dispara. */
  width: number;
  height: number;
}

export interface TrackerLink {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  /** URL del SVG importado desde `src/assets/icons/` (Vite lo resuelve y le pone hash). */
  icon: string;
}
