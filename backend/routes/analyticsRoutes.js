const express = require("express");
const {
    getSalesTrends,
    getTopProducts,
    getRevenueMetrics,
    getLowStockAlerts,
} = require("../controllers/analyticsController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/sales-trends", protect, authorize("Admin"), getSalesTrends);
router.get("/top-products", protect, authorize("Admin"), getTopProducts);
router.get("/revenue", protect, authorize("Admin"), getRevenueMetrics);
router.get("/low-stock", protect, authorize("Admin", "Manager"), getLowStockAlerts);

module.exports = router;
