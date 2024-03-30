const mongoose = require("mongoose");

const cartedProduct = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  color: {
    type: String,
    require: false
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
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
});

const CartModel = mongoose.model("carts", cartSchema);
module.exports = CartModel;
