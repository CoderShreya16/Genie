const mongoose = require("mongoose");

const { Schema } = mongoose;

const QuizQuestionSchema = new Schema(
    {
        question: { type: String, required: true },
        options: {
            type: [String],
            validate: {
                validator: (arr) => Array.isArray(arr) && arr.length === 4,
                message: "Each quiz question must have exactly 4 options.",
            },
            required: true,
        },
        correctAnswer: { type: String, required: true },
        explanation: { type: String, required: true },
    },
    { _id: false }
);

const ChatMessageSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true,
        },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    },
    { _id: false }
);

const WorkspaceSchema = new Schema(
    {
        // userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
        // Not implemented yet — authentication is out of scope for this pass.
        // Adding this field later (plus the index) scopes workspaces to a
        // user without any other change to this schema or its consumers.

        title: {
            type: String,
            trim: true,
            default: "Untitled Workspace",
        },
        uploadedText: {
            type: String,
            default: "",
        },
        summary: {
            type: String,
            default: null,
        },
        quiz: {
            type: [QuizQuestionSchema],
            default: [],
        },
        cheatNotes: {
            type: String,
            default: null,
        },
        verifyNotes: {
            type: String,
            default: null,
        },
        chatHistory: {
            type: [ChatMessageSchema],
            default: [],
        },
    },
    { timestamps: true } // adds createdAt / updatedAt automatically
);

module.exports = mongoose.model("Workspace", WorkspaceSchema);