const express = require("express");
const { authuser } = require("../controllers/auth");

const router = express.Router();

router.post("/", authuser);

module.exports = router;
