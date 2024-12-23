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
    const { error } = staffValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await StaffMemberModel.findOne({ email: req.body.email });

    if (user) {
      return res.status(409).send("User with given email already exists!");
    }

    const selectedDays = req.body.selectedDays.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);

    const workingTimeStartHour = parseInt(req.body.workingTimeStart);
    const workingTimeStartMinute = parseInt(req.body.workingTimeStartMin);
    const workingTimeEndHour = parseInt(req.body.workingTimeEnd);
    const workingTimeEndMinute = parseInt(req.body.workingTimeEndMin);

    // Format start time
    const formattedStartTime = `${workingTimeStartHour
      .toString()
      .padStart(2, "0")}:${workingTimeStartMinute.toString().padStart(2, "0")}`;

    // Format end time
    const formattedEndTime = `${workingTimeEndHour
      .toString()
      .padStart(2, "0")}:${workingTimeEndMinute.toString().padStart(2, "0")}`;

    await new StaffMemberModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      date: req.body.date,
      staffType: req.body.staffType,
      contact: req.body.contact,
      address: req.body.address,
      image: req.body.image,
      email: req.body.email,
      hospitalBranch: req.body.hospitalBranch,
      roleDetails: {
        department: req.body.department,
        shift: req.body.shift,
        specialization: req.body.specialization,
      },
      selectedDays: selectedDays,
      workingTimeStart: formattedStartTime,
      workingTimeEnd: formattedEndTime,
    }).save();

    res.status(201).send("User saved successfully!");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
};

const updateUser = async (req, res) => {
  try {
    const { error } = staffValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.params.id;

    const user = await StaffMemberModel.findById(userId);

    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await StaffMemberModel.findOne({
        email: req.body.email,
      });
      if (existingUser) {
        return res
          .status(409)
          .send({ message: "User with given email already exists!" });
      }
    }

    if (!user) {
      return res.status(404).send("User not found!");
    }

    const workingTimeStartHour = parseInt(req.body.workingTimeStart);
    const workingTimeStartMinute = parseInt(req.body.workingTimeStartMin);
    const workingTimeEndHour = parseInt(req.body.workingTimeEnd);
    const workingTimeEndMinute = parseInt(req.body.workingTimeEndMin);

    // Format start time
    const formattedStartTime = `${workingTimeStartHour
      .toString()
      .padStart(2, "0")}:${workingTimeStartMinute.toString().padStart(2, "0")}`;

    // Format end time
    const formattedEndTime = `${workingTimeEndHour
      .toString()
      .padStart(2, "0")}:${workingTimeEndMinute.toString().padStart(2, "0")}`;

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.gender = req.body.gender;
    user.date = req.body.date;
    user.staffType = req.body.staffType;
    user.contact = req.body.contact;
    user.address = req.body.address;
    user.image = req.body.image;
    user.email = req.body.email;
    user.hospitalBranch = req.body.hospitalBranch;
    user.roleDetails = {
      department: req.body.department,
      shift: req.body.shift,
      specialization: req.body.specialization,
    };
    user.selectedDays = req.body.selectedDays.reduce(
      (acc, curr) => acc.concat(curr),
      []
    );
    user.workingTimeStart = formattedStartTime;
    user.workingTimeEnd = formattedEndTime;

    await user.save();

    res.status(200).send("User updated successfully!");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user");
  }
};

const deleteUser = async (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  try {
    const deleteUser = await StaffMemberModel.findByIdAndDelete(userID);

    if (!deleteUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
};

export { getStaff, addUser, deleteUser, updateUser };
