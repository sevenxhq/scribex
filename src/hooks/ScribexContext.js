import React from 'react';
import useScribexState from './useScribexState';

export const ScribexContext = React.createContext();

export function ScribexContextProvider({ children }) {
  const {
    state,
    actions,
  } = useScribexState();

  const value = {
    state,
    actions,
  };

  return <ScribexContext.Provider value={value}>{children}</ScribexContext.Provider>;
};
