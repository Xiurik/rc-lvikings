import { useCallback, useEffect, useState } from 'react';
import { csvToTopPlayers, TOP_PLAYERS_CACHE_KEY, TOP_PLAYERS_CSV_URL } from '@data/topPlayers';
import type { TopPlayer } from '@data/types';

const FRIENDLY_ERROR = 'No se pudo cargar el ranking de jugadores. Intenta de nuevo más tarde.';

function readCache(): TopPlayer[] | null {
  try {
    const raw = sessionStorage.getItem(TOP_PLAYERS_CACHE_KEY);
    return raw ? (JSON.parse(raw) as TopPlayer[]) : null;
  } catch {
    return null;
  }
}

function writeCache(players: TopPlayer[]): void {
  try {
    sessionStorage.setItem(TOP_PLAYERS_CACHE_KEY, JSON.stringify(players));
  } catch {
    // Cuota excedida o storage inaccesible (modo privado): la sección sigue funcionando sin cache.
  }
}

export interface UseTopPlayersResult {
  players: TopPlayer[];
  loading: boolean;
  error: string | null;
  /** Ignora la cache y vuelve a pedir el sheet. La usa el botón "Reintentar". */
  refetch: () => void;
}

/**
 * Trae el ranking del clan desde el Google Sheet público y lo cachea en `sessionStorage`.
 *
 * El sheet se actualiza seguido, pero pedirlo en cada montaje sería un roundtrip innecesario:
 * se lee una sola vez por pestaña y las siguientes visitas a la sección reusan la cache hasta
 * que la pestaña se cierra (o el usuario reintenta a mano tras un error).
 */
export function useTopPlayers(): UseTopPlayersResult {
  // Snapshot de sessionStorage tomado una sola vez (React solo invoca los inicializadores de
  // useState en el primer render): si hay cache, arrancamos con ella y sin loading.
  const [cachedOnMount] = useState(readCache);
  const [players, setPlayers] = useState<TopPlayer[]>(() => cachedOnMount ?? []);
  const [loading, setLoading] = useState(() => cachedOnMount === null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  // `loading`/`error` se resetean aquí (evento de click), no dentro del efecto: así el efecto
  // solo dispara y observa el fetch, sin setState síncrono en su cuerpo.
  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setAttempt((n) => n + 1);
  }, []);

  useEffect(() => {
    // Primer intento con cache disponible: ya se sirvió desde el estado inicial, no hay red que pedir.
    if (attempt === 0 && cachedOnMount) return;

    let cancelled = false;

    fetch(TOP_PLAYERS_CSV_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((csv) => {
        if (cancelled) return;
        const parsed = csvToTopPlayers(csv);
        setPlayers(parsed);
        writeCache(parsed);
      })
      .catch(() => {
        if (!cancelled) setError(FRIENDLY_ERROR);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [attempt, cachedOnMount]);

  return { players, loading, error, refetch };
}
