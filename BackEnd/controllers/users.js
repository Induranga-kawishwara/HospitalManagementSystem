const mongoose = require("mongoose");
const userSchema = require("./createUser");

const CreateUser = mongoose.model("CreateUser", userSchema);

const test = (req, res) => {
  res.send("test pass");
};

const testadd = async (req, res) => {
  try {
    const newUser = new CreateUser(req.body);
    await newUser.save();
    res.status(201).send("User saved successfully!");
  } catch (error) {}
};

module.exports = { test, testadd };
