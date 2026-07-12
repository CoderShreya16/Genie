const Workspace = require("../models/Workspace.model");

function buildAutoTitle(uploadedText) {
    if (!uploadedText || !uploadedText.trim()) return "Untitled Workspace";
    const firstLine = uploadedText.trim().split("\n")[0];
    return firstLine.length > 60 ? `${firstLine.slice(0, 60)}…` : firstLine;
}

function notFoundError() {
    const error = new Error("Workspace not found.");
    error.statusCode = 404;
    return error;
}

async function createWorkspace({ title, uploadedText }) {
    return Workspace.create({
        title: title?.trim() || buildAutoTitle(uploadedText),
        uploadedText: uploadedText || "",
    });
}

/**
 * Returns a lightweight list of all workspaces for the History page —
 * only what's needed to render a card (title, dates, which outputs
 * exist) rather than every field, since summary/cheatNotes/verifyNotes
 * text and full chatHistory can be large and aren't needed until a
 * specific workspace is opened via getWorkspaceById.
 */
async function listWorkspaces() {
    const workspaces = await Workspace.find()
        .select("title createdAt updatedAt summary quiz cheatNotes verifyNotes chatHistory")
        .sort({ updatedAt: -1 })
        .lean();

    return workspaces.map((w) => ({
        _id: w._id,
        title: w.title,
        createdAt: w.createdAt,
        updatedAt: w.updatedAt,
        hasSummary: Boolean(w.summary),
        hasQuiz: Array.isArray(w.quiz) && w.quiz.length > 0,
        hasCheatNotes: Boolean(w.cheatNotes),
        hasVerifyNotes: Boolean(w.verifyNotes),
        chatMessageCount: Array.isArray(w.chatHistory) ? w.chatHistory.length : 0,
    }));
}

async function getWorkspaceById(id) {
    const workspace = await Workspace.findById(id);
    if (!workspace) throw notFoundError();
    return workspace;
}

async function updateField(id, fieldName, value) {
    const workspace = await Workspace.findByIdAndUpdate(
        id,
        { [fieldName]: value },
        { new: true, runValidators: true }
    );
    if (!workspace) throw notFoundError();
    return workspace;
}

const updateSummary = (id, summary) => updateField(id, "summary", summary);
const updateQuiz = (id, quiz) => updateField(id, "quiz", quiz);
const updateCheatNotes = (id, cheatNotes) => updateField(id, "cheatNotes", cheatNotes);
const updateVerifyNotes = (id, verifyNotes) => updateField(id, "verifyNotes", verifyNotes);

async function appendChatMessages(id, messages) {
    const entries = messages.map((m) => ({
        role: m.role,
        content: m.content,
        timestamp: new Date(),
    }));

    const workspace = await Workspace.findByIdAndUpdate(
        id,
        { $push: { chatHistory: { $each: entries } } },
        { new: true, runValidators: true }
    );
    if (!workspace) throw notFoundError();
    return workspace;
}

module.exports = {
    createWorkspace,
    listWorkspaces,
    getWorkspaceById,
    updateSummary,
    updateQuiz,
    updateCheatNotes,
    updateVerifyNotes,
    appendChatMessages,
};