const mongoose = require("mongoose");

/**
 * Connects to MongoDB Atlas via Mongoose.
 *
 * Resolves in both success and failure cases — it never throws and never
 * exits the process. This is intentional: the AI features (summarize,
 * quiz, cheatnotes, verify, chat) don't depend on the database, so a
 * MongoDB outage should only take down the /api/workspace/* routes, not
 * the whole server.
 *
 * A bounded serverSelectionTimeoutMS is set so that if Atlas is
 * unreachable (wrong URI, IP not whitelisted, cluster paused, etc.),
 * this fails fast with a clear log instead of hanging indefinitely.
 */
async function connectDB() {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.error(
            "[MongoDB] Connection Failed: MONGODB_URI is missing. Add it to your backend/.env file."
        );
        return false;
    }

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("[MongoDB] Connected successfully to Atlas.");

        mongoose.connection.on("error", (error) => {
            console.error("[MongoDB] Connection error after initial connect:", error.message);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("[MongoDB] Disconnected.");
        });

        return true;
    } catch (error) {
        console.error("[MongoDB] Connection Failed:", error.message);
        return false;
    }
}

module.exports = connectDB;