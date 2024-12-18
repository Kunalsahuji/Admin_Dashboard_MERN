const Order = require("../models/Order");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");

// Create a new order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
    const { customerName, email, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
        return next(new ErrorHandler("Order must include at least one item!", 400));
    }

    const order = new Order({ customerName, email, items, totalAmount });
    await order.save();

    res.status(201).json({ success: true, order });
});

// Get all orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find().populate("items.productId");
    if (!orders.length) {
        return next(new ErrorHandler("No orders found!", 404));
    }

    res.status(200).json({ success: true, orders });
});

// Get a single order
exports.getOrderById = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("items.productId");
    if (!order) {
        return next(new ErrorHandler("Order not found!", 404));
    }

    res.status(200).json({ success: true, order });
});

// Update order status
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const { status } = req.body;

    if (!status) {
        return next(new ErrorHandler("Order status is required!", 400));
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
        return next(new ErrorHandler("Order not found!", 404));
    }

    res.status(200).json({ success: true, order });
});

// Delete an order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found!", 404));
    }

    res.status(200).json({ success: true, message: "Order deleted successfully!" });
});
