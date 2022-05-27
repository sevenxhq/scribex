import { useEffect, useRef } from "react";
import { useProskomma } from "proskomma-react-hooks";
import { thaw } from "proskomma-freeze";
import { nt_ebible_27book } from "proskomma-frozen-archives";

import usePerf from "./hooks/usePerf";
import useApplicationState from "./hooks/useApplicationState";
import Layout from "./components/Layout";

import "./styles.css";

export default function App() {
  const readyRef = useRef();
  const ready = readyRef.current;
  const verbose = true;

  const { proskomma, stateId, newStateId } = useProskomma({ verbose });

  useEffect(() => {
    console.log("App load");
  }, []);

  useEffect(() => {
    !ready &&
      thaw(proskomma, nt_ebible_27book).then(() => {
        readyRef.current = true;
        newStateId();
      });
  }, [stateId, ready, newStateId]);

  const {
    state: { perfHtml, canUndo, canRedo },
    actions: { savePerfHtml, undo, redo }
  } = usePerf({ proskomma, ready });

  const { state, actions } = useApplicationState({
    perfHtml,
    savePerfHtml,
    undo,
    redo,
    canUndo,
    canRedo
  });

  // const { catalog } = useCatalog({
  //   proskomma,
  //   stateId,
  //   verbose
  // });

  // if (perfHtml) console.log(catalog);

  return (
    <div className="App">
      <Layout {...{ state, actions }} />
    </div>
  );
}
