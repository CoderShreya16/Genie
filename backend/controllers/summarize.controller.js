const { generateSummary } = require("../services/summarize.service");

/**
 * POST /api/summarize
 * Body: { "notes": "..." }
 * Response: { "summary": "..." }
 */
async function summarizeNotes(req, res) {
    const { notes } = req.body || {};

    if (!notes || typeof notes !== "string" || !notes.trim()) {
        return res.status(400).json({
            error: "Request body must include a non-empty 'notes' string.",
        });
    }

    try {
        const summary = await generateSummary(notes.trim());
        return res.status(200).json({ summary });
    } catch (error) {
        console.error("[summarize.controller] Failed to generate summary:", error.message);
        return res.status(502).json({
            error: "Failed to generate summary. Please try again.",
        });
    }
}

module.exports = {
    summarizeNotes,
};