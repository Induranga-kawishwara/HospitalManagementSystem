const { Schema } = require("mongoose");

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

module.exports = ConsultationSchema;
