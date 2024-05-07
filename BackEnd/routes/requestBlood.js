import express from "express";
import {
  addBloodRequest,
  deleteBloodRequest,
} from "../controllers/requestBlood.js";

const router = express.Router();

router.post("/", addBloodRequest);
router.delete("/:bloodType/:requestId", deleteBloodRequest);

export default router;
