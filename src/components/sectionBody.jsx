import React from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';
import useLifecycleLog from '../hooks/useLifecycleLog';

export default function SectionBody({ children, show, ...props }) {
  useLifecycleLog(SectionBody);
  
  const component = useDeepCompareMemo(() => {
    let _component = <></>;
    if (show) {
      _component = (
        <div className="sectionBody" {...props}>
        {children}
      </div>
      );
    };
    return _component;
  }, [show, props, children]);

  return component;
};