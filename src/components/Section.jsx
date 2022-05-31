import React from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';
import { Accordion } from '@mui/material';

export default function Section({ children, index, show, dir, ...props }) {
  // console.log({section: index});
  const component = useDeepCompareMemo(() => (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      expanded={show}
      className={"section " + dir}
      dir={dir}
      {...props}
    >
      {children}
    </Accordion>
  ), [children, index, show, dir, props]);

  return component;
};