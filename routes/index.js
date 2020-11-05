var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/contactus", function (req, res, next) {
  res.render("contactus");
});

router.get("/cart", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  res.render("cart", { cart });
});

router.get("/cart/remove/:id", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.splice(
    cart.findIndex((c) => c._id === req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});

module.exports = router;
