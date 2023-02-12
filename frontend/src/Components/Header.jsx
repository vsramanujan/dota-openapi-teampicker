import React from "react";
import { ACTIONS, useSelectionContext } from "../context/selectionContext";
import { PLAYERS } from "../data/constants";
import "./header.css";

const Header = () => {
  const [{ toPick }, dispatch] = useSelectionContext();

  return (
    <div className="header">
      <button
        className="toggle"
        onClick={() =>
          dispatch({
            type: ACTIONS.TOGGLE_PICK,
          })
        }
      >
        {toPick} {toPick === PLAYERS.YOU ? "are" : "is"} choosing
      </button>
    </div>
  );
};

export default Header;
