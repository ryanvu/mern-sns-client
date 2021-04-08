import React, { useContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
    //if expired delete
    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken')
    } else {
        //if not expired set user to this token
        initialState.user = decodedToken;
    }
}
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        default: 
        return state;
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (loginInput) => {
            localStorage.setItem("jwtToken", loginInput.token)
        dispatch({
            type: 'LOGIN',
            payload: loginInput
        })
    }

    const logout = () => {
            localStorage.removeItem("jwtToken");
        dispatch({
            type: 'LOGOUT'
        })
    }

    const value = {
        user: state.user, 
        login, 
        logout 
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}