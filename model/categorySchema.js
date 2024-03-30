const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: [],
    require: true,
    default: [],
  },
  brandName: {
    type: [],
    require: true,
    default: [],
  },
  getCategoryId: {
    type: String,
    require: true,
    unique: true,
    default: process.env.CATEGORY_ID,
    immutable: true,
  },
});

const CategoryModel = mongoose.model("categories", categorySchema);
module.exports = CategoryModel;
