import express from "express";
import { authuser, verifyToken, deleteToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/", authuser);
router.post("/:token", verifyToken);
router.delete("/:userId", deleteToken);

export default router;
