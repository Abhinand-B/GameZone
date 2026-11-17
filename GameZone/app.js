require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const connectdb = require("./config/dbconnection.js");
const errorHandler = require("./middleware/errorHandler.js");

const port = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/product", require("./routes/product.js"));
app.use("/api/user", require("./routes/user.js"));

connectdb();

app.use(errorHandler);

app.listen(port, () => {
    console.log("Server is running at port", port);
});