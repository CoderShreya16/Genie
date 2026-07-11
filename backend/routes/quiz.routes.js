const express = require("express");
const { generateQuizHandler } = require("../controllers/quiz.controller");

const router = express.Router();

router.post("/quiz", generateQuizHandler);

module.exports = router;