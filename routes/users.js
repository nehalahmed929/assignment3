var express = require("express");
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let users = await User.find();
  res.render("./users/list", { users });
});

router.get("/register", function (req, res, next) {
  res.render("./users/register");
});

router.post("/register", async function (req, res, next) {
  let user = new User(req.body);
  await user.save();
  res.redirect("/");
});

router.get("/login", function (req, res, next) {
  res.render("./users/login");
});

router.post("/login", async function (req, res, next) {
  let user = await User.findOne({
    password: req.body.password,
    email: req.body.email,
  });
  console.log(user);
  if (!user) return res.redirect("login");
  req.session.user = user;
  return res.redirect("../");
});

router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("./login");
});

module.exports = router;
