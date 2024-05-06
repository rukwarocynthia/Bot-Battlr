import React, { useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  const [army, setArmy] = useState([]);

  // Function to add a bot to the army
  const addToArmy = (bot) => {
    setArmy([...army, bot]);
  };

  const handleReleaseFromArmy = (bot) => {
    const updatedArmy = army.filter((armyBot) => armyBot.id !== bot.id);
    setArmy(updatedArmy);
  };

  const handleDischarge = (bot) => {
    fetch(`http://localhost:8002/bots/${bot.id}`, {
      method: "DELETE",
    })
    .then(response => {
      if (response.ok) {
        const updatedArmy = army.filter((armyBot) => armyBot.id !== bot.id);
        setArmy(updatedArmy);
        console.log("Bot discharged from service and deleted from backend.");
      } else {
        console.error("Failed to discharge bot:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error discharging bot:", error);
    });
  };


  return (
    <div>
      <YourBotArmy army={army} handleReleaseFromArmy={handleReleaseFromArmy} handleDischarge={handleDischarge} />
      <BotCollection addToArmy={addToArmy} army={army} />
    </div>
  );
}

export default BotsPage;
