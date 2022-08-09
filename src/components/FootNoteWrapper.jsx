import { useCallback, useContext } from "react";
// import { Skeleton, Stack } from "@mui/material";

import { AppContext } from "../hooks/App.context";
import useLifecycleLog from "../hooks/useLifecycleLog";

import {  FootNoteEditor } from "@xelah/type-perf-html";

export default function FootNoteWrapper({ fNoteSequenceId,setFootNotes }) {
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
  const sequenceId = fNoteSequenceId;
  useLifecycleLog(FootNoteWrapper);
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
      let fNoteObj = {};
      fNoteObj[sequenceId]=htmlPerf.sequencesHtml[sequenceId]
      // htmlPerf.sequencesHtml = fNoteObj;
      console.log("onInlineGraftClick", sequenceId,htmlPerf);
      const _props = {
        sequenceIds: [...sequenceIds, sequenceId],
        htmlPerf,
        onHtmlPerf,
        options,
        _components,
        handlers,
      };
      // addSequenceId(sequenceId)
      // return (
        
        
      //     <HtmlPerfEditor {..._props} />
       
      // );
    }
  );


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
      {sequenceId && <FootNoteEditor {...props} />}
    </div>
  );
}
