const express = require("express");
const { cheatNotesHandler } = require("../controllers/cheatnotes.controller");

const router = express.Router();

router.post("/cheatnotes", cheatNotesHandler);

module.exports = router;