import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Assuming your routes will be updated to use export default
import staffRouter from "./routes/staffMembers.js";
import patientRouter from "./routes/patients.js";
import authRouter from "./routes/auth.js";
import consultationRouter from "./routes/consultations.js";
import review from "./routes/review.js";
import BloodBank from "./routes/blood.js";
import BloodRequest from "./routes/requestBlood.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Homepage");
});

app.use("/users", staffRouter);
app.use("/patients", patientRouter);
app.use("/consultations", consultationRouter);
app.use("/auth", authRouter);
app.use("/reviews", review);
app.use("/bloodBank", BloodBank);
app.use("/bloodReq", BloodRequest);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
