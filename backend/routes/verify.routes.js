const express = require("express");
const { verifyHandler } = require("../controllers/verify.controller");

const router = express.Router();

router.post("/verify", verifyHandler);

module.exports = router;