import { useCallback, useContext } from "react";
// import { Skeleton, Stack } from "@mui/material";

import { AppContext } from "../hooks/App.context";
import useLifecycleLog from "../hooks/useLifecycleLog";

import { HtmlPerfEditor, FootNoteEditor } from "@xelah/type-perf-html";

export default function Editor({ setFootNotes }) {
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

  const onInlineGraftClick = useCallback(
    ({
      sequenceId,
      htmlPerf,
      onHtmlPerf,
      options,
      components: _components,
      handlers,
    }) => {
      console.log("onInlineGraftClick", sequenceId);
      const _props = {
        sequenceId,
        htmlPerf,
        onHtmlPerf,
        options,
        _components,
        handlers,
      };
      addSequenceId(sequenceId);
      return (
        <div className='editor' style={style}>
          {!sequenceId && <p>loading</p>}
          {sequenceId && <FootNoteEditor {..._props} />}
        </div>
      );
    }
  );

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
    handlers: {
      onInlineGraftClick,
    },
    decorators: {},
    verbose,
    setFootNotes,
  };

  return (
    <div className='editor' style={style}>
      {!sequenceId && <p>loading</p>}
      {sequenceId && <HtmlPerfEditor {...props} />}
    </div>
  );
}
