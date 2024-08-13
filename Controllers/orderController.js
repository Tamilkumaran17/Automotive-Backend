const Order = require("../Models/orderModel");
const Cart = require("../Models/cartModel");
const User = require("../Models/userModel");
const Product = require("../Models/productModel");





exports.createOrder = async (req,res)=>{
    try{

        const {id:userId}=req.user;
        
        const cart = await Cart.findOne({userId});
        if(!cart)
            {
                return res.status(400).json({message:"Cart is empty"});
            }

            console.log(cart);

            const { customerName, customerAddress, customerPhone} = req.body;

            const user = await User.findOne({id: userId});
        

        
            // const productToOrder = cart.products.filter( p=> selectedProduct.includes(p.productId));
            // if(productToOrder.length === 0){
            //     return res.status(400).json({message:"Product not found in cart"});
            // }

            const newOrder = new Order({
                customerName: customerName,
                customerAddress: customerAddress,
                customerPhone: customerPhone,
                customerProduct: cart.products,
                customerEmail: user.email
            });

            // cart.products = cart.products.filter(p=> !selectedProduct.includes(p.productId));
            // await cart.save();

            await newOrder.save();
            
            res.json({message: "order placed",newOrder});



    }catch(error){
        res.json({message: "an error occures", error});
        console.log(error);
        
    }
};


exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
};
