import { useEffect } from "react";

import Scribex from "./components/Scribex";
import { ScribexContextProvider } from "./hooks/ScribexContext";

import "./styles.css";
  
export default function App() {
  const verbose = false;
  useEffect(() => {
    if (verbose) console.log("App: Mount/First Render");
    return (() => {
      if (verbose) console.log("App: Unmount/Destroy");
    });
  }, []);


  return (
    <div className="App">
      <ScribexContextProvider verbose={verbose}>
        <Scribex />
      </ScribexContextProvider>
    </div>
  );
}
