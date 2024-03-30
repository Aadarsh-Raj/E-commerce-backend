const express = require('express');
const authMiddleware = require('../middleware/auth');
const orderController = require("../controller/orderController");
const router = express.Router();

// create order
router.post("/create", authMiddleware(["buyer"]),orderController.createOrder);

// get all orders
router.get("/", authMiddleware(["buyer"]), orderController.getAllOrder);
// get particular order
router.get("/:orderId", authMiddleware("buyer"),orderController.getParticularOrder);

module.exports = router;


// get products from the carted items then apply coupon then order it