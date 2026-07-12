const { verifyNotes } = require("../services/verify.service");

/**
 * POST /api/verify
 * Body: { "notes": "..." }
 * Response: { "report": "...markdown..." }
 */
async function verifyHandler(req, res) {
    const { notes } = req.body || {};

    if (!notes || typeof notes !== "string" || !notes.trim()) {
        return res.status(400).json({
            error: "Request body must include a non-empty 'notes' string.",
        });
    }

    try {
        const report = await verifyNotes(notes.trim());
        return res.status(200).json({ report });
    } catch (error) {
        console.error("[verify.controller] Failed to verify notes:", error.message);
        return res.status(502).json({
            error: "Failed to verify notes. Please try again.",
        });
    }
}

module.exports = {
    verifyHandler,
};