import { useContext } from "react";
// import { Skeleton, Stack } from "@mui/material";

import { AppContext } from "../hooks/App.context";
import useLifecycleLog from "../hooks/useLifecycleLog";

import Section from "./Section";
import SectionHeading from "./SectionHeading";
import SectionBody from "./sectionBody";
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
    actions: { addSequenceId, saveHtmlPerf },
  } = useContext(AppContext);
  const sequenceId = sequenceIds.at(-1);

  useLifecycleLog(Editor);
  const style = (isSaving || isLoading || !sequenceId) ? { cursor: 'progress' } : {};

  const props = {
    htmlPerf: htmlPerf,
    onHtmlPerf: saveHtmlPerf,
    sequenceIds,
    addSequenceId,
    components: {
      section: Section,
      sectionHeading: SectionHeading,
      sectionBody: SectionBody,
    },
    options: {
      sectionable,
      blockable,
      editable,
      preview
    },
    // handlers: {
    //   onSectionClick,
    //   onBlockClick
    // },
    decorators: {},
    verbose,
  };


  return (
    <div className="editor" style={style}>
      {!sequenceId && <p>loading</p> }
      {sequenceId && <HtmlPerfEditor {...props} /> }
    </div>
  );
};
