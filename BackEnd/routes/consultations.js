import express from "express";
import {
  getConsultations,
  newConsultation,
  deleteConsultation,
} from "../controllers/consultations.js";

const router = express.Router();

router.get("/", getConsultations);
router.get("/:id", getConsultations);
router.post("/", newConsultation);
router.delete("/:id", deleteConsultation);

export default router;
