const jwt = require("jsonwebtoken")

const User = require("../models/user.js")

const auth = async(req,res,next)=>{
    try{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
        const error = new Error("Please login to access");
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader.split(" ")[1];

    if(!token)
    {
        const error = new Error("Token is missing");
        error.statusCode = 401;
        return next(error);
    }

    let decoded;

    try{
         decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    }
    catch(error)
    {
        error.statusCode = 401;
        return next(error);
    }

    const user = await User.findById(decoded.userId).select("-password");
    if(!user)
    {
        const error = new Error("User not Found");
        error.statusCode = 401;
        return next(error);
    }

    if(!user.isActive)
    {
        const error = new Error("Account is inActive");
        error.statusCode = 403;
        return next(error);
    }

    req.user = user;

    next();
    }
    catch(error)
    {
        const err = new Error("Invalid or expired token. Please login again");
        err.statusCode = 401;
        return next(err);
    }
};

module.exports = auth;