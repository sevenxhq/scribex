import { useCallback, useContext } from "react";
// import { Skeleton, Stack } from "@mui/material";

import { ScribexContext } from "../hooks/ScribexContext";
import useLifecycleLog from "../hooks/useLifecycleLog";

import { HtmlPerfEditor } from "@xelah/type-perf-html";

export default function Editor() {
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
    actions: { addSequenceId, saveHtmlPerf, setGraftSequenceId },
  } = useContext(ScribexContext);
  const sequenceId = sequenceIds.at(-1);
  useLifecycleLog(Editor);
  const style =
    isSaving || isLoading || !sequenceId ? { cursor: "progress" } : {};

  const handlers = {
    onBlockClick: ({ content: _content, element }) => {
      const _sequenceId = element.dataset.target;
      const { tagName } = element;
      const isInline = tagName === "SPAN";
      // if (_sequenceId && !isInline) addSequenceId(_sequenceId);
      // if (_sequenceId) setGraftSequenceId(_sequenceId);
      _sequenceId ? setGraftSequenceId(_sequenceId) : setGraftSequenceId(null);
    },
  };
  let chapterIndex = 3;

  const props = {
    htmlPerf: htmlPerf,
    onHtmlPerf: saveHtmlPerf,
    sequenceIds,
    addSequenceId,
    chapterIndex,
    options: {
      sectionable,
      blockable,
      editable,
      preview,
    },
    decorators: {},
    verbose,
    handlers,
  };

  return (
    <div className="editor" style={style}>
      {!sequenceId && <p>loading</p>}
      {sequenceId && <HtmlPerfEditor {...props} />}
    </div>
  );
}
