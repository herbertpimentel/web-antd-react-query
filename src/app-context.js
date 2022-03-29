// https://www.pluralsight.com/guides/using-react's-context-api-with-typescript

import React, { useState, useContext, createContext } from 'react';

import { SESSION_TOKEN_KEY } from './constants';

export const AppContext = createContext({
  user: null,
  setUser: (data) => null,
  setToken: (data) => null,
  clear: () => null,
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [_, setTokenData] = useState(
    sessionStorage.getItem(SESSION_TOKEN_KEY) || null
  );

  const [user, setUserData] = useState(
    JSON.parse(sessionStorage.getItem('@@user') || null)
  );

  const setToken = (data) => {
    sessionStorage.setItem(SESSION_TOKEN_KEY, data);
    setTokenData(data);
  };

  const setUser = (data) => {
    sessionStorage.setItem('@@user', JSON.stringify(data));
    setUserData(data);
  };

  const clear = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        clear,
        user,
        setUser,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
