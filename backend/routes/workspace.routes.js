const express = require("express");
const {
    createWorkspaceHandler,
    listWorkspacesHandler,
    getWorkspaceHandler,
    updateSummaryHandler,
    updateQuizHandler,
    updateCheatNotesHandler,
    updateVerifyNotesHandler,
    appendChatMessagesHandler,
} = require("../controllers/workspace.controller");

const router = express.Router();

router.post("/workspace", createWorkspaceHandler);
router.get("/workspaces", listWorkspacesHandler);
router.get("/workspace/:id", getWorkspaceHandler);
router.patch("/workspace/:id/summary", updateSummaryHandler);
router.patch("/workspace/:id/quiz", updateQuizHandler);
router.patch("/workspace/:id/cheatnotes", updateCheatNotesHandler);
router.patch("/workspace/:id/verify", updateVerifyNotesHandler);
router.post("/workspace/:id/chat", appendChatMessagesHandler);

module.exports = router;