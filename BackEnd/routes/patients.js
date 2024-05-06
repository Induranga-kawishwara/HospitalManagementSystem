import express from "express";
import {
  getPatient,
  addPatient,
  deletePatient,
  updatePatient,
} from "../controllers/patients.js";

const router = express.Router();

router.get("/", getPatient);
router.post("/", addPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
