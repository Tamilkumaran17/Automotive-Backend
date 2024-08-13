const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');



const productSchema = new mongoose.Schema({
    
    id: {
        type:String,
        default:uuidv4
    },                         
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    subimage: [String],
    rating: {
        rate: Number,
        count: Number,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
