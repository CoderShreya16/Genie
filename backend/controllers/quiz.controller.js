const { generateQuiz } = require("../services/quiz.service");

/**
 * POST /api/quiz
 * Body: { "notes": "..." }
 * Response: { "quiz": [ { question, options, correctAnswer, explanation }, ... ] }
 */
async function generateQuizHandler(req, res) {
    const { notes } = req.body || {};

    if (!notes || typeof notes !== "string" || !notes.trim()) {
        return res.status(400).json({
            error: "Request body must include a non-empty 'notes' string.",
        });
    }

    try {
        const quiz = await generateQuiz(notes.trim());
        return res.status(200).json({ quiz });
    } catch (error) {
        console.error("[quiz.controller] Failed to generate quiz:", error.message);
        return res.status(502).json({
            error: "Failed to generate quiz. Please try again.",
        });
    }
}

module.exports = {
    generateQuizHandler,
};