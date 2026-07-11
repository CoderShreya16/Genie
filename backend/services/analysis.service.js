const { GoogleGenAI } = require("@google/genai");
const { buildAnalysisPrompt } = require("../utils/promptTemplates");

require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = "gemini-flash-latest";

function extractJson(rawText) {
    const cleaned = rawText
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "");
    return JSON.parse(cleaned);
}

function normalizeToArray(value) {
    if (Array.isArray(value)) {
        return value.filter((v) => typeof v === "string" && v.trim());
    }
    if (typeof value === "string" && value.trim()) {
        return [value.trim()];
    }
    return [];
}

function validateAnalysis(parsed) {
    const strengths = normalizeToArray(parsed.strengths);
    const weakAreas = normalizeToArray(parsed.weakAreas);
    const recommendedTopics = normalizeToArray(parsed.recommendedTopics);
    const overallFeedback =
        typeof parsed.overallFeedback === "string" ? parsed.overallFeedback.trim() : "";

    if (!overallFeedback) {
        throw new Error("Analysis is missing overall feedback.");
    }

    return {
        strengths: strengths.length ? strengths : ["No specific strengths identified from this attempt."],
        weakAreas: weakAreas.length ? weakAreas : ["No specific weak areas identified from this attempt."],
        recommendedTopics: recommendedTopics.length
            ? recommendedTopics
            : ["Review the topics covered in this quiz."],
        overallFeedback,
    };
}

/**
 * Sends completed quiz results to Gemini and returns a validated
 * performance analysis object.
 */
async function analyzeQuizResults(results) {
    const prompt = buildAnalysisPrompt(results);

    let response;
    try {
        response = await ai.models.generateContent({
            model: GEMINI_MODEL,
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
        throw new Error("Gemini API returned no content for the analysis.");
    }

    let parsed;
    try {
        parsed = extractJson(rawText);
    } catch {
        throw new Error("Gemini API returned malformed JSON for the analysis.");
    }

    return validateAnalysis(parsed);
}

module.exports = {
    analyzeQuizResults,
};