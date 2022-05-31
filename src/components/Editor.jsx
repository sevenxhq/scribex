import { useContext, useMemo } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import { AppContext } from "../hooks/App.context";
import { getTarget } from "../core/getTarget";

import PerfEditorWrapper from "./PerfEditorWrapper";

export default function Editor() {
  const { state: { sequenceIds } } = useContext(AppContext);
  const sequenceId = sequenceIds.at(-1);

  const component = useMemo(() => {
    console.log('Editor component render');
    return (
      <div className="Editor">
        {sequenceId ? <PerfEditorWrapper sequenceId={sequenceId} /> : <></>}
      </div>
    );
  }, [sequenceId]);

  return component;
};
