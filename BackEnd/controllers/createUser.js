const { Schema, model } = require("mongoose");

// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: true,
  },
});

module.exports = userSchema;
