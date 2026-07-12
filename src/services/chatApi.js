const API_BASE_URL = "http://localhost:5000/api";

/**
 * Sends a message plus prior conversation history to the backend's
 * chatbot endpoint and returns Genie's plain-text reply.
 *
 * conversationHistory shape: [{ role: "user" | "assistant", content: "..." }, ...]
 * (should NOT include the current `message` — that's sent separately)
 */
export async function sendChatMessage(message, conversationHistory = []) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, conversationHistory }),
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

    if (!data?.reply) {
        throw new Error("Backend response was missing a 'reply' field.");
    }

    return data.reply;
}