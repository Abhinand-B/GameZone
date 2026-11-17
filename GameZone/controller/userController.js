const User = require("../models/user.js");

const jwt = require("jsonwebtoken");    

const bcrypt = require("bcrypt");

const RegisterUser = async(req,res)=>{
        const{username,email,phone,password}=req.body;

        if(!username || !email || !phone || !password)
        {
        const error = new Error("All fields are required");
        error.statusCode = 400;
        throw error;
        }

        const normalizedEmail = email.toLowerCase().trim()

        const existingUser = await User.findOne({email:normalizedEmail});

        if(existingUser)
        {
            const error = new Error("Email already exists");
            error.statusCode = 400;
            throw error;
        }
        
    const hashedPassword = await bcrypt.hash(password,10)
    
    const user = await User.create({
        username:username,
        email:normalizedEmail,
        phone:phone,
        password:hashedPassword
    });

    res.status(201).json({
        message: "User registered successfully",
        user:{
            _id:user._id,
            username:user.username,
            email:user.email,
            phone:user.phone,
            role:user.role
        }
    });
};

const LoginUser = async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password)
    {
        const error = new Error("Email and password are required");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findOne({
        email:email.toLowerCase().trim()
    });

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const accesstoken = jwt.sign({
        userId:user._id,
        tokenType:"access"
    },
    process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
);

        const refreshToken = jwt.sign({
        userId:user._id,
        tokenType:"refresh"
    },
    process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"7d"}
);

  res.cookie("refreshToken",refreshToken, {
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
    res.status(200).json({
    message: "Login successful",
    role: user.role,
    username: user.username,
    accesstoken
    });
 
};

const Refresh = async (req,res)=>{
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken)
    {
        const error =  new Error("Token is missing");
        error.statuscode = 401;
        throw error;
    }

    const decoded = jwt.verify(
        refreshToken,process.env.REFRESH_TOKEN_SECRET
    );

    if(decoded.tokenType !== "refresh")
    {
        const error = new Error("Invalid RefreshToken");
        error.statuscode = 401;
        throw error;
    }

    const newAccessToken = jwt.sign(
        {
            userId:decoded.userId,
            tokenType:"access"
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
    res.status(200).json({
        message:"Token Refreshed sucessfully",
        accesstoken:newAccessToken
    });
};

const Logout = async(req,res)=>{

    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax"
    });

    res.status(200).json({
        message:"Logged Out Sucessfully"
    });
}

module.exports = {RegisterUser,LoginUser,Refresh,Logout};