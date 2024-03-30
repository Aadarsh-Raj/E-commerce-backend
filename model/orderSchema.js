const mongoose = require("mongoose");

// const deliveryAddressSchema = new mongoose.Schema({
//     area:{
// type:String,
// require:false,
//     },
//     city:{
//         type:String,
//         require:false,
//     },
//     state:{
//         type:String,
//         require:false
//     },
//     state:{
//         type: String,
//         require: false
//     },
//     pincode:{
//         type: String,
//         require: false
//     }
// });

const cartedProduct = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
    },
    quantity: {
      type: Number,
      require: false,
    },
    color: {
      type: String,
      require: false,
    },
    price: {
      type: Number,
      require: true,
    },
  });

const cartSchema = new mongoose.Schema({
    products: {
        type: [cartedProduct],
      },
      cartTotal: {
        type: Number,
        require: true,
        default: 0,
      }
});

const orderSchema = new mongoose.Schema({
  cart: {
    type: [cartSchema],
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    require: false,
    default: null,
  },
  deliveryAddress: {
    type: String,
     require: true
  },
  orderPlacedAt: {
    type: Date,
    require: true,
  },
  deliveryDate: {
    type: Date,
    require: true,
  },
  orderStatus: {
    type: String,
    require: true,
  },
  modeOfPayment: {
    type: String,
    require: true,
  },
  transactionId: {
    type: String,
    require: false,
    default: "",
  },
});

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;
