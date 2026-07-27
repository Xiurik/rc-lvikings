import { GENERAL_RANKS, SPECIAL_RANKS } from './ranks';
import type { RankIconSource, TopPlayer } from './types';

const SHEET_ID = '16LcWfqIFYbHQrCGoNyRISlSHnQjNeb8BJ5u9ZIe7HeU';
const SHEET_GID = '0';

/** Export CSV público del Google Sheet: sin API key, se actualiza en vivo con la hoja. */
export const TOP_PLAYERS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

/** Clave de sessionStorage: versionada para no reusar una cache con forma de dato distinta. */
export const TOP_PLAYERS_CACHE_KEY = 'lvikings:top-players:v1';

const REQUIRED_COLUMNS = ['rank', 'username', 'clan_points', 'clan_rank'] as const;

/**
 * Parser CSV mínimo con soporte de comillas (RFC4180-ish).
 *
 * Necesario porque `clan_rank` o `username` podrían traer comas dentro de un campo entrecomillado;
 * un `split(',')` ingenuo rompería esas filas.
 */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim().length > 0));
}

/** `"1,234"` o `"1234"` -> `1234`. `NaN` si el campo no trae ningún número (vacío o no numérico). */
function parseNumber(raw: string): number {
  const cleaned = raw.replace(/,/g, '').trim();
  return cleaned === '' ? NaN : Number(cleaned);
}

/**
 * Convierte el CSV crudo del sheet en `TopPlayer[]`.
 *
 * Mapea por nombre de encabezado (no por posición) para tolerar que el sheet reordene columnas.
 * Filas sin los 4 campos requeridos, o con `rank`/`clan_points` no numéricos, se descartan.
 */
export function csvToTopPlayers(csv: string): TopPlayer[] {
  const rows = parseCsv(csv);
  if (rows.length < 2) return [];

  const header = rows[0]!.map((cell) => cell.trim().toLowerCase());
  const columnIndex: Record<string, number> = Object.fromEntries(
    REQUIRED_COLUMNS.map((col) => [col, header.indexOf(col)]),
  );

  if (REQUIRED_COLUMNS.some((col) => columnIndex[col] === -1)) return [];

  const players: TopPlayer[] = [];

  for (const cells of rows.slice(1)) {
    const username = cells[columnIndex['username']!]?.trim() ?? '';
    const clanRank = cells[columnIndex['clan_rank']!]?.trim() ?? '';
    const rank = parseNumber(cells[columnIndex['rank']!] ?? '');
    const clanPoints = parseNumber(cells[columnIndex['clan_points']!] ?? '');

    if (!username || !clanRank || !Number.isFinite(rank) || !Number.isFinite(clanPoints)) continue;

    players.push({ rank, username, clanPoints, clanRank });
  }

  return players.sort((a, b) => a.rank - b.rank);
}

const ALL_RANKS = [...SPECIAL_RANKS, ...GENERAL_RANKS];

/** Busca el `RankIconSource` cuyo nombre coincide (sin distinguir mayúsculas) con `clan_rank`. */
export function findRankIcon(clanRank: string): RankIconSource | undefined {
  const needle = clanRank.trim().toLowerCase();
  return ALL_RANKS.find((rank) => rank.name.toLowerCase() === needle);
}
