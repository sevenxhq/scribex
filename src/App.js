import { useEffect } from "react";

import Layout from "./components/Layout";
import { AppContextProvider } from "./hooks/App.context";

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
      <AppContextProvider verbose={verbose}>
        <Layout />
      </AppContextProvider>
    </div>
  );
}
