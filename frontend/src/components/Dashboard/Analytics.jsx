import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const Analytics = () => {
    const [salesData, setSalesData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        const fetchAnalytics = async () => {
            const res1 = await axiosInstance.get("/analytics/sales-trends");
            const res2 = await axiosInstance.get("/analytics/top-products");
            const res3 = await axiosInstance.get("/analytics/revenue-metrics");

            setSalesData(res1.data.salesData);
            setTopProducts(res2.data.topProducts);
            setRevenue(res3.data.totalRevenue);
        };

        fetchAnalytics();
    }, []);

    return (
        <div className="p-6">
            <h2 className="mb-4 font-bold text-2xl">Sales Analytics</h2>
            <div className="gap-6 grid grid-cols-3">
                <div className="bg-white shadow p-4 rounded">
                    <h3 className="font-semibold">Total Revenue</h3>
                    <p className="text-xl">${revenue}</p>
                </div>
                <div className="col-span-2 bg-white shadow p-4 rounded">
                    <h3 className="font-semibold">Sales Trends</h3>
                    <ul>
                        {salesData.map((data, index) => (
                            <li key={index}>
                                {data._id}: ${data.totalSales} (Orders: {data.orders})
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="bg-white shadow mt-6 p-4 rounded">
                <h3 className="font-semibold">Top Products</h3>
                <ul>
                    {topProducts.map((product, index) => (
                        <li key={index}>
                            Product ID: {product._id}, Quantity Sold: {product.totalQuantity}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Analytics;
