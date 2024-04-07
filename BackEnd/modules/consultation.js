import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ConsultationSchema = new Schema({
  doctorId: {
    type: String,
    required: true,
  },
  consultations: [
    {
      patientId: {
        type: String,
        required: true,
      },
      consultationDate: {
        type: Date,
        required: true,
      },
      contactNum: {
        type: String,
        required: true,
      },
      branchName: {
        type: String,
        required: true,
      },
    },
  ],
});

export default model("Consultations", ConsultationSchema);
