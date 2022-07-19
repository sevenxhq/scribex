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

import _htmlPerf from './../data/tit-fra_fraLSG-perf.html.json';

const components = {
  sectionHeading: SectionHeading,
}

export default function EditorWrapper({ sequenceId }) {
  const {
    state: { perfHtml},
  } = useContext(AppContext);
  const [htmlPerf, setHtmlPerf] = useState(perfHtml);
  const [sequenceIds, setSequenceIds] = useState([htmlPerf.mainSequenceId]);
  const [sectionable, setSectionable] = useState(true);
  const [blockable, setBlockable] = useState(true);
  const [editable, setEditable] = useState(true);
  const [preview, setPreview] = useState(true);
  const [verbose, setVerbose] = useState(false);

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
    onContent,
  };

  const buttons = (
    <div className="buttons">
      <button style={(sectionable ? {borderStyle: 'inset'} : {})} onClick={onSectionable}>Sectionable</button>
      <button style={(blockable ? {borderStyle: 'inset'} : {})} onClick={onBlockable}>Blockable</button>
      <button style={(editable ? {borderStyle: 'inset'} : {})} onClick={onEditable}>Editable</button>
      <button style={(preview ? {borderStyle: 'inset'} : {})} onClick={onPreview}>Preview</button>
    </div>
  );

  return (
    <div >
      {buttons}
      <HtmlPerfEditor {...props} />
      {buttons}
    </div>
  );
};
