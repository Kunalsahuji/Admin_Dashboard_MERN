import React, { useEffect, useContext } from "react";
import { ProductContext } from "../state/productContext";

const ProductManagement = () => {
    const { products, fetchProducts, error, loading } = useContext(ProductContext);

    useEffect(() => {
        fetchProducts(); // Fetch products when the component mounts
    }, []);

    if (loading) {
        return <p className="text-blue-500">Loading products...</p>; // Show a loading message
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>; // Show an error message
    }

    if (products.length === 0) {
        return <p className="text-gray-500">No products found.</p>; // Handle case with no products
    }

    return (
        <div className="p-6">
            <h1 className="mb-4 font-bold text-2xl">Product Management</h1>
            <ul className="space-y-4 bg-white shadow p-4 rounded">
                {products.map((product) => (
                    <li key={product._id} className="shadow-md p-4 border rounded">
                        <h2 className="font-semibold text-lg">{product.title}</h2>
                        <p>Price: ${product.price}</p>
                        <p className="text-gray-600 text-sm">Stock: {product.stock}</p>
                        <p className="text-gray-700">{product.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
