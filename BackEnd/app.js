const express = require("express");
const bodyParser = require("body-parser");
const staffRouter = require("./routes/staffMembers.js");
const patientRouter = require("./routes/patients.js");
const consultationRouter = require("./routes/consultation.js");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 5000;
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB).then(() => console.log("connected"));

app.get("/", (req, res) => {
  res.send("Hello from Homepage");
});

app.use("/users", staffRouter);
app.use("/patient", patientRouter);
app.use("/consultationRouter", consultationRouter);

app.listen(PORT, () =>
  console.log(`Server running on port : http://localhost:${PORT}`)
);
