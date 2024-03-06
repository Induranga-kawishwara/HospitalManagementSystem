const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAuthToken(user) {
  const token = jwt.sign({ _id: user._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
}

module.exports = { generateAuthToken };
