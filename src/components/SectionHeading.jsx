import React, { useContext } from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';
import { AccordionSummary, Typography } from '@mui/material';
import { getTypeFromPerf } from '../core/getType';
import { AppContext } from '../hooks/App.context';

export default function SectionHeading({ sequenceId, content, show, index, ...props }) {
  const { state: { perfHtml } } = useContext(AppContext);

  const type = useDeepCompareMemo(() => {
    let _type = index && `Chapter ${index}`;
    _type ||= getTypeFromPerf({ perfHtml, sequenceId });
    _type &&= _type === "main" ? "Title & Introduction" : _type;
    return _type;
  }, [perfHtml, sequenceId]);

  const component = useDeepCompareMemo(() => (
    <AccordionSummary {...props}>
      <Typography className="sectionHeading" variant="h5">
        {type}
      </Typography>
    </AccordionSummary>
  ), [props, type]);

  return component;
};
