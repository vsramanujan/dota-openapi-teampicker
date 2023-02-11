import React from "react";
import { render } from "react-dom";

import Header from "./Components/Header";
import Todos from "./Components/Todos";

function App() {
  return (
    <>
      <Header />
      <Todos />
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
