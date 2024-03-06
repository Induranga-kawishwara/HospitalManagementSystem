const mongoose = require("mongoose");
const userSchema = require("../modules/createStaffMember");
const bcrypt = require("bcrypt");
require("dotenv").config();
const validation = require("../validations/validation");

// const { v4: uuidv4 } = require("uuid");

const createStaffMember = mongoose.model("createStaffMember", userSchema);

const getStaff = async (req, res) => {
  try {
    const users = await createStaffMember.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
};

const addUser = async (req, res) => {
  try {
    // const newUser = new createStaffMember(req.body);
    // const newUser = new createStaffMember({
    //   // userId: uuidv4(),
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   email: req.body.email,
    //   phoneNum: req.body.phoneNum,
    //   addressOne: req.body.addressOne,
    //   addressTwo: req.body.addressTwo,
    // });
    const { error } = validation.staffValidation();
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const AddminId = await createStaffMember.findOne({
      staffID: req.body.staffID,
    });
    const user = await createStaffMember.findOne({ email: req.body.email });
    if (AddminId)
      return res
        .status(409)
        .send({ message: "Addmin with given id already Exist!" });

    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
    await new createStaffMember(req.body).save();
    res.status(201).send("User saved successfully!");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
  // try {
  //   const { error } = validation.patientValidation();
  //   if (error) {
  //     return res.status(400).send({ message: error.details[0].message });
  //   }
  //   const AddminId = await createStaffMember.findOne({
  //     staffID: req.body.staffID,
  //   });
  //   const user = await createStaffMember.findOne({ email: req.body.email });
  //   if (AddminId)
  //     return res
  //       .status(409)
  //       .send({ message: "Addmin with given id already Exist!" });

  //   if (user)
  //     return res
  //       .status(409)
  //       .send({ message: "User with given email already Exist!" });

  //   const salt = await bcrypt.genSalt(Number(process.env.SALT));
  //   const hashPassword = await bcrypt.hash(req.body.password, salt);
  //   await new createStaffMember({ ...req.body, password: hashPassword }).save();

  //   res.status(201).send("Addmin saved successfully!");
  // } catch (error) {
  //   console.error("Error adding Addmin:", error);
  //   res.status(500).send("Error adding Addmin");
  // }
};

const deleteUser = async (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  try {
    const deleteUser = await createStaffMember.findById(userID);

    if (!deleteUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
};

module.exports = { getStaff, addUser, deleteUser };
