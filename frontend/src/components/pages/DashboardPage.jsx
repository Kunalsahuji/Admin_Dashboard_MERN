import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import Header from "../Dashboard/Header";
import { Routes, Route } from "react-router-dom";
import Analytics from "../Dashboard/Analytics";
import ProductManagement from "../Dashboard/ProductManagement";
import OrderProcessing from "../Dashboard/OrderProcessing";

const DashboardPage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <div className="p-6">
                    <Routes>
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/products" element={<ProductManagement />} />
                        <Route path="/orders" element={<OrderProcessing />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
