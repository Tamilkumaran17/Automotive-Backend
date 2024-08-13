 const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel");
const Wishlist = require("../Models/wishlistModel");

// exports.getUser = async (req, res) => {
//     try {
//         const { name, password } = req.body;

//         const user = await User.findOne({ name });

//         if (user && await bcrypt.compare(password, user.password)) {
//             res.status(200).json({ message: "User found", user });
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };



const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

exports.login = async (req, res) => {

    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        const cart = await Cart.findOne({ userId: user.id });
        const wishList = await Wishlist.findOne({userId:user.id});
        var wishListItems = [];
        var cartItems = [];
        if(cart){
             cartItems = await Promise.all(
                cart.products.map(async (p) => {
                  const productDetails = await Product.findOne({ id: p.productId });
                //   if (!productDetails) {
                //     throw new Error(`Product with ID ${p.productId} not found`);
                //   }
          
                //   subtotal += productDetails.price * p.quantity;
          
                  return {
                    productId: productDetails.id,
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    category: productDetails.category,
                    image: productDetails.image,
                    quantity: p.quantity,
                  };
                })
              );
        }
        if(wishList){
            wishListItems = await Promise.all(
               wishList.products.map(async (p) => {
                 const productDetails = await Product.findOne({ id: p.productId });
               //   if (!productDetails) {
               //     throw new Error(`Product with ID ${p.productId} not found`);
               //   }
         
               //   subtotal += productDetails.price * p.quantity;
         
                 return {
                   productId: productDetails.id,
                   title: productDetails.title,
                   price: productDetails.price,
                   image: productDetails.image,
                 };
               })
             );
       }
        res.status(200).json({message: "data exists", token: token , user: user,cartItems,wishListItems});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error",cartItems:[],wishListItems:[] });
    }
};




exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(409).json({ message: "User exists with similar data", existUser });
        } else {
            const newUser = new User({ name, email, password });

            await newUser.save();
            res.status(201).json({ message: "New user added", newUser });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};




exports.deleteUser = async (req, res) => {
    const { name } = req.body;

    try {
        const existUser = await User.findOne({ name });

        if (!existUser) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findOneAndDelete({ name });
        res.status(200).json({ message: "User deleted", existUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};




exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existUser = await User.findOne({ email });

        if (!existUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const updatedData = await User.findOneAndUpdate(
            { name },
            { email, password: hashPass },
            { new: true }
        );

        res.status(200).json({ message: "User data updated", updatedData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


