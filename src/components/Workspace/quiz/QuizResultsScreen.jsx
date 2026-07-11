import React, { useMemo } from "react";
import ScoreSummary from "./ScoreSummary";
import QuizStats from "./QuizStats";
import QuizReview from "./QuizReview";
import AiAnalysisPanel from "./AiAnalysisPanel";
import QuizResultsActions from "./QuizResultsActions";

export default function QuizResultsScreen({
    quiz,
    answers,
    timeTakenSeconds,
    onRetake,
    onGenerateNew,
    onBackToWorkspace,
    isRegenerating,
}) {
    const results = useMemo(
        () =>
            quiz.map((question, index) => {
                const userAnswer = answers[index] ?? null;
                const isSkipped = userAnswer === null;
                const isCorrect = !isSkipped && userAnswer === question.correctAnswer;
                return { ...question, userAnswer, isCorrect, isSkipped };
            }),
        [quiz, answers]
    );

    const total = results.length;
    const correct = results.filter((r) => r.isCorrect).length;
    const skipped = results.filter((r) => r.isSkipped).length;
    const incorrect = total - correct - skipped;
    const attempted = total - skipped;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
        <div className="flex flex-col gap-6">
            <ScoreSummary correct={correct} incorrect={incorrect} total={total} percentage={percentage} />
            <QuizStats
                attempted={attempted}
                correct={correct}
                incorrect={incorrect}
                skipped={skipped}
                timeTakenSeconds={timeTakenSeconds}
            />
            <AiAnalysisPanel results={results} />
            <QuizReview results={results} />
            <QuizResultsActions
                onRetake={onRetake}
                onGenerateNew={onGenerateNew}
                onBackToWorkspace={onBackToWorkspace}
                isRegenerating={isRegenerating}
            />
        </div>
    );
}