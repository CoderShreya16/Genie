const { GoogleGenAI } = require("@google/genai");
const { buildVerifyPrompt } = require("../utils/promptTemplates");

require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

/**
 * Sends the notes to Gemini with the Verify Notes prompt and returns the
 * raw Markdown verification report as plain text.
 */
async function verifyNotes(notes) {
    const prompt = buildVerifyPrompt(notes);

    let response;
    try {
        response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
        });
    } catch (sdkError) {
        throw new Error(`Gemini API request failed: ${sdkError.message}`);
    }

    const report = response?.text;
    if (!report || !report.trim()) {
        throw new Error("Gemini API returned no content for the verification report.");
    }

    return report.trim();
}

module.exports = {
    verifyNotes,
};