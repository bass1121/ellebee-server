const keys = require("./config/keys");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("Connected to mongodb");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
