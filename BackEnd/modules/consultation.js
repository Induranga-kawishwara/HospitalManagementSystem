import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ConsultationSchema = new Schema({
  doctorId: {
    type: String,
    required: true,
  },
  consultations: [
    {
      consultationDateAndTime: {
        type: Date,
        required: true,
      },
      consultationDetails: [
        {
          patientId: {
            type: String,
            required: true,
          },
          specialization: {
            type: String,
            required: true,
          },
          branchName: {
            type: String,
            required: true,
          },
          contactNum: {
            type: String,
            required: true,
          },
          feedback: {
            type: String,
          },
        },
      ],
    },
  ],
});

export default model("Consultations", ConsultationSchema);
