const API_BASE_URL = "http://localhost:5000/api";

/**
 * Calls the backend's Cheat Notes endpoint.
 * Returns a Markdown string — render it with MarkdownRenderer.
 */
export async function generateCheatNotes(notes) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/cheatnotes`, {
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

    if (!data?.cheatNotes) {
        throw new Error("Backend response was missing a 'cheatNotes' field.");
    }

    return data.cheatNotes;
}