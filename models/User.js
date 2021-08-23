const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  admin: Boolean,
  image: String,
  username: String,
  phoneNumber: String,
  firstName: String,
  lastName: String,
});

mongoose.model("user", userSchema);
