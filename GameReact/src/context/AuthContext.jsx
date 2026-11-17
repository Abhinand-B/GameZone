import { createContext, useContext, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("accessToken");
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");

        if (token) {
            return {
                username,
                role
            };
        }

        return null;
    });

    const login = (token, role, username) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);

        setUser({
            username,
            role
        });
    };

    const logout = async () => {

        try {
            await api.post("/user/logout");
        }
        catch (error) {
            console.log("Logout request failed:", error);
        }
        finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("role");
            localStorage.removeItem("username");

            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);