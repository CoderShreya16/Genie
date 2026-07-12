const { GoogleGenAI } = require("@google/genai");
const { buildChatSystemPrompt } = require("../utils/promptTemplates");

require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";

/**
 * Converts the frontend's conversation history — [{ role: "user" | "assistant", content: "..." }]
 * — into the { role: "user" | "model", parts: [{ text }] } shape Gemini expects.
 * Anything malformed is silently dropped rather than throwing, since chat
 * history is best-effort context, not critical data.
 */
function toGeminiHistory(conversationHistory) {
    if (!Array.isArray(conversationHistory)) return [];

    return conversationHistory
        .filter(
            (m) =>
                m &&
                typeof m.content === "string" &&
                m.content.trim() &&
                (m.role === "user" || m.role === "assistant")
        )
        .map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content.trim() }],
        }));
}

/**
 * Sends the user's message, plus prior conversation history, to Gemini
 * with Genie's tutor system prompt applied. Returns the plain-text reply.
 */
async function getChatReply(message, conversationHistory) {
    const history = toGeminiHistory(conversationHistory);
    const contents = [...history, { role: "user", parts: [{ text: message }] }];

    let response;
    try {
        response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents,
            config: {
                systemInstruction: buildChatSystemPrompt(),
            },
        });
    } catch (sdkError) {
        console.error("FULL GEMINI ERROR:", sdkError);
        throw new Error(`Gemini API request failed: ${sdkError.message}`);
    }

    const reply = response?.text;
    if (!reply || !reply.trim()) {
        throw new Error("Gemini API returned an empty reply.");
    }

    return reply.trim();
}

module.exports = {
    getChatReply,
};
