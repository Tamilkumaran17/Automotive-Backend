const mongoose = require("mongoose");


function calculateDeliveryDate(price) {
    if (price < 50) return 7;        
    if (price >= 50 && price < 200) return 10; 
    return 12;                        
}


const orderSchema = new mongoose.Schema({
    customerName: String,
    customerAddress: String,
    customerPhone: Number,
    customerProduct: [{
        productId: String,
        quantity: Number,
        orderDate: { type: Date, default: Date.now },
        deliveryDate: { type: Date }
    }],
    customerEmail: String
});


orderSchema.pre("save", async function (next) {
    try {
        const Product = mongoose.model("Product");
        
        for (let product of this.customerProduct) {
            const productDetails = await Product.findOne({ id: product.productId });

            if (productDetails) {
                const deliveryDays = calculateDeliveryDate(productDetails.price);
                product.deliveryDate = new Date(product.orderDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000);
            }
        }

        next();
    } catch (err) {
        next(err);
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
