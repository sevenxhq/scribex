import { useEffect } from "react";

import Layout from "./components/Layout";
import { AppContextProvider } from "./hooks/App.context";

import "./styles.css";
  
export default function App() {
  useEffect(() => {
    console.log("App load");
  }, []);

  console.log("App Render");

  return (
    <div className="App">
      <AppContextProvider>
        <Layout />
      </AppContextProvider>
    </div>
  );
}
