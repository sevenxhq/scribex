import React, { useContext, useEffect } from 'react';
import { ScribexContext } from './ScribexContext';

export default function useLifecycleLog (component, key='') {
  const { state: { verbose } } = useContext(ScribexContext);
  const name = component.displayName || component.name;

  useEffect(() => {
    if (verbose) console.log(`${name}(${key}): Mount/First Render`);
    return (() => {
      if (verbose) console.log(`${name}(${key}): Unmount/Destroy`);
    });
  }, []);
};