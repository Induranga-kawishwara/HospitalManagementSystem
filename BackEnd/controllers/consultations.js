import ConsultationModel from "../modules/consultation.js";

const getConsultations = async (req, res) => {
  try {
    const consultations = await ConsultationModel.find();
    res.status(200).json(consultations);
  } catch (error) {
    console.error("Error getting consultations:", error);
    res.status(500).send("Error getting consultations");
  }
};

const newConsultation = async (req, res) => {
  try {
    const Con = new ConsultationModel({
      doctorId: req.body.doctorId,
      consultations: [
        {
          patientId: req.body.patientId,
          consultationDate: req.body.consultationDate,
          specialization: req.body.specialization,
          branchName: req.body.branch,
          contactNum: req.body.PhoneNo,
        },
      ],
    });
    await Con.save();
    res.status(201).send("Consultation saved successfully!");
  } catch (error) {
    console.error("Error adding consultation:", error);
    res.status(500).send("Error adding consultation");
  }
};

const deleteConsultation = async (req, res) => {
  const consultationID = req.params.id;
  try {
    const consultationToDelete = await ConsultationModel.findById(
      consultationID
    );

    if (!consultationToDelete) {
      return res.status(404).send("Consultation not found");
    }
    await consultationToDelete.remove();
    res.status(200).send("Consultation deleted successfully");
  } catch (error) {
    console.error("Error deleting consultation:", error);
    res.status(500).send("Error deleting consultation");
  }
};

export { getConsultations, newConsultation, deleteConsultation };
