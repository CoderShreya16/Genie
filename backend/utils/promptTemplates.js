/**
 * Builds the prompt sent to Gemini for the Notes Summarizer feature.
 * Kept as a plain string template so it's easy to tune wording without
 * touching any request/response handling logic.
 */
function buildSummarizePrompt(notes) {
    return `You are Genie, an AI study assistant. Summarize the following notes into a clear, well-structured summary that highlights the key concepts a student should remember. Use short paragraphs or bullet points where helpful. Do not include any preamble like "Here is a summary" — return only the summary itself.

Notes:
"""
${notes}
"""`;
}

module.exports = {
    buildSummarizePrompt,
};