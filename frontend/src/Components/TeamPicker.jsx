import React from "react";
import { ACTIONS, useSelectionContext } from "../context/selectionContext";
import {
  agilityHeroes,
  intelligenceHeroes,
  physicalHeroes,
} from "../data/constants";
import "./teamPicker.css";

export default function TeamPicker() {
  return (
    <div>
      <CategoryHeroes heroes={physicalHeroes} type={"Physical"} />
      <CategoryHeroes heroes={agilityHeroes} type={"Agility"} />
      <CategoryHeroes heroes={intelligenceHeroes} type={"Intelligence"} />
    </div>
  );
}

function CategoryHeroes({ heroes, type }) {
  const [{ selectedMap }, dispatch] = useSelectionContext();
  const jsx = heroes.map((hero) => (
    <img
      role="button"
      className={`hero ${selectedMap[hero] ? selectedMap[hero] : ""}`}
      src={`/images/${hero}.jpg`}
      height={100}
      alt={hero}
      onClick={() => {
        if (!selectedMap[hero])
          dispatch({
            type: ACTIONS.PICK_HERO,
            payload: {
              hero,
            },
          });
      }}
    />
  ));

  return (
    <div>
      <h2>{type}</h2>
      {jsx}
    </div>
  );
}
