const mongoose = require("mongoose");
const PatientSchema = require("../modules/patient");
const validation = require("../validations/validation");
const bcrypt = require("bcrypt");
require("dotenv").config();

// const { v4: uuidv4 } = require("uuid");

const createPatient = mongoose.model("createPatients", PatientSchema);

const getPatient = async (req, res) => {
  try {
    const users = await createPatient.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
};

const addPatient = async (req, res) => {
  try {
    const { error } = validation.patientValidation();
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await createPatient.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new createPatient({ ...req.body, password: hashPassword }).save();

    res.status(201).send("User saved successfully!");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
};

const deletePatient = async (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  try {
    const deleteUser = await createPatient.findById(userID);

    if (!deleteUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
};

module.exports = { getPatient, addPatient, deletePatient };
