import mongoose from "mongoose";

const { Schema, model } = mongoose;

const StaffSchema = new Schema(
  {
    // staffID: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    staffType: {
      type: String,
      required: true,
      enum: ["Doctor", "Nurse", "Cleaner", "Administrative", "Other"],
    },
    phoneNum: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hospitalBranch: {
      type: [String],
      required: true,
    },
    roleDetails: {
      department: { type: String },
      shift: { type: String },
      specialization: { type: String },
    },
    selectedDays: {
      type: [String],
      required: true,
    },
    workingTimeStart: {
      type: Date,
      required: true,
    },
    workingTimeEnd: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("StaffMembers", StaffSchema);
