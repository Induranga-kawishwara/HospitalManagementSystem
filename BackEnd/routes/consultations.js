import express from "express";
import {
  getConsultations,
  newConsultation,
  deleteConsultation,
  updateDoneConsultation,
} from "../controllers/consultations.js";
import { verifyToken } from "../jwt/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getConsultations);
router.get("/:id", verifyToken, getConsultations);
router.put("/:id", verifyToken, updateDoneConsultation);
router.post("/", verifyToken, newConsultation);
router.delete("/:id", verifyToken, deleteConsultation);

export default router;
