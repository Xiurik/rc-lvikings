import { useCallback, useEffect, useSyncExternalStore } from 'react';
import loginTheme from '@sounds/osrs_login.mp3';

/** Volumen fijo del tema de fondo (40 %). */
const VOLUME = 0.1;

/** Gestos que desbloquean el audio cuando el navegador bloquea el autoplay. */
const UNLOCK_EVENTS = ['pointerdown', 'keydown', 'touchstart'] as const;

/**
 * Referencias a nivel de módulo: el tema debe sonar una sola vez por carga de página,
 * incluso con el doble montaje de `StrictMode` en desarrollo.
 */
let themeAudio: HTMLAudioElement | null = null;

/** Estado de silencio compartido por toda la app. Por defecto la música está habilitada. */
let isMuted = false;
const muteListeners = new Set<() => void>();

function subscribeToMute(onStoreChange: () => void): () => void {
  muteListeners.add(onStoreChange);
  return () => {
    muteListeners.delete(onStoreChange);
  };
}

function getMutedSnapshot(): boolean {
  return isMuted;
}

/**
 * Reproduce el tema de login de OSRS una única vez desde que carga la página.
 *
 * Debe invocarse en un componente que viva durante toda la sesión (`AppRoutes`), para que la
 * música no se corte al pasar del splash a la página única. No se repite: cuando termina, termina.
 */
export function useBackgroundMusic(): void {
  useEffect(() => {
    if (themeAudio) return;

    const audio = new Audio(loginTheme);
    audio.volume = VOLUME;
    audio.loop = false;
    audio.preload = 'auto';
    audio.muted = isMuted;
    themeAudio = audio;

    function stopWaitingForGesture() {
      UNLOCK_EVENTS.forEach((event) => window.removeEventListener(event, playOnGesture));
    }

    function playOnGesture() {
      void audio
        .play()
        .then(stopWaitingForGesture)
        .catch(() => undefined);
    }

    // Muchos navegadores bloquean el autoplay con sonido: si falla, esperamos al primer gesto.
    void audio.play().catch(() => {
      UNLOCK_EVENTS.forEach((event) => window.addEventListener(event, playOnGesture, { passive: true }));
    });

    // Una vez terminado el tema ya no debe volver a sonar, ni con un gesto posterior.
    audio.addEventListener('ended', stopWaitingForGesture, { once: true });
  }, []);
}

/**
 * Interruptor de silencio del tema de fondo, para el botón del navbar.
 *
 * Silencia sin pausar: la pista sigue avanzando, así al reactivarla no vuelve a empezar y sigue
 * cumpliendo la regla de sonar una sola vez.
 */
export function useMusicMuted(): { isMuted: boolean; toggleMuted: () => void } {
  const muted = useSyncExternalStore(subscribeToMute, getMutedSnapshot, getMutedSnapshot);

  const toggleMuted = useCallback(() => {
    isMuted = !isMuted;
    if (themeAudio) themeAudio.muted = isMuted;
    muteListeners.forEach((notify) => notify());
  }, []);

  return { isMuted: muted, toggleMuted };
}
