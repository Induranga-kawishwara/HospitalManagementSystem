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

const updatePatient = async (req, res) => {
  console.log(req.body);
  try {
    const { error } = patientValidation(req.body, true);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const userId = req.params.id;

    const user = await PatientModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    // Check if the email is being updated and if it already exists
    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await PatientModel.findOne({
        email: req.body.email,
      });
      if (existingUser) {
        return res.status(409).send({ message: "Email already exists!" });
      }
    }

    // Update user data
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.gender = req.body.gender;
    user.birthday = req.body.birthday;
    user.phonenumber = req.body.phonenumber;
    user.address = req.body.address;
    user.city = req.body.city;
    user.email = req.body.email;

    // Save the updated user
    await user.save();

    res.status(200).send({ message: "User updated successfully!" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Error updating user" });
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
    const deleteUser = await PatientModel.findByIdAndDelete(userID);

    if (!deleteUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
};

export { getPatient, addPatient, deletePatient, updatePatient };
