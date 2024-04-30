import StaffMemberModel from "../modules/staffMember.js";
import dotenv from "dotenv";
dotenv.config();
import { staffValidation } from "../validations/validation.js";

const getStaff = async (req, res) => {
  try {
    const { staffType } = req.params;

    let query = {};

    if (staffType) {
      query.staffType = staffType;
    }

    const users = await StaffMemberModel.find(query);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
};

const addUser = async (req, res) => {
  try {
    const { error } = staffValidation();
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await StaffMemberModel.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });
    }

    const workingTimeStartHour = parseInt(req.body.workingTimeStart);
    const workingTimeStartMinute = parseInt(req.body.workingTimeStartMin);
    const workingTimeEndHour = parseInt(req.body.workingTimeEnd);
    const workingTimeEndMinute = parseInt(req.body.workingTimeEndMin);

    const currentDate = new Date();
    const workingTimeStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      workingTimeStartHour,
      workingTimeStartMinute
    );

    const workingTimeEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      workingTimeEndHour,
      workingTimeEndMinute
    );

    await new StaffMemberModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      date: req.body.date,
      staffType: req.body.staffType,
      phoneNum: req.body.contact,
      address: req.body.address,
      image: req.body.image,
      email: req.body.email,
      hospitalBranch: [req.body.hospitalBranch],
      roleDetails: {
        department: req.body.department,
        shift: req.body.shift,
        specialization: req.body.specialization,
      },
      selectedDays: [req.body.selectedDays],
      workingTimeStart: workingTimeStartDate,
      workingTimeEnd: workingTimeEndDate,
    }).save();

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
    const deleteUser = await StaffMemberModel.findById(userID);

    if (!deleteUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
};

export { getStaff, addUser, deleteUser };
