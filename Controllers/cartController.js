const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel");


exports.createCart = async (req, res) => {   // create

  const { id: userId } = req.user;
  const { products } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {

    cart = new Cart({
      userId,
      products,
    });

  } else {

    const existProduct = cart.products.findIndex(p => p.productId === products.productId);
    if (existProduct !== -1) {

      cart.products[existProduct].quantity = products.quantity;

    }
    else {

      cart.products.push({
        productId: products.productId,
        quantity: products.quantity 
      });
    }
  }

  await cart.save();
  res.status(200).json({ message: "new product added to the existing user!!", cart });

};



exports.getCart = async (req, res) => {
  const { id } = req.user;
  console.log(id + "user");

  try {
    const cart = await Cart.findOne({ userId: id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found", cartItems: [] });
    }

    let subtotal = 0;

    const cartItems = await Promise.all(
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

    res.status(200).json({ cartItems });
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, cartItems: [] });
  }
};



exports.deleteCart = async (req, res) => {

  const { id: userId } = req.user;
  const productId = req.params.id;
  console.log(productId);




  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  try {

    const isProductValid = cart.products.find(p => productId === p.productId);
    console.log(isProductValid)

    if (!isProductValid) {
      return res.json({ message: "product not found in cart" });
    }

    // if(cart.products.length <= 1){
    //     await Cart.deleteOne({productId});
    //     return res.json({message : "cart deleted ",cart});
    // }else{
    //     cart.products = cart.products.filter( (p) => p.id!=productId);
    //     cart.save();
    //     res.json({message: "card deleteddd",cart});
    // }


    if (cart.products.length === 1 && cart.products[0].productId === productId) {
      await Cart.deleteOne({ userId });
      return res.json({ message: "Cart deleted", cart });
    } else {
      cart.products = cart.products.filter((p) => p.productId !== productId);
      await cart.save();
      return res.json({ message: "Product deleted from cart", cart });
    }

  }
  catch (error) {
    res.json({ error: error })
  }




};

exports.deleteAllcart = async (req, res) => {

  const { id: userId } = req.user;

  try {

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "cart not found" });

    const response = await Cart.deleteOne({ userId });

    res.status(200).json({ message: "cart deleted" ,cart});


  } catch (error) {
    res.status(501).json({ error: error });
  }
}

exports.updateCart = async (req, res) => {
  const { id: userId } = req.user;
  const productId = req.params.id;
  const { quantity } = req.body

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.map((product) => {
      if (productId === product.productId && quantity >= 1) return { ...product, quantity: quantity };
      else return product;
    })

    const newCart = new Cart(cart);
    await newCart.save();
    res.status(200).json({ message: "Cart updated" });

  } catch (error) {
    res.status(501).json({ error: error.message });
  }
}



