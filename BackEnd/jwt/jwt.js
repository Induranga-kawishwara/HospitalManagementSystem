import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import TokenModel from "../modules/token.js";

function generateAuthToken(user) {
  const token = jwt.sign({ _id: user._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
}

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  const secretKey = process.env.JWTPRIVATEKEY;

  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const tokenData = await TokenModel.findOne({ token: token });
    if (!tokenData) {
      return res.sendStatus(403);
    }

    jwt.verify(token, secretKey, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export { generateAuthToken, verifyToken };
