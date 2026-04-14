import { useEffect, useState } from "react";
import { createLoot } from "../utils/createLoot";
import { formatPercent, getChanceStats } from "../utils/lootStats";

function Loot({
  isCreatingLoot,
  selectedGameName,
  loots,
  onAddLoot,
  onCancelCreate,
  onDeleteLoot,
  onUpdateAttempts,
}) {
  const [formData, setFormData] = useState({
    game: "",
    lootName: "",
    dropChance: "",
  });

  useEffect(() => {
    if (!isCreatingLoot) {
      return;
    }

    setFormData((currentData) => ({
      ...currentData,
      game: selectedGameName || "",
    }));
  }, [isCreatingLoot, selectedGameName]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextLoot = createLoot(formData);

    if (!nextLoot) {
      return;
    }

    onAddLoot(nextLoot);

    setFormData({
      game: "",
      lootName: "",
      dropChance: "",
    });
  }

  return (
    <section className="lootFormSection" id="loot-form">
      <div className="lootFormCard">
        {isCreatingLoot ? (
          <>
            <div className="lootFormCard__intro">
              <p className="lootFormCard__eyebrow">Neuer Eintrag</p>
              <h1>Loot erfassen</h1>
              <p>
                Trage ein, aus welchem Spiel der Loot stammt, wie er heißt und
                mit welcher Wahrscheinlichkeit er droppt.
              </p>
            </div>

            <form className="lootForm" onSubmit={handleSubmit}>
              <label className="lootForm__field">
                <span>Spiel</span>
                <input
                  type="text"
                  name="game"
                  placeholder="z. B. Diablo IV"
                  value={formData.game}
                  onChange={handleChange}
                />
              </label>

              <label className="lootForm__field">
                <span>Name des Loots</span>
                <input
                  type="text"
                  name="lootName"
                  placeholder="z. B. Schattenklinge"
                  value={formData.lootName}
                  onChange={handleChange}
                />
              </label>

              <label className="lootForm__field">
                <span>Wahrscheinlichkeit</span>
                <input
                  type="number"
                  name="dropChance"
                  placeholder="z. B. 4.5"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.dropChance}
                  onChange={handleChange}
                />
              </label>

              <div className="lootForm__actions">
                <button className="lootForm__submit" type="submit">
                  Loot speichern
                </button>
                <button
                  className="lootForm__cancel"
                  type="button"
                  onClick={onCancelCreate}
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="lootFormCard__placeholder">
            <p className="lootFormCard__eyebrow">Bereit</p>
            <h1>Kein offenes Loot-Formular</h1>
            <p>
              Klicke auf <strong>Neues Loot</strong>, um einen neuen Eintrag zu
              erstellen.
            </p>
          </div>
        )}

        <div className="lootList">
          <div className="lootList__header">
            <h2>Gespeicherte Loots</h2>
            <span>{loots.length} Einträge</span>
          </div>

          {loots.length === 0 ? (
            <p className="lootList__empty">
              Noch keine Loots gespeichert. Erstelle deinen ersten Eintrag.
            </p>
          ) : (
            <div className="lootList__items">
              {loots.map((loot) => (
                <article key={loot.id} className="lootItem">
                  <div className="lootItem__top">
                    <div className="lootItem__meta">
                      <span>{loot.game}</span>
                      <span>{loot.dropChance}% Basis-Chance</span>
                    </div>
                    <button
                      className="lootItem__delete"
                      type="button"
                      onClick={() => onDeleteLoot(loot.id)}
                    >
                      Löschen
                    </button>
                  </div>
                  <strong>{loot.lootName}</strong>

                  <div className="lootCounter">
                    <span className="lootCounter__label">Versuche</span>
                    <div className="lootCounter__controls">
                      <button
                        className="lootCounter__button"
                        type="button"
                        onClick={() =>
                          onUpdateAttempts(loot.id, (loot.attempts ?? 0) - 1)
                        }
                      >
                        -
                      </button>
                      <span className="lootCounter__value">
                        {loot.attempts ?? 0}
                      </span>
                      <button
                        className="lootCounter__button"
                        type="button"
                        onClick={() =>
                          onUpdateAttempts(loot.id, (loot.attempts ?? 0) + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="lootStats">
                    <div className="lootStats__item">
                      <span>Bisherige Chance</span>
                      <strong>
                        {formatPercent(
                          getChanceStats(loot.dropChance, loot.attempts ?? 0)
                            .totalChance,
                        )}
                      </strong>
                    </div>
                    <div className="lootStats__item">
                      <span>Verbleibende Chance</span>
                      <strong>
                        {formatPercent(
                          getChanceStats(loot.dropChance, loot.attempts ?? 0)
                            .remainingChance,
                        )}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Loot;
