import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function generateAuthToken(user) {
  const token = jwt.sign({ _id: user._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
}

export { generateAuthToken };
