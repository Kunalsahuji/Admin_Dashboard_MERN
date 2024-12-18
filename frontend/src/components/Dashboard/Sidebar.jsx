import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="flex flex-col bg-gray-800 p-4 w-64 h-screen text-white">
            <h1 className="mb-6 font-bold text-2xl">Admin Dashboard</h1>
            <nav className="flex flex-col gap-4">
                <Link to="/analytics" className="hover:text-gray-400">Analytics</Link>
                <Link to="/products" className="hover:text-gray-400">Product Management</Link>
                <Link to="/orders" className="hover:text-gray-400">Order Processing</Link>
            </nav>
        </div>
    );
};

export default Sidebar;