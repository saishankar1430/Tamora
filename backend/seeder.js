require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products");

connectDB();

const importData = async () => {
  try {
    // Delete old products
    await Product.deleteMany();

    // Insert new products
    await Product.insertMany(products);

    console.log("✅ Products Imported Successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();