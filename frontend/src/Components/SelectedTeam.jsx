import React from "react";
import { useSelectionContext } from "../context/selectionContext";
import './selectedTeam.css'

export default function SelectedTeams() {
  const [{ youSelected, enemySelected }] = useSelectionContext();

  return (
    <div className="selected-teams">
      <SelectedTeam team={youSelected} />
      <SelectedTeam team={enemySelected} />
    </div>
  );
}

function SelectedTeam({ team }) {
  return (
    <div>
      {team.map((hero) => (
        <img src={`/images/${hero}.jpg`} height={100} alt={hero} />
      ))}
    </div>
  );
}
