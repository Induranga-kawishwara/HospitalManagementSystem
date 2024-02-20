const express = require("express");
const bodyParser = require("body-parser");
const userRouters = require("./routes/users.js");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 5000;
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB).then(() => console.log("connected"));

app.get("/", (req, res) => {
  res.send("Hello from Homepage");
});

app.use("/users", userRouters);

app.listen(PORT, () =>
  console.log(`Server running on port : http://localhost:${PORT}`)
);
