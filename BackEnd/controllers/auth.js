import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";
import { generateAuthToken } from "../jwt/jwt.js";
import AuthPatientModel from "../modules/patient.js";
import TokenModel from "../modules/token.js";

dotenv.config();

const authuser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await AuthPatientModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const userData = {
      id: user._id,
      name: user.firstName + " " + user.lastName,
      phonenumber: user.phonenumber,
    };

    const token = generateAuthToken(user);

    const tokenData = new TokenModel({
      userId: user._id,
      token: token,
    });
    await tokenData.save();
    res
      .status(200)
      .send({ data: token, user: userData, message: "logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const verifyToken = async (req, res) => {
  const token = req.params.token;
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
      return res.status(200).send(true);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteToken = async (req, res) => {
  const userId = req.params.userId;

  try {
    await TokenModel.deleteMany({ userId: userId });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting tokens");
  }
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

export { authuser, verifyToken, deleteToken };
