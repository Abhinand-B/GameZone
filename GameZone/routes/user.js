const express = require("express");

const router = express.Router()

const { RegisterUser, LoginUser, Refresh, Logout } = require("../controller/userController");

router.post("/register",RegisterUser);

router.post("/login",LoginUser);

router.post("/refresh",Refresh);

router.post("/logout",Logout);

module.exports = router;