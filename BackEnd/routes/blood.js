import express from "express";
import {
  getBloodCount,
  addBloodDonation,
  updateBloodDonation,
  deleteBloodDonation,
} from "../controllers/blood.js";

const router = express.Router();

router.get("/", getBloodCount);
router.post("/", addBloodDonation);
router.put("/:id", updateBloodDonation);
router.delete("/:id", deleteBloodDonation);

export default router;
