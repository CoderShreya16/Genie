const express = require("express");
const { analyzeQuizHandler } = require("../controllers/analysis.controller");

const router = express.Router();

router.post("/quiz/analyze", analyzeQuizHandler);

module.exports = router;