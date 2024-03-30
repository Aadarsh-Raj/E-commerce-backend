const ProductModel = require("../model/productSchema.js");
const jwt = require("jsonwebtoken");
const CategoryModel = require("../model/categorySchema.js");
const dotenv = require("dotenv");
dotenv.config();
// create products
// seller, admin
const createProduct = async (req, res) => {
  try {
    const newProduct = new ProductModel({
      ...req.body,
      sellerId: req.user._id,
    });

    // first get the category from db
    const category = await CategoryModel.findOne({
      getCategoryId: process.env.CATEGORY_ID,
    });
    // if not found create that object with fixed category id
    if (!category) {
      const defaultCategory = new CategoryModel({        
        getCategoryId: process.env.CATEGORY_ID,
      });
      await defaultCategory.save();
    }

    // again get the category from db bcz till it confirms the db has been created for category
    const newCategory = await CategoryModel.findOne({
      getCategoryId: process.env.CATEGORY_ID,
    });

    if (!newCategory.categoryName.includes(req.body.category)) {
      newCategory.categoryName.push(req.body.category);
      newCategory.brandName.push(req.body.brand);
      await newCategory.save();
    }
    await Promise.all([newProduct.save(), newCategory.save()]);
    return res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong, data not saved",
    });
  }
};

// delete products
// seller, admin
const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    if (req.user._id.equals(product.sellerId)) {
      // change the data of the product from body
      await ProductModel.findByIdAndDelete(req.params.productId);

      return res.json({
        success: true,
        message: "Product deleted successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "You are not allowed to delete others product",
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
// get all products
// buyer, seller, admin
const getProducts = async (req, res) => {
  const product = await ProductModel.find({});
  res.json({
    success: true,
    message: "all products",
    results: product,
  });
};

// edit product
const editProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (req.user._id.equals(product.sellerId)) {
      // change the data of the product from body
      if (
        req.body.title ||
        req.body.image ||
        req.body.price ||
        req.body.description ||
        req.body.discount ||
        req.body.color ||
        req.body.stock ||
        req.body.brand ||
        req.body.category
      ) {
        await ProductModel.updateMany(
          { _id: req.params.productId },
          { $set: { ...req.body } }
        );
        res.json({
          success: true,
          message:"Product updated"
        })
      } else {
        return res.json({
          success: false,
          message: "Other fields can't be updated",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "You are not allowed to edit the others' product",
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

// get category names
const getAllCategories = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({
      getCategoryId: process.env.CATEGORY_ID,
    });
    if (!category) {
      return res.json({
        success: false,
        message: "Categories not found",
      });
    }

    res.json({
      success: true,
      categoryList: category.categoryName,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getParticularProductWithCategoryName = async (req, res) => {
  const categoryName = req.params.categoryName;
  try {
    const category = await CategoryModel.findOne({
      categoryName: categoryName,
    });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const products = await ProductModel.find({category: categoryName});

    res.json({
      success: true,
      message: `Products in Category ${req.params.categoryName}`,
      results: products
    })
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};


// get all brands name
const getAllBrands = async (req, res)=>{
  try {
    const brand = await CategoryModel.findOne({
      getCategoryId: process.env.CATEGORY_ID,
    });
    if (!brand) {
      return res.json({
        success: false,
        message: "Brands not found",
      });
    }

    res.json({
      success: true,
      message:"List are here",
      results: brand.brandName,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// get all products using brand name
const getParticularProductWithBrandName = async (req, res) =>{
  const brandName = req.params.brandName;
  try {
    const category = await CategoryModel.findOne({
      brandName: brandName,
    });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    const products = await ProductModel.find({brand: brandName});

    res.json({
      success: true,
      message: `Products in Category ${req.params.brandName}`,
      results: products
    })
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  editProduct,
  getAllCategories,
  getParticularProductWithCategoryName,
  getAllBrands,
  getParticularProductWithBrandName
};


