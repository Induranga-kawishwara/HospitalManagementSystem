import express from "express";
import { authuser, verifyToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/", authuser);
router.post("/:token", verifyToken);

export default router;
