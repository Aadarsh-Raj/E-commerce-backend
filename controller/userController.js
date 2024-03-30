const UserModel = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// create user
const createUser = async (req, res) => {
  const user = await UserModel.findOne({ userId: req.body.email });
  if (user) {
    return res.json({
      success: false,
      message: "Already have an account",
    });
  }
  try {
    console.log(req.body.password);
    const newUser = new UserModel({
      ...req.body,
      userId: req.body.email,
    });
    await newUser.save();
    res.json({
      success: true,
      message: "User successfully registered",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "try again",
    });
    console.log(error);
  }
};

// login user
const getUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ userId: req.body.email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid User or password",
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (isPasswordCorrect) {
      // genearated payload for token
      const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 10000;
      const payload = {
        id: user._id,
        name: user.name,
        role: user.role,
        exp: expiryDateTime,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      return res.json({
        success: true,
        message: "logged in successfully",
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "User or Password not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (req.user._id.equals(user._id)) {
      // change the data of the user from body
      await UserModel.updateMany(
        {
          _id: req.user._id,
        },
        { $set: { ...req.body } }
      );
      await user.save();
      return res.json({
        success: true,
        message: "Updated User successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "You are not allowed to edit the others user",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// delete
const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    if (req.user._id.equals(user._id)) {
      await UserModel.findByIdAndDelete(req.params.userId);
      return res.json({
        success: true,
        message: "User deleted",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// for forgotten or update password
const updatePassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await UserModel.findOne({ userId: email });
    if (!req.user._id.equals(user._id)) {
      return res.json({
        success: false,
        message: "You are not allowed to edit other's data",
      });
    }

    if (user) {
      user.password = password;
      await user.save();
      res.json({
        success: true,
        message: "Password updated",
      });
    } else {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
// add to wishlist
const addToWishlist = async (req, res)=>{
try {
  const user = await UserModel.findById(req.user._id);
  if(!user){
    return res.json({
      success: false,
      message: "User not found"
    })
  }
  if(!user.wishlist){
    const addProduct = {
      wishlist:[{product: req.body.productId}]
    }
    await UserModel.findByIdAndUpdate(req.user._id, addProduct);
    
  }else{
    const product = user.wishlist.find(item => item.product.toString() == req.body.productId);
    if(product){
      return res.json({
        success: false,
        message: "Product already exist in wishlist"
      })
    };
    const addProduct = {
      $push:{
        "wishlist":{product:req.body.productId}
      }
    }
    await UserModel.findByIdAndUpdate(req.user._id, addProduct);
  }

res.json({
  success: true,
  message: "Added to wishlist"
})
} catch (error) {
  console.log(error);
  res.json({
    success: false,
    message: "Something went wrong"
  })
}
}
// remove from wishlist
const removeFromWishlist = async (req, res)=>{
try {
  
} catch (error) {
  console.log(error);
  res.json({
    success: false,
    message: "Something went wrong"
  })
}
}
// logout
const logout = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    user.validToken = null;
    await user.save();
    res.json({
      success: true,
      message: "Logged Out successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
  addToWishlist,
  removeFromWishlist,
  logout,
};
