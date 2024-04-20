import ConsultationModel from "../modules/consultation.js";

const getConsultations = async (req, res) => {
  try {
    let patientConsultations;

    const { id } = req.params;

    if (id) {
      const consultations = await ConsultationModel.find({
        "consultations.patientId": id,
      });

      // Extract consultations only for the specified patientId
      patientConsultations = consultations.reduce((acc, curr) => {
        const patientConsults = curr.consultations.filter(
          (consultation) => consultation.patientId === id
        );
        if (patientConsults.length > 0) {
          acc.push({
            _id: curr._id,
            doctorId: curr.doctorId,
            consultations: patientConsults,
          });
        }
        return acc;
      }, []);
    } else {
      patientConsultations = await ConsultationModel.find();
    }

    res.status(200).json(patientConsultations);
  } catch (error) {
    console.error("Error getting consultations:", error);
    res.status(500).send("Error getting consultations");
  }
};

const newConsultation = async (req, res) => {
  try {
    const date = new Date(req.body.consultationDate);

    const time = "09:00:00";
    const [hours, minutes, seconds] = time.split(":").map(Number);

    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);
    date.setUTCSeconds(seconds);

    const now = new Date();
    if (date < now) {
      return res.status(400).send("Consultation date cannot be in the past.");
    }

    let consultation = await ConsultationModel.findOne({
      doctorId: req.body.doctorId,
    });

    if (consultation) {
      const existingEntry = consultation.consultations.find(
        (entry) =>
          entry.patientId === req.body.patientId &&
          entry.consultationDateAndTime.getTime() === date.getTime()
      );

      if (!existingEntry) {
        consultation.consultations.push({
          patientId: req.body.patientId,
          specialization: req.body.specialization,
          branchName: req.body.branch,
          contactNum: req.body.PhoneNo,
          consultationDateAndTime: date,
        });

        await consultation.save();
        return res.status(200).send("Consultation saved successfully!");
      } else {
        return res
          .status(400)
          .send(
            "Consultation already booked for the patient on the given date."
          );
      }
    }

    consultation = new ConsultationModel({
      doctorId: req.body.doctorId,
      consultations: [
        {
          patientId: req.body.patientId,
          specialization: req.body.specialization,
          branchName: req.body.branch,
          contactNum: req.body.PhoneNo,
          consultationDateAndTime: date,
        },
      ],
    });
    await consultation.save();
    res.status(201).send("Consultation saved successfully!");
  } catch (error) {
    console.error("Error adding consultation:", error);
    res.status(500).send("Error adding consultation");
  }
};

const deleteConsultation = async (req, res) => {
  const consultationID = req.params.id;
  try {
    const consultationToDelete = await ConsultationModel.findOneAndUpdate(
      { "consultations._id": consultationID },
      { $pull: { consultations: { _id: consultationID } } },
      { new: true }
    );

    if (!consultationToDelete) {
      return res.status(404).send("Consultation not found");
    }
    res.status(200).send("Consultation deleted successfully");
  } catch (error) {
    console.error("Error deleting consultation:", error);
    res.status(500).send("Error deleting consultation");
  }
};

export { getConsultations, newConsultation, deleteConsultation };
