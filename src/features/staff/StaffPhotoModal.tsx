import { useEffect, useRef } from 'react';
import { RankIcon } from '@components/RankIcon';
import type { StaffMember } from '@data/types';
import { useBodyScrollLock } from '@hooks/useBodyScrollLock';

export interface StaffPhotoModalProps {
  /** `null` mantiene el lightbox cerrado. */
  member: StaffMember | null;
  onClose: () => void;
}

/**
 * Lightbox para ampliar la foto de perfil de un miembro del staff.
 *
 * Cierra con la «X», con clic en el fondo y con `Escape`. Mientras está abierto
 * se bloquea el scroll del documento y el foco pasa al botón de cierre.
 */
export function StaffPhotoModal({ member, onClose }: StaffPhotoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const isOpen = member !== null && Boolean(member.photo);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    return () => lastFocusedRef.current?.focus();
  }, [isOpen]);

  if (!isOpen || !member) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={member.rsn}
      onClick={(event) => {
        // Solo cierra si el clic fue en el overlay, no en la imagen ni en los controles
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Cerrar imagen"
        className="text-osrs-gold-bright hover:text-osrs-gold-text border-osrs-gold-deep bg-osrs-ink absolute top-4 right-4 z-10 cursor-pointer rounded-sm border-2 p-2 shadow-[2px_2px_4px_rgba(0,0,0,0.6)] transition-colors md:top-6 md:right-6"
      >
        <svg viewBox="0 0 24 24" className="size-6 md:size-7" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <figure className="osrs-wood-frame flex max-h-full w-full max-w-md flex-col p-2">
        <img
          src={member.photo}
          alt={member.rsn}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="max-h-[70vh] w-full bg-black/40 object-contain md:max-h-[75vh]"
        />

        <figcaption className="px-2 pt-3 pb-1 text-center">
          <span className="font-osrs-title text-osrs-gold-bright text-shadow-osrs block text-3xl font-bold">
            {member.rsn}
          </span>
          <p className="border-osrs-gold-deep bg-osrs-ink mt-2 inline-flex items-center gap-2 rounded-sm border px-3 py-1">
            <RankIcon {...member} rankName={member.rankLabel} size={20} />
            <span className="font-osrs-sans text-osrs-gold-bright text-sm font-semibold tracking-widest uppercase">
              {member.rankLabel}
            </span>
          </p>
        </figcaption>
      </figure>
    </div>
  );
}

export default StaffPhotoModal;
