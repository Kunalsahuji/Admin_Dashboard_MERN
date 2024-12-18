const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const ErrorHandler = require('./utils/ErrorHandler');

// const authRoutes = require('./routes/authRoutes')
// const productRoutes = require('./routes/productRoutes')
// const orderRoutes = require('./routes/orderRoutes')
// const analyticsRoutes = require('./routes/analyticsRoutes')
dotenv.config();
connectDB();

const app = express();

// logger
const logger = require('morgan')
app.use(logger('tiny'))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


// body-parser 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// COOKIE-PARSER
const cookieParser = require('cookie-parser');
app.use(cookieParser())

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// error handling
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404))
})

// Generated Errors 
const { generatedErrors } = require('./middleware/error');
app.use(generatedErrors)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
