// Lädt gespeicherte Loot-Einträge aus dem localStorage und fällt bei
// fehlenden oder ungültigen Daten auf eine leere Liste zurück.
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
