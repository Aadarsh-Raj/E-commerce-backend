const CartModel = require("../model/cartSchema");
const ProductModel = require("../model/productSchema");

// created cart
const createCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userId: req.user._id });

    if (cart) {
      // have to update the cart
      let cartTotal = 0;
      const productToAdd = [];
      for (let i = 0; i < req.body.products.length; i++) {
        const currentProduct = req.body.products[i];
        const { price } = await ProductModel.findById(
          currentProduct.productId,
          {
            price: 1,
            _id: 0,
          }
        );

        const product = {
          ...currentProduct,
          price,
        };
        productToAdd.push(product);
        const priceForProduct = currentProduct.quantity * price;
        cartTotal += priceForProduct;
      }
      await CartModel.updateOne(
        { userId: req.user._id },
        { $set: { products: productToAdd, cartTotal: cartTotal } }
      );
      await cart.save();

      res.json({
        success: true,
        message: "Cart updated",
      });
    } else {
      let cartTotal = 0;
      const productToAdd = [];
      for (let i = 0; i < req.body.products.length; i++) {
        const currentProduct = req.body.products[i];
        const { price } = await ProductModel.findById(
          currentProduct.productId,
          {
            price: 1,
            _id: 0,
          }
        );

        const product = {
          ...currentProduct,
          price,
        };
        productToAdd.push(product);
        const priceForProduct = currentProduct.quantity * price;
        cartTotal += priceForProduct;
      }

      // have to add the data in db
      const newCart = new CartModel({
        products: productToAdd,
        cartTotal: cartTotal,
        userId: req.user._id,
      });
      await newCart.save();
      res.json({
        success: true,
        message: "Cart added",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// get carted Products
const getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({userId:req.user._id});
    if(!cart){
        return res.json({
            success: false,
            message: "Cart not found"
        })
    };
    console.log(req.user, req.user.address);
    res.json({
        success: true,
        message: "Cart found",
        result:cart.products
    })
  } catch (error) {
    res.json({
        success: false,
        message:"Something went wrong"
    })
  }
};

module.exports = {
  createCart,
  getCart,
};
