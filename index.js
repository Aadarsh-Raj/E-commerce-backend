const express = require("express");
const mongoose = require("mongoose");
const server = express();
const PORT = 3000;
const dotenv = require("dotenv");
const userRoute = require("./route/userRoute.js");
const productRoute = require("./route/productRoute.js");
const otpVerificationRoute = require("./route/otpVerificationRoute.js")
const middleware = require("./middleware/auth.js");
const couponRoute = require("./route/couponRoute.js");
const cartRoute= require("./route/cartRoute.js");
const orderRoute = require("./route/orderRoute.js");
const morgan = require("morgan");

dotenv.config();
server.use(express.json());
// connected database
mongoose
  .connect(process.env.MONGO_URL_KEY)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((e) => {
    console.log(e);
  });
// using middleware
server.use(morgan("dev"));

// adding route for user

server.use("/api/user", userRoute);

// adding route for product and category
server.use("/api/products", productRoute);

// adding route for coupon
server.use("/api/coupon",couponRoute);

// adding route for cart
server.use("/api/cart", cartRoute);

// adding route for orders and payment
server.use("/api/order", orderRoute);



// verify otp through this route
server.use("/api/otpVerification",middleware(["admin", "seller", "buyer"]),otpVerificationRoute);

server.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


// wishlist --> blog api