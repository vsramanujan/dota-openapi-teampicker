import React, { useReducer, useContext } from "react";
import { PLAYERS } from "../data/constants";

const DEFAULT_STATE = {
  selectedMap: {},
  enemySelected: [],
  youSelected: [],
  toPick: PLAYERS.YOU,
};

const SelectionContext = React.createContext({});

export const ACTIONS = {
  TOGGLE_PICK: "TOGGLE_PICK",
  PICK_HERO: "PICK_HERO",
  RESET: "RESET",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_PICK: {
      return {
        ...state,
        toPick: state.toPick === PLAYERS.YOU ? PLAYERS.ENEMY : PLAYERS.YOU,
      };
    }
    case ACTIONS.PICK_HERO: {
      const hero = action.payload.hero;
      const newState = { ...state };
      if (state.toPick === PLAYERS.ENEMY) {
        newState.enemySelected.push(hero);
      } else newState.youSelected.push(hero);
      newState.selectedMap[hero] = `selected ${state.toPick}`;
      return newState;
    }
    case ACTIONS.RESET: {
      return DEFAULT_STATE;
    }
  }
}

export function SelectionContextProvider({ children }) {
  const reducerResponse = useReducer(reducer, DEFAULT_STATE);

  return (
    <SelectionContext.Provider value={reducerResponse}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelectionContext() {
  return useContext(SelectionContext);
}
