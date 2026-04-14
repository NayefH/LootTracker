// Formatiert Prozentwerte einheitlich mit zwei Nachkommastellen für die Anzeige.
export function formatPercent(value) {
  return `${value.toFixed(2)}%`;
}

// Berechnet die Gesamtchance auf mindestens einen Drop und die Restchance
// nach einer gegebenen Anzahl von Versuchen.
export function getChanceStats(dropChance, attempts) {
  const singleChance = Math.min(Math.max(Number(dropChance) / 100, 0), 1);
  const remainingChance = Math.pow(1 - singleChance, attempts) * 100;
  const totalChance = (1 - Math.pow(1 - singleChance, attempts)) * 100;

  return {
    totalChance,
    remainingChance,
  };
}
