const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    couponCode: {
        type: String,
        required: true,
        unique: true,
      },
      discountPercentage: {
        type: Number,
        required: true,
        default: 0
      },
      maxDiscountInRs: {
        type: Number,
        required: true,
        default: 0
      },
      startDate: {
        type: Date,
        required: true,
        format: '%Y-%m-%d'
      },
      endDate: {
        type: Date,
        required: true,
        format: '%Y-%m-%d'
      },
      isActive: {
        type: Boolean,
        required: true,
        default: false,
      },
});

const CouponModel = mongoose.model("coupons", couponSchema);

module.exports = CouponModel;