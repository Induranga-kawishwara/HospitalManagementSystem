import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BloodSchema = new Schema({
  bloodType: {
    type: String,
    required: true,
  },
  bloodCount: {
    type: String,
    required: true,
  },
  donate: [
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      contactNum: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  requestBlood: [
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      contactNum: {
        type: String,
        required: true,
      },
      HospitalBranch: {
        type: String,
        required: true,
      },
      requestedBloodCount: {
        type: Number,
        required: true,
      },
      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default model("BloodBank", BloodSchema);
