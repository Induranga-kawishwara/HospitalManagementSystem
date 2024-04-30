import BloodModel from "../modules/blood.js";

const getBloodCount = async (req, res) => {
  try {
    const bloodRecords = await BloodModel.find();
    res.status(200).json(bloodRecords);
  } catch (error) {
    console.error("Error getting blood records:", error);
    res.status(500).send("Error getting blood records");
  }
};

const addBloodDonation = async (req, res) => {
  console.log("cat");
  try {
    const { firstName, lastName, email, contact, address, bloodType } =
      req.body;

    const donationDetails = {
      firstName,
      lastName,
      email,
      contactNum: contact,
      address,
    };

    const existingDonation = await BloodModel.findOne({ bloodType });

    if (existingDonation) {
      existingDonation.bloodCount = parseInt(existingDonation.bloodCount) + 1;
      existingDonation.donate.push(donationDetails);
      await existingDonation.save();
    } else {
      const newDonation = new BloodModel({
        bloodType,
        bloodCount: "1",
        donate: [donationDetails],
      });
      await newDonation.save();
    }

    res.status(201).send("Blood donation added successfully!");
  } catch (error) {
    console.error("Error adding blood donation:", error);
    res.status(500).send("Error adding blood donation");
  }
};

const updateBloodDonation = async (req, res) => {
  const bloodDonationID = req.params.id;
  try {
    const updatedBloodDonation = await BloodModel.findByIdAndUpdate(
      bloodDonationID,
      req.body,
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

const deleteBloodDonation = async (req, res) => {
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
  getBloodCount,
  addBloodDonation,
  updateBloodDonation,
  deleteBloodDonation,
};
