import { useCallback, useContext } from "react";
// import { Skeleton, Stack } from "@mui/material";

import { ScribexContext } from "../hooks/ScribexContext";
import useLifecycleLog from "../hooks/useLifecycleLog";

import { HtmlPerfEditor } from "@xelah/type-perf-html";

export default function FootNoteEditor() {
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
      graftSequenceId,
    },
    actions: { addSequenceId, saveHtmlPerf, setGraftSequenceId },
  } = useContext(ScribexContext);
  const sequenceId = sequenceIds.at(-1);
  useLifecycleLog(FootNoteEditor);
  const style =
    isSaving || isLoading || !sequenceId ? { cursor: "progress" } : {};

  const handlers = {
    onBlockClick: ({ content: _content, element }) => {
      const _sequenceId = element.dataset.target;
      const { tagName } = element;
      const isInline = tagName === "SPAN";
      // if (_sequenceId && !isInline) addSequenceId(_sequenceId);
      if (_sequenceId) setGraftSequenceId(_sequenceId);
    },
  };

  const props = {
    htmlPerf: htmlPerf,
    onHtmlPerf: saveHtmlPerf,
    sequenceIds,
    sequenceId,
    addSequenceId,
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
  const graftProps = {
    ...props,
    sequenceIds: [graftSequenceId],
  };

  const graftSequenceEditor = htmlPerf && (
    <>
      <HtmlPerfEditor {...graftProps} />
    </>
  );

  return (
    <div className="editor" style={style}>
      {graftSequenceId ? graftSequenceEditor : ""}
    </div>
  );
}
