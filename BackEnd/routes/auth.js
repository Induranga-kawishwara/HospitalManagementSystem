import express from "express";
import { authuser } from "../controllers/auth.js";

const router = express.Router();

router.post("/", authuser);

export default router;
