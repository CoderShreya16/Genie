import React from "react";
import { Send } from "lucide-react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import QuizQuestionCard from "./QuizQuestionCard";

export default function QuizTakingView({ quiz, answers, onSelectAnswer, onSubmit }) {
    const answeredCount = Object.keys(answers).length;
    const total = quiz.length;
    const progressPercentage = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    return (
        <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-slate-900">Quiz</h2>
                <span className="text-sm font-medium text-slate-500">
                    {answeredCount} / {total} answered
                </span>
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            <div className="mt-5 flex flex-col gap-4">
                {quiz.map((question, index) => (
                    <QuizQuestionCard
                        key={index}
                        question={question}
                        index={index}
                        selectedOption={answers[index] ?? null}
                        onSelect={(option) => onSelectAnswer(index, option)}
                    />
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                <Button variant="primary" size="md" onClick={onSubmit} disabled={answeredCount === 0}>
                    <Send size={15} />
                    Submit Quiz
                </Button>
            </div>
        </Card>
    );
}