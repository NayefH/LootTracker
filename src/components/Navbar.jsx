import treasureChest from "../img/treasure-chest.png";

const navItems = ["Dashboard", "Inventar"];

function Navbar({ onCreateLoot }) {
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
            placeholder="Suche nach Items, Spielern oder Raids"
            aria-label="Suche nach Items, Spielern oder Raids"
          />
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
            Neues Loot
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
