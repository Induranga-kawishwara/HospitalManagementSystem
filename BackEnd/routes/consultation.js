const mongoose = require("mongoose");
const ConsultationSchema = require("../modules/consultation");
const { v4: uuidv4 } = require("uuid");

const createConsultation = mongoose.model(
  "createConsultation",
  ConsultationSchema
);

const getPatient = async (req, res) => {
  try {
    const users = await createConsultation.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
};

const addPatient = async (req, res) => {
  try {
    const newUser = new createConsultation({
      userId: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      email: req.body.email,
      phoneNum: req.body.phoneNum,
      addressOne: req.body.addressOne,
      addressTwo: req.body.addressTwo,
    });
    await newUser.save();
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
    const deleteUser = await createConsultation.findOneAndDelete(userID);

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
