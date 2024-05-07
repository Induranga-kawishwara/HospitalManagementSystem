import BloodModel from "../modules/blood.js";

const addBloodRequest = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contact,
      address,
      bloodType,
      requestedBloodCount,
      hospitalBranch,
    } = req.body;

    const existingDonation = await BloodModel.findOne({ bloodType });

    if (
      existingDonation &&
      existingDonation.bloodCount >= requestedBloodCount
    ) {
      existingDonation.bloodCount -= requestedBloodCount;
      const donationDetails = {
        firstName,
        lastName,
        contactNum: contact,
        address,
        requestedBloodCount,
        HospitalBranch: hospitalBranch,
      };
      existingDonation.requestBlood.push(donationDetails);
      await existingDonation.save();

      res.status(201).send("Blood Request added successfully!");
    } else {
      res
        .status(400)
        .send(
          "Not enough blood available in the blood bank for the requested blood type and count!"
        );
    }
  } catch (error) {
    console.error("Error adding blood donation:", error);
    res.status(500).send("Error adding blood donation");
  }
};

const deleteBloodRequest = async (req, res) => {
  const { bloodType, requestId } = req.params;
  try {
    const bloodDonation = await BloodModel.findOne({ bloodType });
    if (!bloodDonation) {
      return res.status(404).send("Blood donation not found");
    }

    const bloodRequest = bloodDonation.requestBlood.find(
      (request) => request._id.toString() === requestId
    );
    if (!bloodRequest) {
      return res.status(404).send("Blood request not found");
    }

    bloodDonation.requestBlood.pull({ _id: requestId });
    await bloodDonation.save();

    res.status(200).send("Blood request deleted successfully");
  } catch (error) {
    console.error("Error deleting blood request:", error);
    res.status(500).send("Error deleting blood request");
  }
};

export { addBloodRequest, deleteBloodRequest };
