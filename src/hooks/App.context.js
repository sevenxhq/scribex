import React from 'react';
import useApplicationState from './useApplicationState';

export const AppContext = React.createContext();

export function AppContextProvider({ children }) {
  const {
    state,
    actions,
  } = useApplicationState();

  const value = {
    state,
    actions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
