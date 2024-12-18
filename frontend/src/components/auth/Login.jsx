import React, { useState, useContext } from "react";
import { AuthContext } from "../../components/state/authContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded w-96">
                <h2 className="mb-4 font-bold text-2xl">Login</h2>
                {error && <p className="mb-4 text-red-500">{error}</p>}
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

export default Login;
