const { hashPassword, verifyPassword } = require("../helper/auth");
const keys = require("../config/keys");
const mongoose = require("mongoose"); // importing mongoose
const jwt = require("jsonwebtoken");
const User = mongoose.model("user"); // importing mongoose model User.js

module.exports = app => {
  app.post("/api/users", async (req, res) => {
    // sign up user

    if (req.body.signup) {
      const result = await User.findOne({ email: req.body.email }) // findOne checks for copycat emails and if true throws error
        .then(res => {
          if (res) {
            return res;
          }
        })
        .catch(() =>
          res.status(500).json({ message: "Could not connect to database" })
        ); // catch error for failure to connect

      if (result) {
        res.status(422).send({ message: "Username already in use..." });
        return;
      }

      const hashedPassword = await hashPassword(req.body.password);

      const user = {
        email: req.body.email,
        password: hashedPassword,
        admin: false,
        image: "/src/images/finished-darkturquoise.png",
        username: null,
        phoneNumber: null,
        firstName: null,
        lastName: null,
      }; // creating user object and layout has to match front end and model

      const newUser = new User(user);

      const createdUser = await newUser.save();

      const savedUser = {
        _id: createdUser._id,
        email: createdUser.email,
        admin: createdUser.admin,
        image: createdUser.image,
        username: createdUser.username,
        phoneNumber: createdUser.phoneNumber,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
      };

      const token = jwt.sign({ _id: savedUser._id }, keys.SECRET_KEY, {
        expiresIn: 14 * 24 * 60 * 60,
      });
      res.status(200).json({ token, savedUser });
      return;
    }

    // log in user

    const { email, password } = req.body;

    const result = await User.findOne({ email });

    if (!result) {
      res.status(422).json({ message: "Username and/or Password not found" });
      return;
    }

    const validPassword = await verifyPassword(password, result.password);

    if (!validPassword) {
      res.status(422).json({ message: "invalid password" });
      return;
    }

    const user = {
      _id: result._id,
      email: result.email,
      admin: result.admin,
      image: result.image,
      username: result.username,
      phoneNumber: result.phoneNumber,
      firstName: result.firstName,
      lastName: result.lastName,
    };

    res.status(200).send({ data: user });
  }); // specifications on data
};
