import React from "react";
import { ACTIONS, useSelectionContext } from "../context/selectionContext";
import {
  agilityHeroes,
  heroNameToIdMap,
  intelligenceHeroes,
  physicalHeroes,
  PLAYERS,
} from "../data/constants";
import "./teamPicker.css";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
  const [
    { selectedMap, youSelected, enemySelected, toPick, suggestions },
    dispatch,
  ] = useSelectionContext();
  const jsx = heroes.map((hero) => {
    const isSuggestedHero = suggestions[hero] && !selectedMap[hero];
    const jsx = (
      <img
        key={hero}
        role="button"
        className={`hero ${selectedMap[hero] ? selectedMap[hero] : ""} ${
          isSuggestedHero ? "suggestion" : ""
        }`}
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
            const {
              data: { hero_suggestions },
            } = await axios.post("http://localhost:8000/pick", {
              enemy_picks: newEnemySelected,
              my_picks: newYouSelected,
            });
            const parsedHeroSuggestions = hero_suggestions.reduce(
              (acc, heroSuggestion) => {
                const nameKey = heroNameToIdMap[heroSuggestion.hero_name];
                acc[nameKey] = {
                  ...heroSuggestion,
                  hero_name: nameKey,
                };
                return acc;
              },
              {}
            );
            console.log(
              "derp response",
              hero_suggestions,
              parsedHeroSuggestions
            );

            dispatch({
              type: ACTIONS.API_CALL_END_SUCCESS,
              payload: parsedHeroSuggestions,
            });
          } catch (err) {
            dispatch({
              type: ACTIONS.API_CALL_END_FAILURE,
            });
          }
        }}
      />
    );
    if (!isSuggestedHero) return jsx;
    const { rating, reason, counter } = suggestions[hero];
    return (
      <Popup trigger={<span>{jsx}</span>} position="right center" on={"hover"}>
        <div>Rating: {rating}</div>
        <div>Reason: {reason}</div>
        <div>Counters: {counter}</div>
      </Popup>
    );
  });

  return (
    <div>
      <h2>{type}</h2>
      {jsx}
    </div>
  );
}
