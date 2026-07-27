export interface SectionHeadingProps {
  /** Id del `<h2>`, usado por `aria-labelledby` de la sección. */
  id: string;
  title: string;
  subtitle?: string;
  /** `dark` para pergamino claro, `light` para fondo de piedra. */
  tone?: 'light' | 'dark';
}

/** Título de sección con el tratamiento tipográfico de OSRS y un separador decorativo. */
export function SectionHeading({ id, title, subtitle, tone = 'light' }: SectionHeadingProps) {
  const titleColor = tone === 'light' ? 'text-osrs-gold-text' : 'text-osrs-crimson-banner';
  const subtitleColor = tone === 'light' ? 'text-osrs-text-light' : 'text-osrs-text-dark';

  return (
    <header className="mb-8 flex flex-col items-center text-center md:mb-12">
      <h2
        id={id}
        className={`font-osrs-title text-shadow-osrs text-3xl font-bold tracking-wide md:text-5xl ${titleColor}`}
      >
        {title}
      </h2>

      <div className="mt-4 flex w-full max-w-xs items-center gap-3" aria-hidden="true">
        <span className="via-osrs-gold-deep h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
        <span className="bg-osrs-gold-deep size-2 rotate-45" />
        <span className="via-osrs-gold-deep h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
      </div>

      {subtitle && (
        <p className={`font-osrs-body mt-4 max-w-2xl text-lg leading-relaxed md:text-2xl ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </header>
  );
}

export default SectionHeading;
