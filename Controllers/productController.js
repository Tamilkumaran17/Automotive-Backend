const product = require('../Models/productModel')
// const { v4: uuidv4 } = require('uuid');



exports.getProduct = async (req,res)=>{
    try{
        
        const products = await product.find();
        res.json(products);    
    }
    catch(error){
        console.log(error);   
        res.status(500).json({error: "internal server error"}); 
    }

};


exports.creatProduct = async (req,res)=>{
    try{
        // const newproduct = new  product(req.body);
        // await newproduct.save();

        const {id,title, price,description, category, image,subimage, rating} = req.body;
        console.log(req.body);
        
        const newproduct = new product({
            id,
            title,
            price,
            description,
            category,
            image,
            subimage,
            rating
        })

        await newproduct.save();
        res.status(201).json({message:"new product", newproduct})   
     }
    catch(error){
        console.log(error);
        
    } 
};

exports.deleteProduct = async (req,res)=>{
    
    const productData = req.body;
    const existProduct = await product.findOne({ id: productData.id});

    if(!existProduct){
        res.json({message: "product not found"});
    }

    await product.findByIdAndDelete(existProduct);
    res.json({message: "product deleted", existProduct});

};





// exports.getProductById = async (req, res) => {
//     const  id  = req.params;
//     const products = await product.findById(id);
//     try {
//       if (!products) {
//         return res.status(404).json({ msg: "Product not found" });
//       }
//       res.json(products);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Server Error");
//     }
//   };



// exports.updateProduct = async (req,res) => {

//     const {id} = req.params ;
//     const {title, price,description, category, image, rating} = req.body;

    
//     try{
//         const updatedProduct = await product.findByIdAndUpdate(
//             id,
//             {title,price,description,category,image,rating},
//             {new: true}
//         );

//         if(!updatedProduct){
//             return res.status(404).json({msg: "product not found"});
//         }

//         res.json(updatedProduct);

//     }
//     catch(error){
//         console.log(error);
//         res.status(500).send("server error");
        
//     }
// };