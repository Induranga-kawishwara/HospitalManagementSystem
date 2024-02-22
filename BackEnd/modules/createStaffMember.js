const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: true,
  },
  addressOne: {
    type: String,
    required: true,
  },
  addressTwo: {
    type: String,
    required: true,
  },
});

module.exports = userSchema;
