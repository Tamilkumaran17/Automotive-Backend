const express = require("express");
const app = express();
const productRoutes = require("./Routes/productRoutes");
const userRoutes = require("./Routes/userRoutes");
const cartRouts = require("./Routes/cartRoutes");
const orderRouts = require("./Routes/orderRoutes");
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const WishlistRouts = require("./Routes/wishlistRoutes");


app.use(express.json());
app.use(cors());


// mongoose.connect('mongodb+srv://tamilkumaran1494:Tamil2004@cluster0.o3hc8rf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/')

mongoose.connect('mongodb+srv://tamilkumaran1494:Tamil2004@cluster0.o3hc8rf.mongodb.net/Automotive?retryWrites=true&w=majority&appName=Cluster0/',{

    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then( ()=>{
    console.log("connected to db");
    
});



app.use("/",productRoutes);
app.use("/user",userRoutes);
app.use("/cart",cartRouts)
app.use("/order",orderRouts);
app.use("/wishlist",WishlistRouts)

app.listen(port, ()=>{
    console.log("Server running in port 3000");
})
