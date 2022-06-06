import { useContext, useEffect } from "react";

import { AppContext } from "../hooks/App.context";
import useLifecycleLog from "../hooks/useLifecycleLog";

import PerfEditorWrapper from "./PerfEditorWrapper";

export default function Editor() {
  const { state: { sequenceIds, verbose } } = useContext(AppContext);
  const sequenceId = sequenceIds.at(-1);

  useLifecycleLog(Editor);

  return (
    <div className="Editor">
      {sequenceId ? <PerfEditorWrapper sequenceId={sequenceId} /> : <></>}
    </div>
  );
};
