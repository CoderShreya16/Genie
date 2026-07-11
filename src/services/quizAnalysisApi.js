const API_BASE_URL = "http://localhost:5000/api";

/**
 * Sends completed quiz results to the backend and returns the AI
 * performance analysis: { strengths, weakAreas, recommendedTopics, overallFeedback }
 */
export async function analyzeQuiz(results) {
    const payload = results.map((r) => ({
        question: r.question,
        correctAnswer: r.correctAnswer,
        userAnswer: r.userAnswer,
        isCorrect: r.isCorrect,
    }));

    let response;
    try {
        response = await fetch(`${API_BASE_URL}/quiz/analyze`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ results: payload }),
        });
    } catch (networkError) {
        throw new Error(
            `Could not reach the backend at ${API_BASE_URL}. Is it running? (${networkError.message})`
        );
    }

    if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;
        try {
            const errorBody = await response.json();
            if (errorBody?.error) errorMessage = errorBody.error;
        } catch {
            // response wasn't JSON — keep the generic message
        }
        throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data?.analysis) {
        throw new Error("Backend response was missing an 'analysis' object.");
    }

    return data.analysis;
}