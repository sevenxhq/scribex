import { useEffect } from "react";

import Layout from "./components/Layout";
import { AppContextProvider } from "./hooks/App.context";

import "./styles.css";
  
export default function App() {
  const verbose = true;
  useEffect(() => { if (verbose) console.log("App First Render"); }, []);

  if (verbose) console.log("App Render");

  return (
    <div className="App">
      <AppContextProvider verbose={verbose}>
        <Layout />
      </AppContextProvider>
    </div>
  );
}
