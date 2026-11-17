const product = require("../models/product.js");

const getProduct = async(req,res,next)=>{
    try{
        const products = await product.find()
        res.json(products);
    }
    catch(error)
    {
        next(error);
    }
};

const createProducts = async(req,res,next)=>{
    try{
    const {name,category,brand,price,stock,specifications} = req.body;
a
    if(!name || !category || !brand || price === undefined || price === null || stock === undefined || stock===null)
    {
        const error = new Error("All fields are required");
        error.statusCode = 400;
        throw error;
    }
    let data = await product.create({
        name:name,
        brand:brand,    
        category:category,
        price:price,
        stock:stock,
        image:req.file ? `/uploads/${req.file.filename}` : "",
        specifications:specifications ? typeof specifications === "string" ? JSON.parse(specifications) : specifications : {}
    });
    res.status(201).json(data);
    }
    catch(error)
    {
        next(error);
    }
};

const getProductById = async(req,res,next)=>{
    try{
    const foundProduct = await product.findById(req.params.id);
        if(!foundProduct)
        {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }
    res.json(foundProduct);
    }
    catch(error)
    {
        next(error);
    }
};

const deleteProduct = async (req,res,next)=>{
    try{
    const deletedProduct = await product.findByIdAndDelete(req.params.id);

    if(!deletedProduct){
        const error = new Error("product not found");
        error.statusCode = 404;
        throw error;
    }
    res.json({
        message:"product deleted successfully",
        product:deletedProduct
    });
}
catch(error)
{
    next(error);
}
};

const updateProduct = async(req,res,next)=>{

    try{
        const allowedFields = [
    "name",
    "category",
    "brand",
    "price",
    "stock",
    "specifications"
];

        const updates = {};

        allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) 
        {
            updates[field] = req.body[field];
        }
});
        if(req.file)
        {
            updates.image = `/uploads/${req.file.filename}`;
        }
        if(updates.specifications && typeof updates.specifications === "string") 
            { updates.specifications = JSON.parse(updates.specifications); }

    const updatedProduct = await product.findByIdAndUpdate(
        req.params.id,updates,
        {
            new:true,
            runValidators:true
        }
);

    if(!updatedProduct){
        const error = new Error("product not found");
        error.statusCode = 404;
        throw error;
    }

res.json(updatedProduct); 
}
catch(error)
{
    next(error);
}
};

module.exports = {getProduct,createProducts,getProductById,deleteProduct,updateProduct};