const Order = require("../models/Order");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");

// Get sales trends
exports.getSalesTrends = catchAsyncErrors(async (req, res, next) => {
    const salesData = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalSales: { $sum: "$totalAmount" },
                orders: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } }, // Sort by date
    ]);

    if (!salesData || salesData.length === 0) {
        return next(new ErrorHandler("No sales data available!", 404));
    }

    res.status(200).json({ success: true, salesData });
});

// Get top-selling products
exports.getTopProducts = catchAsyncErrors(async (req, res, next) => {
    const topProducts = await Order.aggregate([
        { $unwind: "$items" }, // Decompose the items array
        {
            $group: {
                _id: "$items.productId",
                totalQuantity: { $sum: "$items.quantity" },
            },
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 5 }, // Top 5 products
    ]);

    if (!topProducts || topProducts.length === 0) {
        return next(new ErrorHandler("No top-selling products found!", 404));
    }

    res.status(200).json({ success: true, topProducts });
});

// Get revenue metrics
exports.getRevenueMetrics = catchAsyncErrors(async (req, res, next) => {
    const revenueData = await Order.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);

    if (!revenueData || revenueData.length === 0) {
        return next(new ErrorHandler("No revenue data available!", 404));
    }

    res.status(200).json({ success: true, totalRevenue: revenueData[0].totalRevenue });
});

// Get low-stock alerts
exports.getLowStockAlerts = catchAsyncErrors(async (req, res, next) => {
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } });

    if (!lowStockProducts || lowStockProducts.length === 0) {
        return next(new ErrorHandler("No low-stock products found!", 404));
    }

    res.status(200).json({ success: true, lowStockProducts });
});
