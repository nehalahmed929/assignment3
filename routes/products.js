var express = require("express");
const checkSessionAuth = require("../middlewares/checkSessionAuth");
var router = express.Router();
var Product = require("../models/product");
/* GET home page. */

router.get("/", async function (req, res, next) {
  let products = await Product.find();
  console.log(products);
  res.render("products/list", { products });
});

router.get("/add", checkSessionAuth, function (req, res, next) {
  res.render("products/add");
});

router.post("/add", async function (req, res, next) {
  let product = new Product(req.body);
  await product.save();
  res.redirect("/products");
});

router.get("/delete/:id", async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);

  res.redirect("/products");
});

router.get("/edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
});

router.post("/edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();

  res.redirect("/products/");
});

router.get("/cart/add/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(product);
  res.cookie("cart", cart);
  res.redirect("/products");
});

module.exports = router;
