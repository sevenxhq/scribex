import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from "@mui/material";
import { PerfEditor } from "simple-text-editor-rcl";

import { getTypeFromPerf } from "../core/getType";
import { embedPreviewTextInGrafts } from "../core/nestPerf";

export default function PerfEditorWrapper({
  state: { perfHtml, sectionable, blockable, editable, preview },
  actions: { addSequenceId, savePerfHtml },
  sequenceId,
  components: _components
}) {
  const sequenceHtml = embedPreviewTextInGrafts({ perfHtml, sequenceId });
  const [sectionIndices, setSectionIndices] = useState({});

  const sectionIndex = sectionIndices[sequenceId] || 0;

  const onContentHandler = (_content) => {
    let _perfHtml = { ...perfHtml };
    _perfHtml.sequencesHtml[sequenceId] = _content;
    savePerfHtml({ sequenceId, perfHtml: _perfHtml });
  };

  const onSectionClick = ({ content: _content, index }) => {
    let _sectionIndices = { ...sectionIndices };
    _sectionIndices[sequenceId] = index;
    setSectionIndices(_sectionIndices);
  };

  const onBlockClick = ({ content: _content, element }) => {
    const _sequenceId = element?.dataset?.target;
    if (_sequenceId) {
      addSequenceId(_sequenceId);
    }
  };

  let components = {
    section: ({ children, show, dir, ...props }) => (
      <Accordion
        expanded={show}
        className={"section " + dir}
        dir={dir}
        {...props}
      >
        {children}
      </Accordion>
    ),
    sectionHeading: ({ content, show, index, ...props }) => {
      let type = getTypeFromPerf({ perfHtml, sequenceId });
      type &&= type === "main" ? "Title & Introduction" : type;
      return (
        <AccordionSummary {...props}>
          <Typography className="sectionHeading" variant="h5">
            {index ? `Chapter ${index}` : type}
          </Typography>
        </AccordionSummary>
      );
    },
    sectionBody: ({ children, ...props }) => (
      <AccordionDetails className="sectionBody" {...props}>
        {children}
      </AccordionDetails>
    ),
    ..._components
  };

  const props = {
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
    sectionIndex
  };

  const perfEditorComponent = (sequenceHtml && <PerfEditor {...props} />) || (
    <></>
  );

  return <div className="PerfEditorWrapper">{perfEditorComponent}</div>;
}
