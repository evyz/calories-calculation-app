import React, { createContext } from "react";
import UserStore from "./UserStore";
import NewsStore from "./NewsStore";
import AdminStore from "./AdminStore";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        user: new UserStore(),
        newsStore: new NewsStore(),
        admin: new AdminStore(),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
