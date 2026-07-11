import { FileText, BookOpen, Zap, ShieldCheck } from "lucide-react";

export const WORKSPACE_ACTIONS = [
    {
        id: "summarize",
        icon: FileText,
        emoji: "📝",
        title: "Summarize Notes",
        description: "Generate a concise summary.",
    },
    {
        id: "quiz",
        icon: BookOpen,
        emoji: "📚",
        title: "Quiz Generator",
        description: "Generate MCQs from the uploaded notes.",
    },
    {
        id: "cheatsheet",
        icon: Zap,
        emoji: "⚡",
        title: "Cheat Notes",
        description: "Generate quick revision bullet points.",
    },
    {
        id: "verify",
        icon: ShieldCheck,
        emoji: "✅",
        title: "Verify Notes",
        description: "Check notes for mistakes and missing concepts.",
    },
];

/**
 * Placeholder copy shown in the output panel once "Generate" is pressed.
 * Swap this out for real Gemini responses later — nothing else in the
 * UI needs to change, just what populates `outputText`.
 */
export const PLACEHOLDER_OUTPUTS = {
    summarize:
        "Here's a concise summary of your notes: three key concepts were identified, each broken down into plain-language explanations with the supporting details trimmed away. (This is placeholder text — real AI output will appear here once the backend is connected.)",
    quiz: "1. What is the primary function of the topic discussed in section 2?\n   A) Option A   B) Option B   C) Option C   D) Option D\n\n2. Which of the following best describes the key process covered?\n   A) Option A   B) Option B   C) Option C   D) Option D\n\n(This is placeholder text — real quiz questions will be generated from your notes once the backend is connected.)",
    cheatsheet:
        "• Key definition 1 — short explanation\n• Key definition 2 — short explanation\n• Formula / rule to remember\n• Common mistake to avoid\n\n(This is placeholder text — a real cheat sheet will be generated from your notes once the backend is connected.)",
    verify:
        "Verification complete. 2 concepts matched the source material, 1 definition looked incomplete, and no major contradictions were found. (This is placeholder text — real verification results will appear here once the backend is connected.)",
};