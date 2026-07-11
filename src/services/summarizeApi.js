const API_BASE_URL = "http://localhost:5000/api";

/**
 * Calls the backend's Notes Summarizer endpoint.
 * Throws an Error with a readable message on any failure — the caller
 * decides how to surface that to the UI.
 */
export async function summarizeNotes(notes) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/summarize`, {
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

    if (!data?.summary) {
        throw new Error("Backend response was missing a 'summary' field.");
    }

    return data.summary;
}
