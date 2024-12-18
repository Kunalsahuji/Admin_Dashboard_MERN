import React, { useEffect } from "react";
import { useOrderContext } from "../state/orderContext";

const OrderProcessing = () => {
    const { orders, fetchOrders, loading, error } = useOrderContext();

    useEffect(() => {
        fetchOrders(); // Fetch orders when the component mounts
    }, []);

    if (loading) return <p className="text-blue-500">Loading...</p>; // Show loading spinner

    if (error) return <p className="text-red-500">Error: {error}</p>; // Show error message

    if (!orders.length) return <p>No orders available.</p>; // Show message if there are no orders

    return (
        <div className="p-6">
            <h2 className="mb-4 font-bold text-2xl">Order Processing</h2>
            <ul className="space-y-4 bg-white shadow p-4 rounded">
                {orders.map((order) => (
                    <li
                        key={order._id}
                        className="flex justify-between py-2 border-b last:border-none"
                    >
                        <span className="font-semibold">Customer: {order.customerName}</span>
                        <span className="text-gray-600">Total: ${order.totalAmount}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderProcessing;
