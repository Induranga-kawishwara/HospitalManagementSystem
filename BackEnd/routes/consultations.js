import express from "express";
import {
  getConsultations,
  newConsultation,
  deleteConsultation,
  updateDoneConsultation,
} from "../controllers/consultations.js";

const router = express.Router();

router.get("/", getConsultations);
router.get("/:id", getConsultations);
router.put("/:id", updateDoneConsultation);
router.post("/", newConsultation);
router.delete("/:id", deleteConsultation);

export default router;
