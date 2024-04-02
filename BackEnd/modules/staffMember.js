import mongoose from "mongoose";

const { Schema, model } = mongoose;

const StaffSchema = new Schema({
  staffID: {
    type: String,
    required: true,
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
  phoneNum: {
    type: String,
    required: true,
  },
  addressOne: {
    type: String,
    required: true,
  },
  addressTwo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default model("StaffMembers", StaffSchema);
