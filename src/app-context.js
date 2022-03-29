// https://www.pluralsight.com/guides/using-react's-context-api-with-typescript

import React, { useState, useContext, createContext } from 'react';

export const AppContext = createContext({
  user: null,
  setUser: (user) => null,
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [user, setUserData] = useState(
    JSON.parse(sessionStorage.getItem('@@user') || null)
  );

  const setUser = (data) => {
    sessionStorage.setItem('@@user', JSON.stringify(data));
    setUserData(data);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
