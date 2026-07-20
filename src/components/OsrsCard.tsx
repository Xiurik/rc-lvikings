export interface OsrsCardProps {
  /** Título de la tarjeta. Requerido (equivale a `input.required<string>()`). */
  title: string;
  /** Texto del botón o del banner estático. */
  buttonText?: string;
  /** Si es `true` renderiza un botón clicable; si es `false`, un banner estático. */
  isBtnVisible?: boolean;
  /** Callback disparada al hacer clic (equivale al `output<void>()` de Angular). */
  onActionClick?: () => void;
}

export function OsrsCard({ title, buttonText = 'LVikings', isBtnVisible = true, onActionClick }: OsrsCardProps) {
  return (
    <div className="flex h-full justify-center p-4">
      <div className="osrs-stone-panel flex w-full max-w-sm flex-col transition-transform duration-200 hover:scale-[1.02]">
        <div className="osrs-parchment-inner flex h-full flex-col items-center justify-between gap-6 p-6">
          <h3 className="font-osrs-title text-osrs-gold-text text-shadow-osrs w-full border-b-[3px] border-[#b59560]/60 pb-3 text-center text-xl font-bold md:text-2xl">
            {title}
          </h3>

          {isBtnVisible ? (
            <div className="mt-2 flex w-full justify-center">
              <button className="osrs-btn-red w-full py-3 text-lg" onClick={() => onActionClick?.()}>
                {buttonText}
              </button>
            </div>
          ) : (
            <div className="mt-6 flex w-full justify-center">
              <span className="osrs-banner-text -mt-8 mb-2">{buttonText}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OsrsCard;
