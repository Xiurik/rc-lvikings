import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TOP_PLAYERS_CACHE_KEY } from '@data/topPlayers';
import { useTopPlayers } from './useTopPlayers';

const CSV = 'rank,username,clan_points,clan_rank\n1,LV Ragnar,4500,Berserker\n';

function mockFetchOnce(response: { ok: boolean; status?: number; text?: () => Promise<string> }) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValueOnce({
      ok: response.ok,
      status: response.status ?? 200,
      text: response.text ?? (() => Promise.resolve('')),
    }),
  );
}

describe('useTopPlayers', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('carga desde la red, expone loading y cachea el resultado', async () => {
    mockFetchOnce({ ok: true, text: () => Promise.resolve(CSV) });

    const { result } = renderHook(() => useTopPlayers());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.players).toEqual([{ rank: 1, username: 'LV Ragnar', clanPoints: 4500, clanRank: 'Berserker' }]);
    expect(JSON.parse(sessionStorage.getItem(TOP_PLAYERS_CACHE_KEY) ?? '[]')).toEqual(result.current.players);
  });

  it('reusa la cache de sessionStorage sin volver a pedir el sheet', async () => {
    sessionStorage.setItem(
      TOP_PLAYERS_CACHE_KEY,
      JSON.stringify([{ rank: 1, username: 'LV Cached', clanPoints: 1, clanRank: 'Viking' }]),
    );
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    const { result } = renderHook(() => useTopPlayers());

    expect(result.current.loading).toBe(false);
    expect(result.current.players[0]?.username).toBe('LV Cached');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('expone un error amigable si la red falla', async () => {
    mockFetchOnce({ ok: false, status: 500 });

    const { result } = renderHook(() => useTopPlayers());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/no se pudo cargar/i);
    expect(result.current.players).toEqual([]);
  });

  it('refetch ignora la cache y vuelve a pedir el sheet', async () => {
    mockFetchOnce({ ok: false, status: 500 });
    const { result } = renderHook(() => useTopPlayers());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).not.toBeNull();

    mockFetchOnce({ ok: true, text: () => Promise.resolve(CSV) });
    act(() => result.current.refetch());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.players).toHaveLength(1);
  });
});
