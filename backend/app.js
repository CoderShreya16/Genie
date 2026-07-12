const express = require("express");
const cors = require("cors");
const summarizeRoutes = require("./routes/summarize.routes");
const quizRoutes = require("./routes/quiz.routes");
const analysisRoutes = require("./routes/analysis.routes");
const chatRoutes = require("./routes/chat.routes");
const cheatNotesRoutes = require("./routes/cheatnotes.routes");
const verifyRoutes = require("./routes/verify.routes");
const workspaceRoutes = require("./routes/workspace.routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api", summarizeRoutes);
app.use("/api", quizRoutes);
app.use("/api", analysisRoutes);
app.use("/api", chatRoutes);
app.use("/api", cheatNotesRoutes);
app.use("/api", verifyRoutes);
app.use("/api", workspaceRoutes);

// 404 fallback for unmatched routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found." });
});

// Centralized error handler
app.use((err, req, res, next) => {
    console.error("[app] Unhandled error:", err);
    res.status(500).json({ error: "Internal server error." });
});

module.exports = app;