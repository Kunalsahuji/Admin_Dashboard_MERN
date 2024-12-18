const express = require("express");
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.get("/", protect, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, updateOrderStatus);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
