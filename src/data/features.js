import { BrainCircuit, HelpCircle, ClipboardCheck, ScanLine, History } from "lucide-react";

export const FEATURES = [
    {
        icon: BrainCircuit,
        title: "AI Summarizer",
        description:
            "Drop in a chapter, slide deck, or lecture recording and get a clean, structured summary that highlights exactly what's worth remembering.",
    },
    {
        icon: HelpCircle,
        title: "Quiz Generator",
        description:
            "Genie writes practice questions straight from your material, then adapts difficulty as you answer so weak spots get more attention.",
    },
    {
        icon: ClipboardCheck,
        title: "Exam Cheat Sheets",
        description:
            "Condense an entire unit into a single, exam-ready page — formulas, definitions, and key facts organized the way you'll actually use them.",
    },
    {
        icon: ScanLine,
        title: "AI Notes Verification",
        description:
            "Genie cross-checks your notes against the source material and flags anything that's missing, outdated, or factually off before you study it.",
    },
    {
        icon: History,
        title: "History",
        description:
            "Every upload, summary, and quiz attempt is saved automatically, so you can revisit past sessions and track how your understanding improves.",
    },
];