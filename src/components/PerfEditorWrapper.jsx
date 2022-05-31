import { useCallback, useContext, useState } from "react";
import { useDeepCompareCallback, useDeepCompareMemo } from "use-deep-compare";
import { PerfEditor } from "simple-text-editor-rcl";

import { AppContext } from "../hooks/App.context";
import { embedPreviewTextInGrafts } from "../core/nestPerf";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import SectionBody from "./sectionBody";
import Block from "./Block";

export default function PerfEditorWrapper({ sequenceId }) {
  const [sectionIndices, setSectionIndices] = useState({});

  const {
    state: { perfHtml, sectionable, blockable, editable, preview },
    actions: { addSequenceId, savePerfHtml },
  } = useContext(AppContext);

  console.log("PerfEditorWrapper Render", sequenceId);

  const sequenceHtml = useDeepCompareMemo(() => (
    embedPreviewTextInGrafts({ perfHtml, sequenceId })
  ), [perfHtml, sequenceId]);

  const sectionIndex = useDeepCompareMemo(() => (
    sectionIndices[sequenceId] || 0
  ), [sectionIndices, sequenceId]);

  const onContentHandler = useDeepCompareCallback((_content) => {
    let _perfHtml = { ...perfHtml };
    _perfHtml.sequencesHtml[sequenceId] = _content;
    savePerfHtml({ sequenceId, perfHtml: _perfHtml });
  }, [perfHtml, sequenceId, savePerfHtml]);

  const onSectionClick = useDeepCompareCallback(({ content: _content, index }) => {
    let _sectionIndices = { ...sectionIndices };
    _sectionIndices[sequenceId] = index;
    setSectionIndices(_sectionIndices);
  }, [setSectionIndices, sectionIndices]);

  const onBlockClick = useCallback(({ content: _content, element }) => {
    const _sequenceId = element?.dataset?.target;
    if (_sequenceId) {
      addSequenceId(_sequenceId);
    }
  }, [addSequenceId]);

  let components = useDeepCompareMemo(() => ({
    section: Section,
    sectionHeading: (props) => SectionHeading({sequenceId, ...props}),
    sectionBody: SectionBody,
    block: Block,
  }), [perfHtml, sequenceId]);

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
    decorators: {
      header: [
        /\\([sr])((\n|.|$)+?)(?=\\[cspvr]|$)/g,
        "<div class='block heading $1'>$2</div>"
      ]
    },
    sectionIndex,
  }), [sequenceHtml, onContentHandler, components, sectionable, blockable, editable, preview, onSectionClick, onBlockClick, sectionIndex]);

  const perfEditorComponent = useDeepCompareMemo(() => (
    sequenceHtml ? <PerfEditor {...props} /> : <></>
  ), [sequenceHtml, props]);

  return <div className="PerfEditorWrapper">{perfEditorComponent}</div>;
}
