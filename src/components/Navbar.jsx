import { useEffect, useState } from "react";
import { searchGamesByName } from "../utils/searchGames";
import {
  getGameReleaseLabel,
  normalizeSearchTerm,
  shouldSearchGames,
} from "../utils/navbarSearch";
import treasureChest from "../img/treasure-chest.png";

const navItems = ["Dashboard", "Inventar"];

function Navbar({ onCreateLoot, onSelectGame, selectedGame }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(
    () => {
      // Code, der ausgeführt wird:
      // Wird mindestens einmal beim Mounten ausgeführt.
      const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

      if (!shouldSearchGames(searchTerm)) {
        setSearchResults([]);
        setSearchError("");
        setIsSearching(false);
        return undefined;
      }

      const controller = new AbortController();
      const timeoutId = window.setTimeout(async () => {
        try {
          setIsSearching(true);
          setSearchError("");
          const nextResults = await searchGamesByName(normalizedSearchTerm, {
            pageSize: 5,
            signal: controller.signal,
          });
          setSearchResults(nextResults);
        } catch (error) {
          if (error.name === "AbortError") {
            return;
          }

          setSearchResults([]);
          setSearchError(error.message);
        } finally {
          setIsSearching(false);
        }
      }, 250);

      return () => {
        controller.abort();
        window.clearTimeout(timeoutId);
      };
    },
    // Listener on change:
    [searchTerm],
  );

  function handleSelectGame(game) {
    onSelectGame(game);
    setSearchTerm(game.name);
    setSearchResults([]);
    setSearchError("");
  }

  return (
    <header className="navbar">
      <div className="navbar__topRow">
        <a className="navbar__brand" href="/">
          <span className="navbar__logo" aria-hidden="true">
            <img className="navbar__logoImage" src={treasureChest} alt="" />
          </span>
          <span>
            <strong>LootTracker</strong>
          </span>
        </a>

        <form className="navbar__search" role="search">
          <span className="navbar__searchIcon" aria-hidden="true">
            Suche
          </span>
          <input
            className="navbar__searchInput"
            type="search"
            name="loot-search"
            placeholder="Suche nach einem Spiel"
            aria-label="Suche nach einem Spiel"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          {(isSearching || searchError || searchResults.length > 0) && (
            <div className="navbar__searchPanel">
              {isSearching && (
                <p className="navbar__searchState">Suche läuft...</p>
              )}

              {searchError && (
                <p className="navbar__searchState navbar__searchState--error">
                  {searchError}
                </p>
              )}

              {!isSearching && !searchError && searchResults.length > 0 && (
                <div className="navbar__searchResults">
                  {searchResults.map((game) => (
                    <button
                      key={game.id}
                      className="navbar__searchResult"
                      type="button"
                      onClick={() => handleSelectGame(game)}
                    >
                      <img
                        className="navbar__searchResultCover"
                        src={game.background_image ?? treasureChest}
                        alt=""
                      />
                      <span className="navbar__searchResultText">
                        <strong>{game.name}</strong>
                        <small>{getGameReleaseLabel(game.released)}</small>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </form>

        <div className="navbar__actions">
          <button
            className="navbar__button navbar__button--ghost"
            type="button"
            // onClick={alert("!")}
          >
            Login
          </button>
          <button
            className="navbar__button"
            type="button"
            onClick={onCreateLoot}
          >
            Loot tracken
          </button>
        </div>
      </div>

      <nav className="navbar__nav" aria-label="Hauptnavigation">
        {navItems.map((item) => (
          <a
            key={item}
            className={`navbar__link${item === "Dashboard" ? " is-active" : ""}`}
            href="/"
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
