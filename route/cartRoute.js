const express = require("express");
const cartController = require("../controller/cartController.js");
const authMiddleware = require("../middleware/auth.js");
const router = express.Router();


// create cart or update
router.post("/create",  authMiddleware(["buyer"]),cartController.createCart);

// get cart

router.get("/", authMiddleware(["buyer"]), cartController.getCart);


module.exports = router;