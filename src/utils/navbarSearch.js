// Suchbegriff normalisieren

export function normalizeSearchTerm(value) {
  return value.trim();
}

// Mindestlänge für die Suche prüfen: 2
export function shouldSearchGames(value, minLength = 2) {
  return normalizeSearchTerm(value).length >= minLength;
}

// Release-Datum für Suchtreffer formatieren
export function getGameReleaseLabel(released) {
  return released ? `Release: ${released}` : "Kein Release-Datum";
}
