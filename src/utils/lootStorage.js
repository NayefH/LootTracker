// Laedt gespeicherte Loot-Eintraege aus dem localStorage und faellt bei
// fehlenden oder ungueltigen Daten auf eine leere Liste zurueck.
export function loadLoots(storageKey) {
  const storedLoots = localStorage.getItem(storageKey);

  if (!storedLoots) {
    return [];
  }

  try {
    return JSON.parse(storedLoots);
  } catch {
    return [];
  }
}

// Speichert die aktuelle Loot-Liste als JSON im localStorage.
export function saveLoots(storageKey, loots) {
  localStorage.setItem(storageKey, JSON.stringify(loots));
}
