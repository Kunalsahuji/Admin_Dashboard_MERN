import React from "react";

const Header = () => {
    return (
        <header className="flex justify-between items-center bg-gray-700 p-4 text-white">
            <h1 className="font-semibold text-xl">E-Commerce Dashboard</h1>
            <button className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded">Logout</button>
        </header>
    );
};

export default Header;