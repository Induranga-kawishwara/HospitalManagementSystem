import ConsultationModel from "../modules/consultation.js";
import staffMember from "../modules/staffMember.js";
import { isValid } from "date-fns";

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

    // Check if the doctor already has an appointment with the patient on the same day
    const existingConsultation = await ConsultationModel.findOne({
      doctorId,
      "consultations.patientId": patientId,
      "consultations.consultationStartTime": {
        $gte: new Date(consultationDate),
        $lt: new Date(new Date(consultationDate).setHours(23, 59, 59, 999)), // Less than the end of the day
      },
    });
    if (existingConsultation) {
      return res
        .status(400)
        .send(
          "Patient already has an appointment with this doctor on the same day"
        );
    }

    // Check if the consultation date is within the doctor's working days
    const consultationDay = new Date(consultationDate).toLocaleDateString(
      "en-US",
      { weekday: "long" }
    );
    if (!doctor.selectedDays.includes(consultationDay)) {
      return res
        .status(400)
        .send("Consultation date is not within doctor's working days");
    }

    // Check if the consultation time falls within the doctor's working hours
    const [workingStartHour, workingStartMinute] = doctor.workingTimeStart
      .split(":")
      .map(Number);
    const [workingEndHour, workingEndMinute] = doctor.workingTimeEnd
      .split(":")
      .map(Number);

    const workingStartTime = new Date(consultationDate);
    workingStartTime.setHours(workingStartHour, workingStartMinute, 0, 0);

    const workingEndTime = new Date(consultationDate);
    workingEndTime.setHours(workingEndHour, workingEndMinute, 0, 0);

    // Find the end time of the last consultation for the same doctor on the same day
    const lastConsultation = await ConsultationModel.findOne({
      doctorId,
      "consultations.consultationEndTime": {
        $gte: new Date(consultationDate),
        $lt: new Date(new Date(consultationDate).setHours(23, 59, 59, 999)), // End of the day
      },
    })
      .sort({ "consultations.consultationEndTime": -1 })
      .limit(1)
      .select("consultations.consultationEndTime");

    let consultationStartTime;
    if (lastConsultation) {
      // Calculate consultation start time for the next consultation with a 15-minute gap
      consultationStartTime = new Date(
        lastConsultation.consultations[0].consultationEndTime
      );
      consultationStartTime.setMinutes(consultationStartTime.getMinutes() + 15);
    } else {
      // If no previous consultations, start from the doctor's working time start
      consultationStartTime = new Date(workingStartTime);
    }

    // Calculate consultation end time by adding 15 minutes to the start time
    const consultationEndTime = new Date(consultationStartTime);
    consultationEndTime.setMinutes(consultationEndTime.getMinutes() + 15);

    if (consultationEndTime > workingEndTime) {
      return res
        .status(400)
        .send("Consultation time exceeds doctor's working hours");
    }

    if (!isValid(consultationStartTime) || !isValid(consultationEndTime)) {
      return res.status(400).send("Invalid consultation start or end time");
    }

    const consultation = await ConsultationModel.findOneAndUpdate(
      { doctorId },
      {
        $push: {
          consultations: {
            patientId,
            specialization,
            branchName: branch,
            contactNum: PhoneNo,
            consultationStartTime,
            consultationEndTime,
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

const updateDoneConsultation = async (req, res) => {
  const consultationID = req.params.id;
  try {
    const consultationToUpdate = await ConsultationModel.findOneAndUpdate(
      { "consultations._id": consultationID },
      {
        $set: { "consultations.$.status": "done" },
      },
      { new: true }
    );

    if (!consultationToUpdate) {
      return res.status(404).send("Consultation not found");
    }
    res.status(200).send("Consultation status updated successfully to 'done'");
  } catch (error) {
    console.error("Error updating consultation status:", error);
    res.status(500).send("Error updating consultation status");
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

export {
  getConsultations,
  newConsultation,
  deleteConsultation,
  updateDoneConsultation,
};
