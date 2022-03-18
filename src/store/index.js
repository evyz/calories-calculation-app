import React, { createContext } from 'react';
import UserStore from './UserStore';
import NewsStore from './NewsStore';

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
    return (
        <AppContext.Provider value={{
            user: new UserStore(),
            newsStore: new NewsStore()
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;