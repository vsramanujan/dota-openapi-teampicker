import React from "react";
import { render } from "react-dom";

import Header from "./Components/Header";
import SelectedTeams from "./Components/SelectedTeam";
import TeamPicker from "./Components/TeamPicker";
import { SelectionContextProvider } from "./context/selectionContext";

function App() {
  return (
    <SelectionContextProvider>
      <Header />
      <SelectedTeams />
      <TeamPicker />
    </SelectionContextProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
