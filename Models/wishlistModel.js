const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type:String,
        unique: true
    }
},{_id: false})

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    products: [productSchema]

})

const Wishlist = mongoose.model("Wishlist", wishlistSchema );
module.exports = Wishlist;