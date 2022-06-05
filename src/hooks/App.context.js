import React from 'react';
import useApplicationState from './useApplicationState';

export const AppContext = React.createContext();

export function AppContextProvider({ children, ...props }) {
  const {
    state,
    actions,
  } = useApplicationState({...props});

  const value = {
    state,
    actions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
