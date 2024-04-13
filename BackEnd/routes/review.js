import express from "express";
import { getReview, addReview, deleteReview } from "../controllers/reviews.js";

const router = express.Router();

router.get("/", getReview);
router.post("/", addReview);
router.delete("/:id", deleteReview);

export default router;
