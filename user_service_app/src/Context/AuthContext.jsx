import { createContext, useEffect, useState } from "react";
import {
    login as loginService,
    logout as logoutService,
    getToken,
    getCurrentUser,
} from "../Services/Auth.js";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = getToken();
        const storedUser = getCurrentUser();
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
        }
        setLoading(false);
    }, []);
    const login = async (email, password) => {
        const response = await loginService(email, password);
        setToken(response.token);
        setUser(response.user);
        return response;
    };

    const logout = () => {
        logoutService();
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
