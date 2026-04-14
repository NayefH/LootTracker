import { useEffect, useState } from "react";
import "./App.css";
import Loot from "./components/Loot";
import Navbar from "./components/Navbar";
import { loadLoots, saveLoots } from "./utils/lootStorage";

const STORAGE_KEY = "loottracker.loots";

function App() {
  const [isCreatingLoot, setIsCreatingLoot] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loots, setLoots] = useState(() => loadLoots(STORAGE_KEY));

  useEffect(() => {
    saveLoots(STORAGE_KEY, loots);
  }, [loots]);

  function handleAddLoot(loot) {
    setLoots((currentLoots) => [loot, ...currentLoots]);
    setIsCreatingLoot(false);
  }

  function handleDeleteLoot(lootId) {
    setLoots((currentLoots) =>
      currentLoots.filter((loot) => loot.id !== lootId),
    );
  }

  function handleUpdateAttempts(lootId, nextAttempts) {
    setLoots((currentLoots) =>
      currentLoots.map((loot) =>
        loot.id === lootId
          ? { ...loot, attempts: Math.max(0, nextAttempts) }
          : loot,
      ),
    );
  }

  return (
    <>
      <Navbar
        selectedGame={selectedGame}
        onSelectGame={setSelectedGame}
        onCreateLoot={() => {
          setIsCreatingLoot(true);
          requestAnimationFrame(() => {
            document
              .getElementById("loot-form")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }}
      />
      <Loot
        isCreatingLoot={isCreatingLoot}
        selectedGameName={selectedGame?.name ?? ""}
        loots={loots}
        onAddLoot={handleAddLoot}
        onCancelCreate={() => setIsCreatingLoot(false)}
        onDeleteLoot={handleDeleteLoot}
        onUpdateAttempts={handleUpdateAttempts}
      />
    </>
  );
}

export default App;
