const express = require("express");
const {
  getPatient,
  addPatient,
  deletePatient,
} = require("../controllers/patients");

const router = express.Router();

router.get("/", getPatient);

router.post("/", addPatient);
router.delete("/:id", deletePatient);

module.exports = router;
