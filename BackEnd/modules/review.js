import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
  consultationId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  hospitalBranch: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default model("Reviews", ReviewSchema);
