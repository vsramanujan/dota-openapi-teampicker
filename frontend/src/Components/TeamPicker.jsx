import React from "react";
import { ACTIONS, useSelectionContext } from "../context/selectionContext";
import {
  agilityHeroes,
  intelligenceHeroes,
  physicalHeroes,
  PLAYERS,
} from "../data/constants";
import "./teamPicker.css";
import axios from "axios";

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
  const [{ selectedMap, youSelected, enemySelected, toPick }, dispatch] =
    useSelectionContext();
  const jsx = heroes.map((hero) => (
    <img
      key={hero}
      role="button"
      className={`hero ${selectedMap[hero] ? selectedMap[hero] : ""}`}
      src={`/images/${hero}.jpg`}
      height={100}
      alt={hero}
      onClick={async () => {
        if (selectedMap[hero]) return;
        const newYouSelected = [...youSelected];
        const newEnemySelected = [...enemySelected];
        if (toPick === PLAYERS.ENEMY) {
          newEnemySelected.push(hero);
        } else {
          newYouSelected.push(hero);
        }
        dispatch({
          type: ACTIONS.PICK_HERO,
          payload: {
            hero,
            youSelected: newYouSelected,
            enemySelected: newEnemySelected,
          },
        });

        dispatch({
          type: ACTIONS.API_CALL_BEGIN,
        });

        try {
          const response = await axios.post("http://localhost:8000/pick", {
            enemy_picks: newEnemySelected,
            my_picks: newYouSelected,
          });
          console.log("derp response", response);

          dispatch({
            type: ACTIONS.API_CALL_END_SUCCESS,
            payload: {},
          });
        } catch (err) {
          dispatch({
            type: ACTIONS.API_CALL_END_FAILURE,
          });
        }
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
