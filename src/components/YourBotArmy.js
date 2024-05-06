import React from "react";

function YourBotArmy({ army, handleReleaseFromArmy, handleDischarge }) {
  const handleReleaseClick = (bot) => {
    handleReleaseFromArmy(bot);
  };

    const handleDischargeClick = (bot) => {
      handleDischarge(bot);
    };
  

  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          <h2>Your Bot Army</h2>
          {army.map((bot) => (
            <div key={bot.id} className="card">
              <div className="content"> 
              <div className="ui card">
              <img src={bot.avatar_url} alt={bot.name} className="ui image" />
                <div className="header">{bot.name}</div>
                <div className="meta">Health: {bot.health}</div>
                <div className="meta">Damage: {bot.damage}</div>
                <div className="meta">Armor: {bot.armor}</div>
                <div className="meta">Class: {bot.bot_class}</div>
                <div className="description">{bot.description}</div>
              </div>
              </div>
              <div className="extra content">
                <button onClick={() => handleReleaseClick(bot)}>Release from Army</button>
                <button className="ui button red" onClick={() => handleDischarge(bot)}>X</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;
