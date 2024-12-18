const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Processing", "Shipped", "Delivered"], default: "Processing" },
    orderDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
