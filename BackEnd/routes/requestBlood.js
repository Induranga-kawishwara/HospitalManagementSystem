import express from "express";
import {
  getBloodRequestCount,
  addBloodRequest,
  updateBloodRequest,
  deleteBloodRequest,
} from "../controllers/requestBlood.js";

const router = express.Router();

router.get("/", getBloodRequestCount);
router.post("/", addBloodRequest);
router.put("/:bloodId/:id", updateBloodRequest);
router.delete("/:id", deleteBloodRequest);

export default router;
