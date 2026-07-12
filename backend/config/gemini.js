require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

if (!GEMINI_API_KEY) {
    // Fail loudly at boot rather than on the first request — easier to debug.
    console.error(
        "[config/gemini] GEMINI_API_KEY is missing. Add it to your backend/.env file."
    );
}

module.exports = {
    GEMINI_API_KEY,
    GEMINI_MODEL,
    GEMINI_BASE_URL,
    GEMINI_ENDPOINT: `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent`,
};