const express = require("express");
const authMiddleware = require("../middleware/auth.js");
const productController = require("../controller/productController.js");
const router = express.Router();


// create products
router.post("/create", authMiddleware(["admin", "seller"]), productController.createProduct);

// get all products
router.get("/all",productController.getProducts);

// edit product
router.patch("/item/:productId", authMiddleware(["seller"]),
productController.editProduct);

// delete product 
router.delete("/delete/item/:productId", authMiddleware(["seller"]), productController.deleteProduct);

// get all categories list
router.get("/categories", productController.getAllCategories);


// get all products using category name
router.get("/category/:categoryName", productController.getParticularProductWithCategoryName);

// get all brand list
router.get("/brands", productController.getAllBrands);

// get all products using brand name
router.get("/brand/:brandName", productController.getParticularProductWithBrandName);

module.exports = router;


