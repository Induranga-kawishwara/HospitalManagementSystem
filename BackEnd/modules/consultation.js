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
      consultationStartTime: {
        type: Date,
        required: true,
      },
      consultationEndTime: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        required: true,
        default: "scheduled",
      },
      // feedback: {
      //   type: String,
      // },
    },
  ],
});

ConsultationSchema.pre("save", function (next) {
  const now = new Date();
  if (this.consultations) {
    this.consultations.forEach((consultation) => {
      if (consultation.consultationEndTime <= now) {
        consultation.status = "done";
      }
    });
  }
  next();
});

export default model("Consultations", ConsultationSchema);
