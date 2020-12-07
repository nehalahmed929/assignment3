var express = require("express");
const checkSessionAuth = require("../middlewares/checkSessionAuth");
var router = express.Router();
var Post = require("../models/Post");

var multer = require("multer");
var cldnryConfig = require("../config/cloudinary.json");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: cldnryConfig.cloudName,
  api_key: cldnryConfig.apiKey,
  api_secret: cldnryConfig.apiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: {
    folder: "insta",
    // allowedFormats: ["png"],
    // transformation: [{ width: 30, height: 30, crop: "limit" }],
  },
});
const parser = multer({ storage: storage });

/* GET home page. */

router.get("/", async function (req, res, next) {
  let posts = await Post.find().populate("user");
  console.log(posts);
  // console.log(res.userLogged);
  res.render("posts/list", { posts });
});

router.get("/add", checkSessionAuth, function (req, res, next) {
  res.render("posts/add");
});

router.post("/add", parser.single("image"), async function (req, res, next) {
  let post = new Post();
  console.log("request :" + req.body.caption);
  console.log("request :" + res.locals.userLogged);
  post.user = res.locals.userLogged;
  post.caption = req.body.caption;
  post.imageUrl = req.file.path;
  await post.save();
  res.redirect("/posts");
});

router.get("/delete/:id", async function (req, res, next) {
  let post = await Post.findByIdAndDelete(req.params.id);

  res.redirect("/posts");
});

router.get("/edit/:id", async function (req, res, next) {
  let post = await Post.findById(req.params.id);
  res.render("posts/edit", { post });
});

router.post("/edit/:id", async function (req, res, next) {
  let post = await Post.findById(req.params.id);
  post.caption = req.body.caption;
  await post.save();

  res.redirect("/posts/");
});

router.get("/cart/add/:id", async function (req, res, next) {
  let post = await Post.findById(req.params.id);
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(post);
  res.cookie("cart", cart);
  res.redirect("/posts");
});

module.exports = router;
