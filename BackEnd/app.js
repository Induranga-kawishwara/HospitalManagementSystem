const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const staffRouter = require("./routes/staffMembers");
const patientRouter = require("./routes/patients");
const authRouter = require("./routes/auth");
const consultationRouter = require("./routes/consultation");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
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

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
