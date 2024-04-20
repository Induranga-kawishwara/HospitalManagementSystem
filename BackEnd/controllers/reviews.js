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
  console.log(req.body);
  try {
    const existingReview = await ReviewModel.findOne({
      consultationId: req.body.consultationId,
    });
    if (existingReview) {
      return res
        .status(409)
        .send({ message: "Review for the consultation already exists!" });
    }
    await new ReviewModel(req.body).save();

    res.status(201).send({ message: "Review added successfully!" });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).send("Error adding review");
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
