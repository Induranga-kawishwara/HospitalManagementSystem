import express from "express";
import {
  getPatient,
  addPatient,
  deletePatient,
} from "../controllers/patients.js";

const router = express.Router();

router.get("/", getPatient);
router.post("/", addPatient);
router.delete("/:id", deletePatient);

export default router;
