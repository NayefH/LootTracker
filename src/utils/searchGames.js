const RAWG_BASE_URL = "https://api.rawg.io/api/games";

// Liest den RAWG-Key aus den von Vite im Client verfügbaren Env-Variablen.
// Dafür muss der Key in der Projekt-.env mit VITE_ beginnen.
function getRawgApiKey() {
  return import.meta.env.VITE_RAWG_API_KEY ?? import.meta.env.VITE_RAWG ?? "";
}

// Sucht Spiele über die RAWG-API anhand eines Namensfragments und gibt die
// Trefferliste aus dem API-Response zurück.
export async function searchGamesByName(gameName, options = {}) {
  const normalizedGameName = gameName.trim();
  const apiKey = getRawgApiKey();

  if (!normalizedGameName) {
    return [];
  }

  if (!apiKey) {
    throw new Error("RAWG API key fehlt, du Penner");
  }

  const searchParams = new URLSearchParams({
    key: apiKey,
    search: normalizedGameName,
    page_size: String(options.pageSize ?? 10),
  });

  const response = await fetch(`${RAWG_BASE_URL}?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(`RAWG request fehlgeschlagen: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.results)) {
    throw new Error("Unerwartetes RAWG-Responseformat. Hä? Was soll das denn?");
  }

  return data.results;
}
