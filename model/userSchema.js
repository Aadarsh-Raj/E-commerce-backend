const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const wishlistSchema = new mongoose.Schema({
  product:{
    type:mongoose.Schema.Types.ObjectId
  }
})
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: false,
    default: "",
  },
  address: {
    type: String,
    require: false,
    default: "",
  },
  phoneNumber: {
    type: String,
    require: false,
    default: "",
  },
  validToken:{
    type: String,
    require: false,
    default: null
  },
  wishlist:{
    type: [wishlistSchema],
    require: false,
    default:[]
  }
});

userSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;