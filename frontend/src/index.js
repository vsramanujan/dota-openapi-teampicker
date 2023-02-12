import React from "react";
import { createRoot } from "react-dom/client";

import Header from "./Components/Header";
import SelectedTeams from "./Components/SelectedTeam";
import TeamPicker from "./Components/TeamPicker";
import {
  SelectionContextProvider,
  useSelectionContext,
} from "./context/selectionContext";
import Modal from "react-modal";

Modal.setAppElement("#root");

function AppWrapper() {
  return (
    <SelectionContextProvider>
      <App />
    </SelectionContextProvider>
  );
}

function LoadingModal() {
  const [{ loading }] = useSelectionContext();

  return (
    <Modal isOpen={loading} contentLabel="Loading Modal">
      <h2 style={{ textAlign: "center" }}>LOADING</h2>
    </Modal>
  );
}

function App() {
  return (
    <>
      <LoadingModal />
      <Header />
      <SelectedTeams />
      <TeamPicker />
    </>
  );
}

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);
root.render(<AppWrapper />);
