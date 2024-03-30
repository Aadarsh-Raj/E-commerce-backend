const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/auth.js");
// user register
router.post("/create", userController.createUser);

router.get("/", userController.getUser);

router.put(
  "/update/:userId",
  authMiddleware(["buyer", "seller", "admin"]),
  userController.updateUser
);

router.delete(
  "/delete/:userId",
  authMiddleware(["buyer", "seller", "admin"]),
  userController.deleteUser
);

// update forgoten password
router.patch(
  "/addNewPass",
  authMiddleware(["buyer", "seller", "admin"]),
  userController.updatePassword
);

// add to wishlist
router.post(
  "/wishlist",
  authMiddleware(["buyer"]),
  userController.addToWishlist
);

// remove from wishlist
router.delete(
  "/wishlist/:productId",
  authMiddleware(["buyer"]),
  userController.removeFromWishlist
);

// log out the user
router.post(
  "/logout/:userId",
  authMiddleware(["buyer", ["seller"], ["admin"]]),
  userController.logout
);

module.exports = router;
