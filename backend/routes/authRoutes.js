const express = require("express");
const { registerUser, loginUser, getCurrentUser, logoutUser } =
    require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.get('/logout', protect, logoutUser)

module.exports = router;
