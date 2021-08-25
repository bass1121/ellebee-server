const keys = require("./config/keys");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser").json();
const bcryptjs = require("bcryptjs");
require("./models/User");

mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(bodyParser);

require("./routes/user")(app);

app.get("/", (req, res) => {
  res.send("Connected to mongodb");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
