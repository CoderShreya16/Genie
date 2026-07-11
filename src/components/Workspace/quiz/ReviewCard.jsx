import React from "react";
import { CheckCircle2, XCircle, MinusCircle, HelpCircle } from "lucide-react";
import { cn } from "../../../lib/utils";

export default function ReviewCard({ result, index }) {
    const { question, options, correctAnswer, userAnswer, isCorrect, isSkipped, explanation } = result;

    return (
        <div
            className={cn(
                "rounded-2xl border p-5",
                isSkipped
                    ? "border-slate-200 bg-slate-50/60"
                    : isCorrect
                        ? "border-emerald-200 bg-emerald-50/40"
                        : "border-rose-200 bg-rose-50/40"
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <p className="font-display text-sm font-semibold text-slate-900">
                    <span className="mr-2 text-indigo-500">Q{index + 1}.</span>
                    {question}
                </p>
                {isSkipped ? (
                    <MinusCircle size={18} className="mt-0.5 shrink-0 text-slate-400" />
                ) : isCorrect ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                ) : (
                    <XCircle size={18} className="mt-0.5 shrink-0 text-rose-500" />
                )}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {options.map((option) => {
                    const isCorrectOption = option === correctAnswer;
                    const isUserOption = option === userAnswer;

                    let classes = "border-slate-200 bg-white text-slate-600";
                    if (isCorrectOption) classes = "border-emerald-300 bg-emerald-50 text-emerald-700";
                    else if (isUserOption && !isCorrectOption) classes = "border-rose-300 bg-rose-50 text-rose-600";

                    return (
                        <div
                            key={option}
                            className={cn(
                                "flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm font-medium",
                                classes
                            )}
                        >
                            <span>{option}</span>
                            {isCorrectOption && <CheckCircle2 size={15} />}
                            {isUserOption && !isCorrectOption && <XCircle size={15} />}
                        </div>
                    );
                })}
            </div>

            {isSkipped && <p className="mt-3 text-xs font-medium text-slate-500">You didn't answer this question.</p>}

            <div className="mt-4 flex gap-2.5 rounded-xl bg-indigo-50/70 p-3.5">
                <HelpCircle size={16} className="mt-0.5 shrink-0 text-indigo-500" />
                <p className="text-xs leading-relaxed text-slate-600">{explanation}</p>
            </div>
        </div>
    );
}