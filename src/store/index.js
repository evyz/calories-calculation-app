import React, { createContext } from 'react';
import UserStore from './UserStore';

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
    return (
        <AppContext.Provider value={{
            user: new UserStore()
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;