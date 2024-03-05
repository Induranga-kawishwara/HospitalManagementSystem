const mongoose = require("mongoose");
const userSchema = require("../modules/createStaffMember");
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
    await new createStaffMember(req.body).save();
    res.status(201).send("User saved successfully!");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
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
