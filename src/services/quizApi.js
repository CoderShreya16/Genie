const API_BASE_URL = "http://localhost:5000/api";

/**
 * Calls the backend's Quiz Generator endpoint.
 * Returns an array of question objects: { question, options, correctAnswer, explanation }
 */
export async function generateQuiz(notes) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/quiz`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notes }),
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

    if (!Array.isArray(data?.quiz)) {
        throw new Error("Backend response was missing a valid 'quiz' array.");
    }

    return data.quiz;
}