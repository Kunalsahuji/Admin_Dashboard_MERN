// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Authentication middleware
// exports.protect = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) return res.status(401).json({ success: false, message: "No token provided" });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.id);

//         if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });

//         next();
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Role-based authorization
// exports.authorize = (...roles) => (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//         return res.status(403).json({ success: false, message: "Access forbidden" });
//     }
//     next();
// };

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorHandler = require('../utils/ErrorHandler');
const { catchAsyncErrors } = require('./catchAsyncErrors');

exports.protect = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access the resource!", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new ErrorHandler("Invalid or expired token", 400));
    }
    req.user = user;
    next();
});

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ErrorHandler("Not authenticated", 401));
        }
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Access Denied: Role '${req.user.role}' is not authorized to access this resource.`,
                    403
                )
            );
        }
        next();
    };
};


