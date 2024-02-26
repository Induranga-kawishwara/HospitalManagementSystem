const express = require("express");
const {
  getStaff,
  addUser,
  deleteUser,
} = require("../controllers/staffMembers.js");

const router = express.Router();

router.get("/", getStaff);
router.post("/", addUser);
router.delete("/:id", deleteUser);

module.exports = router;
