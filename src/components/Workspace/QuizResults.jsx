import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import Card from "../ui/Card";
import { cn } from "../../lib/utils";

function QuestionCard({ question, index }) {
    const [selected, setSelected] = useState(null);
    const hasAnswered = selected !== null;

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
            <p className="font-display text-sm font-semibold text-slate-900">
                <span className="mr-2 text-indigo-500">Q{index + 1}.</span>
                {question.question}
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {question.options.map((option) => {
                    const isCorrectOption = option === question.correctAnswer;
                    const isSelectedOption = option === selected;

                    let stateClasses = "border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/50";
                    if (hasAnswered && isCorrectOption) {
                        stateClasses = "border-emerald-300 bg-emerald-50 text-emerald-700";
                    } else if (hasAnswered && isSelectedOption && !isCorrectOption) {
                        stateClasses = "border-rose-300 bg-rose-50 text-rose-600";
                    }

                    return (
                        <button
                            key={option}
                            type="button"
                            disabled={hasAnswered}
                            onClick={() => setSelected(option)}
                            className={cn(
                                "flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-colors disabled:cursor-default",
                                stateClasses
                            )}
                        >
                            <span>{option}</span>
                            {hasAnswered && isCorrectOption && <CheckCircle2 size={16} className="shrink-0" />}
                            {hasAnswered && isSelectedOption && !isCorrectOption && (
                                <XCircle size={16} className="shrink-0" />
                            )}
                        </button>
                    );
                })}
            </div>

            {hasAnswered && (
                <div className="mt-4 flex gap-2.5 rounded-xl bg-indigo-50/70 p-3.5">
                    <HelpCircle size={16} className="mt-0.5 shrink-0 text-indigo-500" />
                    <p className="text-xs leading-relaxed text-slate-600">{question.explanation}</p>
                </div>
            )}
        </div>
    );
}

export default function QuizResults({ quiz }) {
    return (
        <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-slate-900">Quiz</h2>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                    {quiz.length} questions
                </span>
            </div>

            <div className="mt-5 flex flex-col gap-4">
                {quiz.map((question, index) => (
                    <QuestionCard key={index} question={question} index={index} />
                ))}
            </div>
        </Card>
    );
}