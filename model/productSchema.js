const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
    default: "",
  },
  discount: {
    type: Number,
    require: true,
    default: 0,
  },
  color: {
    type: String,
    require: false,
    default: "",
  },
  stock: {
    type: Number,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    required: true,
  },
  reviews: {
    type: [
      {
        rating: Number,
        comment: String,
        userId: mongoose.Schema.Types.ObjectId,
      },
    ],
    default: [],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "users",
  },
  dislikes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "users",
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
