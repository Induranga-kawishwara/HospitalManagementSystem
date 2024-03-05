const { Schema } = require("mongoose");

const userSchema = new Schema({
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
