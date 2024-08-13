const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type:String,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,

    }

},{_id: false})

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    products: [productSchema]

})

const Cart = mongoose.model("Cart", cartSchema );
module.exports = Cart;