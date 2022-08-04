import { useContext } from "react";
// import { Skeleton, Stack } from "@mui/material";

import { AppContext } from "../hooks/App.context";
import useLifecycleLog from "../hooks/useLifecycleLog";

import { HtmlPerfEditor } from "@xelah/type-perf-html";

export default function FootNoteEditor({ setFootNotes, savedFootNote }) {
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
  // const sequenceId = sequenceIds.at(-1);

  useLifecycleLog(FootNoteEditor);
  const style =
    isSaving || isLoading || !sequenceId ? { cursor: "progress" } : {};

  if (htmlPerf) {
    const sequences = htmlPerf.sequencesHtml;
    let footNoteArr = [];
    for (const [sequenceId, sequenceHtml] of Object.entries(sequences)) {
      if (!!sequenceHtml.match(/data-type="footnote"/))
        footNoteArr.push([sequenceId, sequenceHtml]);
    }
    const footNoteSequences = Object.fromEntries(footNoteArr);
    console.log({ footNoteSequences });
    htmlPerf.sequencesHtml = footNoteSequences
  }
  const sequenceId = sequenceIds.at(-1);
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
    // handlers: {
    //   onSectionClick,
    //   onBlockClick
    // },
    decorators: {},
    verbose,
    setFootNotes,
    savedFootNote,
  };

  return (
    <div className='editor' style={style}>
      {!sequenceId && <p>loading</p>}
      {sequenceId && <HtmlPerfEditor {...props} />}
    </div>
  );
}
