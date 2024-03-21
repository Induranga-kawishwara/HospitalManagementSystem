const mongoose = require("mongoose");
const ConsultationSchema = require("../modules/consultation");

const createConsultation = mongoose.model(
  "createConsultation",
  ConsultationSchema
);

const getConsultations = async (req, res) => {
  try {
    const consultations = await createConsultation.find();
    res.status(200).json(consultations);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
};

const newConsultation = async (req, res) => {
  try {
    await new createConsultation(req.body).save();
    res.status(201).send("consultation saved successfully!");
  } catch (error) {
    console.error("Error adding consultation:", error);
    res.status(500).send("Error adding consultation");
  }
};

const deleteConsultation = async (req, res) => {
  const consultationID = req.params.id;
  console.log(consultationID);
  try {
    const deleteUser = await createConsultation.findById(consultationID);

    if (!deleteUser) {
      return res.status(404).send("consultation not found");
    }
    res.status(200).send("consultation deleted successfully");
  } catch (error) {
    console.error("Error deleting consultation:", error);
    res.status(500).send("Error deleting consultation");
  }
};

module.exports = { getConsultations, newConsultation, deleteConsultation };
