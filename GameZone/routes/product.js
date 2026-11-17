const express = require("express");

const uploads = require("../middleware/upload.js")

const auth = require("../middleware/auth.js");

const roleCheck = require("../middleware/roleCheck.js");

const router = express.Router()

const {
    getProduct,
    createProducts,
    getProductById,
    deleteProduct,
    updateProduct
} = require("../controller/productController.js");

router.get("/",getProduct);

router.get("/:id",getProductById);

router.post("/",auth,roleCheck("admin"),uploads.single("image"),createProducts);

router.put("/:id",auth,roleCheck("admin"),uploads.single("image"),updateProduct);

router.delete("/:id",auth,roleCheck("admin"),deleteProduct);

module.exports = router;