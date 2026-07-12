const { generateCheatNotes } = require("../services/cheatnotes.service");

/**
 * POST /api/cheatnotes
 * Body: { "notes": "..." }
 * Response: { "cheatNotes": "...markdown..." }
 */
async function cheatNotesHandler(req, res) {
    const { notes } = req.body || {};

    if (!notes || typeof notes !== "string" || !notes.trim()) {
        return res.status(400).json({
            error: "Request body must include a non-empty 'notes' string.",
        });
    }

    try {
        const cheatNotes = await generateCheatNotes(notes.trim());
        return res.status(200).json({ cheatNotes });
    } catch (error) {
        console.error("[cheatnotes.controller] Failed to generate cheat notes:", error.message);
        return res.status(502).json({
            error: "Failed to generate cheat notes. Please try again.",
        });
    }
}

module.exports = {
    cheatNotesHandler,
};