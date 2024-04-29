import PatientModel from "../modules/patient.js";
import { patientValidation } from "../validations/validation.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const getPatient = async (req, res) => {
  try {
    const users = await PatientModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
};

const addPatient = async (req, res) => {
  try {
    const { error } = patientValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await PatientModel.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new PatientModel({ ...req.body, password: hashPassword }).save();

    res.status(201).send({ message: "User saved successfully!" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
};

const deletePatient = async (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  try {
    const deleteUser = await PatientModel.findById(userID);

    if (!deleteUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
};

export { getPatient, addPatient, deletePatient };
