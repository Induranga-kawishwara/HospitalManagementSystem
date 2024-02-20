const express = require("express");
const { test, testadd } = require("../controllers/users.js");

const router = express.Router();

router.get("/test", test);

router.post("/", testadd);

module.exports = router;
