const express = require("express");
const router = express.Router();

//Entry point for all requests
router.use("/", require("./api"));

module.exports = router;
