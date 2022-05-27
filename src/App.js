import { useEffect } from "react";
import { useProskomma, useImport, useCatalog } from "proskomma-react-hooks";

import usePerf from "./hooks/usePerf";
import useApplicationState from "./hooks/useApplicationState";
import Layout from "./components/Layout";

import "./styles.css";

const documents = [
  { 
    selectors: { org: 'bcs', lang: 'hi', abbr: 'irv' },
    bookCode: 'tit',
    url: '/bcs-hi_irv.tit.usfm',
  },
];
  
export default function App() {
  const verbose = true;

  const { proskomma, stateId, newStateId } = useProskomma({ verbose });
  const { done } = useImport({ proskomma, stateId, newStateId, documents });
  const { catalog } = useCatalog({
    proskomma,
    stateId,
    verbose
  });

  const ready = catalog.nDocSets > 0;

  console.log({ready, catalog});

  useEffect(() => {
    console.log("App load");
  }, []);

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

  return (
    <div className="App">
      <Layout {...{ state, actions }} />
    </div>
  );
}
