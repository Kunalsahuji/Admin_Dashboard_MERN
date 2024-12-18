import React, { useState, useContext } from "react";
import { AuthContext } from "../state/authContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(email, password);
        if (res) navigate("/dashboard");

    };

    return (
        <div className="flex justify-center items-center bg-gray-100 h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded w-96">
                <h2 className="mb-4 font-bold text-2xl">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-gray-300 p-2 border rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-gray-300 p-2 border rounded w-full"
                    />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 p-2 rounded w-full text-white">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;