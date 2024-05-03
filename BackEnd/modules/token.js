import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export default model("Tokens", TokenSchema);
