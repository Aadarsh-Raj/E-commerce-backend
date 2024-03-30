const express = require("express");
const authMiddleware = require("../middleware/auth");
const couponController = require("../controller/couponController");
const router = express.Router();

// create coupon
router.post("/create", authMiddleware(["admin"]),couponController.createCoupon);

// get coupon 
router.get("/", couponController.getCoupon)

// update coupon
router.patch("/:couponCode",authMiddleware(["admin"]), couponController.updateCoupon);

// delete coupon
router.delete("/delete/:couponCode",authMiddleware(["admin"]), couponController.deleteCoupon);

module.exports = router;