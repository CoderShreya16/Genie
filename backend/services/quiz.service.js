const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});
const { buildQuizPrompt } = require("../utils/promptTemplates");

/**
 * Gemini sometimes wraps JSON in ```json fences even when asked not to.
 * Strip those before parsing.
 */
function extractJson(rawText) {
    const cleaned = rawText
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "");
    return JSON.parse(cleaned);
}

function validateQuiz(quiz) {
    if (!Array.isArray(quiz) || quiz.length === 0) {
        throw new Error("Quiz data is not a valid non-empty array.");
    }

    quiz.forEach((q, idx) => {
        if (typeof q.question !== "string" || !q.question.trim()) {
            throw new Error(`Question ${idx + 1} is missing a valid 'question' field.`);
        }
        if (!Array.isArray(q.options) || q.options.length !== 4) {
            throw new Error(`Question ${idx + 1} must have exactly 4 options.`);
        }
        if (typeof q.correctAnswer !== "string" || !q.options.includes(q.correctAnswer)) {
            throw new Error(`Question ${idx + 1} has an invalid 'correctAnswer'.`);
        }
        if (typeof q.explanation !== "string" || !q.explanation.trim()) {
            throw new Error(`Question ${idx + 1} is missing a valid 'explanation'.`);
        }
    });
}

/**
 * Calls Gemini with the quiz prompt and returns a validated array of
 * question objects. Throws a descriptive Error on any failure — the
 * controller turns that into an HTTP response.
 */
async function generateQuiz(notes) {
    const prompt = buildQuizPrompt(notes);

    let response;
    try {
        response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            },
        });
    } catch (sdkError) {
        throw new Error(`Gemini API request failed: ${sdkError.message}`);
    }

    const rawText = response?.text;
    if (!rawText) {
        throw new Error("Gemini API returned no content for the quiz.");
    }

    let parsed;
    try {
        parsed = extractJson(rawText);
    } catch {
        throw new Error("Gemini API returned malformed JSON for the quiz.");
    }

    // Accept either { "quiz": [...] } or a bare [...] array, in case the
    // model omits the wrapper object despite the prompt's instructions.
    const quiz = Array.isArray(parsed) ? parsed : parsed.quiz;
    validateQuiz(quiz);

    return quiz;
}

module.exports = {
    generateQuiz,
};