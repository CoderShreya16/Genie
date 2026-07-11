const express = require("express");
const { summarizeNotes } = require("../controllers/summarize.controller");

const router = express.Router();

router.post("/summarize", summarizeNotes);

module.exports = router;