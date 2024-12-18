import { createContext, useContext, useState } from "react";
import axiosInstance from "../../api/axios";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/orders");
            if (response && response.data) {
                setOrders(response.data.orders || []); // Fallback to empty array
            } else {
                console.error("API response missing 'data' or 'orders' property");
            }
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, fetchOrders, loading }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => useContext(OrderContext);
