import express from "express";
import { authAdmin, addAdmin } from "../controllers/adminAuth.js";

const router = express.Router();

router.post("/", authAdmin);
router.post("/add", addAdmin);

export default router;
