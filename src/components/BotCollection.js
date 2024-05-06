import React, { useEffect, useState } from "react";
import BotSpecs from "./BotSpecs";

function BotCollection({ addToArmy }) {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8002/bots")
      .then((response) => response.json())
      .then((data) => setBots(data))
      .catch((error) => console.error("Error fetching bots:", error));
  }, []);

  const handleSelectBot = (bot) => {
    setSelectedBot(bot);
  }

  const handleAddToArmy = (bot) => {
    if (!army.find((armyBot) => armyBot.id === bot.id)) {
      setArmy([...army, bot]);
      addToArmy(bot);
    } else {
      console.log(`${bot.name} is already in your army.`);
    }
  };

  return (
    <div className="ui four column grid">
      <div className="row">
        {selectedBot ? (
          <BotSpecs bot={selectedBot} onAddToArmy={handleAddToArmy} onEnlist={handleAddToArmy} onGoBack={() => setSelectedBot(null)} />
        ) : (
          bots.map((bot) => (
            <div key={bot.id} className="column">
              <div className="ui card" onClick={() => handleSelectBot(bot)}>
                <div className="image">
                  <img src={bot.avatar_url} alt={bot.name} />
                </div>
                <div className="content">
                  <div className="header">{bot.name}</div>
                  <div className="meta">Health: {bot.health}</div>
                  <div className="meta">Damage: {bot.damage}</div>
                  <div className="meta">Armor: {bot.armor}</div>
                  <div className="meta">Class: {bot.bot_class}</div>
                  <div className="description">{bot.description}</div>
                  <button onClick={() => handleAddToArmy(bot)}>
                    Add to Army
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BotCollection;
