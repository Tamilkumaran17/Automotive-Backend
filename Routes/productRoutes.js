const  productController = require("../Controllers/productController.js");
const auth = require("../MiddleWare/auth.js")

const express = require("express");
const router = express.Router();

router.get("/products",productController.getProduct);
router.post("/products",productController.creatProduct);
router.delete("/products/delete",productController.deleteProduct);

// router.route("/products/:id")
//     .get(productController.getProductById)
//     .put(productController.updateProduct);


module.exports = router;