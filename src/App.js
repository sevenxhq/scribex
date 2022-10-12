import { useEffect } from "react";

import Scribex from "./components/Scribex";
import { ScribexContextProvider } from "./context/ScribexContext";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <ScribexContextProvider>
        <Scribex />
      </ScribexContextProvider>
    </div>
  );
}
