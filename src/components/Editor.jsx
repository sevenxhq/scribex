import { useContext, useEffect } from "react";

import { AppContext } from "../hooks/App.context";

import PerfEditorWrapper from "./PerfEditorWrapper";

export default function Editor() {
  const { state: { sequenceIds, verbose } } = useContext(AppContext);
  const sequenceId = sequenceIds.at(-1);

  useEffect(() => { if (verbose) console.log('Editor component render'); }, []);

  return (
    <div className="Editor">
      {sequenceId ? <PerfEditorWrapper sequenceId={sequenceId} /> : <></>}
    </div>
  );
};
