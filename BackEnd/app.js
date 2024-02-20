import express from "express";
import bodyParser from "body-parser";
import userRouters from "./routes/users.js";
import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use("/users", userRouters);

mongoose.connect(process.env.MONGODB).then(() => console.log("connected"));

app.get("/", (req, res) => {
  res.send("Hello from Homepage");
});

app.listen(PORT, () =>
  console.log(`Server running on port : http://localhost:${PORT}`)
);
