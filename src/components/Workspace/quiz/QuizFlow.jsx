import React, { useEffect, useState, useCallback } from "react";
import QuizTakingView from "./QuizTakingView";
import QuizResultsScreen from "./QuizResultsScreen";
import { generateQuiz } from "../../../services/quizApi";

export default function QuizFlow({ quiz, notes, onBackToWorkspace, onQuizRegenerated }) {
    const [phase, setPhase] = useState("taking");
    const [answers, setAnswers] = useState({});
    const [startTime, setStartTime] = useState(() => Date.now());
    const [completedAt, setCompletedAt] = useState(null);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [regenerateError, setRegenerateError] = useState("");

    const resetQuizState = useCallback(() => {
        setAnswers({});
        setPhase("taking");
        setStartTime(Date.now());
        setCompletedAt(null);
    }, []);

    // Whenever a brand-new quiz array arrives (e.g. after regeneration), start fresh.
    useEffect(() => {
        resetQuizState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quiz]);

    const handleSelectAnswer = (index, option) => {
        if (phase !== "taking") return;
        const next = { ...answers, [index]: option };
        setAnswers(next);
        if (Object.keys(next).length === quiz.length) {
            setCompletedAt(Date.now());
            setPhase("results");
        }
    };

    const handleSubmit = () => {
        setCompletedAt(Date.now());
        setPhase("results");
    };

    const handleRetake = () => {
        resetQuizState();
    };

    const handleGenerateNew = async () => {
        if (isRegenerating) return;
        setIsRegenerating(true);
        setRegenerateError("");
        try {
            const newQuiz = await generateQuiz(notes);
            onQuizRegenerated(newQuiz);
        } catch (error) {
            setRegenerateError(error.message || "Failed to generate a new quiz.");
        } finally {
            setIsRegenerating(false);
        }
    };

    const timeTakenSeconds = completedAt ? Math.max(0, Math.round((completedAt - startTime) / 1000)) : 0;

    if (phase === "taking") {
        return (
            <QuizTakingView
                quiz={quiz}
                answers={answers}
                onSelectAnswer={handleSelectAnswer}
                onSubmit={handleSubmit}
            />
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {regenerateError && (
                <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                    {regenerateError}
                </div>
            )}
            <QuizResultsScreen
                quiz={quiz}
                answers={answers}
                timeTakenSeconds={timeTakenSeconds}
                onRetake={handleRetake}
                onGenerateNew={handleGenerateNew}
                onBackToWorkspace={onBackToWorkspace}
                isRegenerating={isRegenerating}
            />
        </div>
    );
}