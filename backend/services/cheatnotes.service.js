const { GoogleGenAI } = require("@google/genai");
const { buildCheatNotesPrompt } = require("../utils/promptTemplates");

require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

/**
 * Sends the notes to Gemini with the Cheat Notes prompt and returns the
 * raw Markdown revision sheet as plain text.
 */
async function generateCheatNotes(notes) {
    const prompt = buildCheatNotesPrompt(notes);

    let response;
    try {
        response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
        });
    } catch (sdkError) {
        throw new Error(`Gemini API request failed: ${sdkError.message}`);
    }

    const cheatNotes = response?.text;
    if (!cheatNotes || !cheatNotes.trim()) {
        throw new Error("Gemini API returned no content for the cheat notes.");
    }

    return cheatNotes.trim();
}

module.exports = {
    generateCheatNotes,
};