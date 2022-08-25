import React from 'react';
import useScribexState from './useScribexState';

export const ScribexContext = React.createContext();

export function ScribexContextProvider({ children, ...props }) {
  const {
    state,
    actions,
  } = useScribexState({...props});

  const value = {
    state,
    actions,
  };

  return <ScribexContext.Provider value={value}>{children}</ScribexContext.Provider>;
};
