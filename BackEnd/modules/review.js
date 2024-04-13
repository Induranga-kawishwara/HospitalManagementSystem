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
  review: {
    type: String,
    required: true,
  },
});

export default model("Reviews", ReviewSchema);
