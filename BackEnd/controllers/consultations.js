import ConsultationModel from "../modules/consultation.js";
import staffMember from "../modules/staffMember.js";

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
    const {
      doctorId,
      patientId,
      consultationDate,
      specialization,
      branch,
      PhoneNo,
    } = req.body;

    const doctor = await staffMember.findById(doctorId);
    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    // Check if the consultation date is in the past
    const now = new Date();
    if (new Date(consultationDate) < now) {
      return res.status(400).send("Consultation date cannot be in the past.");
    }

    // Check if the consultation date falls within the doctor's working days
    const consultationDay = new Date(consultationDate).toLocaleDateString(
      "en-US",
      { weekday: "long" }
    );
    if (!doctor.selectedDays.includes(consultationDay)) {
      return res
        .status(400)
        .send("Consultation date is not within doctor's working days.");
    }

    // Calculate consultation time based on the doctor's working hours
    const workingTimeStart = new Date(doctor.workingTimeStart);
    const workingTimeEnd = new Date(doctor.workingTimeEnd);
    const consultationTime = calculateConsultationTime(
      workingTimeStart,
      workingTimeEnd
    );

    // Check if consultation time conflicts with existing appointments
    const existingConsultations = await ConsultationModel.findOne({
      doctorId,
      "consultations.consultationDateAndTime": consultationTime,
    });

    if (existingConsultations) {
      return res
        .status(400)
        .send("Consultation time conflicts with existing appointment");
    }

    // Create a new consultation entry
    const consultation = await ConsultationModel.findOneAndUpdate(
      { doctorId },
      {
        $push: {
          consultations: {
            patientId,
            specialization,
            branchName: branch,
            contactNum: PhoneNo,
            consultationDateAndTime: consultationTime,
          },
        },
      },
      { new: true, upsert: true }
    );

    res.status(201).send("Consultation saved successfully!");
  } catch (error) {
    console.error("Error adding consultation:", error);
    res.status(500).send("Error adding consultation");
  }
};

// Function to calculate consultation time within working hours
const calculateConsultationTime = (startTime, endTime) => {
  const consultationTime = new Date();
  consultationTime.setHours(startTime.getHours());
  consultationTime.setMinutes(startTime.getMinutes());
  consultationTime.setSeconds(0);
  return consultationTime;
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
