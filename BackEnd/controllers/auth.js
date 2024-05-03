import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";
import { generateAuthToken } from "../jwt/jwt.js";
import AuthPatientModel from "../modules/patient.js";

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
    res
      .status(200)
      .send({ data: token, user: userData, message: "logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const verifyToken = (req, res) => {
  const token = req.params.token;
  const secretKey = process.env.JWTPRIVATEKEY;

  if (token) {
    jwt.verify(token, secretKey, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      return res.status(200).send(true);
    });
  } else {
    res.sendStatus(401);
  }
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

export { authuser, verifyToken };
