const {
    createWorkspace,
    listWorkspaces,
    getWorkspaceById,
    updateSummary,
    updateQuiz,
    updateCheatNotes,
    updateVerifyNotes,
    appendChatMessages,
} = require("../services/workspace.service");

function handleServiceError(error, res, fallbackMessage) {
    if (error.name === "CastError") {
        return res.status(400).json({ error: "Invalid workspace id." });
    }
    console.error("[workspace.controller]", fallbackMessage, error.message);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ error: error.statusCode ? error.message : fallbackMessage });
}

// POST /api/workspace
async function createWorkspaceHandler(req, res) {
    const { title, uploadedText } = req.body || {};
    try {
        const workspace = await createWorkspace({ title, uploadedText });
        return res.status(201).json({ workspace });
    } catch (error) {
        return handleServiceError(error, res, "Failed to create workspace.");
    }
}

// GET /api/workspaces
async function listWorkspacesHandler(req, res) {
    try {
        const workspaces = await listWorkspaces();
        return res.status(200).json({ workspaces });
    } catch (error) {
        console.error("[workspace.controller] Failed to list workspaces:", error.message);
        return res.status(500).json({ error: "Failed to fetch workspaces." });
    }
}

// GET /api/workspace/:id
async function getWorkspaceHandler(req, res) {
    try {
        const workspace = await getWorkspaceById(req.params.id);
        return res.status(200).json({ workspace });
    } catch (error) {
        return handleServiceError(error, res, "Failed to fetch workspace.");
    }
}

// PATCH /api/workspace/:id/summary
async function updateSummaryHandler(req, res) {
    const { summary } = req.body || {};
    if (typeof summary !== "string" || !summary.trim()) {
        return res.status(400).json({ error: "Request body must include a non-empty 'summary' string." });
    }
    try {
        const workspace = await updateSummary(req.params.id, summary);
        return res.status(200).json({ workspace });
    } catch (error) {
        return handleServiceError(error, res, "Failed to update summary.");
    }
}

// PATCH /api/workspace/:id/quiz
async function updateQuizHandler(req, res) {
    const { quiz } = req.body || {};
    if (!Array.isArray(quiz) || quiz.length === 0) {
        return res.status(400).json({ error: "Request body must include a non-empty 'quiz' array." });
    }
    try {
        const workspace = await updateQuiz(req.params.id, quiz);
        return res.status(200).json({ workspace });
    } catch (error) {
        return handleServiceError(error, res, "Failed to update quiz.");
    }
}

// PATCH /api/workspace/:id/cheatnotes
async function updateCheatNotesHandler(req, res) {
    const { cheatNotes } = req.body || {};
    if (typeof cheatNotes !== "string" || !cheatNotes.trim()) {
        return res.status(400).json({ error: "Request body must include a non-empty 'cheatNotes' string." });
    }
    try {
        const workspace = await updateCheatNotes(req.params.id, cheatNotes);
        return res.status(200).json({ workspace });
    } catch (error) {
        return handleServiceError(error, res, "Failed to update cheat notes.");
    }
}

// PATCH /api/workspace/:id/verify
async function updateVerifyNotesHandler(req, res) {
    const { verifyNotes } = req.body || {};
    if (typeof verifyNotes !== "string" || !verifyNotes.trim()) {
        return res.status(400).json({ error: "Request body must include a non-empty 'verifyNotes' string." });
    }
    try {
        const workspace = await updateVerifyNotes(req.params.id, verifyNotes);
        return res.status(200).json({ workspace });
    } catch (error) {
        return handleServiceError(error, res, "Failed to update verify notes.");
    }
}

// POST /api/workspace/:id/chat
async function appendChatMessagesHandler(req, res) {
    const { messages } = req.body || {};
    const isValid =
        Array.isArray(messages) &&
        messages.length > 0 &&
        messages.every(
            (m) =>
                m &&
                (m.role === "user" || m.role === "assistant") &&
                typeof m.content === "string" &&
                m.content.trim()
        );

    if (!isValid) {
        return res.status(400).json({
            error: "Request body must include a non-empty 'messages' array with valid role/content fields.",
        });
    }

    try {
        const workspace = await appendChatMessages(req.params.id, messages);
        return res.status(200).json({ workspace });
    } catch (error) {
        return handleServiceError(error, res, "Failed to append chat messages.");
    }
}

module.exports = {
    createWorkspaceHandler,
    listWorkspacesHandler,
    getWorkspaceHandler,
    updateSummaryHandler,
    updateQuizHandler,
    updateCheatNotesHandler,
    updateVerifyNotesHandler,
    appendChatMessagesHandler,
};