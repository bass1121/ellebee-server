const { hashPassword, verifyPassword } = require("../helper/auth");
const keys = require("../config/keys");
const mongoose = require("mongoose"); // importing mongoose
const jwt = require("jsonwebtoken");
const User = mongoose.model("user"); // importing mongoose model User.js

module.exports = app => {
  app.post("/api/users", async (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
      admin: false,
      image: "/src/images/finished-darkturquoise.png",
      username: null,
      phoneNumber: null,
      firstName: null,
      lastName: null,
    }; // creating user object and layout has to match front end and model

    if (req.body.signup) {
      const result = await User.findOne({ email: user.email }) // findOne checks for copycat emails and if true throws error
        .then(res => {
          if (res) {
            return res;
          }
        })
        .catch(err =>
          res.status(500).json({ message: "Could not connect to database" })
        ); // catch error for failure to connect

      if (result) {
        res.status(422).send({ message: "Username already in use..." });
        return;
      }

      const hashedPassword = await hashPassword(user.password);

      user.password = hashedPassword;

      const newUser = new User(user);

      const createdUser = await newUser.save();

      const token = jwt.sign({ ...createdUser }, keys.SECRET_KEY, {
        expiresIn: 14 * 24 * 60 * 60,
      });
      res.status(200).json({ token });
      return;
    }
    res.status(200).send({ message: "done", data: req.body });
  }); // specifications on data
};
