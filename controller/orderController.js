const CartModel = require("../model/cartSchema");
const CouponModel = require("../model/couponSchema");
const dayjs = require("dayjs");
const dotenv = require("dotenv");
const OrderModel = require("../model/orderSchema");
const Razorpay = require("razorpay");
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    // get data from cart if exist
    const cart = await CartModel.findOne({ userId: req.user._id });
    if (!cart) {
      return res.json({
        success: false,
        message: "Please add items to cart first",
      });
    }
    // find and validate coupon then apply coupon
    const coupon = await CouponModel.findOne({
      couponCode: req.body.couponCode,
    });
    if (!coupon) {
      return res.json({
        success: false,
        message: "Invalid coupon code",
      });
    }
    if (!coupon.isActive) {
      return res.json({
        success: false,
        message: "Coupon expired",
      });
    }
    const couponStartDate = dayjs(coupon.startDate);
    couponEndDate = dayjs(coupon.endDate);
    const currentDateTime = dayjs();
    if (
      currentDateTime.isBefore(couponStartDate) ||
      currentDateTime.isAfter(couponEndDate)
    ) {
      return res.json({
        success: false,
        message: "Coupon Expired",
      });
    }
    let couponDiscountInRs = (
      (cart.cartTotal / 100) *
      coupon.discountPercentage
    ).toFixed(2);

    if (couponDiscountInRs > coupon.maxDiscountInRs) {
      couponDiscountInRs = coupon.maxDiscountInRs;
    }

    let amount = (cart.cartTotal - couponDiscountInRs).toFixed(2);

    if (amount < 0) {
      amount = 0;
    }

    // get delivery address
    let deliveryAddress = req.body.deliveryAddress;
    if (!deliveryAddress) {
      deliveryAddress = req.user.address;
    }
    //  add order
    // required couponCode, modeOfPayment, deliveryDate from req.body
    const orderDetails = {
      cart: cart,
      userId: req.user._id,
      amount,
      coupon: coupon._id,
      deliveryAddress,
      orderPlacedAt: currentDateTime,
      deliveryDate: req.body.deliveryDate,
      orderStatus: "Placed",
      modeOfPayment: req.body.modeOfPayment,
    };
    const newOrder = await OrderModel.create(orderDetails);
    let paymentGatewayResponse;
    if (req.body.modeOfPayment === "COD") {
      // Don't generate transaction ID and don't redirect to payment gateway
      res.json({
        success: true,
        message: "Order Placed",
        orderId: newOrder._id,
        paymentInformation: {
          amount: amount,
        },
      });
    } else {
      const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: newOrder._id,
        payment_capture: 1,
      };
      // redirect to payment gateway
      try {
        paymentGatewayResponse = await razorpay.orders.create(options);

        // await razorpay.orders.
        // Redirect the user to the Razorpay payment page
        res.json({
          success: true,
          message: "Order Placed",
          orderId: newOrder._id,
          paymentInformation: {
            transactionId: paymentGatewayResponse.id,
            paymentOfferId: paymentGatewayResponse.receipt,
            currency: paymentGatewayResponse.currency,
            amount: paymentGatewayResponse.amount_due,
          },
        });
      } catch (e) {
        return res.json({
          success: false,
          message: "Something went wrong (Payment rejected)",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// get all orders of user
const getAllOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.user._id });
    if (!orders) {
      return res.json({
        success: false,
        message: "No orders found",
      });
    }

    res.json({
      success: true,
      message: "Orders found",
      result: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// get particular order
const getParticularOrder = async (req, res) => {
  try {
    const orders = await OrderModel.findById(req.params.orderId);
    if (!orders) {
      return res.json({
        success: false,
        message: "No orders found",
      });
    }

    res.json({
      success: true,
      message: "Orders found",
      result: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
module.exports = {
  createOrder,
  getAllOrder,
  getParticularOrder,
};
