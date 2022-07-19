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

export default function PerfEditorWrapper({ sequenceId }) {
  const [sectionIndices, setSectionIndices] = useState({});

  useLifecycleLog(PerfEditorWrapper, sequenceId);

  const {
    state: { perfHtml, sectionable, blockable, editable, preview, verbose },
    actions: { addSequenceId, savePerfHtml },
  } = useContext(AppContext);
console.log('pergHtnl',perfHtml);

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

  const onContentHandler = useCallback((_content) => {
    if (sequenceHtml !== _content) {
      savePerfHtml({ sequenceId, sequenceHtml: _content });
    };
  }, [sequenceId]);

  const handleClick = (event) => {
    event.target.focus();
    console.log('Click happened, and attempt to focus on:', event.target);
  };

  const props = {
    htmlperf: perfHtml,
    onContent: onContentHandler,
    components: {
      section: Section,
      sectionHeading: (props) => SectionHeading({type: sequenceType, ...props}),
      sectionBody: SectionBody,
      block: Block,
    },
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
    verbose,
  };

  return (
    <div className="perf-editor-wrapper" key={sequenceId}>
      <HtmlPerfEditor key={sequenceId} {...props} />
    </div>
  );
};
