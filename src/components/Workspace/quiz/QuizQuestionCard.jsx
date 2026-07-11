import React from "react";
import { cn } from "../../../lib/utils";

export default function QuizQuestionCard({ question, index, selectedOption, onSelect }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
            <p className="font-display text-sm font-semibold text-slate-900">
                <span className="mr-2 text-indigo-500">Q{index + 1}.</span>
                {question.question}
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {question.options.map((option) => {
                    const isSelected = option === selectedOption;
                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => onSelect(option)}
                            className={cn(
                                "rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-colors",
                                isSelected
                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-100"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/50"
                            )}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}