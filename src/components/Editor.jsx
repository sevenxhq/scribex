import { useCallback, useContext } from "react";
// import { Skeleton, Stack } from "@mui/material";

import { AppContext } from "../hooks/App.context";
import useLifecycleLog from "../hooks/useLifecycleLog";

import { HtmlPerfEditor } from "@xelah/type-perf-html";

export default function Editor({ setFootNote }) {
  const {
    state: {
      sequenceIds,
      isSaving,
      isLoading,
      htmlPerf,
      sectionable,
      blockable,
      editable,
      preview,
      verbose,
    },
    actions: { addSequenceId, saveHtmlPerf },
  } = useContext(AppContext);
  const sequenceId = sequenceIds.at(-1);
  useLifecycleLog(Editor);
  const style =
    isSaving || isLoading || !sequenceId ? { cursor: "progress" } : {};

  const props = {
    htmlPerf: htmlPerf,
    onHtmlPerf: saveHtmlPerf,
    sequenceIds,
    addSequenceId,
    options: {
      sectionable,
      blockable,
      editable,
      preview,
    },
    decorators: {},
    verbose,
    setFootNote,
  };

  return (
    <div className='editor' style={style}>
      {!sequenceId && <p>loading</p>}
      {sequenceId && <HtmlPerfEditor {...props} />}
    </div>
  );
}
