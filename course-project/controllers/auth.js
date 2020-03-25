const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = false;
  // if (req.get("Cookie")) {
  //   isLoggedIn = req.get("Cookie").split("=")[1] == true;
  // }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5e78eff7ed1bb119c44255b9")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect("/");
  });
};
