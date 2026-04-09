// Normalisiert Texteingaben aus dem Formular, damit Leerzeichen am Rand
// nicht im gespeicherten Objekt landen.
function normalizeText(value) {
  return value.trim();
}

// Erstellt ein neues Loot-Objekt aus den Formulardaten und validiert,
// dass alle benoetigten Felder befuellt sind.
export function createLoot({ game, lootName, dropChance }) {
  const normalizedGame = normalizeText(game);
  const normalizedLootName = normalizeText(lootName);
  const normalizedDropChance = normalizeText(dropChance);

  if (!normalizedGame || !normalizedLootName || !normalizedDropChance) {
    return null;
  }

  return {
    id: crypto.randomUUID(),
    game: normalizedGame,
    lootName: normalizedLootName,
    dropChance: Number(normalizedDropChance),
    attempts: 0,
    createdAt: new Date().toISOString(),
  };
}
