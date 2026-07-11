const { analyzeQuizResults } = require("../services/analysis.service");

function isValidResultsArray(results) {
    return (
        Array.isArray(results) &&
        results.length > 0 &&
        results.every(
            (r) =>
                r &&
                typeof r.question === "string" &&
                typeof r.correctAnswer === "string" &&
                "userAnswer" in r &&
                typeof r.isCorrect === "boolean"
        )
    );
}

/**
 * POST /api/quiz/analyze
 * Body: { "results": [ { question, correctAnswer, userAnswer, isCorrect }, ... ] }
 * Response: { "analysis": { strengths, weakAreas, recommendedTopics, overallFeedback } }
 */
async function analyzeQuizHandler(req, res) {
    const { results } = req.body || {};

    if (!isValidResultsArray(results)) {
        return res.status(400).json({
            error:
                "Request body must include a non-empty 'results' array with question, correctAnswer, userAnswer, and isCorrect fields.",
        });
    }

    try {
        const analysis = await analyzeQuizResults(results);
        return res.status(200).json({ analysis });
    } catch (error) {
        console.error("[analysis.controller] Failed to generate analysis:", error.message);
        return res.status(502).json({
            error: "Failed to generate AI analysis. Please try again.",
        });
    }
}

module.exports = {
    analyzeQuizHandler,
};