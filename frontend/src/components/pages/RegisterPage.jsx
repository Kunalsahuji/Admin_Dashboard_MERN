import React, { useState, useContext } from "react";
import { AuthContext } from "../state/authContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await register(name, email, password);
        if (res) return navigate("/login");

    };

    return (
        <div className="flex justify-center items-center bg-gray-100 h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded w-96">
                <h2 className="mb-4 font-bold text-2xl">Register</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-gray-300 p-2 border rounded w-full"
                    />
                </div>
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
                <button className="bg-green-500 hover:bg-green-700 p-2 rounded w-full text-white">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
