import BloodModel from "../modules/blood.js";

const getBloodRequestCount = async (req, res) => {
  try {
    const bloodRecords = await BloodModel.find();
    res.status(200).json(bloodRecords);
  } catch (error) {
    console.error("Error getting blood records:", error);
    res.status(500).send("Error getting blood records");
  }
};

const addBloodRequest = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contact,
      address,
      bloodType,
      requestedBloodCount,
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
        email,
        contactNum: contact,
        address,
        requestedBloodCount,
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

const updateBloodRequest = async (req, res) => {
  const bloodType = req.params.bloodId;
  const bloodDonationID = req.params.id;
  try {
    const updatedBloodDonation = await BloodModel.findByIdAndUpdate(
      bloodType,
      { $pull: { donate: { _id: bloodDonationID } } },
      { new: true }
    );
    if (!updatedBloodDonation) {
      return res.status(404).send("Blood donation not found");
    }
    res.status(200).send("Blood donation updated successfully!");
  } catch (error) {
    console.error("Error updating blood donation:", error);
    res.status(500).send("Error updating blood donation");
  }
};

const deleteBloodRequest = async (req, res) => {
  const bloodDonationID = req.params.id;
  try {
    const deletedBloodDonation = await BloodModel.findByIdAndDelete(
      bloodDonationID
    );
    if (!deletedBloodDonation) {
      return res.status(404).send("Blood donation not found");
    }
    res.status(200).send("Blood donation deleted successfully");
  } catch (error) {
    console.error("Error deleting blood donation:", error);
    res.status(500).send("Error deleting blood donation");
  }
};

export {
  getBloodRequestCount,
  addBloodRequest,
  updateBloodRequest,
  deleteBloodRequest,
};
