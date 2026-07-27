# Iconos de rango

Guarda aquí los PNG de los iconos de clan de OSRS con **exactamente** estos nombres. En cuanto el
archivo exista, `RankIcon` deja de usar el placeholder de la wiki y sirve la imagen local.

Mientras un archivo falte, el orden de respaldo es:
`/icons/<archivo>.png` → `https://oldschool.runescape.wiki/images/Clan_icon_-_<Nombre>.png` → medallón con la inicial.

## Staff

| Archivo              | Icono de clan  |
| -------------------- | -------------- |
| `deputy-owner.png`   | Deputy owner   |
| `administrator.png`  | Administrator  |
| `coordinator.png`    | Coordinator    |

## Rangos especiales

| Archivo            | Icono de clan | Rango del clan       |
| ------------------ | ------------- | -------------------- |
| `competitor.png`   | Competitor    | Completionist        |
| `slayer.png`       | Slayer        | Master PvMer         |
| `asgarnian.png`    | Asgarnian     | Clan Hero            |
| `ignitor.png`      | Ignitor       | Booster del Discord  |
| `crusader.png`     | Crusader      | Miembro del Mes      |

## Rangos generales

| Archivo           | Icono de clan | Rango del clan |
| ----------------- | ------------- | -------------- |
| `templar.png`     | Templar       | Berserker      |
| `justiciar.png`   | Justiciar     | Jomsviking     |
| `sentry.png`      | Sentry        | Ulfhednar      |
| `fighter.png`     | Fighter       | Skald          |
| `scourge.png`     | Scourge       | Chieftain      |
| `bruiser.png`     | Bruiser       | Huscarl        |
| `brawler.png`     | Brawler       | Jarl           |
| `goon.png`        | Goon          | Thrall         |
| `enforcer.png`    | Enforcer      | Viking         |

> Los nombres de archivo se derivan automáticamente en `src/data/icons.ts`
> (`iconName.toLowerCase()` y espacios/underscores convertidos en `-`).
