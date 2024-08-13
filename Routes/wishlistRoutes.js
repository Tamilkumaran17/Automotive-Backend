const wishlistController = require("../Controllers/wishlistController.js");
const express = require("express");
const authh = require("../MiddleWare/auth.js");
const router = express.Router();

router.post("/post",authh,wishlistController.createWishList);
router.get("/get",authh,wishlistController.getCartt);
router.delete("/delete/:id",authh,wishlistController.deleteWishlist);
router.delete("/deleteall",authh,wishlistController.deleteAllWishlist);

module.exports = router; 