import React from "react";
import { createRoot } from "react-dom/client";

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

const root = createRoot(rootElement);
root.render(<App />);
