import mongoose from "mongoose";

const { Schema, model } = mongoose;

const StaffSchema = new Schema(
  {
    staffID: {
      type: String,
      required: true,
      unique: true, // Ensure staff ID is unique across all entries
    },
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
    staffType: {
      type: String,
      required: true,
      enum: ["Doctor", "Nurse", "Cleaner", "Administrative", "Other"], // Define allowable roles
    },
    phoneNum: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    roleDetails: {
      department: { type: String },
      shift: { type: String },
      specialization: { type: String },
    },
  },
  { timestamps: true }
);

export default model("StaffMember", StaffSchema);
