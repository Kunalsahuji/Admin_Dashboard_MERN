const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");

// Create a new product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const { name, category, price, stock, images } = req.body;

    const productExists = await Product.findOne({ name, category });
    if (productExists) {
        return next(new ErrorHandler("Product already exists in this category!", 409));
    }

    const product = new Product({ name, category, price, stock, images });
    await product.save();

    res.status(201).json({ success: true, product });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
    if (!products.length) {
        return next(new ErrorHandler("No products found!", 404));
    }

    res.status(200).json({ success: true, products });
});

// Get a single product
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
    }

    res.status(200).json({ success: true, product });
});

// Update a product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
    }

    res.status(200).json({ success: true, product });
});

// Delete a product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
    }

    res.status(200).json({ success: true, message: "Product deleted successfully!" });
});
