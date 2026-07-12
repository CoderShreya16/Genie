require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
    const isDbConnected = await connectDB();

    if (!isDbConnected) {
        console.warn(
            "[server] Starting without a MongoDB connection — AI features will work normally, but Workspace persistence (save/load) will fail until MongoDB is reachable."
        );
    }

    app.listen(PORT, () => {
        console.log(`Genie backend running on http://localhost:${PORT}`);
    });
}

startServer();