const { GoogleGenAI } = require("@google/genai");

// Initialize Gemini AI. Ensure GEMINI_API_KEY is in your environment variables.
const ai = new GoogleGenAI({});

/**
 * Generates a summary for the given notes using Gemini.
 * @param {string} notes The raw notes to summarize.
 * @returns {Promise<string>} The generated summary.
 */
async function generateSummary(notes) {
    if (!notes) {
        throw new Error("Notes content cannot be empty.");
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: `Summarize the following notes concisely:\n\n${notes}`,
        });

        return response.text;
    } catch (error) {
        console.error("[summarize.service] Error calling Gemini API:", error);
        throw new Error("Failed to generate summary from AI.");
    }
}

module.exports = {
    generateSummary,
};