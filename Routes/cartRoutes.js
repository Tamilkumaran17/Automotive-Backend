const cartController = require("../Controllers/cartController");
const express = require("express");
const authh = require("../MiddleWare/auth.js")

const router = express.Router();

router.post("/carts",authh,cartController.createCart);
router.get("/get",authh,cartController.getCart);
router.delete("/carts/delete/:id",authh,cartController.deleteCart);
router.put("/put/:id",authh,cartController.updateCart);
router.delete("/deleteall",authh,cartController.deleteAllcart);


module.exports = router;