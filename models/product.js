const mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: String,
  price: String,
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
