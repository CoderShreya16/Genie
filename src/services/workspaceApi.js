const API_BASE_URL = "http://localhost:5000/api";

async function request(path, options) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}${path}`, options);
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
    if (!data?.workspace) {
        throw new Error("Backend response was missing a 'workspace' field.");
    }
    return data.workspace;
}

export async function createWorkspace({ title, uploadedText }) {
    return request("/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, uploadedText }),
    });
}

/**
 * Fetches the lightweight list of all saved workspaces for the History
 * page. Returns { _id, title, createdAt, updatedAt, hasSummary, hasQuiz,
 * hasCheatNotes, hasVerifyNotes, chatMessageCount } per workspace.
 */
export async function listWorkspaces() {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/workspaces`, { method: "GET" });
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
    if (!Array.isArray(data?.workspaces)) {
        throw new Error("Backend response was missing a 'workspaces' array.");
    }
    return data.workspaces;
}

export async function getWorkspace(workspaceId) {
    return request(`/workspace/${workspaceId}`, { method: "GET" });
}

export async function saveSummary(workspaceId, summary) {
    return request(`/workspace/${workspaceId}/summary`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary }),
    });
}

export async function saveQuiz(workspaceId, quiz) {
    return request(`/workspace/${workspaceId}/quiz`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz }),
    });
}

export async function saveCheatNotes(workspaceId, cheatNotes) {
    return request(`/workspace/${workspaceId}/cheatnotes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cheatNotes }),
    });
}

export async function saveVerifyNotes(workspaceId, verifyNotes) {
    return request(`/workspace/${workspaceId}/verify`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verifyNotes }),
    });
}

export async function appendChatMessages(workspaceId, messages) {
    return request(`/workspace/${workspaceId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
    });
}