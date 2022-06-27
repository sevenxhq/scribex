import React, { useEffect } from 'react';
import useLifecycleLog from '../hooks/useLifecycleLog';

export default function Section({ children, index, show, dir, verbose, ...props }) {
  useLifecycleLog(Section, index);

  return (
    <div
    // TransitionProps={{ unmountOnExit: true }}
    // expanded={show}
    className={"section TESTSECTION" + dir}
    dir={dir}
    {...props}
  >
    {children}
  </div>
  );
};