const express = require("express");
const router = express.Router();

const auth = require("../MiddleWare/auth.js");
const orderController = require("../Controllers/orderController.js");

router.post("/create",auth,orderController.createOrder);
router.get("/orders", auth,orderController.getOrders);

module.exports = router;