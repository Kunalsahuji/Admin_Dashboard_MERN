import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../../api/axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]); // Default to an empty array
    const [error, setError] = useState(null);    // For error handling
    const [loading, setLoading] = useState(false); // For loading state

    // Function to fetch products from the backend
    const fetchProducts = async () => {
        try {
            setLoading(true); // Start loading
            setError(null);   // Reset error state
            const response = await axiosInstance.get("/products");

            // Ensure the response contains products
            if (response?.data?.products) {
                setProducts(response.data.products);
            } else {
                setProducts([]);
                console.error("No 'products' key in API response");
            }
        } catch (err) {
            // Handle error and set an appropriate message
            const errorMessage = err.response?.data?.message || "Failed to fetch productsss.";
            setError(errorMessage);
            console.error("Error fetching products:", errorMessage);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, fetchProducts, error, loading }}>
            {children}
        </ProductContext.Provider>
    );
};
