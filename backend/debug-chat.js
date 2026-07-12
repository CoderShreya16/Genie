/**
 * Temporary binary-search debug script for the chat.service.js timeout.
 * Run with: node debug-chat.js
 * Delete this file once the bug is found — it's not part of the app.
 */
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = "gemini-flash-latest";

function withTimeoutLog(label) {
    const start = Date.now();
    console.log(`\n[${label}] starting…`);
    return () => console.log(`[${label}] finished in ${Date.now() - start}ms`);
}

async function test1_plainStringNoConfig() {
    const done = withTimeoutLog("Test 1: plain string, no config");
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: "Say hello in one sentence.",
        });
        done();
        console.log("Test 1 SUCCESS:", response.text);
        return true;
    } catch (err) {
        done();
        console.log("Test 1 FAILED:", err.message);
        return false;
    }
}

async function test2_plainStringWithSystemInstruction() {
    const done = withTimeoutLog("Test 2: plain string + systemInstruction");
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: "Say hello in one sentence.",
            config: {
                systemInstruction: "You are a friendly assistant.",
            },
        });
        done();
        console.log("Test 2 SUCCESS:", response.text);
        return true;
    } catch (err) {
        done();
        console.log("Test 2 FAILED:", err.message);
        return false;
    }
}

async function test3_arrayContentsNoConfig() {
    const done = withTimeoutLog("Test 3: array contents (single user turn), no config");
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [{ role: "user", parts: [{ text: "Say hello in one sentence." }] }],
        });
        done();
        console.log("Test 3 SUCCESS:", response.text);
        return true;
    } catch (err) {
        done();
        console.log("Test 3 FAILED:", err.message);
        return false;
    }
}

async function test4_arrayContentsWithSystemInstruction() {
    const done = withTimeoutLog("Test 4: array contents + systemInstruction");
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [{ role: "user", parts: [{ text: "Say hello in one sentence." }] }],
            config: {
                systemInstruction: "You are a friendly assistant.",
            },
        });
        done();
        console.log("Test 4 SUCCESS:", response.text);
        return true;
    } catch (err) {
        done();
        console.log("Test 4 FAILED:", err.message);
        return false;
    }
}

async function test5_arrayContentsWithHistoryAndSystemInstruction() {
    const done = withTimeoutLog("Test 5: array contents WITH prior history + systemInstruction (full reproduction)");
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { role: "user", parts: [{ text: "I have 2 dogs." }] },
                { role: "model", parts: [{ text: "Nice! Two dogs is great company." }] },
                { role: "user", parts: [{ text: "How many paws is that?" }] },
            ],
            config: {
                systemInstruction: "You are a friendly assistant.",
            },
        });
        done();
        console.log("Test 5 SUCCESS:", response.text);
        return true;
    } catch (err) {
        done();
        console.log("Test 5 FAILED:", err.message);
        return false;
    }
}

async function main() {
    console.log("=== Chat timeout binary search ===");
    console.log("GEMINI_MODEL:", GEMINI_MODEL);
    console.log("API key present:", Boolean(process.env.GEMINI_API_KEY));

    const results = {};
    results.test1 = await test1_plainStringNoConfig();
    results.test2 = await test2_plainStringWithSystemInstruction();
    results.test3 = await test3_arrayContentsNoConfig();
    results.test4 = await test4_arrayContentsWithSystemInstruction();
    results.test5 = await test5_arrayContentsWithHistoryAndSystemInstruction();

    console.log("\n=== SUMMARY ===");
    console.log(results);
}

main();