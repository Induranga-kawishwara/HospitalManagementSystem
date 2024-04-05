import express from "express";
import { getStaff, addUser, deleteUser } from "../controllers/staffMembers.js";

const router = express.Router();

router.get("/:staffType", getStaff);
router.post("/", addUser);
router.delete("/:id", deleteUser);

export default router;
