import React from "react";
import { useSelectionContext } from "../context/selectionContext";
import "./selectedTeam.css";

export default function SelectedTeams() {
  const [{ youSelected, enemySelected }] = useSelectionContext();

  return (
    <div className="selected-teams">
      <SelectedTeam team={youSelected} title="Your team" />
      <SelectedTeam team={enemySelected} title="Enemy team" />
    </div>
  );
}

function SelectedTeam({ team, title }) {
  return (
    <div style={{display: "flex", alignItems: "center"}}>
      <span style={{marginRight: "1rem"}}>{title}:</span>
      {team.map((hero) => (
        <img key={hero} src={`/images/${hero}.jpg`} height={100} alt={hero} />
      ))}
    </div>
  );
}
