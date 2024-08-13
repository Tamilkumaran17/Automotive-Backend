const Wishlist = require("../Models/wishlistModel");
const Product = require("../Models/productModel");


exports.createWishList = async (req,res)=>{


    const {id: userId} = req.user;
    const {products} = req.body;

    let wishlist = await Wishlist.findOne({userId});

    if(!wishlist){
        
        wishlist = new Wishlist({
            userId,
            products,
        });
        // res.status(200).json({message: "new cart added!!", cart})
    }
    wishlist.products = wishlist.products.concat(products); 
const newWishList = new Wishlist(wishlist);
await newWishList.save();   
res.status(200).json({message: "new product added to the wishlist!!",wishlist});

};

exports.getCartt = async (req, res) => {
    const { id } = req.user;

  
    try {
      const wishlist = await Wishlist.findOne({ userId: id });
  
      if (!wishlist) {
        return res.status(404).json({ message: "wishlist not found", wishlist: [] });
      }

  
      const wishlistItems = await Promise.all(
        wishlist.products.map(async (p) => {
          const productDetails = await Product.findOne({ id: p.productId });
           
          return {
            productId: productDetails.id,
            title: productDetails.title,
            price: productDetails.price,
            category: productDetails.category,
            image: productDetails.image,
          };
        })
      );
  
      res.status(200).json({ wishlistItems });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message, wishlistItems: [] });
    }
  };

  exports.deleteWishlist = async (req,res)=>{
    const { id: userId } = req.user;
    const productId = req.params.id;

    

    const wishlist = await Wishlist.findOne({userId});
    if(!wishlist){
        return res.status(404).json({message: "wishlist not found",wishlist:[]});
    }

    try{
        const productIndex = wishlist.products.find((product) => product.productId === productId);
        if(!productIndex){
            return res.status(404).json({message: "product not found in wishlist",wishlist:[]});
        }

        if(wishlist.products.length===1 && wishlist.products[0].productId=== productId){
            await Wishlist.deleteOne({userId});
            return res.status(200).json({message: "wishlist deleted",wishlist});
        }
        else{
            wishlist.products = wishlist.products.filter((p)=> p.productId !== productId);
            await wishlist.save();
            return res.json({message: "product deleted from wishlist", wishlist});
        }
    }catch(error){
        res.json({error: error});
    }
  };



  exports.deleteAllWishlist = async (req,res)=>{
    const { id: userId } = req.user;

    try{
        const wishlist = await Wishlist.findOne({userId});
        if(!wishlist)
            return res.status(404).json({message: "wishlist not found"});

        await Wishlist.deleteOne({userId});
        res.status(501).json({message: "wishlist deleted", wishlist});

    }
    catch(error){
        res.json({error: error});
    }
  }
  
  
  

