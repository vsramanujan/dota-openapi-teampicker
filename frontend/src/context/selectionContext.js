import React, { useReducer, useContext } from "react";
import { PLAYERS } from "../data/constants";

const DEFAULT_STATE = {
  selectedMap: {},
  enemySelected: [],
  youSelected: [],
  toPick: PLAYERS.ENEMY,
  suggestions: {},
};

const SelectionContext = React.createContext({});

export const ACTIONS = {
  TOGGLE_PICK: "TOGGLE_PICK",
  PICK_HERO: "PICK_HERO",
  RESET: "RESET",
  API_CALL_BEGIN: "API_CALL_BEGIN",
  API_CALL_END: "API_CALL_END",
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
      const { hero, youSelected, enemySelected } = action.payload;
      const newState = { ...state };
      newState.enemySelected = enemySelected;
      newState.youSelected = youSelected;
      newState.selectedMap[hero] = `selected ${state.toPick}`;
      newState.suggestions = {};
      return newState;
    }
    case ACTIONS.RESET: {
      return DEFAULT_STATE;
    }
    default: {
      return state
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
