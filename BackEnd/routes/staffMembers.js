import express from "express";
import {
  getStaff,
  addUser,
  deleteUser,
  updateUser,
} from "../controllers/staffMembers.js";

const router = express.Router();

router.get("/:staffType", getStaff);
router.get("/", getStaff);
router.post("/", addUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
