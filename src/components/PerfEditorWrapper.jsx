import { useCallback, useContext, useState, useMemo, useEffect, startTransition } from "react";
import { useDeepCompareCallback, useDeepCompareMemo } from "use-deep-compare";
import { PerfEditor } from "simple-text-editor-rcl";

import { AppContext } from "../hooks/App.context";
import { embedPreviewTextInGrafts } from "../core/nestPerf";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import SectionBody from "./sectionBody";
import Block from "./Block";
import { getTypeFromSequenceHtml } from "../core/getType";

export default function PerfEditorWrapper({ sequenceId }) {
  const [sectionIndices, setSectionIndices] = useState({});

  useEffect(() => {
    console.log("PerfEditorWrapper Render", sequenceId);
  }, []);

  const {
    state: { perfHtml, sectionable, blockable, editable, preview },
    actions: { addSequenceId, savePerfHtml },
  } = useContext(AppContext);

  const sequenceHtml = useDeepCompareMemo(() => (
    embedPreviewTextInGrafts({ perfHtml, sequenceId })
  ), [perfHtml, sequenceId]);

  const sequenceType = useMemo(() => getTypeFromSequenceHtml({ sequenceHtml }), [sequenceHtml]);

  const sectionIndex = useDeepCompareMemo(() => (
    sectionIndices[sequenceId] || 0
  ), [sectionIndices, sequenceId]);

  const onSectionClick = useDeepCompareCallback(({ content: _content, index }) => {
    let _sectionIndices = { ...sectionIndices };
    _sectionIndices[sequenceId] = index;
    setSectionIndices(_sectionIndices);
  }, [setSectionIndices, sectionIndices]);

  const onBlockClick = useCallback(({ content: _content, element }) => {
    const _sequenceId = element?.dataset?.target;
    if (_sequenceId) {
      addSequenceId(_sequenceId);
    };
  }, [addSequenceId]);

  let components = useDeepCompareMemo(() => ({
    section: Section,
    sectionHeading: (props) => SectionHeading({type: sequenceType, ...props}),
    sectionBody: SectionBody,
    block: Block,
  }), [sequenceType]);

  const onContentHandler = useCallback((_content) => {
    savePerfHtml({ sequenceId, sequenceHtml: _content });
  }, [sequenceId]);

  const props = useDeepCompareMemo(() => ({
    content: sequenceHtml,
    onContent: onContentHandler,
    components,
    options: {
      sectionable,
      blockable,
      editable,
      preview
    },
    handlers: {
      onSectionClick,
      onBlockClick
    },
    decorators: {},
    sectionIndex,
  }), [sequenceHtml, onContentHandler, components, sectionable, blockable, editable, preview, onSectionClick, onBlockClick, sectionIndex]);

  const perfEditorComponent = useDeepCompareMemo(() => (
    props.content ? <PerfEditor key={sequenceId} {...props} /> : <></>
  ), [props]);

  return <div className="PerfEditorWrapper" key={sequenceId}>{perfEditorComponent}</div>;
}
