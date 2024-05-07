import Joi from "joi";
import AuthPatientModel from "../modules/admin.js";

const addAdmin = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const existingUser = await AuthPatientModel.findOne({
      email: req.body.email,
    });
    if (existingUser)
      return res.status(401).send({ message: "Email already exists" });

    const newAdmin = new AuthPatientModel({
      email: req.body.email,
      password: req.body.password,
    });

    await newAdmin.save();

    res.status(201).send({ message: "Admin created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const authAdmin = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await AuthPatientModel.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid Email" });

    if (req.body.password !== user.password) {
      return res.status(401).send({ message: "Invalid  Password" });
    }
    res.status(200).send({ message: "logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

export { authAdmin, addAdmin };
