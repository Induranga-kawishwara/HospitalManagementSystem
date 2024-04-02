import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ConsultationSchema = new Schema({
  patientId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  consultationDate: {
    type: Date,
    required: true,
  },
  consultationTime: {
    type: String,
    required: true,
  },
  contactNum: {
    type: String,
    required: true,
  },
});

export default model("Consultations", ConsultationSchema);
