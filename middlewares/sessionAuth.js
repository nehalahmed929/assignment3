function sessionAuth(req, res, next) {
  res.locals.userLogged = req.session.user;
  next();
}

module.exports = sessionAuth;
