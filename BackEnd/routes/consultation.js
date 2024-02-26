const express = require("express");
const {
  getConsultations,
  newConsultation,
  deleteConsultation,
} = require("../controllers/consultations");

const router = express.Router();

router.get("/", getConsultations);

router.post("/", newConsultation);
router.delete("/:id", deleteConsultation);

module.exports = router;
