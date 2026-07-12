const { getChatReply } = require("../services/chat.service");

/**
 * POST /api/chat
 * Body: { "message": "...", "conversationHistory": [{ role, content }, ...] }
 * Response: { "reply": "..." }
 */
async function chatHandler(req, res) {
    console.log("📩 Chat API called:", message);
    const { message, conversationHistory } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({
            error: "Request body must include a non-empty 'message' string.",
        });
    }

    if (conversationHistory !== undefined && !Array.isArray(conversationHistory)) {
        return res.status(400).json({
            error: "'conversationHistory' must be an array when provided.",
        });
    }

    try {
        const reply = await getChatReply(message.trim(), conversationHistory || []);
        return res.status(200).json({ reply });
    } catch (error) {
        console.error("[chat.controller] Failed to generate chat reply:", error.message);
        return res.status(502).json({
            error: "Failed to get a response from Genie. Please try again.",
        });
    }
}

module.exports = {
    chatHandler,
};