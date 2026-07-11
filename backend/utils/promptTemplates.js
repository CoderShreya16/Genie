/**
 * Builds the prompt sent to Gemini for the Notes Summarizer feature.
 */
function buildSummarizePrompt(notes) {
    return `You are Genie, an AI study assistant. Summarize the following notes into a clear, well-structured summary that highlights the key concepts a student should remember. Use short paragraphs or bullet points where helpful. Do not include any preamble like "Here is a summary" — return only the summary itself.

Notes:
"""
${notes}
"""`;
}

/**
 * Builds the prompt sent to Gemini for the Quiz Generator feature.
 */
function buildQuizPrompt(notes) {
    return `You are Genie, an AI study assistant. Based on the notes below, generate exactly 10 multiple-choice questions to help a student test their understanding.

Rules:
- Each question must have exactly 4 answer options.
- Exactly one option must be the correct answer, and it must match one of the 4 options exactly (character-for-character).
- Include a short explanation (1-2 sentences) of why the correct answer is correct.
- Base every question strictly on the content of the notes provided — do not invent facts that aren't supported by them.
- Return ONLY valid JSON, with no markdown formatting, no code fences, and no extra commentary.

Return the response in exactly this JSON structure:
{
  "quiz": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": "",
      "explanation": ""
    }
  ]
}

Notes:
"""
${notes}
"""`;
}

/**
 * Builds the prompt sent to Gemini for the post-quiz AI Analysis feature.
 */
function buildAnalysisPrompt(results) {
    const formattedResults = results
        .map((r, i) => {
            const status = r.isCorrect ? "Correct" : r.userAnswer ? "Incorrect" : "Skipped";
            return `${i + 1}. Question: ${r.question}
   Correct answer: ${r.correctAnswer}
   Student's answer: ${r.userAnswer || "No answer given"}
   Status: ${status}`;
        })
        .join("\n\n");

    return `You are Genie, an AI study assistant. A student just completed a quiz. Based on their results below, provide a short, encouraging performance analysis.

Rules:
- Base every observation strictly on the results provided — do not invent topics that aren't reflected in the questions.
- Keep each list item to one short sentence.
- Be specific about which topics or question types the student struggled with, referencing the content of the questions they got wrong or skipped.
- Return ONLY valid JSON, with no markdown formatting, no code fences, and no extra commentary.

Return the response in exactly this JSON structure:
{
  "strengths": ["", ""],
  "weakAreas": ["", ""],
  "recommendedTopics": ["", ""],
  "overallFeedback": ""
}

Quiz results:
${formattedResults}`;
}

module.exports = {
    buildSummarizePrompt,
    buildQuizPrompt,
    buildAnalysisPrompt,
};