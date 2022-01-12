import React, { useContext, useReducer } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            console.log('Adding user')
            localStorage.setItem("user", JSON.stringify(action.user));
            return action.user
        case 'DELETE_USER':
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            return null;
        default:
            return state;
    }
}

export default function AuthContextProvider({ children }) {
    const [user, dispatch] = useReducer(userReducer, {}, () => {
        let localUser = localStorage.getItem('user');
        return localUser ? JSON.parse(localUser) : null;
    })

    const logout = () => {
        dispatch({ type: "DELETE_USER" });
    }

    const value = {
        user: user,
        dispatch: dispatch,
        logout: logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
