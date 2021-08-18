const keys = require("./config/keys");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser").json();

mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser);

require("./routes/user")(app);

app.get("/", (req, res) => {
  res.send("Connected to mongodb");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
