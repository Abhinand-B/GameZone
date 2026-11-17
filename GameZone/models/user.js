const  mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    username:{
        type:String,
        required:[true, "Username is Required"],
        trim:true,
        minlength:[3, "Name must contain atleast 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
        lowercase:true
    },
    phone:{
        type:String,
        required:[true,"Email is Required"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"Phone Number is Required"],
        minlength:[6, "Password must contain atleast 6 characters"]
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    isActive:{
        type:Boolean,
        default:true
    }
},
    {
        timestamps:true
    }
);

module.exports=mongoose.model("User",userSchema);