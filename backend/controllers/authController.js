const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");

const { sendToken } = require("../utils/sendToken");

// User registration
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const {name, email, password, role } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        next(new ErrorHandler("User Already Register with this email address!", 409))
    }
    const user = await User.create({name, email, password, role })
    await user.save()
    sendToken(user, 201, res)
})

// User login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provide both email and password!", 400));
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("User Not Found with this email address!", 404))
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return next(new ErrorHandler("Wrong Credentials", 401))
    }

    sendToken(user, 200, res)
})

// Get current user
exports.getCurrentUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return next(new ErrorHandler("User Not Found!", 404))
    res.status(200).json({ success: true, user });
})


// user-logout
module.exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({ message: "User Successfully logged out!" })
})