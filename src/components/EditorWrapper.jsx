import { useCallback, useContext, useState, useMemo, useEffect, startTransition } from "react";
import { useDeepCompareCallback, useDeepCompareMemo } from "use-deep-compare";
import { HtmlPerfEditor } from "@xelah/type-perf-html";

import useLifecycleLog from "../hooks/useLifecycleLog";
import { AppContext } from "../hooks/App.context";
import { embedPreviewTextInGrafts } from "../core/nestPerf";
import { getTypeFromSequenceHtml } from "../core/getType";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import SectionBody from "./sectionBody";
import Block from "./Block";

const components = {
  sectionHeading: SectionHeading,
}

export default function EditorWrapper({ sequenceId }) {
  const {
    state: { perfHtml, sectionable, blockable, editable, preview, verbose },
    actions: {savePerfHtml,setVerbose,setPreview ,setBlockable,setSectionable,setEditable,setContent},
  } = useContext(AppContext);
  const [htmlPerf, setHtmlPerf] = useState(perfHtml);
  const [sequenceIds, setSequenceIds] = useState([htmlPerf.mainSequenceId]);


  const onSectionable = () => { setSectionable(!sectionable); };
  const onBlockable = () => { setBlockable(!blockable); };
  const onEditable = () => { setEditable(!editable); };
  const onPreview = () => { setPreview(!preview); };
  const addSequenceId = (sequenceId) => {
    setSequenceIds( _sequenceIds => [...sequenceIds, sequenceId]);
  };

  const onContent = (_content) => {
    console.log('content changed!');
    setContent(_content);
  };

  const options = { sectionable, blockable, editable, preview, verbose };

  const props = {
    sequenceIds,
    addSequenceId,
    htmlPerf,
    onHtmlPerf: setHtmlPerf,
    components,
    options,
  };
  return (
    <div >
      <HtmlPerfEditor {...props} />
    </div>
  );
};
