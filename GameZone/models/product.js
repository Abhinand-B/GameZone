const mongoose = require("mongoose")

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
        },
    category: {
        type: String,
        required: [true, "Product category is required"],
        enum: {
            values:["CPU", "GPU", "RAM", "Motherboard", "Storage", "PSU", "Cabinet", "Monitor"],
            message:"Invalid product category"
        },
        trim: true
            },
    brand: {
        type: String,
        required: [true, "Product brand is required"],
        trim: true
        },
        price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"]
        },
        stock: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Stock cannot be negative"],
        default: 0
        },
        image:{
            type:String,
            default:""
        },
        specifications:{
            type:mongoose.Schema.Types.Mixed,
            default:{}
        }
    }, {
        timestamps: true
});

module.exports = mongoose.model("product",productSchema);