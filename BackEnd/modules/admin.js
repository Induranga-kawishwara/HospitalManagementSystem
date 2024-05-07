import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model("Admin", AdminSchema);
