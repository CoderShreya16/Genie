const express = require("express");
const cors = require("cors");
const summarizeRoutes = require("./routes/summarize.routes");
const quizRoutes = require("./routes/quiz.routes");
const analysisRoutes = require("./routes/analysis.routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api", summarizeRoutes);
app.use("/api", quizRoutes);
app.use("/api", analysisRoutes);

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