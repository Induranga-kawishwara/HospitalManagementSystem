import express from "express";
import { test } from "../controllers/users.js";
const router = express.Router();
router.get("/test", test);
export default router;
