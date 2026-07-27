import { Section } from '@components/Section';
import { useTopPlayers } from '@hooks/useTopPlayers';
import { TopPlayerRow } from './TopPlayerRow';

const SKELETON_ROWS = 5;

/** Sección `#top-jugadores`: ranking en vivo desde el Google Sheet público del clan. */
export function TopPlayers() {
  const { players, loading, error, refetch } = useTopPlayers();

  return (
    <Section id="top-jugadores" title="Nuestros TOP Jugadores" subtitle="Ranking de nuestros TOP Players.">
      <div className="osrs-stone-panel mx-auto w-4/6">
        <div className="p-4 md:p-6">
          {error ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <p className="font-osrs-body text-osrs-text-light text-base md:text-xl">{error}</p>
              <button type="button" onClick={refetch} className="osrs-btn-gold">
                Reintentar
              </button>
            </div>
          ) : !loading && players.length === 0 ? (
            <p className="font-osrs-body text-osrs-parchment-dark py-8 text-center text-base md:text-xl">
              Aún no hay datos de jugadores.
            </p>
          ) : (
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Ranking de jugadores por Clan Points</caption>
              <thead>
                <tr className="font-osrs-sans text-osrs-gold-text text-sm tracking-widest uppercase">
                  <th scope="col" className="px-1 pb-2">
                    Jugador
                  </th>
                  <th scope="col" className="px-1 pb-2 text-right">
                    Rango / Puntos
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: SKELETON_ROWS }, (_, i) => (
                      <tr key={i} className="osrs-rank-row">
                        <td className="px-1 py-3" colSpan={2}>
                          <div className="bg-osrs-parchment-dark/20 h-8 w-full animate-pulse rounded-sm" />
                        </td>
                      </tr>
                    ))
                  : players.map((player) => <TopPlayerRow key={player.rank} player={player} />)}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Section>
  );
}

export default TopPlayers;
