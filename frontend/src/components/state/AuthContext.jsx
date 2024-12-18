import React, { createContext, useState } from "react";
import axiosInstance from "../../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch logged-in user data
    const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/auth/me"); 
            setUser(res.data.user);
            return res
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch user");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    const register = async (name, email, password) => {
        try {
            const res = await axiosInstance.post("/auth/register", { name, email, password });
            setUser(res.data.user);
            localStorage.setItem("adminDash", JSON.stringify(res.data.user));
            return res

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage);
            console.error("Registration Error:", err);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axiosInstance.post("/auth/login", { email, password });
            setUser(res.data.user);
            localStorage.setItem("adminDash", JSON.stringify(res.data.user));
            return res

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
            setError(errorMessage);
            console.error("Login Error:", err);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("adminDash");
    };

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
