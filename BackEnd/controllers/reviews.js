import ReviewModel from "../modules/review.js";

const getReview = async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).send("Error getting reviews");
  }
};

const addReview = async (req, res) => {
  try {
    const existingReview = await ReviewModel.findOne({
      consultationId: req.body.consultationId,
    });

    if (existingReview) {
      await ReviewModel.findOneAndUpdate(
        { consultationId: req.body.consultationId },
        req.body,
        { new: true }
      );

      return res.status(200).send("Consultation review updated successfully!");
    }

    await new ReviewModel(req.body).save();

    res.status(201).send("Review added successfully!");
  } catch (error) {
    console.error("Error adding or updating review:", error);
    res.status(500).send("Error adding or updating review");
  }
};

const deleteReview = async (req, res) => {
  const reviewID = req.params.id;
  try {
    const deletedReview = await ReviewModel.findByIdAndDelete(reviewID);
    if (!deletedReview) {
      return res.status(404).send("Review not found");
    }
    res.status(200).send("Review deleted successfully");
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).send("Error deleting review");
  }
};

export { getReview, addReview, deleteReview };
