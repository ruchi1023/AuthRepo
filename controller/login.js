const User = require("../models/user");
let passport = require('passport');

/* GET Login page controller */
exports.login = function (req, res) {
    res.render("login", { title: "Login" });
  };

/* GET register page controller */
exports.register = function (req, res) {
  res.render("register", { title: "Register" });
};

module.exports.signin = function(req, res, next){
  passport.authenticate('local', {   
    successRedirect: req.session.url || '/dashboard',
    failureRedirect: '/dashboard',
  })(req, res, next);
  delete req.session.url;
};

module.exports.signout = function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};


  