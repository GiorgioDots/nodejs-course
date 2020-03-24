const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5e78eff7ed1bb119c44255b9")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://giodots:IQ7dVuC5jG0SbGRF@nodecourse-qrvxv.mongodb.net/shop?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    console.log("Connected to mongodb");
    return User.findOne();
  })
  .then(user => {
    if (!user) {
      const user = new User({
        name: "Gio",
        email: "test@test.com",
        cart: {
          items: []
        }
      });
      return user.save();
    } else {
      return Promise.resolve();
    }
  })
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
